import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { CheckCircle2, AlertCircle, Info, Sparkles, TrendingUp } from 'lucide-react';

export default function ScoreMeter() {
    const { atsAnalysis } = useResume();
    const { score, improvements } = atsAnalysis;

    const getColor = () => {
        if (score <= 40) return 'text-rose-500';
        if (score <= 70) return 'text-amber-500';
        return 'text-emerald-500';
    };

    const getBg = () => {
        if (score <= 40) return 'bg-rose-500';
        if (score <= 70) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Editor Score</h3>
                    <div className={`text-4xl font-black tabular-nums tracking-tighter ${getColor()}`}>
                        {score}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Status</div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${getColor()}`}>
                        {score <= 40 ? 'Needs Work' : score <= 70 ? 'Good' : 'Excellent'}
                    </div>
                </div>
            </div>

            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-out ${getBg()}`}
                    style={{ width: `${score}%` }}
                />
            </div>

            {improvements.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                        <TrendingUp size={12} className="text-blue-500" />
                        Next Steps
                    </div>
                    <div className="space-y-2">
                        {improvements.slice(0, 2).map((imp, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                                <p className="text-[10px] font-bold text-slate-600 leading-tight">{imp.text}</p>
                                <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full shrink-0 ml-2">+{imp.points}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
