"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WalletConnect } from "@/components/WalletConnect";
import { TokenBalance } from "@/components/TokenBalance";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useActivityManager } from "@/hooks/useActivityManager";
import { StudentNFTActivities } from "@/components/StudentNFTActivities";

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
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Campus Point System</h1>
                  <p className="text-xs text-gray-600">Dashboard Mahasiswa</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Wallet Connection */}
                <WalletConnect />

                {/* Admin Dashboard Button */}
                {isAdmin && (
                  <button
                    onClick={() => router.push("/admin")}
                    className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-medium py-2.5 px-5 rounded-lg transition duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>Admin Dashboard</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Token Balance - Compact */}
          <TokenBalance />

          {/* Student NFT Activities */}
          <StudentNFTActivities />

          {/* Smart Contract Architecture */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Arsitektur Smart Contract</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1e3a8a] transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">CampusPoint<br />(ERC20)</h3>
                <p className="text-xs text-gray-600">
                  CampusPoint is a new-in campuspoint (ERC20).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1e3a8a] transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ActivityCertificate<br />(ERC721)</h3>
                <p className="text-xs text-gray-600">
                  NFT sertifikat untuk setiap aktivitas kampus yang diikuti.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1e3a8a] transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ActivityManager</h3>
                <p className="text-xs text-gray-600">
                  Mengelola aktivitas, reward poin, dan distribusi sertifikat.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-xs text-gray-500">
              Web3 Campus Point System - Universitas Kristen Duta Wacana 2025
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
