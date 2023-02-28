// next and style
import Head from 'next/head'

// react
import { useState, useEffect } from "react";

// Flow Blockchain
import "../flow/config";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

fcl.config()
 .put("0xLotteryX", "0xf8d6e0586b0a20c7")
 .put("0xFungibleToken", "0xee82856bf20e2aa6")
 .put("0xFlowToken", "0x0ae53cb6e3f42a79")
 .put("0xFUSDToken", "0xe223d8a629e49c68")


export default function Createlottery() {
    const fungibleTokenOptions = [
        {
            value: "flow",
            label: "$FLOW"
        },
        {
            value: "fusd",
            label: "$FUSD"
        }
    ]
    const [selectedOption, setSelectedOption] = useState(fungibleTokenOptions[0].value);
    

    const [form, setForm] = useState(
        {
            paymentType: "flowToken",
            maxTickets: 2,
            ticketPrice: 0.1,
            cutPercentage: 0.1,
            expiry: 1893452400 // 2030/01/01 00:00 
        }
    );


    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reloading
        if(form.paymentType == "flow"){
            createLottery(form.ticketPrice, form.maxTickets, form.expiry, form.cutPercentage )
        }else if(form.paymentType == "fusd"){
            createFusdLottery(form.ticketPrice, form.maxTickets, form.expiry, form.cutPercentage )
        }  

        alert("Lottery Created!")
    }

    function handleChange(event) {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value
        });
    }


    // TRANSACTIONS

    /// This transaction creates a Flow Lottery Type
    const createLottery = async (ticketPrice, totalTickets, expiry, managerCutPercentage) => {
        console.log("ticketPrice: ", ticketPrice)
        console.log("totalTickets: ", totalTickets)
        console.log("totalTickets: ", expiry)
        console.log("managerCutPercentage: ", managerCutPercentage)

        const txId = await fcl.send([
        fcl.transaction`
            import FlowToken from 0xFlowToken
            import FungibleToken from 0xFungibleToken
            import LotteryX from 0xLotteryX

            /// Transaction used to create a lottery with just the creator as the cutReceiver

            transaction(ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, managerCutPercentage: UFix64) {
                
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
            
                    self.lotterycollection = acct.borrow<&LotteryX.LotteryCollection>(from: LotteryX.LotteryCollectionStoragePath)
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
        `,
        fcl.args([
            fcl.arg(ticketPrice, t.UFix64), // ticketPrice: UFix64
            fcl.arg(totalTickets, t.UInt64), // totalTickets: UInt64
            fcl.arg(expiry, t.UInt64), // expiry UInt64
            fcl.arg(managerCutPercentage, t.UFix64) //managerCutPercentage: UFix64
        ]),
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
        ]).then(fcl.decode);

        console.log({txId})
  }

  /// This transaction creates a FUSD Lottery Type
    const createFUSDLottery = async (ticketPrice, totalTickets, expiry, managerCutPercentage) => {
    console.log("ticketPrice: ", ticketPrice)
    console.log("totalTickets: ", totalTickets)
    console.log("totalTickets: ", expiry)
    console.log("managerCutPercentage: ", managerCutPercentage)

    const txId = await fcl.send([
    fcl.transaction`
        import FUSD from 0xFUSDToken
        import FungibleToken from 0xFungibleToken
        import LotteryX from 0xLotteryX
        
        /// Transaction used to create a lottery with just the creator as the cutReceiver
        
        transaction(ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, managerCutPercentage: UFix64) {
            
            let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
            let lotterycollection: &LotteryX.LotteryCollection
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
        
                self.lotterycollection = acct.borrow<&LotteryX.LotteryCollection>(from: LotteryX.LotteryCollectionStoragePath)
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
    `,
    fcl.args([
        fcl.arg(ticketPrice, t.UFix64), // ticketPrice: UFix64
        fcl.arg(totalTickets, t.UInt64), // totalTickets: UInt64
        fcl.arg(expiry, t.UInt64), // expiry UInt64
        fcl.arg(managerCutPercentage, t.UFix64) //managerCutPercentage: UFix64
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999)
    ]).then(fcl.decode);

    console.log({txId})
}


    return (
        <>
            <Head>
                <title>Create Flowwery</title>
                <meta name="description" content="Create a lottery!" />
            </Head>

            <div class="container grid grid-flow-row w-full md:max-w-3xl mx-auto pt-20 text-center">
                <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-xl md:text-2xl">🌹🌼🌷 I smell a new Flowwery... 🌻🌸🌺 </h1>
                <form>
                    <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                        <label htmlFor="tokenSelect" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">TOKEN</label>
                        <select
                            value={selectedOption}
                            id="tokenSelect" 
                            class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={e => {
                                setSelectedOption(e.target.value)
                                }}>
                            {fungibleTokenOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="maxTickets" class="text-base font-semibold tracking-wider uppercase mr-7">TICKETS 🎟</label>
                            <input 
                                type="number" 
                                step="any"
                                name="maxTickets"
                                aria-label='maxTickets' 
                                required
                                value={form.maxTickets}
                                onChange={handleChange}
                                placeholder="total tickets" 
                                class="flex-1 mt-4 appearance-none border border-gray-400 rounded-lg shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="ticketPrice" class="text-base font-semibold tracking-wider uppercase mr-7">Ticket Price 💵</label>
                            <input 
                                type="number" 
                                step="any"
                                name="ticketPrice"
                                aria-label='ticketPrice' 
                                required
                                value={form.ticketPrice}
                                onChange={handleChange}
                                placeholder="price of the ticket" 
                                class="flex-1 mt-4 appearance-none border border-gray-400 rounded-lg shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                        <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="cutPercentage" class="text-base font-semibold tracking-wider uppercase mr-7">Your cut percentage 💎</label>
                            <input 
                                type="number" 
                                step="any"
                                name="cutPercentage"
                                id="cutPercentage"
                                aria-label='cutPercentage' 
                                required
                                value={form.cutPercentage}
                                onChange={handleChange}
                                placeholder="percentage of the prize" 
                                class="flex-1 mt-4 appearance-none border border-gray-400 rounded-lg shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                        </div>
                    <div>
                    <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="expiryDate" class="text-base font-semibold tracking-wider uppercase mr-7">Expiry date ⌛️</label>
                            <input 
                                type="number" 
                                name="expiryDate" 
                                id="expiryDate" 
                                aria-label='expiryDate'
                                required
                                value={form.expiry}
                                onChange={handleChange}
                                placeholder="percentage of the prize" 
                                class="flex-1 mt-4 appearance-none border border-gray-400 rounded-lg shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                       <button onClick={handleSubmit} class="bg-transparent border border-gray-500 hover:border-green-500 text-base text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-lg">Create Lottery</button>
                    </div>
                </form>

                <br></br>
                <br></br>

                <div class="container grid grid-flow-row w-full md:max-w-3xl mx-auto text-center">
                    <div class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-xl md:text-xl">
                        <h1> ℹ️ What am I doing here?</h1>
                    </div>
                    <p> Here you are creating your own lottery. </p>
                    <p> 1. Choose the currency, </p>
                    <p> Right now you can choose between FLOW and FUSD but we can add more fungible tokens with a blink of an eye. Oh, some <a href="https://blog.flovatar.com/all-about-dust-613ce49cb51a">$DUST</a> is about to hit mine eyes!</p>
                    <p> 2. Set the number of tickets </p>
                    <p> 3. Set the price for each ticket </p>
                    <p> 4. Pick the endtime of the lottery </p>
                    <p> Then a transaction will create a public accessible lottery ... your flowwery 🌸</p>
                </div>
                <br></br>
                <a> Switch to Advanced version </a>
            </div>

        </>
    );
}