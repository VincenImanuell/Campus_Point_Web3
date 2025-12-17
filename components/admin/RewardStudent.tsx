"use client";

import { useState, useEffect } from "react";
import { useActivityManager, Activity } from "@/hooks/useActivityManager";

export const RewardStudent: React.FC = () => {
  const { rewardStudent, getAllActivities, isLoading } = useActivityManager();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [form, setForm] = useState({ id: "", address: "" });

  useEffect(() => {
    getAllActivities().then(setActivities);
  }, [getAllActivities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await rewardStudent(parseInt(form.id), form.address)) {
      setForm({ id: "", address: "" });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="font-bold text-slate-100 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-emerald-500 rounded-full mr-3"></span>
        Distribute Points
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-xs text-slate-400 mb-1 block">Select Activity</label>
            <select
              value={form.id}
              onChange={(e) => setForm({...form, id: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option value="">-- Choose --</option>
              {activities.filter(a => a.isActive).map(a => (
                <option key={a.id.toString()} value={a.id.toString()}>{a.name} ({a.pointReward.toString()} pts)</option>
              ))}
            </select>
        </div>
        <div>
            <label className="text-xs text-slate-400 mb-1 block">Student Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg py-2.5 text-sm transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Send Reward"}
        </button>
      </form>
    </div>
  );
};