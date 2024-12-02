// import { createContext, useContext, useState, useEffect } from 'react'
// import { ethers } from 'ethers'
// import { switchToChiliz, getContract } from '../utils/web3'

// const Web3Context = createContext(null)

// export function Web3Provider({ children }) {
//   const [provider, setProvider] = useState(null)
//   const [signer, setSigner] = useState(null)
//   const [account, setAccount] = useState(null)
//   const [contract, setContract] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)


// const connectWallet = async () => {
//     console.log('Attempting to connect wallet...');
//     try {
//       if (!window.ethereum) {
//         alert('MetaMask is not installed. Please install it to connect your wallet.');
//         return;
//       }
  
//       await switchToChiliz(); // Ensure this function also checks for MetaMask
  
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       console.log('Connected account:', accounts[0]);
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error('Error connecting wallet:', error);
//     }
//   };

// useEffect(() => {
//     if (typeof window.ethereum !== 'undefined') {
//       console.log('Ethereum provider detected.');
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       setProvider(provider);
  
//       window.ethereum.on('accountsChanged', (accounts) => {
//         console.log('Accounts changed:', accounts);
//         setAccount(accounts[0] || null);
//       });
  
//       window.ethereum.on('chainChanged', () => {
//         console.log('Chain changed. Reloading...');
//         window.location.reload();
//       });
  
//       return () => {
//         window.ethereum.removeAllListeners();
//       };
//     } else {
//       console.warn('No Ethereum provider detected.');
//       setIsLoading(false);
//     }
//   }, []);
  
//   useEffect(() => {
//     if (provider && account) {
//       console.log('Setting signer and contract...')
//       const signer = provider.getSigner()
//       setSigner(signer)

//       try {
//         const contract = getContract(signer)
//         setContract(contract)
//         console.log('Contract initialized:', contract)
//       } catch (error) {
//         console.error('Error initializing contract:', error)
//       }
//     } else {
//       console.log('Provider or account missing:', { provider, account })
//     }
//     setIsLoading(false)
//   }, [provider, account])

//   return (
//     <Web3Context.Provider value={{
//       provider,
//       signer,
//       account,
//       contract,
//       isLoading,
//       connectWallet
//     }}>
//       {children}
//     </Web3Context.Provider>
//   )
// }

// export const useWeb3 = () => {
//   const context = useContext(Web3Context)
//   if (!context) {
//     throw new Error('useWeb3 must be used within a Web3Provider')
//   }
//   return context
// }

import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { switchToChain, getContract } from '../utils/web3';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentChain, setCurrentChain] = useState('BASE'); // Default chain

  const connectWallet = async () => {
    console.log('Attempting to connect wallet...');
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed. Please install it to connect your wallet.');
        return;
      }

      await switchToChain(currentChain); // Ensure this function also checks for MetaMask

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected account:', accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const switchChain = async (chainKey) => {
    try {
      await switchToChain(chainKey);
      setCurrentChain(chainKey);

      // Reinitialize contract for the new chain
      if (provider) {
        const contractInstance = getContract(provider.getSigner(), chainKey);
        setContract(contractInstance);
      }
    } catch (error) {
      console.error('Error switching chain:', error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Ethereum provider detected.');
      const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(providerInstance);

      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Accounts changed:', accounts);
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', () => {
        console.log('Chain changed. Reloading...');
        window.location.reload();
      });

      return () => {
        window.ethereum.removeAllListeners();
      };
    } else {
      console.warn('No Ethereum provider detected.');
    }
  }, []);

  useEffect(() => {
    if (provider && account) {
      console.log('Setting signer and contract...');
      const signerInstance = provider.getSigner();
      setSigner(signerInstance);

      try {
        const contractInstance = getContract(signerInstance, currentChain);
        setContract(contractInstance);
        // console.log('Contract initialized:', contractInstance);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    }
  }, [provider, account, currentChain]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        contract,
        currentChain,
        connectWallet,
        switchChain,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
