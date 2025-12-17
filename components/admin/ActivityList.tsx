"use client";

import { useState, useEffect } from "react";
import { useActivityManager, Activity } from "@/hooks/useActivityManager";

export const ActivityList: React.FC = () => {
  const { getAllActivities, setActivityActive, error } = useActivityManager();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    const all = await getAllActivities();
    setActivities(all);
    setLoading(false);
  };

  useEffect(() => { fetchActivities(); }, []);

  const handleToggle = async (id: number, status: boolean) => {
    setTogglingId(id.toString());
    if (await setActivityActive(id, !status)) await fetchActivities();
    setTogglingId(null);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50 flex justify-between">
        <h3 className="font-bold text-slate-100">Activity Database</h3>
        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">{activities.length} Records</span>
      </div>
      <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar space-y-3">
        {loading ? (
            <p className="text-center text-slate-500 text-sm">Loading database...</p>
        ) : activities.length === 0 ? (
            <p className="text-center text-slate-500 text-sm">No activities created yet.</p>
        ) : (
            activities.map((act) => (
                <div key={act.id.toString()} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-700 rounded-lg group hover:border-indigo-500/30 transition">
                    <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${act.isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <div>
                            <p className="text-sm font-bold text-slate-200">{act.name}</p>
                            <p className="text-xs text-slate-500 font-mono">ID: {act.id.toString()} • Reward: {act.pointReward.toString()} pts</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggle(Number(act.id), act.isActive)}
                        disabled={togglingId === act.id.toString()}
                        className="text-xs font-medium px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-300 transition"
                    >
                        {togglingId === act.id.toString() ? "Updating..." : (act.isActive ? "Deactivate" : "Activate")}
                    </button>
                </div>
            ))
        )}
      </div>
    </div>
  );
};