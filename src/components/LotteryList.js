import Link from "next/link";
import Image from "next/image";
import { FaPlusSquare } from "react-icons/fa";

const currencies = {
    "FlowToken": {
        img: "/images/flowToken.png",
        short: "$flow"
    },
    "FUSD": {
        img: "/images/fusd.png",
        short: "$fusd"
    },
    "USDC": {
        img: "/images/usdc.png",
        short: "$usdc"
    }
}


const List = ({ items, buyTicketFunction }) => {
    console.log("items in list: ", items)

    return (
        <div className="grid grid-flow-row gap-y-4">
            {
                items && Array.from(items).map(lottery => {
                    return (
                        <>
                            <div key={`${lottery.lotteryID.toString()}`} className="pb-4 pt-4 pl-8 pr-4 grid grid-flow-col w-full items-center rounded-lg  mb-2 border-4 shadow-lg bg-gradient-to-b from-purple-200 to-gray-100">
                                <div className="grid grid-flow-col w-full items-center justify-start">
                                    <div className="col w-8 pr-10 font-bold text-violet-700">
                                        {lottery.lotteryID}
                                    </div>
                                    <div className="grid grid-flow-row items-center justify-center pr-10">
                                        <Image
                                            src={currencies[lottery.salePaymentVaultType.typeID.split('.')[2]].img}
                                            alt={currencies[lottery.salePaymentVaultType.typeID.split('.')[2]].short}
                                            width={30}
                                            height={30}
                                            className="col"
                                        />
                                        <p className="col font-semibold uppercase font-sans text-xs">{currencies[lottery.salePaymentVaultType.typeID.split('.')[2]].short}</p>
                                    </div>
                                    <div className="grid grid-flow-row pr-10 items-center justify-center w-25">
                                        <p className="font-semibold font-sans text-xs w-25">Prize</p>
                                        <div className="font-semibold uppercase font-sans text-white-900 w-25">
                                            {`🌸 ${((lottery.maxTickets * lottery.ticketPrice).toString().length > 5) ?
                                                    (lottery.maxTickets * lottery.ticketPrice).toString().substring(0, 5) :
                                                    (lottery.maxTickets * lottery.ticketPrice).toString()
                                                }`}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-flow-col w-full items-center justify-center">
                                    <div className="grid grid-flow-row pr-10 items-center pl-10 justify-center">
                                        <p className="font-semibold font-sans text-xs w-25">Tickets</p>
                                        <div className="text-base  tracking-wider uppercase">
                                            {lottery.maxTickets} 🎟
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-flow-col w-full items-center justify-end gap-x-20">
                                    <div className="col">
                                        <span className="font-semibold font-sans text-xs">Ends in: </span>
                                        {`${Math.ceil(Math.abs(new Date - new Date(lottery.expiry * 1000)) / (1000 * 60 * 60 * 24))}`}
                                        <span className="font-semibold font-sans text-xs">days ⌛</span>
                                    </div>
                                    <div className="col">
                                        <p className="font-semibold font-sans text-xs w-25">Price</p>
                                        <div className="text-base  tracking-wider uppercase pl-30">
                                            {parseFloat(lottery.ticketPrice).toFixed(2)}
                                        </div>
                                        <p className="font-semibold font-sans text-xs w-25">{currencies[lottery.salePaymentVaultType.typeID.split('.')[2]].short}</p>
                                    </div>
                                    <div className="iconList">
                                        <button onClick={() => buyTicketFunction(lottery.lotteryID)} className="bg-transparent border border-gray-500 hover:border-violet-800 text-xs text-gray-500 hover:text-violet-800 font-bold py-2 px-4 rounded-full">Buy Ticket</button> <span></span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default List;