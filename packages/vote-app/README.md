# Decentralized Voting Application

This is a demo application to implement voting in solidity smart contract using ReactJS. 

[Youtube Tutorial](https://youtu.be/eCn6mHTpuM0)

## Installation

After you cloned the repository, you want to install the packages using

```shell
npm install
```

You first need to compile the contract and upload it to the blockchain network. Run the following commands to compile and upload the contract.

```shell
npx hardhat compile
npx hardhat run --network volta scripts/deploy.js
```

Once the contract is uploaded to the blockchain, copy the contract address and copy it in the .env file. You can also use another blockchain by writing the blockchain's endpoint in hardhat-config.

Once you have pasted your private key and contract address in the .env file, simply run command

```shell
npm start
```

## mumbaiへのデプロイ記録

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

実行結果

```bash
Downloading compiler 0.8.11
Compiled 1 Solidity file successfully
Contract address: 0x6659c4f3454Ab72FfFF9d902E645e4E161624063
```

## Shibuyaへのデプロイ記録

```bash
npx hardhat run scripts/deploy.js --network shibuya
```

```bash
Compiled 1 Solidity file successfully
Contract address: 0xbfDe6e57dD7f54D496B896f6c7d551eE40d3BEB0
```