import { Presets } from "userop";
// @ts-ignore
import config from "../../config.json";

export default async function main() {
  // コントラクトウォレットを生成する。
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    config.signingKey,
    config.rpcUrl,
    config.entryPoint,
    config.simpleAccountFactory
  );
  const address = simpleAccount.getSender();

  console.log(`SimpleAccount address: ${address}`);
}
