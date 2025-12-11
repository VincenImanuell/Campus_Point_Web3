"use client";

import { useState } from "react";
import { Contract } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { ACTIVITY_CERTIFICATE_ABI } from "@/contracts/ActivityCertificateABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";

interface Certificate {
  tokenId: string;
  owner: string;
  tokenURI: string;
}

export const useActivityCertificate = () => {
  const { provider, account } = useWeb3();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificateByTokenId = async (tokenId: string) => {
    setIsLoading(true);
    setError(null);
    setCertificate(null);

    try {
      if (!provider) {
        throw new Error("Wallet not connected");
      }

      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_CERTIFICATE,
        ACTIVITY_CERTIFICATE_ABI,
        provider
      );

      // Get owner of the token
      const owner = await contract.ownerOf(tokenId);

      // Get token URI (metadata)
      const tokenURI = await contract.tokenURI(tokenId);

      setCertificate({
        tokenId,
        owner,
        tokenURI,
      });
    } catch (err: any) {
      console.error("Failed to fetch certificate:", err);
      setError(err.message || "Failed to fetch certificate. Token ID might not exist.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserCertificateCount = async (): Promise<number> => {
    try {
      if (!provider || !account) {
        throw new Error("Wallet not connected");
      }

      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_CERTIFICATE,
        ACTIVITY_CERTIFICATE_ABI,
        provider
      );

      const balance = await contract.balanceOf(account);
      return Number(balance);
    } catch (err: any) {
      console.error("Failed to get certificate count:", err);
      return 0;
    }
  };

  const getUserCertificateByIndex = async (index: number): Promise<string | null> => {
    try {
      if (!provider || !account) {
        throw new Error("Wallet not connected");
      }

      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_CERTIFICATE,
        ACTIVITY_CERTIFICATE_ABI,
        provider
      );

      const tokenId = await contract.tokenOfOwnerByIndex(account, index);
      return tokenId.toString();
    } catch (err: any) {
      console.error("Failed to get certificate by index:", err);
      return null;
    }
  };

  return {
    certificate,
    isLoading,
    error,
    fetchCertificateByTokenId,
    getUserCertificateCount,
    getUserCertificateByIndex,
  };
};
