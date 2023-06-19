## Mumbai Network へのデプロイ

```bash
cd packages/contracts && pnpm run deploy:mumbai
```

## 秘密鍵に基づいているアドレス情報

[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266](https://mumbai.polygonscan.com/address/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)

## MODE を使って情報を取得する API リクエスト

- mumbai の場合

```bash
grpcurl -plaintext -d '{"chainTables": [], "worldTables": [], "namespace": {"chainId":"80001", "worldAddress": "0x0b90377Db497D52F580896AC4Af8b4Bc2b7CFEd2"}}' localhost:8545 mode.QueryLayer/StreamState
```

- local の場合

```bash

```

## World コントラクト

[0x2F9aD9440cBd077352aEBA8A6610E62a3F4d903B](https://mumbai.polygonscan.com/address/0x2F9aD9440cBd077352aEBA8A6610E62a3F4d903B)

## 向き先を任意のブロックチェーンに変更するためのコマンド

```bash
cd packages/client
pnpm vite
```



### 参考文献

1. [Using MODE](https://v2.mud.dev/mode)