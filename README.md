# autonomous-2Ddot-crypto-world

<img width="1623" alt="スクリーンショット 2023-06-19 22 33 33" src="https://github.com/ivs-aw/autonomous-2Ddot-crypto-world/assets/29562675/1b514592-b513-4953-a261-a93853c191b1">

## 概要 About

私たちはブロックチェーンと AI を活用した完全自律型のフルオンチェーンゲーム世界を作りました。
プレイヤーの行動記録をチェーンに刻み AI がそれを基にゲーム世界と新たなユーザー体験を創出します。
この基盤を用いた 2D ドットオンチェーンゲームが autonomous-2Ddot-crypto-world です。

## 対応した問題

- MUD

  デフォルトでは Lattice の提供するテストネットで動作するようになっていたが、これを Mumbai ネットワークに対応させるに苦労した。  
  最初デプロイしようと考えていたマップは 20×20 であったがこれについては、デプロイが正常に終了しないため、処理できる最適なマップブロックを検討するなどして Mumbai ネットワークでも動くように是正したことが苦労した点。適宜 Lattice のチームに質問して意見をもらいながら開発を進めた。

- ChainLink functions

  Chainlink functions 側の制約で実行時間(9000ms 以内)およびデータ量の制約から最適なエンジニアリングになるように試行錯誤した点

## アプリケーションの起動方法

- モジュールのインストール

```bash
pnpm install
```

- MUD

  - MUD コントラクトをローカルで初期化しフロントを起動する方法

    ```bash
    pnpm run dev
    ```
  - Mumbaiにデプロイしてあるコントラクトと連動してフロントを起動する場合

    ```bash
    cd packages/client && pnpm run vite
    ```

- 投票 App

  - 投票 App をローカルで起動させる方法

    ```bash
    cd packages/vote-app && pnpm run start
    ```

  - 投票用のコントラクトを Shibuya にデプロイする方法

    ```bash
    cd pacakges/vote-app && pnpm run deploy:shibuya
    ```

- Chainlink

  ※ Chainlink function については現在ベータ版
  であり、承認されたアドレスからしかコントラクトのデプロイや実行を受け付けていない状況。

  - Chainlink functions 用のコントラクトをコンパイルする方法

    ```bash
    npx hardhat compile
    ```

  - Chainlink functions をローカルで実行させる方法

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

| No. | Name                |
| :-- | :------------------ |
| 1   | MUD                 |
| 2   | MODE                |
| 3   | React               |
| 4   | pnpm                |
| 5   | hardhat             |
| 6   | OpenAI              |
| 7   | Chainlink functions |
| 8   | Tailwind CSS        |
| 9   | Vite                |

## 使用したブロックチェーン

1. Mumbai Network (client)

2. Shibuya Network (vote-app)

## どのように作ったか(役割分担)

- jhcoder(チームリーダー)  
  フロントエンド
  バックエンド
  スライド＆デモ動画担当
  MUD World コントラクト, MODE の調査
  プロンプトエンジニアリング

- soma  
  MUD World コントラクトと Polygon Mumbai Network の接続

- mashharuki  
  バックエンド担当  
  MUD と Chainlink functions の調査担当  
  Voting app 担当

## 学んだこと

- ChainLink functions の概要と使い方を学びました。これにより、任意のスマートコントラクトを自動で実行させることができるようになりました。

- スマートコントラクト用フレームワーク MUD の概要と使い方について学びました。

- ChainLink functions を使って任意の API の実行結果をスマートコントラクト越しに取得する方法を学びました。今回は、ここから OpenAI の API を呼び出して結果を取得するように設計しました。

- MUD のドキュメントや、コミュニティで質問から、フレームワークの意図や使い方を学びました。その中で、適したチェーンやアプリケーションの構成を理解しました。

## 次をどうするか?

現在は、WorldContract をデプロイした後に手動で World コントラクトをデプロイすることになっているので、今後の課題としては Chainlink Function もしくは Chainlink Automation を使って自動でマップコントラクトの情報が更新される状態にし、完全な自動化を目指す。また、この際 WorldContract を更新するコードは OpenAI の API を使って出力されるものを想定している。投票機能のフロントエンド組み込み。

alchemy の無料枠を使用している為、レスポンス過多で、status code429 が返り、起動が遅いですが有料プランに移行することで問題ない起動時間になる想定です。

## deploy したコントラクト

[World コントラクト - Mumbai](https://mumbai.polygonscan.com/address/0x0b90377Db497D52F580896AC4Af8b4Bc2b7CFEd2)

[FunctionsConsumer.sol - Mumbai](https://mumbai.polygonscan.com/address/0x8F6631e30a2cF2Bd017595f3215F550f0613170Cå)

[Voting コントラクト - Shibuya Network](https://shibuya.subscan.io/account/0xbfDe6e57dD7f54D496B896f6c7d551eE40d3BEB0)

## Github repo

[autonomous-2Ddot-crypto-world](https://github.com/ivs-aw/autonomous-2Ddot-crypto-world)

## Live demo

[autonomous-2Ddot-crypto-world - GihHub Pages](https://ivs-aw.github.io/autonomous-2Ddot-crypto-world/)

[Voting App - Vercel](https://autonomous-2-ddot-crypto-world-rcrua2t0v-ivs-aw.vercel.app/)
