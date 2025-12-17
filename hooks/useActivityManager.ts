import { useState } from "react";
import { Contract } from "ethers";
import { useWeb3 } from "@/contexts/Web3Context";
import { ACTIVITY_MANAGER_ABI } from "@/contracts/ActivityManagerABI";
import { CONTRACT_ADDRESSES } from "@/contracts/config";

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
      await tx.wait();
      return true;
    } catch (err: any) {
      console.error("Error creating activity:", err);
      setError(err.message || "Failed to create activity");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get activity details
  const getActivity = async (activityId: number): Promise<Activity | null> => {
    setIsLoading(true);
    setError(null);
    try {
      if (!provider) throw new Error("Provider not available");
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
      console.error("Error getting activity:", err);
      setError(err.message || "Failed to get activity");
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
      console.error("Error rewarding student:", err);
      setError(err.message || "Failed to reward student");
      return false;
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
      console.error("Error minting certificate:", err);
      setError(err.message || "Failed to mint certificate");
      return false;
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
      console.error("Error setting activity status:", err);
      setError(err.message || "Failed to set activity status");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get next activity ID
  const getNextActivityId = async (): Promise<number | null> => {
    try {
      if (!provider) throw new Error("Provider not available");
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

  // Get contract owner
  const getOwner = async (): Promise<string | null> => {
    try {
      if (!provider) throw new Error("Provider not available");
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

  // Check if current account is owner
  const isOwner = async (): Promise<boolean> => {
    if (!account) return false;
    const owner = await getOwner();
    return owner?.toLowerCase() === account.toLowerCase();
  };

  // Get all activities
  const getAllActivities = async (): Promise<Activity[]> => {
    try {
      if (!provider) throw new Error("Provider not available");
      const contract = new Contract(
        CONTRACT_ADDRESSES.ACTIVITY_MANAGER,
        ACTIVITY_MANAGER_ABI,
        provider
      );

      const nextId = await contract.nextActivityId();
      const nextIdNumber = Number(nextId);

      const activities: Activity[] = [];

      // Fetch all activities from ID 1 to nextActivityId - 1
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
