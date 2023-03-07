# Flowwery 𑁍
### Create your own flowery decentralized lottery on Flow Blockchain ###

Try the [live demo](https://flowwery.vercel.app/)

## Description

This is a project submitted to the 2023 [Flow Hackaton](https://hackathon.flow.com/) by BlockBidders.

Flowwery 🌺 aims to revolutionize the lottery industry by offering a decentralized lottery platform on the Flow Blockchain for everyone. 

This platform allows any user to create their own lottery by setting the number of tickets, the price, the type of currency, the expiration date and the royalties over the prize. 
One of the mind-blowing thing is that you can create a lottery with just two tickets or with millions of them, you can even set your own cut 🤯 
Flowwery ensures transparency and fairness by leveraging the decentralized nature of the Flow Blockchain, ensuring that all lottery results are tamper-proof and publicly verifiable.

One of the key advantages of Flowwery is its flexibility in terms of the tokens that can be used to create lotteries. **The platform allows users to set up lotteries using any type of fungible token**, including the native Flow token and FUSD.

Another significant benefit of Flowwery is its accessibility. Any user with a Flow Blockchain wallet can easily participate in any lottery or create it, without the need for any additional software or technical knowledge. The platform ensures that lottery results are fair and transparent, providing a level playing field for all participants.


## Features

1. Decentralized lottery platform on the Flow Blockchain
2. User-friendly interface for creating and participating in lotteries
3. Flexibility to create lotteries using any type of fungible token, including the native Flow token (default)
4. Option to add multiple addresses to receive a cut of the prize, useful for **charity lotteries or other beneficent causes**
5. Transparent and tamper-proof lottery results thanks to the decentralized nature of the Flow Blockchain
6. Small percentage fees charged on every lottery created and played on the platform, generating revenue for the project and for the maxi-lottery 
7. Accessibility to any user with a Flow Blockchain wallet, no additional software or technical knowledge required. The Walletless experience is also possible


## 💰 Business Plan

The business plan for Flowwery focuses on building a sustainable and scalable decentralized lottery platform on the Flow Blockchain. The platform aims to generate revenue through a small percentage of fees charged on every lottery created and played on the platform. 
The plan also includes marketing strategies to attract new users and partnerships with other projects on the Flow Blockchain to expand the platform's reach. 
(i.e. [Flowverse 🌊](https://www.socknft.com/), [.find](https://find.xyz/), [Flovatar](https://flovatar.com), [flowty.io](https://docs.flowty.io), [Niftory](https://docs.niftory.com/home/), [Flowns](https://docs.flowns.org/))

The team behind Flowwery will focus on continuously improving the platform's user experience, security, and transparency to build a loyal user base and ensure the long-term success of the project. Ultimately, the business plan aims to position Flowwery as the leading decentralized lottery platform on the Flow Blockchain and beyond 🚀.

We are also planning to create a Lottery as a Service type of business plan. We will be able to provide the creation for lotteries 


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



## 🌱 Flow Blockchain

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

### Walletless onboarding

We are integrating the Walletless login usign the [Niftory](https://www.niftory.com/) API.


### 👨‍💻 Under development ...

- use Niftory API for the Walletless onboarding 
- receive an NFT when you purchase the ticket (check contracts/lottery_experimental.cdc)
- create a Non Fungible Ticket collection by uploading an image while creating the lottery. The image will be the ticket image and we will use the Niftory API to create the NFT collection
- add an NFT in the prize pool resource
- see on frontend the tickets I've already purchased and total wins (new User page)
- charity addresses picker: when creating the lottery the owner will be able to pick NGO and entities that will receive a percentage of the lottery. There will be shown a logo-list and the values will be the verified NGO's blockchain addresses
- improve the style


### 🙏 Inspired by

- [PseudoRandomNumberGenerator by justjoolz](https://github.com/justjoolz/PRNG/) - the way we select the winner of the lottery
- [StoreFrontV2](https://github.com/onflow/nft-storefront) - official implementation by the Flow team
- [Auction by OxAlchemist](https://github.com/0xAlchemist/flow-auction/blob/master/contracts/Auction.cdc) - Auction Smart Contract
- [EmeraldCity and Jacob Tucker](https://www.ecdao.org/) - just a legend
- [Niftory Sample App](https://github.com/Niftory/niftory-samples/tree/main/walletless-onboarding) - for the Walletless onboarding