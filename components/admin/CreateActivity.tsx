"use client";

import { useState } from "react";
import { useActivityManager } from "@/hooks/useActivityManager";

export const CreateActivity: React.FC = () => {
  const { createActivity, isLoading, error } = useActivityManager();
  const [activityName, setActivityName] = useState("");
  const [pointReward, setPointReward] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!activityName.trim()) {
      return;
    }

    const points = parseInt(pointReward);
    if (isNaN(points) || points <= 0) {
      return;
    }

    const success = await createActivity(activityName, points);

    if (success) {
      setSuccessMessage(`Activity "${activityName}" created successfully!`);
      setActivityName("");
      setPointReward("");

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center">
        <span className="text-blue-500 mr-2">+</span>
        Create New Activity
      </h2>
      <p className="text-xs text-gray-600 mb-5">
        Register a new campus activity with point rewards for participating students.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity Name */}
        <div>
          <label htmlFor="activityName" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Activity Name
          </label>
          <input
            id="activityName"
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="e.g., Web3 Workshop 2025"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm text-gray-900"
            required
          />
        </div>

        {/* Point Reward */}
        <div>
          <label htmlFor="pointReward" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Point Reward
          </label>
          <input
            id="pointReward"
            type="number"
            value={pointReward}
            onChange={(e) => setPointReward(e.target.value)}
            placeholder="e.g., 100"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm text-gray-900"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Points that students will receive for participating in this activity
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
          disabled={isLoading || !activityName.trim() || !pointReward}
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
              Creating Activity...
            </span>
          ) : (
            "Create Activity"
          )}
        </button>
      </form>
    </div>
  );
};
