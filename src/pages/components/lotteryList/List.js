import Link from "next/link";
import Image from "next/image";
import { FaPlusSquare } from "react-icons/fa";


const List = ({ items, buyTicketFunction }) => {
    console.log("items in list: ", items)
    console.log("items in list: ", Array.from(items))

    return (
                <div className="grid grid-flow-col">
                    { 
                        items && Array.from(items).map(lottery => {
                            return (
                                <div key={`${lottery.lotteryID.toString()}`} className="p-4 h-full rounded-lg items-center justify-center mb-2 border-4 shadow-lg bg-gradient-to-b from-purple-200 to-gray-100">
                                    <div>
                                        <Image
                                            src={"/images/flowToken.png"}
                                            alt="flowToken"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className="text-base font-semibold tracking-wider uppercase col font-sans break-normal text-gray-900 pt-6 pb-2  md:text-1xl">
                                        {`🌸 ${lottery.maxTickets * lottery.ticketPrice} $FLOW`}
                                    </div>
                                    <div className="text-base  tracking-wider uppercase col">
                                        {`lottery ID: ${lottery.lotteryID}`}
                                    </div>
                                    <div className="text-base  tracking-wider uppercase col">
                                        {`total tickets: ${lottery.maxTickets} 🎟`}
                                    </div>
                                    <div className="text-base  tracking-wider uppercase col">
                                        {`entry price: ${Math.round(lottery.ticketPrice * 1) / 1} 🏷`}
                                    </div>
                                    <div className="text-base tracking-wider uppercase col">
                                        {`currency: $ ${lottery.salePaymentVaultType.typeID.split('.')[2]}`}
                                    </div>
                                    <br></br>
                                    <div className="col">
                                        {`⏳ ${new Date(lottery.expiry * 1000).toDateString()}`}
                                    </div>
                                    <br></br>
                                    <div className="col iconList">
                                    <button onClick={() => buyTicketFunction(lottery.lotteryID)} class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Buy Ticket</button> <span></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
    )
}

export default List;