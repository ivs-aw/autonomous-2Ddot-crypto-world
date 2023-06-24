import { ethers } from "ethers";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";

export default async function main(t: string, amt: string, opts: CLIOpts) {
  const paymaster = opts.withPM
    ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      )
    : undefined;
  // コントラクトウォレットの設定。
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    config.signingKey,
    config.rpcUrl,
    config.entryPoint,
    config.simpleAccountFactory,
    paymaster
  );
  // クライアントインスタンスを生成
  const client = await Client.init(config.rpcUrl, config.entryPoint);

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);
  // send UserOperation 送信する。
  const res = await client.sendUserOperation(
    simpleAccount.execute(target, value, "0x"),
    {
      dryRun: opts.dryRun,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  // トランザクション送信
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}
