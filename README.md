# autonomous-2Ddot-crypto-world

私たちはブロックチェーンとAIを活用した完全自律型のフルオンチェーンゲーム世界を作りました。
プレイヤーの行動記録をチェーンに刻みAIがそれを基にゲーム世界と新たなユーザー体験を創出します。
この基盤を用いた2Dドットオンチェーンゲームがautonomous-2Ddot-crypto-worldです。

## 概要About



## 対応した問題

- MUD

  デフォルトではLatticeの提供するテストネットで動作するようになっていたが、これをMumbaiネットワークに対応させるに苦労した。  
  最初デプロイしようと考えていたマップは20×20であったがこれについては、デプロイが正常に終了しないため、5×5にするなどしてMumbaiネットワークでも動くように是正したことが苦労した点。適宜Latticeのチームに質問して意見をもらいながら開発を進めた。

- ChainLink functions

  Chainlink functions側の制約で実行時間(9000ms以内)およびデータ量の制約から最適なエンジニアリングになるように試行錯誤した点

## アプリケーションの起動方法

- モジュールのインストール

```bash
pnpm install
```

- MUD 

  - MUDコントラクトをローカルしてフロントを起動する方法

    ```bash
    pnpm run dev
    ```
- 投票App

  - 投票Appをローカルで起動させる方法

    ```bash
    cd packages/vote-app && pnpm run start
    ```

  - 投票用のコントラクトをShibuyaにデプロイする方法

    ```bash
    cd pacakges/vote-app && pnpm run deploy:shibuya
    ```

- Chainlink 

  ※ Chainlink functionについては現在ベータ版
  であり、承認されたアドレスからしかコントラクトのデプロイや実行を受け付けていない状況。

  - Chainlink functions用のコントラクトをコンパイルする方法

    ```bash
    npx hardhat compile
    ```

  - Chainlink functionsをローカルで実行させる方法

    ```bash
    npx hardhat functions-simulate
    ```

  - `FunctionsConsumer`コントラクトをデプロイする方法(検証無し)

    ```bash
    npx hardhat functions-deploy-client --network polygonMumbai --verify false
    ```

  - Configure your on-chain resources

    ```bash
    npx hardhat functions-sub-create --network polygonMumbai --amount 5 --contract 0xa9Bf293B85E46079665019BE17a67B8D925572f7
    ```

  - サンプル用のスクリプトをオンチェーンで実行させる場合

    ```bash
    npx hardhat functions-request --subid 1816 --contract 0xa9Bf293B85E46079665019BE17a67B8D925572f7 --network polygonMumbai
    ```

  - 自動で実行させるようにしたい場合

    ```bash
    npx hardhat functions-deploy-auto-client --network polygonMumbai --subid 1816 --interval 60 --configpath Functions-request-config.js
    ```


## 使用した技術

|No.|Name|
|:----|:----|
|1|MUD|
|2|React|
|3|pnpm|
|4|hardhat|
|5|OpenAI|
|6|Chainlink functions|
|7|Tailwind CSS|
|8|Vite|


## どのように作ったか(役割分担)

- jhcoder

- soma

- mashharuki  
  MUDとChainlink  
  functionsの調査  
  Voting appの作成  

## 学んだこと

- ChainLink functionsの概要と使い方を学びました。これにより、任意のスマートコントラクトを自動で実行させることができるようになりました。

- スマートコントラクト用フレームワークMUDの概要と使い方について学びました。

- ChainLink functionsを使って任意のAPIの実行結果をスマートコントラクト越しに取得する方法を学びました。今回は、ここからOpenAIのAPIを呼び出して結果を取得するように設計しました。

## 次をどうするか?

現在は、WorldContractをデプロイした後に手動でマップ情報にあたるコントラクトをデプロイすることになっているので、今後の課題としてはChainlink FunctionもしくはChainlink Automationを使って自動でマップコントラクトの情報が更新される状態にする。また、この際出力されるマップコントラクトの情報はOpenAIのAPIを使って出力されるものを想定している。

## deployしたコントラクト

[World コントラクト - Mumbai](https://mumbai.polygonscan.com/address/0x0b90377Db497D52F580896AC4Af8b4Bc2b7CFEd2)

[FunctionsConsumer.sol - Mumbai](https://mumbai.polygonscan.com/address/0x8F6631e30a2cF2Bd017595f3215F550f0613170Cå)

[Voting コントラクト - Shibuya Network](https://shibuya.subscan.io/account/0xbfDe6e57dD7f54D496B896f6c7d551eE40d3BEB0)

## Github repo

[autonomous-2Ddot-crypto-world](https://github.com/ivs-aw/autonomous-2Ddot-crypto-world)

## Live demo

[autonomous-2Ddot-crypto-world - GihHub Pages](https://ivs-aw.github.io/autonomous-2Ddot-crypto-world/)

[Voting App - Vercel](https://autonomous-2-ddot-crypto-world-rcrua2t0v-ivs-aw.vercel.app/)