"use client";

import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { ACTIVITY_MANAGER_ABI } from "@/contracts/ActivityManagerABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";

interface NFTActivity {
  tokenId: string;
  activityId: string;
  activityName: string;
  points: string;
  uri: string;
}

export const StudentNFTActivities: React.FC = () => {
  const { provider, account } = useWeb3();
  const [nftActivities, setNftActivities] = useState<NFTActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNFTActivities = async () => {
      if (!provider || !account) return;

      setIsLoading(true);
      try {
        const contract = new Contract(
          CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
          ACTIVITY_MANAGER_ABI,
          provider
        );

        // Get CertificateMinted events for this student
        const filter = contract.filters.CertificateMinted(null, account);
        const events = await contract.queryFilter(filter);

        // Fetch activity details for each certificate
        const activities: NFTActivity[] = [];
        for (const event of events) {
          const activityId = event.args?.activityId.toString();
          const tokenId = event.args?.tokenId.toString();
          const uri = event.args?.uri;

          // Get activity details
          const activity = await contract.getActivity(activityId);

          activities.push({
            tokenId: tokenId || "",
            activityId: activityId || "",
            activityName: activity.name || "",
            points: activity.pointReward.toString() || "0",
            uri: uri || "",
          });
        }

        setNftActivities(activities);
      } catch (error) {
        console.error("Error fetching NFT activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTActivities();
  }, [provider, account]);

  // Don't render if no wallet connected
  if (!account) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">NFT Kegiatan Saya</h2>
              <p className="text-xs text-blue-100">Sertifikat digital dari aktivitas kampus</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{nftActivities.length}</div>
            <div className="text-xs text-blue-100">Total NFT</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mb-4"></div>
            <p className="text-gray-600 text-sm">Memuat NFT...</p>
          </div>
        ) : nftActivities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Belum Ada NFT</h3>
            <p className="text-gray-600 text-sm">
              Anda belum memiliki sertifikat NFT dari kegiatan kampus
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Scrollable Container */}
            <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="flex space-x-4 min-w-max">
                {nftActivities.map((nft, index) => (
                  <div
                    key={nft.tokenId}
                    className="flex-shrink-0 w-72 bg-gradient-to-br from-white to-blue-50 border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#1e3a8a] hover:shadow-lg transition-all duration-200"
                  >
                    {/* Card Header */}
                    <div className="bg-[#1e3a8a] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">#{index + 1}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white font-bold text-sm">{nft.points}</span>
                          <span className="text-white/80 text-xs">poin</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-base line-clamp-2 min-h-[3rem]">
                        {nft.activityName}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Token ID:</span>
                          <code className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-mono">
                            {nft.tokenId}
                          </code>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Activity ID:</span>
                          <span className="font-mono text-gray-700">{nft.activityId}</span>
                        </div>
                      </div>

                      {/* View Metadata Button */}
                      {nft.uri && (
                        <a
                          href={nft.uri.startsWith("ipfs://") ? `https://ipfs.io/ipfs/${nft.uri.replace("ipfs://", "")}` : nft.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            <span>Lihat Metadata</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            {nftActivities.length > 4 && (
              <div className="flex justify-center mt-2">
                <p className="text-xs text-gray-500 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                  <span>Scroll untuk melihat lebih banyak</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
