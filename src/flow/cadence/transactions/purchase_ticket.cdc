import FlowToken from "../contracts/utility/FlowToken.cdc"
import FungibleToken from "../contracts/utility/FungibleToken.cdc"
import LotteryX from "../contracts/LotteryX.cdc"

/// Transaction used to create a lottery with just the creator as the cutReceiver

transaction(lotteryID: UInt64, lotteryManagerAddress: Address) {
    
    let paymentVault: @FungibleToken.Vault
    let lotterycollection: &LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}
    let lottery: &LotteryX.Lottery{LotteryX.LotteryPublic}
    let buyerCapability: Capability<&{FungibleToken.Receiver}>
    

    prepare(acct: AuthAccount) {
        // Access the lottery collection public resource of the manager to purchase the ticket.
        self.lotterycollection = getAccount(lotteryManagerAddress)
            .getCapability<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(
                LotteryX.LotteryCollectionPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Lottery Collection from provided address")

             
        // Borrow the lottery
        self.lottery = self.lotterycollection.borrowLottery(lotteryID: lotteryID)
                    ?? panic("No Lottery with that ID in Lottery Collection")

        let price = self.lottery.getDetails().ticketPrice

        // Access the vault of the buyer to pay the sale price of the lottery.
        let mainFlowVault = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from acct storage")
        self.paymentVault <- mainFlowVault.withdraw(amount: price)

        let buyerCap = acct.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
        assert(buyerCap.check(), message: "The buyer doesn't have flowtoken receiving capability")
        self.buyerCapability = buyerCap
    }

    execute {
        // Purchase the ticket
        self.lottery.purchase(
            payment: <- self.paymentVault,
            buyerCapability: self.buyerCapability
        )
    }
}
 