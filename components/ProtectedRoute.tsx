"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/contexts/Web3Context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected, account, chainId, isLoading } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isConnected || !account || chainId !== 11155111) {
      router.push("/login");
    }
  }, [isConnected, account, chainId, isLoading, router]);

  if (isLoading || !isConnected || !account || chainId !== 11155111) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-slate-800 rounded-full"></div>
          <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-slate-400 text-sm font-medium tracking-wide animate-pulse">AUTHENTICATING</p>
      </div>
    );
  }

  return <>{children}</>;
};