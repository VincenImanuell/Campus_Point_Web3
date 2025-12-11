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
    if (tokenIdInput.trim()) {
      fetchCertificateByTokenId(tokenIdInput.trim());
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Certificate Viewer</h2>
        <p className="text-sm text-gray-600">Please connect your wallet to view certificates.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Certificate Viewer</h2>

      <form onSubmit={handleSearch} className="space-y-3">
        <div>
          <label htmlFor="tokenIdInput" className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Token ID
          </label>
          <input
            id="tokenIdInput"
            type="text"
            value={tokenIdInput}
            onChange={(e) => setTokenIdInput(e.target.value)}
            placeholder="e.g., 1, 2, 3..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !tokenIdInput.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200"
        >
          {isLoading ? "Loading..." : "View Certificate"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
          <p className="font-semibold text-sm">Error:</p>
          <p className="text-xs">{error}</p>
        </div>
      )}

      {certificate && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200 mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-base font-bold text-purple-900">Certificate Details</h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-700 font-semibold mb-1">Token ID:</p>
              <p className="text-sm font-mono bg-white px-3 py-2 rounded border border-purple-200 text-gray-900">
                {certificate.tokenId}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-700 font-semibold mb-1">Owner Address:</p>
              <p className="text-xs font-mono bg-white px-3 py-2 rounded border border-purple-200 break-all text-gray-900">
                {certificate.owner}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-700 font-semibold mb-1">Token URI (Metadata):</p>
              <div className="bg-white px-3 py-2 rounded border border-purple-200">
                {certificate.tokenURI.startsWith("http") ? (
                  <a
                    href={certificate.tokenURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-xs break-all font-medium"
                  >
                    {certificate.tokenURI}
                  </a>
                ) : (
                  <p className="text-xs font-mono break-all text-gray-900">{certificate.tokenURI}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!certificate && !error && !isLoading && (
        <div className="text-center py-8 mt-4">
          <svg
            className="w-20 h-20 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
            <circle cx="17" cy="17" r="3" strokeWidth={1.5} />
          </svg>
          <p className="text-sm text-gray-500">Enter a Token ID to view certificate details.</p>
        </div>
      )}
    </div>
  );
};
