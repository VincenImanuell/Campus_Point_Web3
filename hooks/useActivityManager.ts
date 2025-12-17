import { useState } from "react";
import { Contract } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { ACTIVITY_MANAGER_ABI } from "@/contracts/ActivityManagerABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";
import { getReadableError } from "@/utils/web3Errors"; // Import util

export interface Activity {
  id: bigint;
  name: string;
  pointReward: bigint;
  isActive: boolean;
}

export const useActivityManager = () => {
  const { provider, account } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContract = async () => {
    if (!provider) throw new Error("Provider not available");
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESSES.ACTIVITY_MANAGER, ACTIVITY_MANAGER_ABI, signer);
  };

  // Create new activity (Admin only)
  const createActivity = async (name: string, pointReward: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const tx = await contract.createActivity(name, pointReward);
      await tx.wait(); // Menunggu konfirmasi blockchain
      return true;
    } catch (err: any) {
      const readableMsg = getReadableError(err);
      console.error("Error creating activity:", err);
      setError(readableMsg);
      // Kita throw error agar bisa ditangkap oleh komponen UI untuk menampilkan Toast
      throw new Error(readableMsg); 
    } finally {
      setIsLoading(false);
    }
  };

  // Get activity details
  const getActivity = async (activityId: number): Promise<Activity | null> => {
    setIsLoading(true);
    setError(null);
    try {
      if (!provider) throw new Error("Wallet not connected");
      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
        ACTIVITY_MANAGER_ABI,
        provider
      );
      const result = await contract.getActivity(activityId);

      return {
        id: result[0],
        name: result[1],
        pointReward: result[2],
        isActive: result[3],
      };
    } catch (err: any) {
      const readableMsg = getReadableError(err);
      console.error("Error getting activity:", err);
      setError(readableMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Reward student with points (Admin only)
  const rewardStudent = async (activityId: number, studentAddress: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const tx = await contract.rewardStudent(activityId, studentAddress);
      await tx.wait();
      return true;
    } catch (err: any) {
      const readableMsg = getReadableError(err);
      console.error("Error rewarding student:", err);
      setError(readableMsg);
      throw new Error(readableMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Mint certificate for student (Admin only)
  const mintCertificate = async (
    activityId: number,
    studentAddress: string,
    tokenURI: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const tx = await contract.mintCertificate(activityId, studentAddress, tokenURI);
      await tx.wait();
      return true;
    } catch (err: any) {
      const readableMsg = getReadableError(err);
      console.error("Error minting certificate:", err);
      setError(readableMsg);
      throw new Error(readableMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Set activity active/inactive (Admin only)
  const setActivityActive = async (activityId: number, active: boolean): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const tx = await contract.setActivityActive(activityId, active);
      await tx.wait();
      return true;
    } catch (err: any) {
      const readableMsg = getReadableError(err);
      console.error("Error setting activity status:", err);
      setError(readableMsg);
      throw new Error(readableMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextActivityId = async (): Promise<number | null> => {
    try {
      if (!provider) return null;
      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
        ACTIVITY_MANAGER_ABI,
        provider
      );
      const nextId = await contract.nextActivityId();
      return Number(nextId);
    } catch (err: any) {
      console.error("Error getting next activity ID:", err);
      return null;
    }
  };

  const getOwner = async (): Promise<string | null> => {
    try {
      if (!provider) return null;
      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
        ACTIVITY_MANAGER_ABI,
        provider
      );
      const owner = await contract.owner();
      return owner;
    } catch (err: any) {
      console.error("Error getting owner:", err);
      return null;
    }
  };

  const isOwner = async (): Promise<boolean> => {
    if (!account) return false;
    const owner = await getOwner();
    return owner?.toLowerCase() === account.toLowerCase();
  };

  const getAllActivities = async (): Promise<Activity[]> => {
    try {
      if (!provider) return [];
      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
        ACTIVITY_MANAGER_ABI,
        provider
      );

      const nextId = await contract.nextActivityId();
      const nextIdNumber = Number(nextId);
      const activities: Activity[] = [];

      for (let i = 1; i < nextIdNumber; i++) {
        try {
          const result = await contract.getActivity(i);
          activities.push({
            id: result[0],
            name: result[1],
            pointReward: result[2],
            isActive: result[3],
          });
        } catch (err) {
          console.error(`Error fetching activity ${i}:`, err);
        }
      }
      return activities;
    } catch (err: any) {
      console.error("Error getting all activities:", err);
      return [];
    }
  };

  return {
    isLoading,
    error,
    createActivity,
    getActivity,
    rewardStudent,
    mintCertificate,
    setActivityActive,
    getNextActivityId,
    getOwner,
    isOwner,
    getAllActivities,
  };
};