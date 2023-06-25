import fs from "fs/promises";
import path from "path";
import prettier from "prettier";
import { ethers } from "ethers";
import * as dotenv from 'dotenv';
dotenv.config();

const {
  API_KEY,
  PRIVATE_KEY
} = process.env;

const INIT_CONFIG = {
  rpcUrl: `https://api.stackup.sh/v1/node/${API_KEY}`,
  signingKey: PRIVATE_KEY,
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  simpleAccountFactory: "0x9406Cc6185a346906296840746125a0E44976454",
  //simpleAccountFactory: "0x398004f2698648159b8e82a13fd87ea0b1f8f84e",
  paymaster: {
    rpcUrl: `https://api.stackup.sh/v1/paymaster/${API_KEY}`,
    context: {},
  },
};
const CONFIG_PATH = path.resolve(__dirname, "../config.json");

async function main() {
  return fs.writeFile(
    CONFIG_PATH,
    prettier.format(JSON.stringify(INIT_CONFIG, null, 2), { parser: "json" })
  );
}

main()
  .then(() => console.log(`Config written to ${CONFIG_PATH}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
