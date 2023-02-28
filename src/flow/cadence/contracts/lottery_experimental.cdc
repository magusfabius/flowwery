import FungibleToken from "utility/FungibleToken.cdc"
import NonFungibleToken from "utility/NonFungibleToken.cdc"
import NFTicket from "utility/NonFungibleTicket.cdc"
import PRNG from "utility/PseudoRandomNumberGenerator.cdc"
/// PRNG testnet address 0x2bf5575475144be3


//TODO: Storefront = LotteryCollection
//TODO: Listing = Lottery
//TODO: Ticket = NFT


pub contract LotteryX {

    /// A collection of lotteries (LotteryCollection resource) has been initialized
    pub event LotteryCollectionInitialized(collectionResourceID: UInt64)

    /// A collection of lotteries (LotteryCollection resource) has been initialized
    pub event LotteryCollectionDestroyed(collectionResourceID: UInt64)

    /// Lottery Initialized
    pub event LotteryInitialized(lotteryResourceID: UInt64)

    /// Lottery Destroyed
    pub event LotteryDestroyed(lotteryResourceID: UInt64)

    /// ListingAvailable
    /// A listing has been created and added to a Storefront resource.
    pub event LotteryAvailable(
        lotteryID: UInt64,
        salePaymentVaultType: Type,
        maxTickets: UInt64,
        ticketPrice: UFix64,
        expiry: UInt64
    )

    /// The winner number has been generated
    pub event WinnerNumber(randomInt: UInt64)

    /// The winner has received the prize
    pub event PrizeReceived(prizeAmount: UFix64)

    /// ListingCompleted
    /// The listing has been resolved. It has either been purchased, removed or destroyed.
    pub event LotteryCompleted(
        lotteryID: UInt64,
        terminated: Bool,
        ticketPrice: UFix64,
        maxTickets: UInt64,
        currentTicketID: UInt64,
        expiry: UInt64
    )

    pub event TicketSold(
        currentTicketID: UInt64
    )

    /// UnpaidReceiver
    /// A entitled receiver has not been paid during the sale of the NFT.
    ///
    pub event UnpaidReceiver(receiver: Address, entitledSaleCut: UFix64)

    /// UnpaidWinner
    /// A entitled winner has not been paid at the end of the lottery.
    ///
    pub event UnpaidWinner(winnerNumber: UInt64, prizeAmount: UFix64)

    /// The main and only LotteryCollection created when the smart contract is initialized
    pub var MainLotteryCollection: @LotteryCollection

    /// The location in storage that a LotteryCollection resource should be located.
    pub let LotteryCollectionStoragePath: StoragePath

    /// The public location for a LotteryCollection link.
    pub let LotteryCollectionPublicPath: PublicPath


    pub resource PrizePool {
        // Resources
        pub(set) var NFT: @NonFungibleToken.NFT?
        pub let fungibleVault: @FungibleToken.Vault

        //TODO: remember to create an empty vault and pass it to the parameters
        //pub fun createEmptyVault(): @FungibleToken.Vault {
        //return <-create Vault(balance: 0.0)}
        init(
            NFT: @NonFungibleToken.NFT?,
            fungibleVault: @FungibleToken.Vault
        ) {
            self.NFT <- NFT
            self.fungibleVault <- fungibleVault
        }

        // depositBidTokens deposits the bidder's tokens into the AuctionItem's Vault
        pub fun depositTokens(vault: @FungibleToken.Vault) {
            self.fungibleVault.deposit(from: <-vault)
        }

        // withdrawNFT removes the NFT from the AuctionItem and returns it to the caller
        pub fun withdrawNFT(): @NonFungibleToken.NFT {
            let NFT <- self.NFT <- nil
            return <- NFT!
        }

        //TODO: give fungible tokens back to the buyers, the amount sent will be the ticketprice
        // updateRecipientVaultCap updates the bidder's Vault capability, providing the
        // us with a way to return their FungibleTokens
        //access(contract) fun updateRecipientVaultCap(cap: Capability<&{FungibleToken.Receiver}>) {
        //    let meta = self.meta
        //    meta.recipientVaultCap = cap
        //
        //    self.meta = meta
        //}
        
        // sendNFT sends the NFT to the Collection belonging to the provided Capability
        access(contract) fun sendNFT(_ capability: Capability<&{NonFungibleToken.CollectionPublic}>) {
            // borrow a reference to the owner's NFT receiver
            if let collectionRef = capability.borrow() {
                let NFT <- self.withdrawNFT()
                // deposit the token into the owner's collection
                collectionRef.deposit(token: <-NFT)
            } else {
                log("sendNFT(): unable to borrow collection ref")
                log(capability)
            }
        }

        // sendBidTokens sends the bid tokens to the Vault Receiver belonging to the provided Capability
        access(contract) fun sendTokens(_ capability: Capability<&{FungibleToken.Receiver}>) {
            // borrow a reference to the owner's NFT receiver
            if let vaultRef = capability.borrow() {
                let bidVaultRef = &self.fungibleVault as &FungibleToken.Vault
                vaultRef.deposit(from: <-bidVaultRef.withdraw(amount: bidVaultRef.balance))
            } else {
                log("sendTokens(): couldn't get vault ref")
                log(capability)
            }
        }

        destroy() {
            // TODO: send the NFT back to the owner
            // send the NFT back to auction owner
            // self.sendNFT(self.meta.ownerCollectionCap)
            
            //TODO: give fungible tokens back to the buyers, the amount sent will be the ticketprice
            // if there's a bidder...
            //if let vaultCap = self.meta.recipientVaultCap {
            //    // ...send the bid tokens back to the bidder
            //    self.sendBidTokens(vaultCap)
            //}

            destroy self.NFT
            destroy self.fungibleVault
        }
    }

    /// Ticket Resource 
    // Declare a resource that only includes one function.
    pub resource NonFungibleTicket {

        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // String mapping to hold metadata
        pub var metadata: {String: String}

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }

        // A transaction can call this function to get the "Hello, World!"
        // message from the resource.
        pub fun hello(): String {
            return "Hello, World!"
        }
    }


    /// SaleCut
    /// A struct representing a recipient that must be sent a certain amount
    /// of the payment when a token is sold.
    ///
    pub struct SaleCut {
        /// The receiver for the payment.
        /// Note that we do not store an address to find the Vault that this represents,
        /// as the link or resource that we fetch in this way may be manipulated,
        /// so to find the address that a cut goes to you must get this struct and then
        /// call receiver.borrow()!.owner.address on it.
        /// This can be done efficiently in a script.
        pub let receiver: Capability<&{FungibleToken.Receiver}>

        /// The amount of the payment FungibleToken that will be paid to the receiver.
        pub let amount: UFix64

        /// initializer
        ///
        init(receiver: Capability<&{FungibleToken.Receiver}>, amount: UFix64) {
            self.receiver = receiver
            self.amount = amount
        }
    }


    /// ListingDetails
    /// A struct containing a Listing's data.
    ///
    pub struct LotteryDetails {
        /// The Storefront that the Listing is stored in.
        /// Note that this resource cannot be moved to a different Storefront,
        /// so this is OK. If we ever make it so that it *can* be moved,
        /// this should be revisited.
        pub var lotteryID: UInt64
        /// Whether this listing has been purchased or not.
        pub var terminated: Bool
        /// The Type of the FungibleToken that payments must be made in.
        pub let salePaymentVaultType: Type
        /// The amount that must be paid in the specified FungibleToken.
        pub let ticketPrice: UFix64
        /// The maximum number of tickets
        pub let maxTickets: UInt64
        /// A dictionary to manage the NonFungibleTickets
        pub let tickets: {UInt64 : Address}
        /// This specifies the division of payment between recipients.
        pub let saleCuts: [SaleCut]
        /// Expiry of listing
        pub let expiry: UInt64

        /// Irreversibly set this lottery as terminated.
        ///
        access(contract) fun setToTerminated() {
            self.terminated = true
        }

        /// Initializer
        ///
        init (
            lotteryID: UInt64,
            salePaymentVaultType: Type,
            maxTickets: UInt64,
            ticketPrice: UFix64,
            saleCuts: [SaleCut],
            expiry: UInt64,
        ) {

            pre {
                // Validate the number of tickets
                maxTickets > 1 : "There must be at least 2 tickets"
                // Validate the expiry
                expiry > UInt64(getCurrentBlock().timestamp) : "Expiry should be in the future"
                // Validate the length of the sale cut
                saleCuts.length > 0: "Listing must have at least one payment cut recipient"
            }
            self.lotteryID = lotteryID
            self.terminated = false
            self.salePaymentVaultType = salePaymentVaultType
            self.maxTickets = maxTickets
            self.tickets = {}
            self.saleCuts = saleCuts
            self.expiry = expiry

            //TODO: check the amount of cuts will not be higher than the price
            //TODO: maybe setting the cuts as percentage is better
            /*
            // Calculate the total price from the cuts
            var ticketPrice = 0.0
            // Perform initial check on capabilities, and calculate sale price from cut amounts.
            for cut in self.saleCuts {
                // Make sure we can borrow the receiver.
                // We will check this again when the token is sold.
                cut.receiver.borrow()
                    ?? panic("Cannot borrow receiver")
                // Add the cut amount to the total price
                ticketPrice = ticketPrice + cut.amount
            }
            assert(ticketPrice > 0.0, message: "Tickets must have non-zero price")
            */

            // Store the calculated sale price
            self.ticketPrice = ticketPrice
        }
    }


    /// LotteryPublic
    /// An interface providing a useful public interface to a Lottery.
    ///
    pub resource interface LotteryPublic {
        /// purchase
        /// Purchase the listing, buying the token.
        /// This pays the beneficiaries and returns the token to the buyer.
        ///
        pub fun purchase(
            payment: @FungibleToken.Vault, 
            buyerCapability: Capability<&{FungibleToken.Receiver}>,
        )

        /// getDetails
        /// Fetches the details of the listing.
        pub fun getDetails(): LotteryDetails

        /// terminate the lottery if it is expired
        pub fun terminateExpiredLottery()
    }


    /// Listing
    /// A resource that allows an NFT to be sold for an amount of a given FungibleToken,
    /// and for the proceeds of that sale to be split between several recipients.
    /// 
    pub resource Lottery: LotteryPublic {
        /// The simple (non-Capability, non-complex) details of the sale
        access(self) let details: LotteryDetails

        /// The vault of the fungible tokens of the lottery
        access(contract) let fungibleVault: @FungibleToken.Vault

        /// Ticket ID incremented every time there is a purchase
        access(contract) var currentTicketID: UInt64

        /// When someone buy a ticket, its capability is listed here
        access(contract) let vaultMap: {UInt64 : Capability<&{FungibleToken.Receiver}>}

        // Add a function to update a value in the dictionary
        // updateDictionaryValue updates the bidder's Vault capability, providing
        // us with a way to return their FungibleTokens
        access(contract) fun updateDictionaryValue(key: UInt64, accountCapability: Capability<&{FungibleToken.Receiver}>) {
            self.vaultMap[key] = accountCapability
        }

        access(contract) fun incrementTicketID(){
            self.currentTicketID = self.currentTicketID + 1
        }

        /// getDetails
        /// Get the details of lottery.
        pub fun getDetails(): LotteryDetails {
            return self.details
        }


        /// purchase
        /// Purchase the ticket.
        /// TODO: return an NFT
        /// This also check if all the tickets have been sold and call the terminate function
        pub fun purchase(
            payment: @FungibleToken.Vault, 
            buyerCapability: Capability<&{FungibleToken.Receiver}>,
        ) {

            pre {
                self.details.terminated == false: "lottery has already been terminated"
                self.currentTicketID + 1 >= self.details.maxTickets: "all tickets has been sold"
                payment.isInstance(self.details.salePaymentVaultType): "payment vault is not requested fungible token"
                payment.balance == self.details.ticketPrice: "payment vault does not contain requested price"
                self.details.expiry > UInt64(getCurrentBlock().timestamp): "Lottery is expired"
                self.owner != nil : "Resource doesn't have the assigned owner"
                self.fungibleVault != nil : "The Lottery Vault does not exists" 
                buyerCapability != nil : "Buyer capability does not exists"
            }

            // deposit the payment in the lottery vault
            self.fungibleVault.deposit(from: <-payment)

            // add the payer into the dictionary
            self.updateDictionaryValue(key: self.currentTicketID, accountCapability: buyerCapability)

            // increment the currentTicketID variable
            self.currentTicketID = self.currentTicketID + 1

            // Make sure the listing cannot be purchased again.
            if(self.currentTicketID >= self.details.maxTickets - 1){
                self.details.setToTerminated() 
                //TODO: call the terminating function
            }

            emit TicketSold(
                currentTicketID: self.currentTicketID,
            )

            //return <-nft
        }

        /// terminate lottery when last ticket is sold
        access(contract) fun terminateLottery(){
            pre{
               self.details.terminated == true: "lottery is not terminated" 
               self.fungibleVault == nil : "The Lottery Vault does not exists" 
            }

            // generate a random int in order to choose a winner 
            let myPRNG <- PRNG.create(seed: UInt256(getCurrentBlock().timestamp)) // creates a random number generator resource that provides functions for generating a stream of random numbers
            let randomInt = UInt64(myPRNG.range(0, UInt256(self.currentTicketID)))
            destroy myPRNG

            emit WinnerNumber(randomInt: randomInt)

            // Rather than aborting the transaction if any receiver is absent when we try to pay it,
            // we send the cut to the first valid receiver.
            // The first receiver should therefore either be the seller, or an agreed recipient for
            // any unpaid cuts.
            var residualReceiver: &{FungibleToken.Receiver}? = nil

            // Pay the commission 
            // Pay each beneficiary their amount of the payment.

            for cut in self.details.saleCuts {
                if let receiver = cut.receiver.borrow() {
                   let paymentCut <- self.fungibleVault.withdraw(amount: cut.amount)
                    receiver.deposit(from: <-paymentCut)
                    if (residualReceiver == nil) {
                        residualReceiver = receiver
                    }
                } else {
                    emit UnpaidReceiver(receiver: cut.receiver.address, entitledSaleCut: cut.amount)
                }
            }

            assert(residualReceiver != nil, message: "No valid payment receivers")

            // At this point, the ramining tokens in the vault are the prize for the winner
            if let winner = self.vaultMap[randomInt]?.borrow() {
                emit PrizeReceived(prizeAmount: self.fungibleVault.balance)
                winner?.deposit(from: <- self.fungibleVault.withdraw(amount: self.fungibleVault.balance))
            } else {
                emit UnpaidWinner(winnerNumber: randomInt, prizeAmount: self.fungibleVault.balance)
            }

        }

        /// everyone could end the lottery if it is expired
        access(all) fun terminateExpiredLottery(){
            pre{
                self.details.expiry < UInt64(getCurrentBlock().timestamp): "Lottery is not expired"
            }

            self.details.setToTerminated()

            self.terminateLottery()
        }
        

        /// destructor
        ///
        destroy () {
            // If the listing has not been purchased, we regard it as completed here.
            // Otherwise we regard it as completed in purchase().
            // This is because we destroy the listing in Storefront.removeListing()
            // or Storefront.cleanup() .
            // If we change this destructor, revisit those functions.
            if !self.details.terminated {
                emit LotteryCompleted(
                    lotteryID: self.details.lotteryID,
                    terminated: self.details.terminated,
                    ticketPrice: self.details.ticketPrice,
                    maxTickets: self.details.maxTickets,
                    currentTicketID: self.currentTicketID,
                    expiry: self.details.expiry
                )
            }

            destroy self.fungibleVault
        }

        /// initializer
        ///
        init (
            lotteryID: UInt64,
            salePaymentVaultType: Type,
            maxTickets: UInt64,
            ticketPrice: UFix64,
            saleCuts: [SaleCut],
            expiry: UInt64,
            fungibleVault: @FungibleToken.Vault
        ) {
            // Store the sale information
            self.details = LotteryDetails(
                lotteryID: lotteryID,
                salePaymentVaultType: salePaymentVaultType,
                maxTickets: maxTickets,
                ticketPrice: ticketPrice,
                saleCuts: saleCuts,
                expiry: expiry,
            )

            self.fungibleVault <- fungibleVault
            self.currentTicketID = 0
            self.vaultMap = {}
        }
    }

    /// StorefrontManager
    /// An interface for adding and removing Listings within a Storefront,
    /// intended for use by the Storefront's owner
    ///
    pub resource interface LotteryCollectionManager {
        /// createListing
        /// Allows the Storefront owner to create and insert Listings.
        ///
        pub fun createLottery(
            salePaymentVaultType: Type,
            maxTickets: UInt64,
            ticketPrice: UFix64,
            saleCuts: [SaleCut],
            expiry: UInt64,
            fungibleVault: @FungibleToken.Vault
        ): UInt64

        /// removeListing
        /// Allows the Storefront owner to remove any sale listing, accepted or not.
        ///
        pub fun removeTerminatedLottery(lotteryResourceID: UInt64)
    }

    /// StorefrontPublic
    /// An interface to allow listing and borrowing Listings, and purchasing items via Listings
    /// in a Storefront.
    ///
    pub resource interface LotteryCollectionPublic {
        pub fun getLotteryIDs(): [UInt64]
        pub fun borrowLottery(lotteryResourceID: UInt64): &Lottery{LotteryPublic}?
   }


    /// Storefront
    /// A resource that allows its owner to manage a list of Listings, and anyone to interact with them
    /// in order to query their details and purchase the NFTs that they represent.
    ///
    pub resource LotteryCollection : LotteryCollectionManager, LotteryCollectionPublic {
        /// The dictionary of Listing uuids to Listing resources.
        access(contract) var lotteries: @{UInt64: Lottery}

        /// The ID of the next lottery that will be created
        access(contract) var currentLotteryID: UInt64

        /// The function to increment the current lotteryID
        access(self) fun incrementLotteryID(){
            self.currentLotteryID = self.currentLotteryID + 1
        }

        /// insert
        /// Create and publish a Listing for an NFT.
        ///
        pub fun createLottery(
            salePaymentVaultType: Type,
            maxTickets: UInt64,
            ticketPrice: UFix64,
            saleCuts: [SaleCut],
            expiry: UInt64,
            fungibleVault: @FungibleToken.Vault
         ): UInt64 {
            
            let lottery <- create Lottery(
                lotteryID: self.currentLotteryID,
                salePaymentVaultType: salePaymentVaultType,
                maxTickets: maxTickets,
                ticketPrice: ticketPrice,
                saleCuts: saleCuts,
                expiry: expiry,
                fungibleVault: <- fungibleVault
            )

            
        
            let lotteryResourceID = lottery.uuid
            let ticketPrice = lottery.getDetails().ticketPrice
            // Add the new listing to the dictionary.
            let oldLottery <- self.lotteries[lotteryResourceID] <- lottery
            // Note that oldListing will always be nil, but we have to handle it.

            destroy oldLottery


            // emit the event, a new lottery is available
            emit LotteryAvailable(
                lotteryID: self.currentLotteryID,
                salePaymentVaultType: salePaymentVaultType,
                maxTickets: maxTickets,
                ticketPrice: ticketPrice,
                expiry: expiry
            )

            // increment the id for the next lottery
            self.incrementLotteryID()

            return lotteryResourceID
        }
        
        /// removeListing
        /// Remove a Listing that has not yet been purchased from the collection and destroy it.
        /// It can only be executed by the StorefrontManager resource owner.
        ///
        pub fun removeTerminatedLottery(lotteryResourceID: UInt64) {
            pre {
                self.lotteries[lotteryResourceID] != nil : "There is no lottery with this key"
                self.borrowLottery(lotteryResourceID: lotteryResourceID)!.getDetails().terminated == true: "lottery not terminated yet"
            }
            let lottery <- self.lotteries.remove(key: lotteryResourceID)
                ?? panic("missing Lottery")
    
            // This will emit a LotteryCompleted event.
            destroy lottery
        }

        /// getLotteryIDs
        /// Returns an array of the Listing resource IDs that are in the collection
        ///
        pub fun getLotteryIDs(): [UInt64] {
            return self.lotteries.keys
        }


        /// borrowSaleItem
        /// Returns a read-only view of the SaleItem for the given listingID if it is contained by this collection.
        ///
        pub fun borrowLottery(lotteryResourceID: UInt64): &Lottery{LotteryPublic}? {
             if self.lotteries[lotteryResourceID] != nil {
                return &self.lotteries[lotteryResourceID] as &Lottery{LotteryPublic}?
            } else {
                return nil
            }
        }

        /// destructor
        ///
        destroy () {
            destroy self.lotteries

            // Let event consumers know that this storefront will no longer exist
            emit LotteryCollectionDestroyed(collectionResourceID: self.uuid)
        }

        /// constructor
        ///
        init () {
            self.lotteries <- {}
            self.currentLotteryID = 0

            // Let event consumers know that this storefront exists
            emit LotteryCollectionInitialized(collectionResourceID: self.uuid)
        }
    }

    /// createLotteryCollection
    /// Make creating a LotteryCollection possible only when contract is created
    /// Change to access(contract) if you want the owner to create multiple collections
    access(self) fun createLotteryCollection(): @LotteryCollection {
        return <-create LotteryCollection()
    }


    init () {
        self.LotteryCollectionStoragePath = /storage/LotteryX
        self.LotteryCollectionPublicPath = /public/LotteryX

        self.MainLotteryCollection <- self.createLotteryCollection()

    }
}