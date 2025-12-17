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
  const { isOwner, getOwner } = useActivityManager();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [ownerAddress, setOwnerAddress] = useState<string>("");

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isOwner();
      const owner = await getOwner();
      setIsAdmin(adminStatus);
      setOwnerAddress(owner || "");

      // Redirect to student dashboard if not admin
      if (!adminStatus) {
        router.push("/");
      }
    };

    if (account) {
      checkAdmin();
    }
  }, [account]);

  // Show loading while checking admin status
  if (isAdmin === null) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Checking admin access...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Show access denied if not admin
  if (isAdmin === false) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have admin privileges to access this page.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

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
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs text-gray-600">Kelola aktivitas, reward, dan sertifikat</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Admin Address Badge */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-700">
                    <span className="font-semibold">Admin:</span>{" "}
                    <code className="text-[#1e3a8a]">
                      {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                    </code>
                  </span>
                </div>

                <button
                  onClick={() => router.push("/")}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-5 rounded-lg transition duration-200 border-2 border-gray-300 hover:border-gray-400"
                >
                  Student View
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Activity List - Full Width */}
            <ActivityList />

            {/* Create Activity - Full Width */}
            <CreateActivity />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reward Student */}
              <RewardStudent />

              {/* Mint Certificate */}
              <MintCertificate />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-xs text-gray-500">
              Web3 Campus Point System - Admin Panel
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
