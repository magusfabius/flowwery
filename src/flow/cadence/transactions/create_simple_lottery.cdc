import FlowToken from "../contracts/utility/FlowToken.cdc"
import FungibleToken from "../contracts/utility/FungibleToken.cdc"
import LotteryX from "../contracts/LotteryX.cdc"

/// Transaction used to create a lottery with just the creator as the cutReceiver

transaction(collectionAddress: Address, ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, managerCutPercentage: UFix64) {
    
    let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let lotterycollection: &LotteryX.LotteryCollection
    var saleCuts: [LotteryX.SaleCut]

    prepare(acct: AuthAccount) {
        assert(ticketPrice > 0.0, message: "Ticket price could not be zero")
        assert(totalTickets > 1, message: "There must be at least 2 tickets")

        self.saleCuts = []

        // Receiver for the sale cut.
        self.flowReceiver = acct.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
        
       
        // Append the cut for the creator of the lottery.
        self.saleCuts.append(LotteryX.SaleCut(
            receiver: self.flowReceiver,
            amount: ticketPrice * UFix64(totalTickets) * managerCutPercentage
        ))

        self.lotterycollection = getAccount(collectionAddress).borrow<&LotteryX.LotteryCollection>(from: LotteryX.LotteryCollectionStoragePath)
            ?? panic("Missing or mis-typed LotteryX LotteryCollection")
    }

    execute {
        // Create lottery
        self.lotterycollection.createLottery(
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            maxTickets: totalTickets,
            ticketPrice: ticketPrice,
            saleCuts: self.saleCuts,
            fungibleVault: <- FlowToken.createEmptyVault(),
            expiry: expiry
        )
    }
}