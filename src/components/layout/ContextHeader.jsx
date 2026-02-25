import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Info } from 'lucide-react'

export default function ContextHeader({ title }) {
    return (
        <div className="h-16 bg-slate-50 border-b border-slate-200 px-8 flex items-center justify-between">
            <div className="flex flex-col">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Workspace Core</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                    <Info size={18} />
                    <span className="text-xs font-bold underline">Step Guide</span>
                </button>
            </div>
        </div>
    )
}
