import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { CheckCircle2, AlertCircle, Info, Sparkles, TrendingUp } from 'lucide-react';

export default function ScoreMeter() {
    const { atsAnalysis } = useResume();
    const { score, suggestions, improvements } = atsAnalysis;

    // Determine color based on score
    const getScoreColor = () => {
        if (score < 40) return 'text-rose-500';
        if (score < 70) return 'text-amber-500';
        return 'text-emerald-500';
    };

    const getScoreBg = () => {
        if (score < 40) return 'bg-rose-500';
        if (score < 70) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">ATS Readiness Score</h3>
                <div className={`text-6xl font-black tabular-nums tracking-tighter ${getScoreColor()}`}>
                    {score}
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${getScoreBg()}`}
                        style={{ width: `${score}%` }}
                    />
                </div>
            </div>

            {improvements.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                            <TrendingUp size={12} />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Top 3 Improvements</h4>
                    </div>
                    <div className="space-y-2">
                        {improvements.map((improvement, index) => (
                            <div key={index} className="flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-slate-900 transition-all">
                                <div className="w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-slate-900 group-hover:border-slate-900 transition-all shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-[11px] font-bold text-slate-600 leading-tight">{improvement}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {suggestions.length > 0 && improvements.length === 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Info size={12} className="text-primary" />
                        Optimization Notes
                    </h4>
                    <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] font-bold text-slate-600 leading-tight">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {score >= 85 && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 animate-in zoom-in-95 duration-500">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider leading-tight">
                        High compatibility. Document is professionally hardened for ATS.
                    </p>
                </div>
            )}
        </div>
    );
}
