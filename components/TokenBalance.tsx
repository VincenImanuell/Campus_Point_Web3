"use client";

import React from "react";
import { useCampusPoint } from "@/hooks/useCampusPoint";
import { useWeb3 } from "@/contexts/Web3Context";

export const TokenBalance: React.FC = () => {
  const { isConnected } = useWeb3();
  const { balance, tokenName, tokenSymbol, isLoading, error, refreshBalance } = useCampusPoint();

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Campus Points Balance</h2>
        <p className="text-sm text-gray-600">Please connect your wallet to view your balance.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Campus Points Balance</h2>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold text-sm">Error:</p>
          <p className="text-xs">{error}</p>
          <p className="text-xs mt-2 text-gray-600">
            Make sure the contract address is correctly set in contracts/config.ts
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="flex items-baseline justify-center space-x-2">
              <span className="text-5xl font-bold text-blue-500">
                {parseFloat(balance).toFixed(2)}
              </span>
              <span className="text-xl text-gray-600 font-medium">
                {tokenSymbol || "CPNT"}
              </span>
            </div>

            {tokenName && (
              <p className="text-xs text-gray-500 mt-2">Token: {tokenName}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={refreshBalance}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
