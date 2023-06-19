require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const {
  PRIVATE_KEY, 
  POLYGONSCAN_API_KEY,
  POLYGON_MUMBAI_RPC_URL
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },
  networks: {
    mumbai: {
      url: POLYGON_MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [PRIVATE_KEY]
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [PRIVATE_KEY]
    },
  },
};
