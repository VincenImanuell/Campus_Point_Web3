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
    // Wait for initial loading to complete
    if (isLoading) return;

    // Redirect to login if not connected or wrong network
    if (!isConnected || !account || chainId !== 11155111) {
      router.push("/login");
    }
  }, [isConnected, account, chainId, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading || !isConnected || !account || chainId !== 11155111) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};
