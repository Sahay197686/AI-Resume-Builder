import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'

export default function ProofFooter({ isUnlocked, nextPath }) {
    const location = useLocation()
    const isProof = location.pathname.includes('proof')

    if (isProof) return null

    return (
        <div className="h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between z-50">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Progress Status</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <span className={`text-xs font-bold ${isUnlocked ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {isUnlocked ? 'Artifact Verified — Ready to Proceed' : 'Artifact Required to Unlock Next Step'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {nextPath ? (
                    <Link
                        to={isUnlocked ? nextPath : '#'}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${isUnlocked
                                ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 active:scale-95'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {isUnlocked ? (
                            <>
                                Next Step
                                <ArrowRight size={14} />
                            </>
                        ) : (
                            <>
                                <Lock size={14} />
                                Next Locked
                            </>
                        )}
                    </Link>
                ) : (
                    <Link
                        to={isUnlocked ? '/rb/proof' : '#'}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${isUnlocked
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {isUnlocked ? (
                            <>
                                Finish Project
                                <ArrowRight size={14} />
                            </>
                        ) : (
                            <>
                                <Lock size={14} />
                                Finish Locked
                            </>
                        )}
                    </Link>
                )}
            </div>
        </div>
    )
}
