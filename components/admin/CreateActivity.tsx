"use client";

import { useState } from "react";
import { useActivityManager } from "@/hooks/useActivityManager";

export const CreateActivity: React.FC = () => {
  const { createActivity, isLoading } = useActivityManager();
  const [form, setForm] = useState({ name: "", points: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await createActivity(form.name, parseInt(form.points))) {
      setForm({ name: "", points: "" });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="font-bold text-slate-100 mb-4 flex items-center">
        <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3"></span>
        Create New Activity
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Activity Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          required
        />
        <input
          type="number"
          placeholder="Points Reward"
          value={form.points}
          onChange={(e) => setForm({...form, points: e.target.value})}
          className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          required
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2 text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
};