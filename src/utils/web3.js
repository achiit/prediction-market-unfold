// import { ethers } from 'ethers'
// import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_ID } from '../constants/contract'

// export const switchToChiliz = async () => {
//   try {
//     await window.ethereum.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
//     })
//   } catch (switchError) {
//     if (switchError.code === 4902) {
//       await window.ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [{
//           chainId: `0x${CHAIN_ID.toString(16)}`,
//           chainName: 'Chiliz Spicy Testnet',
//           nativeCurrency: {
//             name: 'CHZ',
//             symbol: 'CHZ',
//             decimals: 18
//           },
//           rpcUrls: ['https://chiliz-spicy.publicnode.com'],
//           blockExplorerUrls: ['https://spicy-explorer.chiliz.com/']
//         }]
//       })
//     }
//   }
// }

// export const getContract = (providerOrSigner) => {
//   return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner)
// }

// export const formatAddress = (address) => {
//   return `${address.slice(0, 6)}...${address.slice(-4)}`
// }

import { ethers } from 'ethers';
import { CONTRACT_ABI,CONTRACT_ADDRESS,UNICHAIN_CONTRACT_ADDRESS } from '../constants/contract';

const CHAINS = {
  BASE: {
    chainId: 84532,
    chainName: 'Base Sepolia',
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia-explorer.base.org/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  UNICHAIN: {
    chainId: 1301,
    chainName: 'Unichain Sepolia',
    rpcUrls: ['https://sepolia.unichain.org'],
    blockExplorerUrls: ['https://unichain-explorer.com/'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

// Switch to a specified chain
export const switchToChain = async (chainKey) => {
  const chainConfig = CHAINS[chainKey];

  if (!chainConfig) {
    throw new Error(`Unsupported chain: ${chainKey}`);
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainConfig.chainId.toString(16)}` }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      // Chain not added, add it
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainConfig.chainId.toString(16)}`,
            chainName: chainConfig.chainName,
            nativeCurrency: chainConfig.nativeCurrency,
            rpcUrls: chainConfig.rpcUrls,
            blockExplorerUrls: chainConfig.blockExplorerUrls,
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
};

// Get contract instance for the current provider or signer
export const getContract = (providerOrSigner, chainKey) => {
  const chainConfig = CHAINS[chainKey];
  if (!chainConfig) {
    throw new Error(`Unsupported chain: ${chainKey}`);
  }
  const contractAddress = chainKey === 'BASE' ? CONTRACT_ADDRESS : UNICHAIN_CONTRACT_ADDRESS; // Add respective contract address mapping if needed
  return new ethers.Contract(contractAddress, CONTRACT_ABI, providerOrSigner);
};

// Format address for UI display
export const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
