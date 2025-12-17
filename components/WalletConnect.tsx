"use client";

import React, { useState } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { switchToSepolia } from "@/contracts/config";

export const WalletConnect: React.FC = () => {
  const { account, chainId, isConnected, isLoading, connectWallet, disconnectWallet } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);

  const formatAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  return (
    <div className="relative">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm border ${
              chainId === 11155111
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${chainId === 11155111 ? "bg-emerald-400" : "bg-red-400"}`}></div>
            <span className="font-mono font-medium">{formatAddress(account!)}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 py-1 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Network</p>
                {chainId === 11155111 ? (
                    <span className="text-emerald-400 text-xs font-bold">Sepolia Testnet</span>
                  ) : (
                    <span className="text-red-400 text-xs font-bold">Wrong Network</span>
                )}
              </div>

              {chainId !== 11155111 && (
                <div className="p-2">
                  <button onClick={() => { switchToSepolia(); setShowMenu(false); }} className="w-full bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 text-xs font-medium py-2 rounded-lg transition">
                    Switch to Sepolia
                  </button>
                </div>
              )}

              <button onClick={() => { disconnectWallet(); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-xs text-red-400 hover:bg-slate-800 transition">
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};