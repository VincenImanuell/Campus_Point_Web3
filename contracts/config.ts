// Smart Contract Configuration
// Replace these addresses with your deployed contract addresses on Sepolia testnet

export const CONTRACT_ADDRESSES = {
  CAMPUS_POINT: "0x7E2AA2AaCa73dAa7a7aF9e48561842FE8Be7E11c", // Replace with deployed ERC20 address on Sepolia
  ACTIVITY_CERTIFICATE: "0xcc04B20f7eCB45687bFe951402736B9244bC72dC", // Replace with deployed ERC721 address on Sepolia
  ACTIVITY_MANAGER: "0x113Ac66c4d8cA923C7a5BaF3523EA6B0D693EECB", // Replace with deployed ActivityManager address on Sepolia
};

// Sepolia Network Configuration
export const SEPOLIA_NETWORK = {
  chainId: 11155111,
  chainName: "Sepolia Testnet",
  rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com", // Public RPC
  blockExplorerUrl: "https://sepolia.etherscan.io",
  nativeCurrency: {
    name: "Sepolia Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
};

// Helper function to add/switch to Sepolia network in MetaMask
export async function addSepoliaNetwork() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${SEPOLIA_NETWORK.chainId.toString(16)}`,
          chainName: SEPOLIA_NETWORK.chainName,
          rpcUrls: [SEPOLIA_NETWORK.rpcUrl],
          blockExplorerUrls: [SEPOLIA_NETWORK.blockExplorerUrl],
          nativeCurrency: SEPOLIA_NETWORK.nativeCurrency,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to add Sepolia network:", error);
    throw error;
  }
}

// Helper function to switch to Sepolia network
export async function switchToSepolia() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${SEPOLIA_NETWORK.chainId.toString(16)}` }],
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      await addSepoliaNetwork();
    } else {
      console.error("Failed to switch to Sepolia network:", error);
      throw error;
    }
  }
}
