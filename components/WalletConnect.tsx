"use client";

import React, { useState } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { switchToSepolia } from "@/contracts/config";

export const WalletConnect: React.FC = () => {
  const { account, chainId, isConnected, isLoading, error, connectWallet, disconnectWallet } =
    useWeb3();
  const [showMenu, setShowMenu] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-200 border-2 border-gray-300 hover:border-gray-400 text-sm flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
          <span>{isLoading ? "Connecting..." : "Connect"}</span>
        </button>
      ) : (
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm ${
              chainId === 11155111
                ? "bg-green-50 border border-green-200 text-green-900 hover:bg-green-100"
                : "bg-red-50 border border-red-200 text-red-900 hover:bg-red-100"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${chainId === 11155111 ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="font-mono font-medium">{formatAddress(account!)}</span>
            <svg className={`w-4 h-4 transition-transform ${showMenu ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Network</p>
                <p className="text-sm font-medium">
                  {chainId === 11155111 ? (
                    <span className="text-green-600">Sepolia Testnet</span>
                  ) : (
                    <span className="text-red-600">Wrong Network</span>
                  )}
                </p>
              </div>

              {chainId !== 11155111 && (
                <div className="px-4 py-2">
                  <button
                    onClick={() => {
                      switchToSepolia();
                      setShowMenu(false);
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded transition"
                  >
                    Switch to Sepolia
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  disconnectWallet();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
