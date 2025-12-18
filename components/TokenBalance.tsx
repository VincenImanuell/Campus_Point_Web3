"use client";

import React from "react";
import { useCampusPoint } from "@/hooks/useCampusPoint";
import { useWeb3 } from "@/contexts/Web3Context";

export const TokenBalance: React.FC = () => {
  const { isConnected } = useWeb3();
  const { balance, tokenSymbol, isLoading, error, refreshBalance } = useCampusPoint();

  if (!isConnected) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Balance</p>
          {error ? (
            <p className="text-sm text-red-400">Error loading data</p>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white tracking-tight">
                {parseFloat(balance).toFixed(2)}
              </span>
              <span className="text-lg font-bold text-indigo-400">
                {tokenSymbol || "CPNT"}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={refreshBalance}
          disabled={isLoading}
          className="p-2 bg-slate-700/50 hover:bg-indigo-600/20 hover:text-indigo-400 text-slate-400 rounded-xl transition-all disabled:opacity-50"
        >
          <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};