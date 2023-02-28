import LotteryX from "../contracts/LotteryX.cdc"

// This script returns the details for a listing within a storefront
// The account parameter is the address that holds the lotteryCollection
pub fun main(account: Address, lotteryID: UInt64): LotteryX.LotteryDetails {
    let lotteryCollectionRef = getAccount(account)
        .getCapability<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(
            LotteryX.LotteryCollectionPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public lottery collection from address")

    let lottery = lotteryCollectionRef.borrowLottery(lotteryID: lotteryID)
        ?? panic("No item with that ID")
    
    return lottery.getDetails()
}