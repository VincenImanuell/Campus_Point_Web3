"use client";

import { useState, useEffect } from "react";
import { Contract, formatUnits } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { CAMPUS_POINT_ABI } from "@/contracts/CampusPointABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";

export const useCampusPoint = () => {
  const { provider, account, isConnected } = useWeb3();
  const [balance, setBalance] = useState<string>("0");
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [decimals, setDecimals] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && account && provider) {
      fetchTokenInfo();
      fetchBalance();
    } else {
      setBalance("0");
      setTokenName("");
      setTokenSymbol("");
      setDecimals(null);
    }
  }, [isConnected, account, provider]);

  const fetchTokenInfo = async () => {
    try {
      if (!provider) return;

      const contract = new Contract(
        CONTRACT_ADDRESSES.CAMPUS_POINT,
        CAMPUS_POINT_ABI,
        provider
      );

      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimalsValue = await contract.decimals();

      setTokenName(name);
      setTokenSymbol(symbol);
      setDecimals(Number(decimalsValue));
    } catch (err: any) {
      console.error("Failed to fetch token info:", err);
      setError(err.message);
    }
  };

  const fetchBalance = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!provider || !account) {
        throw new Error("Wallet not connected");
      }

      const contract = new Contract(
        CONTRACT_ADDRESSES.CAMPUS_POINT,
        CAMPUS_POINT_ABI,
        provider
      );

      const balanceWei = await contract.balanceOf(account);

      // Get decimals if not already fetched
      let decimalsToUse = decimals;
      if (decimalsToUse === null) {
        const decimalsValue = await contract.decimals();
        decimalsToUse = Number(decimalsValue);
        setDecimals(decimalsToUse);
      }

      const balanceFormatted = formatUnits(balanceWei, decimalsToUse);

      setBalance(balanceFormatted);
    } catch (err: any) {
      console.error("Failed to fetch balance:", err);
      setError(err.message);
      setBalance("0");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = () => {
    fetchBalance();
  };

  return {
    balance,
    tokenName,
    tokenSymbol,
    isLoading,
    error,
    refreshBalance,
  };
};
