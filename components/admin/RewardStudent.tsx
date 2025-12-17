"use client";

import { useState, useEffect } from "react";
import { useActivityManager, Activity } from "@/hooks/useActivityManager";

export const RewardStudent: React.FC = () => {
  const { rewardStudent, getAllActivities, isLoading, error } = useActivityManager();
  const [activityId, setActivityId] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoadingActivities(true);
      const allActivities = await getAllActivities();
      setActivities(allActivities);
      setLoadingActivities(false);
    };

    fetchActivities();
  }, []);

  const handleActivityIdChange = (id: string) => {
    setActivityId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const id = parseInt(activityId);
    if (isNaN(id) || id <= 0) {
      return;
    }

    if (!studentAddress.trim() || !studentAddress.startsWith("0x")) {
      return;
    }

    const success = await rewardStudent(id, studentAddress);

    if (success) {
      setSuccessMessage(
        `Successfully rewarded student ${studentAddress.substring(0, 10)}... for activity #${id}`
      );
      setActivityId("");
      setStudentAddress("");
      setActivityInfo("");

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center">
        <span className="w-5 h-5 bg-green-100 rounded flex items-center justify-center mr-2">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Reward Student
      </h2>
      <p className="text-xs text-gray-600 mb-5">
        Give Campus Points to students who participated in an activity.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity Selection */}
        <div>
          <label htmlFor="activityId" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Pilih Kegiatan
          </label>
          {loadingActivities ? (
            <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
              Memuat kegiatan...
            </div>
          ) : activities.length === 0 ? (
            <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
              Belum ada kegiatan tersedia
            </div>
          ) : (
            <select
              id="activityId"
              value={activityId}
              onChange={(e) => handleActivityIdChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-sm text-gray-900"
              required
            >
              <option value="">-- Pilih Kegiatan --</option>
              {activities.map((activity) => (
                <option key={activity.id.toString()} value={activity.id.toString()}>
                  ID {activity.id.toString()} - {activity.name} ({activity.pointReward.toString()} poin) {activity.isActive ? "✓" : "(Tidak Aktif)"}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Student Address */}
        <div>
          <label
            htmlFor="studentAddress"
            className="block text-xs font-semibold text-gray-700 mb-1.5"
          >
            Student Wallet Address
          </label>
          <input
            id="studentAddress"
            type="text"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-mono text-sm transition text-gray-900"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Ethereum address of the student to receive points
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-xs text-red-800 font-semibold">Error</p>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !activityId || !studentAddress}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-4 w-4 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Rewarding Student...
            </span>
          ) : (
            "Reward Student"
          )}
        </button>
      </form>
    </div>
  );
};
