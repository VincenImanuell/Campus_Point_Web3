"use client";

import React from "react";
import { useCampusPoint } from "@/hooks/useCampusPoint";
import { useWeb3 } from "@/contexts/Web3Context";

export const TokenBalance: React.FC = () => {
  const { isConnected } = useWeb3();
  const { balance, tokenName, tokenSymbol, isLoading, error, refreshBalance } = useCampusPoint();

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-600 text-center">Connect wallet untuk melihat poin</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Campus Points Balance</p>
          {error ? (
            <p className="text-sm text-red-600">Error loading balance</p>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[#1e3a8a]">
                {parseFloat(balance).toFixed(2)}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {tokenSymbol || "CPNT"}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={refreshBalance}
          disabled={isLoading}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          title="Refresh balance"
        >
          <svg className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
