"use client";

import React, { useState } from "react";
import { useActivityCertificate } from "@/hooks/useActivityCertificate";
import { useWeb3 } from "@/contexts/Web3Context";

export const CertificateViewer: React.FC = () => {
  const { isConnected } = useWeb3();
  const { certificate, isLoading, error, fetchCertificateByTokenId } = useActivityCertificate();
  const [tokenIdInput, setTokenIdInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenIdInput.trim()) fetchCertificateByTokenId(tokenIdInput.trim());
  };

  if (!isConnected) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-100">Certificate Verifier</h2>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={tokenIdInput}
          onChange={(e) => setTokenIdInput(e.target.value)}
          placeholder="Enter Token ID (e.g. 1)"
          className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-slate-600 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !tokenIdInput.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:shadow-none"
        >
          {isLoading ? "Checking..." : "Verify"}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      )}

      {certificate && (
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-sm font-bold uppercase tracking-wider">Verified Certificate</h3>
            </div>

            <div className="grid gap-4 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Token ID</span>
                <span className="font-mono text-slate-200">#{certificate.tokenId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Owner</span>
                <span className="font-mono text-indigo-400 text-xs">{certificate.owner}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Metadata URI</span>
                <div className="bg-slate-900 p-2 rounded border border-slate-800 text-xs font-mono text-slate-400 break-all">
                    {certificate.tokenURI}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-800">
               <a 
                 href={certificate.tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")} 
                 target="_blank" 
                 className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center space-x-1"
               >
                 <span>View Raw Metadata</span>
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};