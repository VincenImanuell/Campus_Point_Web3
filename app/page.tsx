"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WalletConnect } from "@/components/WalletConnect";
import { TokenBalance } from "@/components/TokenBalance";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useActivityManager } from "@/hooks/useActivityManager";
import { StudentNFTActivities } from "@/components/StudentNFTActivities";
import { CertificateViewer } from "@/components/CertificateViewer";

export default function Home() {
  const router = useRouter();
  const { isOwner } = useActivityManager();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isOwner();
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, [isOwner]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#020617] text-slate-200">
        <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" /></svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Campus Point</h1>
                <p className="text-xs text-slate-400 font-medium">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <WalletConnect />
              {isAdmin && (
                <button onClick={() => router.push("/admin")} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium py-2 px-4 rounded-lg transition-all text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <TokenBalance />
              <CertificateViewer />
            </div>
            <div className="lg:col-span-2">
              <StudentNFTActivities />
            </div>
          </section>

          <div className="pt-8 border-t border-slate-800">
            <h2 className="text-lg font-semibold mb-6 text-slate-200">Ecosystem Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                { title: "CampusPoint", sub: "ERC20 Token", desc: "Utility token for rewards.", icon: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" },
                { title: "ActivityCertificate", sub: "ERC721 NFT", desc: "Digital proof of achievement.", icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" },
                { title: "ActivityManager", sub: "Core Logic", desc: "System orchestrator.", icon: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948z" }
              ].map((i,x) => (
                <div key={x} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d={i.icon}/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100">{i.title}</h3>
                      <span className="text-[10px] text-indigo-400 font-mono uppercase">{i.sub}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}