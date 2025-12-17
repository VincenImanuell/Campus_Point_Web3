"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/contexts/Web3Context";
import { useActivityManager } from "@/hooks/useActivityManager";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CreateActivity } from "@/components/admin/CreateActivity";
import { RewardStudent } from "@/components/admin/RewardStudent";
import { MintCertificate } from "@/components/admin/MintCertificate";
import { ActivityList } from "@/components/admin/ActivityList";

export default function AdminPage() {
  const { account } = useWeb3();
  const { isOwner } = useActivityManager();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isOwner();
      setIsAdmin(adminStatus);
      if (adminStatus === false) router.push("/");
    };
    if (account) checkAdmin();
  }, [account, isOwner, router]);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] text-slate-200">
        <header className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-rose-500/10 text-rose-500 rounded-lg flex items-center justify-center border border-rose-500/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h1 className="font-bold text-lg text-slate-100">Admin Console</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-full text-slate-400 border border-slate-700">
                {account?.substring(0,6)}...{account?.substring(38)}
              </span>
              <button onClick={() => router.push("/")} className="text-sm text-slate-400 hover:text-white transition font-medium">Exit View</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <ActivityList />
          <CreateActivity />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RewardStudent />
            <MintCertificate />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}