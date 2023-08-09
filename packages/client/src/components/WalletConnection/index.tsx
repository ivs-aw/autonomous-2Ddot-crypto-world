import { Box, Button, Container, Grid, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import React, { ReactNode, createContext, useState } from "react";
import MetaMaskIcon from "./../MetaMaskIcon";

let injectedProvider = false;

if (typeof window.ethereum !== 'undefined') {
    injectedProvider = true;
}

type Props = {
  children: ReactNode;
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
const WalletConnection = ({children}: Props, ) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [wallet, setWallet] = useState({accounts:[]});

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
      <Box sx={{backgroundColor: 'background.black'}}>
        <Container>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{p: 2, mb: 4}}>
            <Typography variant="h6">
              Autonomous-2Ddot-Crypto-World
            </Typography>
            { wallet.accounts.length > 0 ? (
              <>
                <Button
                  variant="outlined"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  startIcon={<SvgIcon component={MetaMaskIcon} viewBox="0 0 300 300"/>}
                >
                  {(wallet.accounts[0] as string)?.slice(0, 5)}...{ (wallet.accounts[0] as string)?.slice(-5)}
                </Button>
              </>
            ):(
              <>
                <Button 
                  variant="outlined" 
                  onClick={handleConnect} 
                  startIcon={<SvgIcon component={MetaMaskIcon} viewBox="0 0 300 300"/>} 
                  disabled={!isMetaMask}
                >
                  connect
                </Button>
              </>
            )}
          </Grid>
        </Container>
      </Box>
      <Container>
        {isMetaMask ? (
          wallet.accounts.length > 0 ? (
            <walletContext.Provider value={{wallet}}>
              {children}
            </walletContext.Provider>
          ) : (
            <>
              Please connect to Metamask
            </>
          )
        ) : (
          <>
            Please Install Metamask
          </>
        )}
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
    </>
  )
}

export default WalletConnection