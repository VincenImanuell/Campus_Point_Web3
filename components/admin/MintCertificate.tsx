"use client";

import { useState } from "react";
import { useActivityManager } from "@/hooks/useActivityManager";

export const MintCertificate: React.FC = () => {
  const { mintCertificate, getActivity, isLoading, error } = useActivityManager();
  const [activityId, setActivityId] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activityInfo, setActivityInfo] = useState<string>("");

  const handleActivityIdChange = async (id: string) => {
    setActivityId(id);
    setActivityInfo("");

    if (id && !isNaN(parseInt(id))) {
      const activity = await getActivity(parseInt(id));
      if (activity && activity.id > 0) {
        setActivityInfo(
          `${activity.name} - ${activity.pointReward.toString()} points ${activity.isActive ? "✓" : "(Inactive)"
          }`
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const id = parseInt(activityId);
    if (isNaN(id) || id <= 0) {
      return;
    }

    if (!studentAddress.trim() || !studentAddress.startsWith("0x")) {
      return;
    }

    if (!tokenURI.trim()) {
      return;
    }

    const success = await mintCertificate(id, studentAddress, tokenURI);

    if (success) {
      setSuccessMessage(
        `Successfully minted certificate for ${studentAddress.substring(0, 10)}... (Activity #${id})`
      );
      setActivityId("");
      setStudentAddress("");
      setTokenURI("");
      setActivityInfo("");

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center">
        <span className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2">
          <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Mint Certificate
      </h2>
      <p className="text-xs text-gray-600 mb-5">
        Issue NFT certificates to students who completed an activity.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity ID */}
        <div>
          <label htmlFor="certActivityId" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Activity ID
          </label>
          <input
            id="certActivityId"
            type="number"
            value={activityId}
            onChange={(e) => handleActivityIdChange(e.target.value)}
            placeholder="e.g., 1"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-sm text-gray-900"
            required
          />
          {activityInfo && (
            <p className="text-xs text-purple-600 mt-1.5 font-medium">{activityInfo}</p>
          )}
        </div>

        {/* Student Address */}
        <div>
          <label
            htmlFor="certStudentAddress"
            className="block text-xs font-semibold text-gray-700 mb-1.5"
          >
            Student Wallet Address
          </label>
          <input
            id="certStudentAddress"
            type="text"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm transition text-gray-900"
            required
          />
        </div>

        {/* Token URI */}
        <div>
          <label htmlFor="tokenURI" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Token URI (Metadata)
          </label>
          <input
            id="tokenURI"
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            placeholder="ipfs://......., or https://......"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm transition text-gray-900"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            IPFS URI or URL pointing to the certificate metadata JSON
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-xs text-red-800 font-semibold">Error</p>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !activityId || !studentAddress || !tokenURI}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-4 w-4 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Minting Certificate...
            </span>
          ) : (
            "Mint Certificate"
          )}
        </button>
      </form>
    </div>
  );
};
