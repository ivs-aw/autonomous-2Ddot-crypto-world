# ChainLink-Sample

ChainLink 調査用のリポジトリです。

※ 現在、 Chainlink Functions の機能は、AllowList で実行できるアカウントが制限されているので申請する必要があります。

### ※注意事項※

現在、 Chainlink Functions の機能は、ベータ版で実行時間は、9000ms 以下、データも 256KB 以内にする必要があります。

手動であれば、Automation の設定はできる模様。

## Automate your Functions のチュートリアル

[https://docs.chain.link/chainlink-functions/tutorials/automate-functions/](https://docs.chain.link/chainlink-functions/tutorials/automate-functions/)

## チュートリアルの日本語訳文

このチュートリアルでは、Chainlink Automation を使用して Chainlink Functions を自動化する方法を説明します。自動化は、毎日天気データを取得したり、ブロックごとに資産価格を取得するなど、同じ機能を定期的に起動させたい場合に不可欠です。

この例のステップに従う前に、API マルチコールチュートリアルをお読みください。このチュートリアルでは、同じ例を使用しますが、重要な相違点があります：

FunctionsConsumer.sol の代わりに AutomatedFunctionsConsumer.sol をデプロイすることになります。AutomatedFunctionsConsumer.sol は、Chainlink Automation と互換性のある Chainlink Functions Consumer の契約です。デプロイして契約をセットアップすると、Chainlink Automation はタイムスケジュールに従って機能をトリガーします。

```
注意事項

Chainlink FunctionsはまだBETA版です。
テスト目的にのみ割り当てられ、機密データや実際の価値を保護しないクレデンシャルをご利用ください。
リクエストにおけるシークレットの使用は実験的な機能であり、期待通りに動作しない可能性があり、変更される可能性があります。
この機能の使用はお客様の責任において行われ、予期せぬエラーや、新しいバージョンのリリースに伴いシークレットが明らかになる可能性、またはその他の問題が発生する可能性があります。
```

環境をテストし、すべてが正しく設定されていることを確認するために、リクエストをシミュレートしてください。npx hardhat functions-simulate コマンドを実行します。シミュレーションはローカルの Hardhat ネットワーク（開発用に設計されたローカルの Ethereum ネットワークノード）上で実行され、デフォルトの Functions-request-config.js ファイルに定義されているリクエストを実行します。スターターキットにはトランザクションをシミュレートする機能が含まれているため、DON に送信する前にコードを素早くテストすることができます。

Chainlink Functions のサブスクリプションを作成し、あなたの契約を承認された消費者契約として追加します。契約書のアドレスを-contract フラグで含めると、1 回のトランザクションでこれを行うことができます。この例では、ムンバイのテストネットでは 1LINK で十分すぎるほどです。f faucets.chain.link からいつでもより多くの LINK を取得し、後でそれをサブスクリプションに追加することができます。詳しくは、サブスクリプション管理ページをご覧ください。

## Automate your Functions の日本語訳

このチュートリアルでは、Chainlink Automation を使用して Chainlink Functions を自動化する方法を説明します。自動化は、毎日天気データを取得したり、ブロックごとに資産価格を取得するなど、同じ機能を定期的に起動させたい場合に不可欠です。

この例のステップに従う前に、API マルチコールチュートリアルをお読みください。このチュートリアルでは、同じ例を使用しますが、重要な相違点があります：

FunctionsConsumer.sol の代わりに AutomatedFunctionsConsumer.sol をデプロイすることになります。AutomatedFunctionsConsumer.sol は、Chainlink Automation と互換性のある Chainlink Functions Consumer の契約です。デプロイして契約をセットアップすると、Chainlink Automation はタイムスケジュールに従って機能をトリガーします。

チュートリアル
メモ
環境変数を設定する

このチュートリアルでは、いくつかのユニークな.env.enc の設定手順があります。始める前に」セクションで、必要な変数で .env.enc ファイルを構成していることを確認してください。

このチュートリアルは、タイムスケジュールに従って、複数のデータソースから BTC/USD 価格の中央値を取得するように設定されています。コード例の詳細な説明については、「説明」セクションをお読みください。

configjs を開きます。args の値が["1", "bitcoin", "btc-bitcoin"]であることに注目してください。これらの引数は、CoinMarketCap、CoinGecko、Coinpaprika での BTC ID です。他の資産価格をフェッチするために args を適応させることができます。詳細については、CoinMarketCap、CoinGecko、および CoinPaprika の API ドキュメントを参照してください。リクエストの詳細については、リクエストコンフィグセクションをお読みください。
source.js を開いて、JavaScript のソースコードを解析します。リクエストのソースファイルの詳細については、ソースコード解説をお読みください。
シュミレーション
Chainlink Functions Hardhat Starter Kit には、ローカルマシンで Functions コードをテストするためのシミュレータが含まれています。functions-simulate コマンドは、ローカルのランタイム環境でコードを実行し、エンドツーエンドのフルフィルメントをシミュレートします。これは、Decentralized Oracle Network に Functions を提出する前に、問題を修正するのに役立ちます。

functions-simulate タスクを実行して、ローカルでソースコードを実行し、config.js と source.js が正しく記述されていることを確認します：

上記の例の出力を読むと、BTC/USD の中央値が 28347.05 USD であることがわかります。Solidity は小数をサポートしていないため、コールバックでバイトエンコードされた値 0x00000000000000002b4111 を返す前に、値が整数 2834705 のように見えるように小数点を移動させます。より詳細な説明は、ソースコードの説明をお読みください。

オートメーションコンシューマーコントラクトのデプロイ
シミュレータを実行し、Function が問題なく動作することを確認したら、functions-deploy-auto-client コマンドを実行します。このコマンドは以下のことを行います：

AutomatedFunctionsConsumer.sol コントラクトをデプロイします。コントラクトのデプロイ時に、実行間隔を設定することができます。
デプロイされたコントラクトをサブスクリプションに追加します。
デプロイされたコントラクトに格納されているリクエストをシミュレートします。
ソースコード、暗号化された gist URL、および引数を含むリクエストをコントラクトストレージに保存します。注：保存されたリクエストは、指定された時間間隔に従って DON に送信されます。

チェーンリンク・オートメーションの設定
デプロイしたコンシューマ契約は、カスタムロジックのアップキープと一緒に使用するように設計されています。アップキープの登録」ガイドの説明に従って、Chainlink Automation App を使用してデプロイされたコントラクトを登録します。以下のアップキープ設定を使用します：

トリガーを指定します： トリガー：カスタムロジック
対象のコントラクトアドレス： 対象契約アドレス：デプロイした Chainlink Functions の消費者契約のアドレス
ガスの上限：700000
開始残高（LINK）： 1
このチュートリアルの例では、他の設定はデフォルト値のままでよいでしょう。

Chainlink Automation は、指定した時間間隔に従ってリクエスト送信をトリガーします。

メモ
残高を監視する

監視する必要のある残高が 2 つあります：

サブスクリプションの残高です： 残高は、Chainlink ファンクションが実行されるたびに請求されます。残高が不足している場合、お客様の契約はリクエストを送信することができません。Chainlink ファンクションを自動化すると、定期的にトリガーされるため、定期的にサブスクリプションアカウントを監視して資金を供給してください。サブスクリプションの残高を確認する方法については、「サブスクリプションの詳細を取得する」を参照してください。
アップキープ残高： この残高は、Chainlink Automation App で確認することができます。アップキープ残高は、Chainlink Automation Network に支払い、提供された時間間隔に従ってリクエストを送信します。アップキープ残高が少なくなると、Chainlink Automation はリクエストをトリガーしません。
結果の確認
Chainlink Automation App にアクセスし、Polygon Mumbai に接続します。あなたのアップキープが「My upkeeps」に表示されます：

クリーニング
ガイドを終了したら

チェーンリンク自動化アプリからアップキープをキャンセルする。注意：アップキープをキャンセルした後、資金を引き出すことを忘れないでください。アップキープをキャンセルしてから出金できるようになるまで、アップキープ 1 回で 50 ブロックの遅延があります。
gist を削除するには、contract パラメータを指定して functions-clear-gists タスクを実行します。

## 手動で Automain 対応のコントラクトにする方法

まず以下 2 つの変数とメソッドを定義する必要がある。

```js

uint256 lastTimeStamp;
// 実行間隔
uint256 interval;

function checkUpkeep(
    bytes calldata /* checkData */
)
    external
    view
    returns (
        bool upkeepNeeded,
        bytes memory /* performData */
    )
{
    upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
}

function performUpkeep(
    bytes calldata /* performData */
) external {
    //We highly recommend revalidating the upkeep in the performUpkeep function
    if ((block.timestamp - lastTimeStamp) > interval) {
        lastTimeStamp = block.timestamp;
        // 呼び出したい処理をここに書く
    }
}
```

## 動かし方

```bash
cd functions-hardhat-starter-kit
```

```bash
npm i
```

```bash
npx hardhat compile
```

```bash
npx hardhat functions-simulate
```

- `FunctionsConsumer`コントラクトのデプロイ

```bash
npx hardhat functions-deploy-client --network polygonMumbai --verify false
```

デプロイ結果

```bash
__Compiling Contracts__
Nothing to compile

Waiting 2 blocks for transaction 0x9d5811dff75efca7ddee2f61c3e0d443f5fb8c5b76c0b7f01ec934f541300a8a to be confirmed...

FunctionsConsumer contract deployed to 0xa9Bf293B85E46079665019BE17a67B8D925572f7 on polygonMumbai
```

- Configure your on-chain resources

```bash
npx hardhat functions-sub-create --network polygonMumbai --amount 5 --contract 0xa9Bf293B85E46079665019BE17a67B8D925572f7
```

実行結果

```bash
Subscription 1816 funded with 5.0 LINK
Adding consumer contract address 0xa9Bf293B85E46079665019BE17a67B8D925572f7 to subscription 1816
Waiting 2 blocks for transaction 0xf7bc5d9c605433e5677d9587a2601edfbccd86db86860ee9d1f55a7754e02b2a to be confirmed...
Authorized consumer contract: 0xa9Bf293B85E46079665019BE17a67B8D925572f7

Created subscription with ID: 1816
Owner: 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072
Balance: 5.0 LINK
1 authorized consumer contract:
[ '0xa9Bf293B85E46079665019BE17a67B8D925572f7' ]
```

- サンプル用のスクリプトを実行させる場合

```bash
npx hardhat functions-request --subid 1816 --contract 0xa9Bf293B85E46079665019BE17a67B8D925572f7 --network polygonMumbai
```

実行結果

```bash
__Output from sandboxed source code__
Output represented as a hex string: 0x00000000000000000000000000000000000000000000000000000000000f50ed
Decoded as a uint256: 1003757

ℹ Transaction confirmed, see https://mumbai.polygonscan.com/tx/0x5f56655508a40378d8ab0c9d77e0cb16647f1e6a2164771f8fada8dfeed96404 for more details.
✔ Request 0x4170af9691f041209b01e959b15321b9163f64ee50843b1fa07ff9b1f455f3fc fulfilled! Data has been written on-chain.

Response returned to client contract represented as a hex string: 0x00000000000000000000000000000000000000000000000000000000000f50ed
Decoded as a uint256: 1003757

Actual amount billed to subscription #1816:
┌──────────────────────┬─────────────────────────────┐
│         Type         │           Amount            │
├──────────────────────┼─────────────────────────────┤
│  Transmission cost:  │  0.001529579672068636 LINK  │
│      Base fee:       │          0.2 LINK           │
│                      │                             │
│     Total cost:      │  0.201529579672068636 LINK  │
└──────────────────────┴─────────────────────────────┘
```

- 自動で実行させるようにしたい場合

```bash
npx hardhat functions-deploy-auto-client --network polygonMumbai --subid 1816 --interval 60 --configpath Functions-request-config.js
```

実行結果

```bash
Added consumer contract address 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 to subscription 1816
4 authorized consumer contracts for subscription 1816:
[
  '0xa9Bf293B85E46079665019BE17a67B8D925572f7',
  '0xa711098909503e0A6087c43150BE944c61016924',
  '0x8760411d317e560021dB83b35971AB0dDEd4E205',
  '0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413'
]
Setting the Functions request in AutomatedFunctionsConsumer contract 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 on polygonMumbai
Simulating Functions request locally...

__Console log messages from sandboxed code__
Bad API request failed. (This message is expected to demonstrate using console.log for debugging locally with the simulator)
Median Bitcoin price: $26032.17

__Output from sandboxed source code__
Output represented as a hex string: 0x000000000000000000000000000000000000000000000000000000000027b8d1
Decoded as a uint256: 2603217

Successfully created encrypted secrets Gist: https://gist.github.com/mashharuki/388f070c5b426093783df82c3d598bfa
Be sure to delete the Gist https://gist.github.com/mashharuki/388f070c5b426093783df82c3d598bfa once encrypted secrets are no longer in use!

Setting Functions request

Waiting 2 block for transaction 0x7905d0f68f2278fc669234a89b1dcc02970dcc410646305cdff2d4dc72c9b3fe to be confirmed...

Created new Functions request in AutomatedFunctionsConsumer contract 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 on polygonMumbai

AutomatedFunctionsConsumer contract deployed to 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 on polygonMumbai
```

- ローカルでのシミュレーション

```bash
npx hardhat functions-simulate --configpath Functions-request-config.js
```

実行結果

```bash
secp256k1 unavailable, reverting to browser version

__Compiling Contracts__
Nothing to compile
Duplicate definition of Transfer (Transfer(address,address,uint256,bytes), Transfer(address,address,uint256))

Executing JavaScript request source code locally...

__Console log messages from sandboxed code__
Bad API request failed. (This message is expected to demonstrate using console.log for debugging locally with the simulator)
Median Bitcoin price: $26029.31

__Output from sandboxed source code__
Output represented as a hex string: 0x000000000000000000000000000000000000000000000000000000000027b7b3
Decoded as a uint256: 2602931

__Simulated On-Chain Response__
Response returned to client contract represented as a hex string: 0x000000000000000000000000000000000000000000000000000000000027b7b3
Decoded as a uint256: 2602931

Gas used by sendRequest: 439384
Gas used by client callback function: 75029
```

スクリプトを呼び出す方法  
※ 事前に Chainlink Automain App で登録している必要あり！！

```bash
npx hardhat functions-read  --contract 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 --network polygonMumbai --configpath Functions-request-config.js
```

実行結果

```bash
lygonMumbai --configpath Functions-request-config.js
secp256k1 unavailable, reverting to browser version
Reading data from Functions client contract 0x4747b535f1C4a48bbfc88CA68DC8973DD38Eb413 on network polygonMumbai

On-chain response represented as a hex string: 0x000000000000000000000000000000000000000000000000000000000027af6f
Decoded as a uint256: 2600815
```

次の日に実行した例

```bash
On-chain response represented as a hex string: 0x000000000000000000000000000000000000000000000000000000000027a27c
Decoded as a uint256: 2597500
```

## Dynamic NFT の動かし方

```bash
npm i
```

```bash
npm run deploy:fuji
```

- 実行結果

```bash
Compiled 1 Solidity file successfully
deployed to 0x781BBC6B014c9f5055ad23f3CD5Fc5aa27039e2e
```

残りは、Automation UpKeep の方で設定する。

![](./assets/1.png)

![](./assets/2.png)

![](./assets/3.png)

![](./assets/4.png)

以下は、実際に指定した例

[56739379989183854243409540443502035021085634288274005226243520506999006251318](https://automation.chain.link/fuji/56739379989183854243409540443502035021085634288274005226243520506999006251318)

- OpenSea では下記の通り

[Sample DynamicNFTs](https://testnets.opensea.io/ja/assets/avalanche-fuji/0x781bbc6b014c9f5055ad23f3cd5fc5aa27039e2e/0)

成長していることがわかる。

![](./assets/5.png)

![](./assets/6.png)

## OpenAI の API を試験的に試すスクリプトの実行方法

```bash
cd openai-sample && npm run execute
```

実行結果

```bash
{
  id: 'chatcmpl-7S4atAUjkdjarv4viFtKMeMYAmpa0',
  object: 'chat.completion',
  created: 1686925199,
  model: 'gpt-3.5-turbo-0301',
  usage: { prompt_tokens: 55, completion_tokens: 111, total_tokens: 166 },
  choices: [ { message: [Object], finish_reason: 'stop', index: 0 } ]
}
出力結果: pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    constructor() ERC721("MyNFT", "NFT") {}

    function mint(address to, uint256 tokenId, string memory _uri) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _uri);
    }
} END
```

- ローカルでシミュレーションさせた時の実行時の場合

```bash
npm run functions-simulate-javascript
```

実行結果

```bash

__Output from sandboxed source code__
Output represented as a hex string: 0xe38386e382b9e38388e68890e58a9fe38197e381bee38197e3819fe38082e38193e38293e381abe381a1e381afefbc81
Decoded as a string: テスト成功しました。こんにちは！

Value returned from source code: 0xe38386e382b9e38388e68890e58a9fe38197e381bee38197e3819fe38082e38193e38293e381abe381a1e381afefbc81
Decoded as a string: テスト成功しました。こんにちは！
```

- 入力データを変えた場合

```json
{
  "messages": [
    {
      "role": "user",
      "content": `
          入力に書かれたsolidityのコードを生成してください。

          #入力
          ERC-721のNFTをmintするメソッド
          
          #出力
        `
    }
  ],
  "model": "gpt-3.5-turbo"
}
```

- 実行結果

```bash
__Output from sandboxed source code__
Output represented as a hex string: 0x66756e6374696f6e206d696e744e4654286164647265737320746f2c2075696e7432353620746f6b656e496429207075626c6963207b0a202020207265717569726528215f65786973747328746f6b656e4964292c2022546f6b656e20616c72656164792065786973747322293b0a0a202020205f736166654d696e7428746f2c20746f6b656e4964293b0a7d
Decoded as a string: function mintNFT(address to, uint256 tokenId) public {
    require(!_exists(tokenId), "Token already exists");

    _safeMint(to, tokenId);
}

Value returned from source code: 0x66756e6374696f6e206d696e744e4654286164647265737320746f2c2075696e7432353620746f6b656e496429207075626c6963207b0a202020207265717569726528215f65786973747328746f6b656e4964292c2022546f6b656e20616c72656164792065786973747322293b0a0a202020205f736166654d696e7428746f2c20746f6b656e4964293b0a7d
Decoded as a string: function mintNFT(address to, uint256 tokenId) public {
    require(!_exists(tokenId), "Token already exists");

    _safeMint(to, tokenId);
}
```

- 新たにデプロイし直した FunctionConsumer contract

```bash
npx hardhat functions-deploy-client --network polygonMumbai --verify true
```

実行結果

```bash
Verifying contract...
Nothing to compile
Successfully submitted source code for contract
contracts/FunctionsConsumer.sol:FunctionsConsumer at 0x8F6631e30a2cF2Bd017595f3215F550f0613170C
for verification on the block explorer. Waiting for verification result...

Contract already verified

FunctionsConsumer contract deployed to 0x8F6631e30a2cF2Bd017595f3215F550f0613170C on polygonMumbai
```

- 関数の設定

```bash
npx hardhat functions-sub-create --network polygonMumbai --amount 5 --contract 0x8F6631e30a2cF2Bd017595f3215F550f0613170C
```

```bash
Created subscription with ID: 1828
Owner: 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072
Balance: 5.0 LINK
1 authorized consumer contract:
[ '0x8F6631e30a2cF2Bd017595f3215F550f0613170C' ]
```

- 新たにデプロイした関数から呼び出す方法

```bash
npx hardhat functions-request --subid 1828 --contract 0x8F6631e30a2cF2Bd017595f3215F550f0613170C --network polygonMumbai --configpath ./OpenAI-API-Request-config.js --gaslimit 60000
```

実行結果

```bash
secp256k1 unavailable, reverting to browser version
Estimating cost if the current gas price remains the same...

The transaction to initiate this request will charge the wallet (0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072):
0.000543370505795952 MATIC, which (using mainnet value) is $0.004694440526483112

If the request's callback uses all 60,000 gas, this request will charge the subscription:
0.200107452952304862 LINK

Continue? Enter (y) Yes / (n) No
y
Simulating Functions request locally...

__Console log messages from sandboxed code__
API Call Success!!

__Output from sandboxed source code__
Output represented as a hex string: 0x32
Decoded as a string: 2

Successfully created encrypted secrets Gist: https://gist.github.com/mashharuki/0c173e7d36fb1d3261b6621b5e76bee3
ℹ Transaction confirmed, see https://mumbai.polygonscan.com/tx/0x2d0b75b67f72945dced69ea57b19185531973d925286da4137af2933d03ca0e6 for more details.
✔ Request 0x49ef83449dd269174af51d39aaef8429332a6c6ebf2cda677eec59aeca6a86e4 fulfilled! Data has been written on-chain.

Response returned to client contract represented as a hex string: 0x32
Decoded as a string: 2

Actual amount billed to subscription #1828:
┌──────────────────────┬─────────────────────────────┐
│         Type         │           Amount            │
├──────────────────────┼─────────────────────────────┤
│  Transmission cost:  │  0.000054831976257248 LINK  │
│      Base fee:       │          0.2 LINK           │
│                      │                             │
│     Total cost:      │  0.200054831976257248 LINK  │
└──────────────────────┴─────────────────────────────┘

```

## 参考文献

1. [スターターキット](https://github.com/smartcontractkit/functions-hardhat-starter-kit)
2. [Chainlink Functions メモ](https://zenn.dev/pokena/scraps/a3aaff73a7c21d)
3. [How To Use Chainlink Functions | Chainlink Engineering Tutorials](https://www.youtube.com/watch?v=nKRZ1R2BC4Q)
4. [Automain Chainlink App](https://automation.chain.link/)
5. [実際に Automain として登録したスマートコントラクトの例](https://automation.chain.link/fuji/52432413965313473664485316098653309434272671953320176872330438941768262658891)
6. [Register a Custom Logic Upkeep](https://docs.chain.link/chainlink-automation/register-upkeep/#register-an-upkeep-using-the-chainlink-automation-app)
7. [【REMIX】サンプル用の Automain 用のスマコン](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Automation/tutorials/EthBalanceMonitor.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)
8. [How To Create Dynamic NFTs Using Chainlink Automation | Chainlink Engineering Tutorials](https://www.youtube.com/watch?v=E7Rm1LUKhj4)
9. [実際にデプロイした Automain スクリプトコントラクト](https://automation.chain.link/mumbai/18268368912146003678957606947898212473059057081127208716115380477784269230939)
