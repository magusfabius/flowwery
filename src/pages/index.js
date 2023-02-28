// next and style
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// react
import { useState, useEffect } from "react";

// components
import List from '@/pages/components/lotteryList/List';

// Flow Blockchain
import "../flow/config";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

/* 
// EMULATOR CONFIG
fcl.config()
 .put("0xLotteryX", "0xf8d6e0586b0a20c7")
 .put("0xFungibleToken", "0xee82856bf20e2aa6")
 .put("0xFlowToken", "0x0ae53cb6e3f42a79")
 .put("0xFUSDToken", "0xe223d8a629e49c68")

 const addressManager = "0xf8d6e0586b0a20c7"
*/ 

//TESTNET CONFIG
fcl.config()
 .put("0xLotteryX", "0x5f303d043c0b938c")
 .put("0xFungibleToken", "0x9a0766d93b6608b7")
 .put("0xFlowToken", "0x7e60df042a9c0868")
 .put("0xFUSDToken", "0xe223d8a629e49c68")

 const addressManager = "0x5f303d043c0b938c"



export default function Home() {
  const [user, setUser] = useState({loggedIn: null})
  const [lotteryIDs, setLotteryIDs] = useState([])
  const [lotteries, setLotteries] = useState([])
  const [currentLottery, setLottery] = useState({})

  useEffect(() => { 
    fcl.currentUser.subscribe(setUser);

    getLotteryIDs().then( res => {
      console.log("res: ", res)
      
      res.forEach(
        lotteryID => {
          getLotteryDetails(lotteryID).then(
            details => {
              console.log("Lottery details: ", details)
              setLotteries([
                ...lotteries,
                details
              ])
            } 
          )
        }
      )
    })
  }, [])

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate} className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Logout</button> <span></span>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div>
         <button onClick={fcl.logIn} className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Login</button> <span></span>
         <button onClick={fcl.signUp} className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Sign Up</button>
      </div>
    )
  }

  // SCRIPT
  /// Script to get all the lotteries ID in the address
  const getLotteryIDs = async () => {
    const response = await fcl.query({
      cadence:`
      import LotteryX from 0xLotteryX

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
      `,
      args: (arg, t) => [
        arg(addressManager, t.Address) // account: Address
      ],
  })

    console.log(response);
    return response
  }

  /// Script to get the lottery details by ID
  const getLotteryDetails = async (lotteryID) => {
    const response = await fcl.query({
      cadence:`
      import LotteryX from 0xLotteryX

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
      `,
      args: (arg, t) => [
        arg(addressManager, t.Address), // account: Address
        arg(lotteryID, t.UInt64) // lotteryID: UInt64
      ],
  })

    console.log(response);
    setLottery(response);
    return response
  }

  // TRANSACTIONS
  /// Transaction to purchase a ticket of the given lotteryID
  const purchaseTicket = async (lotteryID) => {
    const txId = await fcl.send([
      fcl.transaction`
      import FlowToken from 0xFlowToken
      import FungibleToken from 0xFungibleToken
      import LotteryX from 0xLotteryX

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
      `,
      fcl.args([
        fcl.arg(lotteryID, t.UInt64), // lotteryID: UInt64
        fcl.arg(addressManager, t.Address) // llotteryManagerAddress: UInt64
      ]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log({txId})
    alert("You bought a ticket! That's the transaction ID: ", txId)
  }


  return (
    <div>
      <Head>
        <title>Flowwery</title>
        <meta name="description" content="A flowery decentralized lottery on the Flow Blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <nav id="header" className="fixed w-full z-10 top-0">

        <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

            <div className="pl-4">
                <a className="text-gray-900 text-base no-underline hover:no-underline font-extrabold" href="#">
                    Flowwery 🌺
                </a>
            </div>

            <div className="block lg:hidden pr-4">
                <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>

            <div className="w-full flex-grow lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20" id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    <li className="mr-3">
                        <div className="inline-block py-2 px-4 text-gray-900 font-bold no-underline" href="#">
                          <Link href={"/createLottery"}>Create Lottery</Link>
                        </div>
                    </li>     
                    <li className="mr-3">
                    {user.loggedIn
                            ? <AuthedState />
                            : <UnauthenticatedState />
                        }
                    </li>
                </ul>
            </div>
        </div>
        </nav>


        <div className="container w-full md:max-w-3xl mx-auto pt-20 text-center">
        <div className="font-sans pb-10">
            <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">🍒 Live Lotteries</h1>
            <p> Buy a ticket of a lottery or create a new one! </p>
        </div>
        </div>

       
        {lotteries && lotteries.length > 0 ? (
          <div className="container w-full md:max-w-3xl mx-auto pt-10 text-center">
            <div>
              <List items={lotteries} buyTicketFunction={purchaseTicket} />
            </div>
          </div>
        ) : (
          <div className="container w-full md:max-w-3xl mx-auto pt-20 text-center">
            <div className="font-sans pb-10">
                <p> It's so empty here ... have you ever wondered to create your own lottery? 🤔  </p>
            </div>
          </div>
        )
        }
       

        <div className="container w-full md:max-w-3xl mx-auto pt-20 ">

        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">

            <blockquote className="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">
                Everyone has the freedom to create lotteries, we will take just a small percentage to improve the platform. If you are a developer check the smart contracts here
            </blockquote>

        </div>

        <hr className="border-b-2 border-gray-400 mb-8 mx-4" />



        <div className="container px-4">
            <div className="font-sans bg-gradient-to-b from-purple-200 to-gray-100 rounded-lg shadow-xl p-4 text-center">
                <h2 className="font-bold break-normal text-xl md:text-3xl">Stay tuned for the next lottery 🔥</h2>
                <h3 className="font-bold break-normal text-gray-600 text-sm md:text-base">Get the latest updates on new Lotteries and Prizes</h3>
                <div className="w-full text-center pt-4">
                    <form action="#">
                        <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <input type="email" placeholder="youremail@example.com" className="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                            <button type="submit" className="flex-1 mt-4 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        </div>


        <footer className="bg-white border-t border-gray-400 shadow">
          <div className="container max-w-4xl mx-auto flex py-8">

            <div className="w-full mx-auto flex flex-wrap">
                <div className="flex w-full md:w-1/2 ">
                    <div className="px-8">
                        <h3 className="font-bold text-gray-900">About</h3>
                        <p className="py-4 text-gray-600 text-sm">
                          🌹💐🌸🌺🌷🌻🌼🥀 <br></br>
                          Flowwery is a decentralized lottery platform on the Flow Blockchain made with grit by Fabio and Riccardo
                        </p>
                    </div>
                </div>

                <div className="flex w-full md:w-1/2">
                    <div className="px-8">
                        <h3 className="font-bold text-gray-900">Social</h3>
                        <ul className="list-reset items-center text-sm pt-3">
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

          </div>
        </footer>
      </main>

    </div>
  )
}