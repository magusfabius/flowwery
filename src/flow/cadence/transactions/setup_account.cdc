import LotteryX from "../contracts/LotteryX.cdc"

// This transaction installs the LotteryCollection ressource in an account.
transaction {
    prepare(acct: AuthAccount) {

        // If the account doesn't already have a LotteryCollection
        if acct.borrow<&LotteryX.LotteryCollection>(from: LotteryX.LotteryCollectionStoragePath) == nil {

            // Create a new empty LotteryCollection
            let lotterycollection <- LotteryX.createLotteryCollection()
            
            // save it to the account
            acct.save(<- lotterycollection, to: LotteryX.LotteryCollectionStoragePath)

            // create a public capability for the LotteryCollection
            acct.link<&LotteryX.LotteryCollection{LotteryX.LotteryCollectionPublic}>(LotteryX.LotteryCollectionPublicPath, target: LotteryX.LotteryCollectionStoragePath)
        }
    }
}