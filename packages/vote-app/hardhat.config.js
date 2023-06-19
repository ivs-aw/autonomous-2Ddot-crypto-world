/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { 
   API_URL, 
   PRIVATE_KEY,
   POLYGON_URL
} = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "volta",
   networks: {
      hardhat: {},
      volta: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 210000000,
         gasPrice: 800000000000,
      },
      mumbai: {
         url: POLYGON_URL,
         accounts: [PRIVATE_KEY],
      },
      shibuya: {
         url:"https://shibuya.public.blastapi.io",
         chainId: 81,
         accounts:[PRIVATE_KEY],
      },
   },
}