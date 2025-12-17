"use client";

import { useState, useEffect } from "react";
import { useActivityManager, Activity } from "@/hooks/useActivityManager";

export const MintCertificate: React.FC = () => {
  const { mintCertificate, getAllActivities, isLoading } = useActivityManager();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [form, setForm] = useState({ id: "", address: "", uri: "" });

  useEffect(() => {
    getAllActivities().then(setActivities);
  }, [getAllActivities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await mintCertificate(parseInt(form.id), form.address, form.uri)) {
      setForm({ id: "", address: "", uri: "" });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="font-bold text-slate-100 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
        Mint Certificate NFT
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-xs text-slate-400 mb-1 block">Select Activity</label>
            <select
              value={form.id}
              onChange={(e) => setForm({...form, id: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">-- Choose --</option>
              {activities.map(a => (
                <option key={a.id.toString()} value={a.id.toString()}>{a.name}</option>
              ))}
            </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-slate-400 mb-1 block">Student Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
            </div>
            <div>
                <label className="text-xs text-slate-400 mb-1 block">Metadata URI</label>
                <input
                  type="text"
                  placeholder="ipfs://..."
                  value={form.uri}
                  onChange={(e) => setForm({...form, uri: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
            </div>
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg py-2.5 text-sm transition shadow-lg shadow-purple-600/20 disabled:opacity-50"
        >
          {isLoading ? "Minting..." : "Mint Certificate"}
        </button>
      </form>
    </div>
  );
};