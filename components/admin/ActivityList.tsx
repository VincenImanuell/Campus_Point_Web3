"use client";

import { useState, useEffect } from "react";
import { useActivityManager, Activity } from "@/hooks/useActivityManager";

export const ActivityList: React.FC = () => {
  const { getAllActivities, setActivityActive, isLoading, error } = useActivityManager();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoadingActivities(true);
    const allActivities = await getAllActivities();
    setActivities(allActivities);
    setLoadingActivities(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleToggleActive = async (activityId: number, currentStatus: boolean) => {
    setTogglingId(activityId.toString());
    const success = await setActivityActive(activityId, !currentStatus);
    if (success) {
      await fetchActivities();
    }
    setTogglingId(null);
  };

  const activeActivities = activities.filter((a) => a.isActive);
  const inactiveActivities = activities.filter((a) => !a.isActive);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Daftar Kegiatan</h2>
              <p className="text-xs text-blue-100">Kelola semua aktivitas kampus</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{activities.length}</div>
            <div className="text-xs text-blue-100">Total Kegiatan</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loadingActivities ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mb-4"></div>
            <p className="text-gray-600 text-sm">Memuat kegiatan...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Belum Ada Kegiatan</h3>
            <p className="text-gray-600 text-sm">Buat kegiatan pertama Anda menggunakan form di atas</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Activities */}
            {activeActivities.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Kegiatan Aktif ({activeActivities.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {activeActivities.map((activity) => (
                    <div
                      key={activity.id.toString()}
                      className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">#{activity.id.toString()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate">
                            {activity.name}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-semibold text-gray-700">
                                {activity.pointReward.toString()} poin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleActive(Number(activity.id), activity.isActive)}
                        disabled={togglingId === activity.id.toString()}
                        className="px-4 py-2 bg-white border border-green-300 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 disabled:opacity-50 transition-all"
                      >
                        {togglingId === activity.id.toString() ? "..." : "Nonaktifkan"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inactive Activities */}
            {inactiveActivities.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Kegiatan Tidak Aktif ({inactiveActivities.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {inactiveActivities.map((activity) => (
                    <div
                      key={activity.id.toString()}
                      className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">#{activity.id.toString()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-600 text-sm truncate">
                            {activity.name}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-semibold text-gray-500">
                                {activity.pointReward.toString()} poin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleActive(Number(activity.id), activity.isActive)}
                        disabled={togglingId === activity.id.toString()}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all"
                      >
                        {togglingId === activity.id.toString() ? "..." : "Aktifkan"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
