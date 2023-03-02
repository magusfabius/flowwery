import FUSD from "../contracts/utility/FUSD.cdc"
import FungibleToken from "../contracts/utility/FungibleToken.cdc"
import LotteryX from "../contracts/LotteryX.cdc"

/// Transaction used to create a lottery with just the creator as the cutReceiver

transaction(collectionAddress: Address,ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, managerCutPercentage: UFix64) {
    
    let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let lotterycollection: &LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}
    var saleCuts: [LotteryX.SaleCut]

    prepare(acct: AuthAccount) {
        assert(ticketPrice > 0.0, message: "Ticket price could not be zero")
        assert(totalTickets > 1, message: "There must be at least 2 tickets")

        self.saleCuts = []

        // Receiver for the sale cut.
        self.fusdReceiver = acct.getCapability<&{FungibleToken.Receiver}>(/public/fusdTokenReceiver)!
        assert(self.fusdReceiver.borrow() != nil, message: "Missing or mis-typed FusdToken receiver")
        
       
        // Append the cut for the creator of the lottery.
        self.saleCuts.append(LotteryX.SaleCut(
            receiver: self.fusdReceiver,
            amount: ticketPrice * UFix64(totalTickets) * managerCutPercentage
        ))

         self.lotterycollection = getAccount(collectionAddress).getCapability<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(LotteryX.LotteryCollectionPublicPath)!
                        .borrow()
                        ?? panic("Missing or mis-typed LotteryX LotteryCollection")
                }            

    execute {
        // Create lottery
        self.lotterycollection.createLottery(
            salePaymentVaultType: Type<@FUSDToken.Vault>(),
            maxTickets: totalTickets,
            ticketPrice: ticketPrice,
            saleCuts: self.saleCuts,
            fungibleVault: <- FUSDToken.createEmptyVault(),
            expiry: expiry
        )
    }
}