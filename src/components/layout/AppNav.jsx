import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileEdit, Eye, ShieldCheck, Cpu } from 'lucide-react';

export default function AppNav() {
    return (
        <nav className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-50 sticky top-0">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                    <Cpu size={20} />
                </div>
                <span className="font-bold text-slate-900 tracking-tight">AI Resume Builder</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <NavLink
                    to="/builder"
                    className={({ isActive }) => `
            flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all
            ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}
          `}
                >
                    <FileEdit size={14} />
                    Builder
                </NavLink>
                <NavLink
                    to="/preview"
                    className={({ isActive }) => `
            flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all
            ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}
          `}
                >
                    <Eye size={14} />
                    Preview
                </NavLink>
                <NavLink
                    to="/proof"
                    className={({ isActive }) => `
            flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all
            ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}
          `}
                >
                    <ShieldCheck size={14} />
                    Proof
                </NavLink>
            </div>

            <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                    KodNest Premium
                </div>
            </div>
        </nav>
    );
}
