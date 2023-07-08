# autonomous-2Ddot-crypto-world

<img width="1623" alt="スクリーンショット 2023-06-19 22 33 33" src="https://github.com/ivs-aw/autonomous-2Ddot-crypto-world/assets/29562675/1b514592-b513-4953-a261-a93853c191b1">

## 概要 About

私たちはブロックチェーンと AI を活用した完全自律型のフルオンチェーンゲーム世界を作りました。
プレイヤーの行動記録をチェーンに刻み AI がそれを基にゲーム世界と新たなユーザー体験を創出します。
この基盤を用いた 2D ドットオンチェーンゲームが autonomous-2Ddot-crypto-world です。

## このプロダクトのバリュー

プレイヤーのプレイした情報を基に新たなフィールドやモンスターを生成していくゲームアプリのプロトタイプを開発しました。  
これはまだ2Dの世界だけですが、いずれメタバース空間にも応用が効くと考えています。プレイヤー達自らもゲーム世界の拡張に携われるようになる可能性があります！！

## Oasysブロックチェーンを利用する理由

```txt
Oasysはプロジェクトの目的をゲームに限定しており、独自のOasysアーキテクチャを採用することにより、トランザクションの高速処理とガス料金（手数料）0でのゲーム体験をユーザーに提供する。
```

上記がOasysの特徴なので、ゲーム上での操作一つ一つがオンチェーンに刻まれるMUDとの相性が良いと考えています。  

また、従来のブロックチェーンであれば操作の度に少額のガス代がかかってしまいますが、Oasysであればガスレスでそれを実現することができると考えました！  
デプロイするために必要なコントラクトの数も膨大なのでそこにガス代がかからない点もMUDとの相性が良いと考えています！

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

- AA

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
    SimpleAccount address: 0x7f9996269c306468C7E96b4B76f3fB636F20Fb6f
    ```

    [【PolygonScan】0x7f9996269c306468C7E96b4B76f3fB636F20Fb6f](https://mumbai.polygonscan.com/address/0x7f9996269c306468C7E96b4B76f3fB636F20Fb6f)


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

  - コントラクトウォレットからERC20トークンを送金するコマンド

    ```bash
    pnpm erc-4337-example run simpleAccount erc20Transfer --token 0x3870419Ba2BBf0127060bCB37f69A1b1C090992B --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 100
    ```

    実行結果

    ```bash
    Transferring 100 6TEST...
    Signed UserOperation: {
      sender: '0x7f9996269c306468C7E96b4B76f3fB636F20Fb6f',
      nonce: '0x1',
      initCode: '0x',
      callData: '0xb61d27f60000000000000000000000003870419ba2bbf0127060bcb37f69a1b1c090992b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad0720000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000000000',
      callGasLimit: '0x97a6',
      verificationGasLimit: '0xed10',
      preVerificationGas: '0xaeb8',
      maxFeePerGas: '0xf47e06f0',
      maxPriorityFeePerGas: '0xf47e06d2',
      paymasterAndData: '0x',
      signature: '0x0aa7de85b93bc94b20a3ca5a82c6e6dee351c8070da31721a595f3c1e48cb40523b2de32c7772bb0c88cddb6e06c991a2df9b6737169229b9f81939ee9870f4e1c'
    }
    UserOpHash: 0xc0560267d39191c7fedc95cf27a7fef9f7da86fe05287b919022166a2bc595dd
    Waiting for transaction...
    Transaction hash: 0x2fae4c4f8aff1d14536bb6fa26b0c638816e456710ec035bc314de5c495c09fb
    ```

  - Paymasterで使うERC20トークンのApproveを行うためのコマンド

    ```bash
    pnpm erc-4337-example run simpleAccount erc20Approve --token 0x3870419Ba2BBf0127060bCB37f69A1b1C090992B --spender 0xE93ECa6595fe94091DC1af46aaC2A8b5D7990770 --amount 500
    ```

    実行結果

    ```bash
    Approving 500 6TEST...
    Signed UserOperation: {
      sender: '0x2f4A4d8b7cb5e3612b93674e637119165D47d935',
      nonce: '0x7',
      initCode: '0x',
      callData: '0xb61d27f60000000000000000000000003870419ba2bbf0127060bcb37f69a1b1c090992b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000e93eca6595fe94091dc1af46aac2a8b5d7990770000000000000000000000000000000000000000000000000000000001dcd650000000000000000000000000000000000000000000000000000000000',
      callGasLimit: '0xc65b',
      verificationGasLimit: '0xed10',
      preVerificationGas: '0xaeb8',
      maxFeePerGas: '0xa8621460',
      maxPriorityFeePerGas: '0xa8621440',
      paymasterAndData: '0x',
      signature: '0x76c1a96e27e1d93dd3e5438cd97e27d1baafcbb0fe2f3356b2b0e1e4c8ca696b25cc7bb1779162577a4cc9242810fd52bca96abe0ab53da3d9bf19dafec80ca11b'
    }
    UserOpHash: 0xb7e2efdbfce01d46d6191b91ac3a0b6cd8a8635386b92d755a1fe9e50b6ce124
    Waiting for transaction...
    Transaction hash: 0xe14656a1298e184bd34f2a5190f57306d272a4cf16d30f847c027d9976ed305d
    ```

  - Paymaster を使ってERC20トークンをを送金する方法

    ```bash
    pnpm erc-4337-example run simpleAccount erc20Transfer --token 0x3870419Ba2BBf0127060bCB37f69A1b1C090992B --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --amount 100 --withPaymaster
    ```

    実行結果

    ```Bash
    Transferring 100 6TEST...
    Signed UserOperation: {
      sender: '0x2f4A4d8b7cb5e3612b93674e637119165D47d935',
      nonce: '0x8',
      initCode: '0x',
      callData: '0xb61d27f60000000000000000000000003870419ba2bbf0127060bcb37f69a1b1c090992b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000051908f598a5e0d8f1a3babfa6df76f9704dad0720000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000000000',
      callGasLimit: '0x19d74',
      verificationGasLimit: '0x2448c',
      preVerificationGas: '0xbc5c',
      maxFeePerGas: '0xb938b002',
      maxPriorityFeePerGas: '0xb938afe2',
      paymasterAndData: '0xe93eca6595fe94091dc1af46aac2a8b5d7990770000000000000000000000000000000000000000000000000000000006497d98c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000003870419ba2bbf0127060bcb37f69a1b1c090992b00000000000000000000000000000000000000000000000000000000000a3bbac99aa0097c3e4afa93c1bd152eb8036d441f10558c2b7f4ec946267bc8a33f84230bc890e4f1760879f53060ac4dcced4eb683f515d4953af21d2d7e40c8cde91c',
      signature: '0x62b6d476d7e5a600802c41f469697a8b03fbbe13af9da1038b496ae1c41f70571bbabee9b9d3ef0301b212c8bd5022e8b7fcbe48f02f1351ceb9977fad709bcd1c'
    }
    UserOpHash: 0xe2be9f85881f3e8e99304f931fa640865e9e405bb1fd0b92612ec12d6da97d9c
    Waiting for transaction...
    Transaction hash: 0x37fbad3bd4d80c77041ac0b763e8a9b8f65b02d4bc98abac6c04fa8a453b70b4
    ```

    ブロックチェーンエクスプローラー上での記録

    [【PolygonScan】0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1?a=0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072](https://mumbai.polygonscan.com/token/0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1?a=0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072)

- ChainLink
  
  - `FunctionsConsumer`コントラクトのデプロイ

    ```bash
    npx hardhat functions-deploy-client --network polygonMumbai --verify false
    ```

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

  - ローカルでシミュレーションさせた時の実行時の場合

    ```bash
    npm run functions-simulate-javascript
    ```

    実行結果

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

## 使用した技術

| No. | Name                |
| :-- | :------------------ |
| 1   | MUD                 |
| 2   | MODE                |
| 3   | React               |
| 4   | pnpm                |
| 5   | hardhat             |
| 6   | OpenAI  API         |
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

- Oasysブロックチェーンの特徴を学ぶことができました。(ゲーム用途に特化した高トランザクション処理性能・ガスレストランザクション)

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
