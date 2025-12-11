// Smart Contract Configuration
// Replace these addresses with your deployed contract addresses on Sepolia testnet

export const CONTRACT_ADDRESSES = {
  CAMPUS_POINT: "0xFdb8E93a501F4891e248AD2E8E530146E050B8af", // Replace with deployed ERC20 address on Sepolia
  ACTIVITY_CERTIFICATE: "0x2555cf531F0Aabb13fDAC4827f5F1A04CD517655", // Replace with deployed ERC721 address on Sepolia
  ACTIVITY_MANAGER: "0x16Bf2c42113c8b6531D66Ed23344bB0934D6CbEB", // Replace with deployed ActivityManager address on Sepolia
};

// Sepolia Network Configuration
export const SEPOLIA_NETWORK = {
  chainId: 11155111,
  chainName: "Sepolia Testnet",
  rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY", // Or use a public RPC
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
