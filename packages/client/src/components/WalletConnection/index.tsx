import React, { ReactNode, createContext, useState } from "react";
import { ethers } from "ethers";
import { SetupResult } from "../../mud/setup";

let injectedProvider = false;

if (typeof window.ethereum !== 'undefined') {
    injectedProvider = true;
}

type Props = {
  children: ReactNode;
  value: SetupResult;
};

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;
console.log("isMetamask:", isMetaMask);

// create walletContext
export const walletContext = createContext<any | null>(null);

/**
 * WalletConnection Component
 * @param param0 
 * @returns 
 */
const WalletConnection = ({children, value}: Props, ) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [wallet, setWallet] = useState({accounts:[]});
  const [accounts, setAccounts] = useState([]);

  const open = Boolean(anchorEl);

  /**
   * updateWallet method
   * @param accounts 
   */
  const updateWallet = async (accounts:any) => {
    setWallet({accounts})
  }

  /**
   * handleConnect method
   */
  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
    setAccounts(accounts);
  }

  /**
   * handleDisconnect method
   */
  const handleDisconnect = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{eth_accounts: {}}]
    })
    updateWallet([])
    setAnchorEl(null);
  }

  /**
   * handleDeposit method
   */
  const handleDeposit = async () => {
    // if chainID not equal '31337' change to '31337'
    await switchNetwork();

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0], // The user's active address.
          to: value.network.worldContract.address,
          value: ethers.utils.parseEther("0.0001").toString(),
          gasLimit: '0x5028', 
          maxPriorityFeePerGas: '0x3b9aca00', 
          maxFeePerGas: '0x2540be400', 
        },
      ],
    })
    .then((txHash: any) => console.log("txHash:", txHash))
    .catch((error: any) => console.error("error:", error));
  }

  /**
   * switchNetwork method
   */
  const switchNetwork = async () => {
    try {
      // Mumbai testnet に切り替えます。
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1092' }], 
      });
    } catch (error: any) {
      // このエラーコードは当該チェーンがメタマスクに追加されていない場合です。
      // その場合、ユーザーに追加するよう促します。
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x1092',
                chainName: 'Lattice Test Network',
                rpcUrls: ['https://follower.testnet-chain.linfra.xyz'],
                nativeCurrency: {
                    name: "NEXI",
                    symbol: "NEXI",
                    decimals: 18
                },
                blockExplorerUrls: ['https://explorer.testnet-chain.linfra.xyz/']
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }

  /**
   * handleClick method
   * @param event 
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handleMenuClose method
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
     <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <h6 className="text-xl">
            Autonomous-2Ddot-Crypto-World
          </h6>
          {wallet.accounts.length > 0 ? (
            <p>
              <button
                className="border rounded p-2"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {wallet.accounts[0]?.slice(0, 5)}...{wallet.accounts[0]?.slice(-5)}
              </button>
              <button
                className="border rounded p-2 bg-green-600"
                id="basic-button2"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </p>
          ) : (
            <button
              className="border rounded p-2 flex"
              onClick={handleConnect}
              disabled={!isMetaMask}
            >
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        {isMetaMask ? (
          wallet.accounts.length > 0 ? (
            <walletContext.Provider value={{ wallet }}>
              {children}
            </walletContext.Provider>
          ) : (
            <>Please connect to Metamask</>
          )
        ) : (
          <>Please Install Metamask</>
        )}
      </div>
      {open && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-500"
          onClick={handleMenuClose}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded">
            <button
              className="text-black  block w-full py-2 text-left"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletConnection