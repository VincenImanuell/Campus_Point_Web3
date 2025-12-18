"use client";

import { useState, useEffect } from "react";
import { Contract, EventLog } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { ACTIVITY_MANAGER_ABI } from "@/contracts/ActivityManagerABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";
import { CardSkeleton } from "./skeletons/CardSkeleton"; // Import Skeleton

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
  const [isLoading, setIsLoading] = useState(true); // Default loading true

  useEffect(() => {
    const fetchNFTActivities = async () => {
      if (!provider || !account) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const contract = new Contract(CONTRACT_ADDRESSES.ACTIVITY_MANAGER, ACTIVITY_MANAGER_ABI, provider);
        const filter = contract.filters.CertificateMinted(null, account);
        const events = await contract.queryFilter(filter);

        const activities: NFTActivity[] = [];
        for (const event of events) {
          if (event instanceof EventLog) {
            const activityId = event.args.activityId.toString();
            const tokenId = event.args.tokenId.toString();
            const uri = event.args.uri;
            const activity = await contract.getActivity(activityId);

            activities.push({
              tokenId: tokenId || "",
              activityId: activityId || "",
              activityName: activity.name || "",
              points: activity.pointReward.toString() || "0",
              uri: uri || "",
            });
          }
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

  if (!account) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>My Certificates</span>
        </h2>
        <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
          {nftActivities.length} Collected
        </span>
      </div>

      <div className="p-6">
        {isLoading ? (
          // SKELETON LOADING STATE
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
            <div className="flex space-x-4 min-w-max">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : nftActivities.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No certificates found.</p>
          </div>
        ) : (
          // DATA REAL
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
            <div className="flex space-x-4 min-w-max">
              {nftActivities.map((nft, index) => (
                <div key={nft.tokenId} className="w-72 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 p-4 border-b border-slate-800 relative">
                    <div className="absolute top-3 right-3">
                        <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20">
                            +{nft.points} PTS
                        </span>
                    </div>
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-mono text-slate-300 mb-3 border border-slate-700">
                      #{index + 1}
                    </div>
                    <h3 className="font-bold text-white text-md line-clamp-2 h-12 leading-tight">
                      {nft.activityName}
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                        <span>Token ID</span>
                        <span className="font-mono text-slate-200">#{nft.tokenId}</span>
                    </div>
                    {nft.uri && (
                      <a
                        href={nft.uri.startsWith("ipfs://") ? `https://ipfs.io/ipfs/${nft.uri.replace("ipfs://", "")}` : nft.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                      >
                        View Metadata
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};