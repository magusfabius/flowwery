# Flowwery 𑁍
### Create your own flowery decentralized lottery on Flow Blockchain ###

Try the [live demo](https://flowwery.vercel.app/)

## Description

This is a project submitted to the 2023 [Flow Hackaton](https://hackathon.flow.com/) by BlockBidders.

Flowwery 🌺 aims to revolutionize the lottery industry by offering a decentralized lottery platform on the Flow Blockchain for everyone. 

This platform allows any user to create their own lottery by setting the number of tickets, the price, the type of currency, the expiration date and the royalties over the prize. 
One of the mind-blowing thing is that you can create a lottery with just two tickets or with millions of them, you can even set your own cut 🤯 
Flowwery ensures transparency and fairness by leveraging the decentralized nature of the Flow Blockchain, ensuring that all lottery results are tamper-proof and publicly verifiable.

One of the key advantages of Flowwery is its flexibility in terms of the tokens that can be used to create lotteries. The platform allows users to set up lotteries using any type of fungible token, including the native Flow token and FUSD.

Another significant benefit of Flowwery is its accessibility. Any user with a Flow Blockchain wallet can easily participate in any lottery or create it, without the need for any additional software or technical knowledge. The platform ensures that lottery results are fair and transparent, providing a level playing field for all participants.


## Features

1. Decentralized lottery platform on the Flow Blockchain
2. User-friendly interface for creating and participating in lotteries
3. Flexibility to create lotteries using any type of fungible token, including the native Flow token (default)
4. Option to add multiple addresses to receive a cut of the prize, useful for charity lotteries or other beneficent causes
5. Transparent and tamper-proof lottery results thanks to the decentralized nature of the Flow Blockchain
6. Small percentage fees charged on every lottery created and played on the platform, generating revenue for the project
7. Accessibility to any user with a Flow Blockchain wallet, no additional software or technical knowledge required


## Business Plan

The business plan for Flowwery focuses on building a sustainable and scalable decentralized lottery platform on the Flow Blockchain. The platform aims to generate revenue through a small percentage of fees charged on every lottery created and played on the platform. The plan also includes marketing strategies to attract new users and partnerships with other projects on the Flow Blockchain to expand the platform's reach. 
(i.e. [Flowverse 🌊](https://www.socknft.com/), [.find](https://find.xyz/), [Flovatar](https://flovatar.com), [flowty.io](https://docs.flowty.io), [Niftory](https://docs.niftory.com/home/), [Flowns](https://docs.flowns.org/))

The team behind Flowwery will focus on continuously improving the platform's user experience, security, and transparency to build a loyal user base and ensure the long-term success of the project. Ultimately, the business plan aims to position Flowwery as the leading decentralized lottery platform on the Flow Blockchain and beyond.


## Technology

### Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Flow Blockchain

### Smart Contract
The smart contract is called LotteryX and it's already on Testnet.
We will surf the Mainnet soon ...

| Network         | Contract Address     |
| --------------- | -------------------- |
| Testnet         | `0x5f303d043c0b938c` |
| Mainnet         |         -            |


### Setup
Install Flow CLI. Follow the [instructions](https://developers.flow.com/tools/flow-cli/install)

Remember to install the Cadence VS Code Extension for a better development experience. Follow the step [here](https://developers.flow.com/tools/vscode-extension/index)


### 🔥 Emulators Commands
Open a terminal and run:
```
flow emulator start
```

Open a new terminal and run:
```
flow dev-wallet
```

Open a new terminal and run:
```
flow project deploy --network=emulator

flow transactions send src/flow/cadence/transactions/setup_account.cdc

flow transactions send src/flow/cadence/transactions/create_simple_lottery.cdc 1.0 2 1708996932 0.01

flow transactions send src/flow/cadence/transactions/purchase_ticket.cdc 0 f8d6e0586b0a20c7      
```

Now you've a working local enviroment where you can create your lotteries.
Let's surf on the testnet with the command:
```
flow accounts update-contract LotteryX ./src/flow/cadence/contracts/LotteryX.cdc --network=testnet --signer=testnet-account
```


### 👨‍💻 Under development ...

- receive an NFT when you purchase the ticket (check contracts/lottery_experimental.cdc)
- add an NFT in the prize pool resource
- see on frontend the tickets I've already purchased and total wins


### 🙏 Inspired by

- [PseudoRandomNumberGenerator Smart Contract by justjoolz](https://github.com/justjoolz/PRNG/) - the way we select the winner of the lottery
- [StoreFrontV2](https://github.com/onflow/nft-storefront) - official implementation by the Flow team
- [Auction by OxAlchemist](https://github.com/0xAlchemist/flow-auction/blob/master/contracts/Auction.cdc) - Auction Smart Contract
- [EmeraldCity and Jacob Tucker](https://www.ecdao.org/)