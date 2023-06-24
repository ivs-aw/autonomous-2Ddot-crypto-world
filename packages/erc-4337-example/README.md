![](https://i.imgur.com/Ym2VV8z.png)

# Getting started

A collection of example scripts for working with ERC-4337. For an overview on the EIP and account abstraction, see our docs [here](https://docs.stackup.sh/).

The implementation for all commands are located in the [scripts directory](./scripts/). All scripts are built with the following libraries:

- Sample contracts: [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction)
- JS SDK: [userop.js](https://github.com/stackup-wallet/userop.js)

> **🚀 Looking for access to hosted infrastructure to build your Smart Accounts? Check out [stackup.sh](https://www.stackup.sh/)!**

## Table of contents

- [Setup](#setup)
  - [Init config](#init-config)
    - [`rpcUrl`](#rpcurl)
    - [`signingKey`](#signingkey)
    - [`entryPoint`](#entrypoint)
    - [`simpleAccountFactory`](#simpleaccountfactory)
    - [`paymaster`](#paymaster)
- [Commands](#commands)
  - [Simple Account](#simple-account)
    - [Get account address](#get-account-address)
    - [Transfer ETH](#transfer-eth)
    - [Transfer ERC-20 token](#transfer-erc-20-token)
    - [Approve ERC-20 token](#approve-erc-20-token)
    - [Batch transfer ERC-20 token](#batch-transfer-erc-20-token)
- [License](#license)
- [Contact](#contact)

# Setup

Clone this repo into your local environment:

```bash
git clone git@github.com:stackup-wallet/erc-4337-examples.git
```

Install dependencies:

```bash
yarn install
```

## Init config

These config values will be used for all documented [commands](#commands).

```bash
yarn run init
```

### `rpcUrl`

**Default value is set to `https://api.stackup.sh/v1/node/API_KEY`.**

This is a standard RPC URL for an ethereum node that also supports all [ERC-4337 bundler methods](https://github.com/eth-infinitism/account-abstraction/blob/develop/eip/EIPS/eip-4337.md#rpc-methods-eth-namespace). By default it uses the stackup endpoint. You will need to fill in your API key from the [Stackup dashboard](https://app.stackup.sh/sign-in). Alternatively you can also use any RPC url that is also enabled as a bundler.

### `signingKey`

**Default value is randomly generated with ethers.js.**

All UserOperations have a `signature` field which smart contract accounts will use to validate transactions. This key will be used to sign all UserOperations and set as the owner for the smart contract account.

### `entryPoint`

**Default value is set to `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`.**

This is address of the singleton EntryPoint contract. It is the same on all networks.

### `simpleAccountFactory`

**Default value is set to `0x9406Cc6185a346906296840746125a0E44976454`.**

This is the factory address for deploying [SimpleAccount.sol](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol). It is the same on all networks and allows us to generate deterministic addresses.

### `paymaster`

This is an object with fields related to a paymaster entity.

#### `rpcUrl`

**Default value is set to `https://api.stackup.sh/v1/paymaster/API_KEY`**

This field specifies the URL to request paymaster approval when using the `--withPaymaster` flag. The examples assume that any paymaster service follows the interface specified [here](https://docs.stackup.sh/docs/api/paymaster/rpc-methods).

#### `context`

**Default value is an empty object.**

This arbitrary object is passed as the last parameter when calling `pm_sponsorUserOperation`. It's content will depend on the the specific paymaster you're interacting with.

# Commands

Once you have an environment setup, these commands can be used for running the example scripts.

The location of each script mimics the command structure. For example `yarn run simpleAccount address` will be located in `scripts/simpleAccount/address.ts`

## Optional flags

All commands below can be augmented with the following flags.

### Dry run

Appending `--dryRun` will go through the whole process of making a UserOperation, but will not call `eth_sendUserOperation`. This is useful for debugging purposes to see what the final UserOperation looks like.

### With Paymaster

Appending `--withPaymaster` will call `pm_sponsorUserOperation` on `paymaster.rpcUrl` with the UserOperation, EntryPoint, and `paymaster.context`. If successful, gas for this transaction will be paid for by the paymaster.

Example:

```bash
yarn run simpleAccount:erc20Transfer --withPaymaster ...
```

In this example, the contract account does not need to hold any ETH for gas fees.

---

## Simple Account

Scripts for managing accounts based on [SimpleAccount.sol](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol).

For CLI details:

```bash
yarn run simpleAccount -h
```

### Get account address

Smart contract account addresses can be deterministically generated. Use this command to get your account address based on the `signingKey` set in your `config.json`.

The account will be automatically deployed on the first transaction.

```bash
yarn run simpleAccount address
```

### Transfer ETH

Before executing a transfer, make sure to deposit some ETH to the address generated by the `simpleAccount address` command.

```bash
yarn run simpleAccount transfer --to <address> --amount <eth>
```

### Transfer ERC-20 token

Make sure the address generated by `simpleAccount:address` has enough specified tokens to execute the transfer.

If not using a paymaster, make sure to also have enough ETH to pay gas fees.

```bash
yarn run simpleAccount erc20Transfer --token <address> --to <address> --amount <decimal>
```

### Approve ERC-20 token

If not using a paymaster, make sure to also have enough ETH to pay gas fees.

```bash
yarn run simpleAccount erc20Approve --token <address> --spender <address> --amount <decimal>
```

### Batch transfer ERC-20 token

This command allows you to do multiple atomic contract interactions in a single transaction. The example shows us how with an ERC-20 token.

```bash
# recipient addresses is comma separated.
# e.g. 0x123..abc,0x456...def
yarn run simpleAccount batchErc20Transfer --token <address> --to <addresses> --amount <decimal>
```

---

# License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

# Contact

Feel free to direct any technical related questions to the `dev-hub` channel in the [Stackup Discord](https://discord.gg/VTjJGvMNyW).


## コマンドの実行履歴

- 初期化(config.jsonファイルを生成する。)

  まず`erc-4337-example`フォルダ配下に`.env`ファイルを生成し、StackUpのページで生成されたAPI_KEYを貼り付ける

  ```bash
  pnpm erc-4337-example run init
  ```

- コントラクトウォレットアドレスを生成するコマンド

  ```bash
  pnpm erc-4337-example run simpleAccount address
  ```

  実行結果

  ```Bash
  SimpleAccount address: 0x28856478A82A36f71A008eEB2FeE04d8e60dD0d6  
  ```

  [【PolygonScan】0x28856478A82A36f71A008eEB2FeE04d8e60dD0d6](https://mumbai.polygonscan.com/address/0x28856478A82A36f71A008eEB2FeE04d8e60dD0d6)


- コントラクトウォレットからMaticを送金するコマンド

  ```bash
  pnpm erc-4337-example run simpleAccount transfer --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 0.01
  ```

  実行結果

  ```bash
  Signed UserOperation: {
    sender: '0x28856478A82A36f71A008eEB2FeE04d8e60dD0d6',
    nonce: '0x0',
    initCode: '0x9406cc6185a346906296840746125a0e449764545fbfb9cf0000000000000000000000000616f3b39ee3ab0c20422b8ada90b30fde5c2d2d0000000000000000000000000000000000000000000000000000000000000000',
    callData: '0xb61d27f600000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad072000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
    callGasLimit: '0x814c',
    verificationGasLimit: '0x583f4',
    preVerificationGas: '0xafa8',
    maxFeePerGas: '0x6507a5e0',
    maxPriorityFeePerGas: '0x6507a5c0',
    paymasterAndData: '0x',
    signature: '0x469262d17fbe1198aa66b201c491acf5730b3bdcc1c49a09222cfc11cef61fe3436243d9af7a105bbce867d4a04ecd031ef63ca4a3b1fdf25484620de1ec031d1c'
  }
  UserOpHash: 0x6674ab257c043cd622c6228c92d7a5730beaf6a07840416f7e790ca45c47b480
  Waiting for transaction...
  Transaction hash: 0x1b64093ad7319f312bbc1364146989cdfd55547b3dc45c829449500547ff08f8
  ```

  ブロックチェーンエクスプローラーでのトランザクション記録

  [0x1b64093ad7319f312bbc1364146989cdfd55547b3dc45c829449500547ff08f8](https://mumbai.polygonscan.com/tx/0x1b64093ad7319f312bbc1364146989cdfd55547b3dc45c829449500547ff08f8)