import FlowToken from "../contracts/utility/FlowToken.cdc"
import FungibleToken from "../contracts/utility/FungibleToken.cdc"
import LotteryX from "../contracts/LotteryX.cdc"

/// Transaction used to facilitate the creation of the lottery under the signer's owned lotteryCollection resource.

transaction(collectionAddress: Address, ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, cutReceiverList: [Address], cutPercentageList: [UFix64], managerCutPercentage: UFix64) {
    
    let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let lotterycollection: &LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}
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

       self.lotterycollection = getAccount(collectionAddress).getCapability<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(LotteryX.LotteryCollectionPublicPath)!
                .borrow()
                ?? panic("Missing or mis-typed LotteryX LotteryCollection")
        }       

        for index, cutReceiver in cutReceiverList {    
            let accountCapability = getAccount(cutReceiver).getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            self.saleCuts.append(LotteryX.SaleCut(
                receiver: accountCapability,
                amount: ticketPrice * UFix64(totalTickets) * cutPercentageList[index]
            ))
        }
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