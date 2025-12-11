"use client";

import React from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { switchToSepolia } from "@/contracts/config";

export const WalletConnect: React.FC = () => {
  const { account, chainId, isConnected, isLoading, error, connectWallet, disconnectWallet } =
    useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Wallet Connection</h2>
        {isConnected && (
          <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
            Connected
          </span>
        )}
      </div>

      {!isConnected ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Connect your MetaMask wallet to interact with the Campus Point system.
          </p>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
          >
            {isLoading ? "Connecting..." : "Connect MetaMask"}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold text-sm">Error:</p>
              <p className="text-xs">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Address</span>
              <span className="font-mono text-gray-900 text-xs">{formatAddress(account!)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Network</span>
              <span className="font-mono text-xs">
                {chainId === 11155111 ? (
                  <span className="text-green-600 font-semibold">Sepolia (11155111)</span>
                ) : (
                  <span className="text-red-600 font-semibold">Wrong Network ({chainId})</span>
                )}
              </span>
            </div>
          </div>

          {chainId !== 11155111 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
              <p className="font-semibold text-sm">Warning:</p>
              <p className="text-xs mb-3">
                Please switch to Sepolia testnet (Chain ID: 11155111) to use this application.
              </p>
              <button
                onClick={switchToSepolia}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 w-full text-sm"
              >
                Switch to Sepolia
              </button>
            </div>
          )}

          <button
            onClick={disconnectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 w-full text-sm"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};
