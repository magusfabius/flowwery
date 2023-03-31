
// next and style
import Image from 'next/image'

// Assets
import charity from "../../public/images/charity_icon.png";
import flowusdc from "../../public/images/flowusdc_icon.png";
import nft from "../../public/images/nft_icon.png";
import ticket from "../../public/images/ticket_icon.png";

/* drop-shadow-md rounded-lg mb-12 bg-slate-50 */

export function Presentation() {
    return (
        <div className='mx-auto pt-20 w-7/12'>
        <div className='grid grid-cols-5 pr-8 pb-16'>
            <div className='col'>
                <Image
                    alt='ticket image'
                    src={ticket}
                    width={250}
                    height={250}
                    priority
                    quality={100}
                />
            </div>
            <div className='col-span-4 grid items-center pt-8 pb-8'>
                <p className='text-xl text-purple-500'>Lottery-as-a-service</p>
                <p className='pl-8 font-light text-purple-400'>Anyone can create a lottery</p>
                <p className='pl-8 pr-8 font-light text-purple-400'>The creator of a lottery can decide the total number of tickets, the price per ticket, the type and amount of the prize, and the expiration date.</p>
            </div>
        </div>

        <div className='grid grid-cols-5 pl-8 pb-16'>
            <div className='col-span-4 grid items-center justify-center pt-8 pb-8'>
                <p className='text-xl text-purple-500'>NFT integration</p>
                <p className='pl-8 font-light text-purple-400'>You can use NFT</p>
                <p className='pl-8 pr-8 font-light text-purple-400'>NFTs can be chosen as a prize and also as a "receipt of purchased ticket."<br/>A lottery creator can upload an image or NFT as a prize or as a receipt.</p>
            </div>
            <Image
                alt='nft image'
                src={nft}
                width={250}
                height={250}
                priority
                quality={100}
            />
        </div>

        <div className='grid grid-cols-5 pr-8 pb-16'>
            <Image
                alt='flowusdc image'
                src={flowusdc}
                width={250}
                height={250}
                priority
                quality={100}
            />
            <div className='col-span-4 grid items-center pt-8 pb-8'>
                <p className='text-xl text-purple-500'>Multi-cryptocurrency payments and Walletless</p>
                <p className='pl-8 font-light text-purple-400'>Different types of cryptocurrency can be used</p>
                <p className='pl-8 pr-8 font-light text-purple-400'>For now you can buy tickets and receive rewards in USDC and FLOW, we are working on making all the different cryptocurrencies in the Flow ecosystem accessible.</p>
                <p className='pl-8 pr-8 font-light text-purple-400'>You can purchase tickets even without owning a wallet, using the Walletless provided by Niftory</p>
            </div>
        </div>

        <div className='grid grid-cols-5 pl-8 pb-16'>
            <div className='col-span-4 grid items-center justify-center pt-8 pb-8'>
                <p className='text-xl text-purple-500'>Charity and Special lotteries</p>
                <p className='pl-8 font-light text-purple-400'>Community lotteries</p>
                <p className='pl-8 pr-8 font-light text-purple-400'>Charity raffles can be created that anyone can participate in.<br />Flowwery will provide super lotteries where you can win great prizes!</p>
            </div>
            <Image
                alt='charity image'
                src={charity}
                width={250}
                height={250}
                priority
                quality={100}
            />
        </div>
    </div>
    )
}