// next and style
import Head from 'next/head';
import Image from 'next/image';

// react
import { useState, useEffect } from "react";

// Flow Blockchain
import "../flow/config";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

// Assets
import petals from "../../public/images/petals.gif";

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


export default function Createlottery() {
    const fungibleTokenOptions = [
        {
            value: "flow",
            label: "$FLOW"
        },
        {
            value: "fusd",
            label: "$FUSD"
        },
        {
            value: "usdc",
            label: "$USDC"
        }
    ]
    const [selectedOption, setSelectedOption] = useState(fungibleTokenOptions[0].value);
    

    const [form, setForm] = useState(
        {
            paymentType: "flow",
            maxTickets: 2,
            ticketPrice: 0.1,
            cutPercentage: 0.1,
            expiry: new Date().toISOString().split('T')[0]
        }
    );


    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reloading

        if(form.cutPercentage >= 1 || form.cutPercentage < 0 || form.ticketPrice <= 0 || form.maxTickets <= 1) {
            console.error("Not allowed!");
            return;
        }

        let expiry_timestamp = Date.parse(form.expiry) / 1000;

        if(expiry_timestamp < Date.parse(new Date()) / 1000) {
            console.error("Not allowed!");
            return;
        }

        console.log(expiry_timestamp);
        if(form.paymentType == "flow"){
            createLottery(form.ticketPrice, form.maxTickets, expiry_timestamp, form.cutPercentage )
        }else if(form.paymentType == "fusd"){
            createFUSDLottery(form.ticketPrice, form.maxTickets, expiry_timestamp, form.cutPercentage )
        }  
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
        console.log("expiryDate: ", expiry)
        console.log("managerCutPercentage: ", managerCutPercentage)

        const txId = await fcl.send([
        fcl.transaction`
            import FlowToken from 0xFlowToken
            import FungibleToken from 0xFungibleToken
            import LotteryX from 0xLotteryX

            /// Transaction used to create a lottery with just the creator as the cutReceiver

            transaction(collectionAddress: Address, ticketPrice: UFix64, totalTickets: UInt64, expiry: UInt64, managerCutPercentage: UFix64) {
    
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
            fcl.arg(addressManager, t.Address), // collectionAddress: Address
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
    
        const txId = await fcl.send([
    fcl.transaction`
        import FUSD from 0xFUSDToken
        import FungibleToken from 0xFungibleToken
        import LotteryX from 0xLotteryX
        
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
    `,
    fcl.args([
        fcl.arg(addressManager, t.Address), // collectionAddress: Address
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
     
            <nav id="header" className="fixed w-full z-10 top-0 bg-gradient-to-b from-white to-transparent">
                <div className="w-full w-full flex flex-wrap items-center justify-between mt-0 py-3">

                    <div className="pl-7">
                        <a className="text-gray-900 text-xl text-base no-underline hover:no-underline font-extrabold" href="/">
                            Flowwery 🌺
                        </a>
                    </div>
                </div>
             </nav>

            <div className="container grid grid-flow-row w-full md:max-w-3xl mx-auto pt-20 text-center">
                <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-16 text-xl md:text-2xl">🌹🌼🌷 I smell a new Flowwery... 🌻🌸🌺 </h1>
                <form>
                    <div className='bg-gray-100 border-gray-300 border pr-8 pl-8 pt-2 pb-2 rounded-xl relative z-0'>
                        <Image
                            fill
                            alt="petals"
                            src={petals}
                            style={{objectFit:"cover", zIndex: -1, filter: "blur(2px)"}}
                        />
                    <div className='bg-white shadow-md pt-8 pb-8 mb-8 mt-8 rounded-xl z-50'>
                    <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                        {/*token changed, see repo*/}
                        <label htmlFor="tokenSelect" className="block pb-4 text-base font-semibold text-black">TOKEN</label>
                        <select
                            value={selectedOption}
                            id="tokenSelect" 
                            className="block w-full p-2 mb-6 ml-4 text-sm text-purple-900 border border-purple-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-50 dark:border-purple-600 dark:placeholder-gray-400 dark:text-purlpe dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            onChange={e => {
                                setSelectedOption(e.target.value)
                                }}>
                            {fungibleTokenOptions.map(o => (
                                (o.value != "usdc") ? <option key={o.value} value={o.value}>{o.label}</option>
                                : <option key={o.value} value={o.value} disabled>{o.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="maxTickets" className="block text-base font-semibold tracking-wider uppercase">TICKETS 🎟</label>
                            <input 
                                type="number" 
                                step="any"
                                name="maxTickets"
                                aria-label='maxTickets' 
                                required
                                value={form.maxTickets}
                                onChange={handleChange}
                                placeholder="total tickets" 
                                className="w-full ml-4 mt-4 mb-6 appearance-none border border-purple-400 rounded-lg shadow-md p-3 text-purple-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="ticketPrice" className="text-base font-semibold tracking-wider uppercase">Ticket Price 💵</label>
                            <input 
                                type="number" 
                                step="any"
                                name="ticketPrice"
                                aria-label='ticketPrice' 
                                required
                                value={form.ticketPrice}
                                onChange={handleChange}
                                placeholder="price of the ticket" 
                                className="w-full ml-4 mt-4 mb-6 appearance-none border border-purple-400 rounded-lg shadow-md p-3 text-purple-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                        <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="cutPercentage" className="text-base font-semibold tracking-wider uppercase mr-7">Your cut percentage 💎</label>
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
                                className="w-full mt-4 ml-4 mb-6 appearance-none border border-purple-400 rounded-lg shadow-md p-3 text-purple-600 mr-2 focus:outline-none" />
                        </div>
                    <div>
                    <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                            <label htmlFor="expiry" className="text-base font-semibold tracking-wider uppercase mr-7">Expiry date ⌛️</label>
                            <input 
                                type="date" 
                                name="expiry" 
                                id="expiry" 
                                aria-label='expiryDate'
                                required
                                value={form.expiry}
                                onChange={handleChange}
                                className="w-full mt-4 ml-4 mb-2 appearance-none border border-purple-400 rounded-lg shadow-md p-3 text-purple-600 mr-2 focus:outline-none" />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                       <button onClick={handleSubmit} className="bg-transparent border border-gray-500 hover:border-purple-500 text-base text-gray-500 hover:text-purple-500 font-bold py-2 px-4 rounded-full">Create Lottery</button>
                    </div>
                    </div>
                    </div>
                </form>

                <br></br>
                <br></br>

                <div className="pt-16 container grid grid-flow-row w-full md:max-w-3xl mx-auto text-center">
                    <div className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-xl md:text-xl">
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
                <p> Switch to Advanced version </p>
            </div>

        </>
    );
}
