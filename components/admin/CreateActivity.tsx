"use client";

import { useState } from "react";
import { useActivityManager } from "@/hooks/useActivityManager";
import toast from "react-hot-toast"; // Import Toast

export const CreateActivity: React.FC = () => {
  const { createActivity, isLoading } = useActivityManager();
  const [form, setForm] = useState({ name: "", points: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // UX: Toast Loading
    const loadingToast = toast.loading("Meminta konfirmasi wallet...");

    try {
      // Panggil fungsi dari hook
      await createActivity(form.name, parseInt(form.points));
      
      // UX: Sukses
      toast.success("Aktivitas berhasil dibuat di Blockchain!", { id: loadingToast });
      setForm({ name: "", points: "" });
    } catch (error: any) {
      // UX: Error (Pesan error sudah 'readable' karena di-throw dari hook)
      toast.error(error.message || "Gagal membuat aktivitas", { id: loadingToast });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
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
          className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          required
        />
        <input
          type="number"
          placeholder="Points Reward"
          value={form.points}
          onChange={(e) => setForm({...form, points: e.target.value})}
          className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          required
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2 text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <span>Create Activity</span>
          )}
        </button>
      </form>
    </div>
  );
};