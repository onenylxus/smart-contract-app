# smart-contract-app
Smart contract application in Angular

## Prerequisites
- Proficiency in Angular and Node package manager
- Proficiency in using Ethereum wallet with Rinkeby test network ([**https://www.youtube.com/watch?v=3vWw9Xt48bs**](https://www.youtube.com/watch?v=3vWw9Xt48bs) gives an informative tutorial)

## Background
This repository demonstates how to validate whether a user with Ethereum wallet holds a blind-box NFT hosted by a given source. Here MetaMask is used becuase of its popularity.

In practice, the validation will be divided into the following steps:

1. **The application will request user to establish a connection between Ethereum wallet and an internal account registered in the application.** This is because all Ethereum transactions are publicly visible and that means everyone knows the wallet address of the user. We can identify the ownership of the wallet address only by MetaMask authentication.
2. **The application will loop contract addresses of all hosted blind-box NFTs and obtain transaction history of the NFTs.** The main concern is that the NFT may overcame multiple transactions involving multiple wallet addresses, for example by reselling and auctioning, and we want to know who is currently holding the NFT. The user holds an specified NFT if the latest transaction shows that his wallet address acts as the receiver of the contract.
3. **The application performs consequential actions based on the ownership of the NFTs**. For example, if a blind-box NFT holds a discount coupon, that when we have successfully validated the user, we can allow the user to apply the discount coupon.

We considered that the application should be accessible to both PC and mobile users, and the application should be kept as simple as possible to provide convenience to beginners of Ethereum wallet service.

## Features
This application allows the user to:
- Connect with MetaMask wallet and check recent transactions
- Enquire contract transactions with contract address

## Usage
1. For PC users, install MetaMask extension on Google Chrome. For mobile users, install MetaMask applicaion on respective app store.
2. Navigate to the website [**https://smart-contract-app.vercel.app**](https://smart-contract-app.vercel.app) using Google Chrome, or internal browser in MetaMask application for mobile.
3. Follow the instructions given in the website. If the message "Please install MetaMask" is shown, that means there is some problem on completing previous steps.

## Development
This repository uses `@metamask/detect-provider` to detect Ethereum support, specifically MetaMask. There are also other packages that support Ethereum services, but this package caters both PC and mobile platforms with ease by calling one function only, so this package is recommended.

```bash
/* Installation */
npm install --save @metamask/detect-provider
// or
yarn add @metamask/detect-provider
```

This repository uses `yarn` instead of other package managers such as `npm`, so make sure `yarn` is installed by `npm install --global yarn`.

```bash
/* Setup repository */
// Clone repo
git clone https://github.com/onenylxus/smart-contract-app.git

// Install packages
yarn

// Generate files
yarn run make

// Start Angular app
yarn run start                                                
```

This repository also uses EtherScan API to access transaction history. EtherScan API documentation [**https://docs.etherscan.io/api-endpoints/accounts**](https://docs.etherscan.io/api-endpoints/accounts) provides support on API links used in this repository.

This application consists of `walletService` and `contractService`:
- `walletService` allows users to connect and disconnect (in some sense, please refer to `wallet.service.ts`) their MetaMask wallets to the application, and view their transaction history.
- `contractService` allows NFT providers (with contract addresses of their distributed NFTs) to view the transaction history of the contracts, in order to determine whether a user owns the NFT currently.
