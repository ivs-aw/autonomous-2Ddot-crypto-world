import { ethers } from "ethers";
import { ERC721_ABI } from "../../src";
// @ts-ignore
import { Client, Presets } from "userop";
import config from "../../config.json";
import { CLIOpts } from "../../src";

export default async function main(
  tkn: string,
  t: string,
  id: string,
  opts: CLIOpts
) {
  const paymaster = opts.withPM
    ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      )
    : undefined;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    config.signingKey,
    config.rpcUrl,
    config.entryPoint,
    config.simpleAccountFactory,
    paymaster
  );

  const client = await Client.init(config.rpcUrl, config.entryPoint);

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const token = ethers.utils.getAddress(tkn);
  const to = ethers.utils.getAddress(t);
  const tokenId = id;

  // ERC721トークンコントラクト生成
  const erc721 = new ethers.Contract(token, ERC721_ABI, provider);
  const [name, symbol] = await Promise.all([
    erc721.name(),
    erc721.symbol()
  ]);

  console.log(`Transferring ${name},${symbol}...`);

  // userOprationを送信する。
  const res = await client.sendUserOperation(
    simpleAccount.execute(
      erc721.address,
      0,
      erc721.interface.encodeFunctionData("transferFrom", [simpleAccount.getSender(), to, tokenId])
    ),
    {
      dryRun: opts.dryRun,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}
