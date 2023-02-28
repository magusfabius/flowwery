import { config } from "@onflow/fcl";


// CONFIG FOR TESTNET
/*
config({
  "app.detail.title": "Flowwery",
  "app.detail.icon": "https://i.imgur.com/B3bty7y.png",
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
})
*/


// CONFIG FOR EMULATOR
config({
  "app.detail.title": "Flowwery",
  "app.detail.icon": "https://i.imgur.com/B3bty7y.png",
  "accessNode.api": "http://localhost:8888",
  "discovery.wallet": "http://localhost:8701/fcl/authn" // Dev Wallet
})

