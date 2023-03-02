import LotteryX from "../contracts/LotteryX.cdc"

// This script returns an array of all the lotteries ID in a lotteryCollection hosted by an account

pub fun main(account: Address): [UInt64] {
    let lotteryCollectionRef = getAccount(account)
        .getCapability<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(
            LotteryX.LotteryCollectionPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
    return lotteryCollectionRef.getLotteryIDs()
}