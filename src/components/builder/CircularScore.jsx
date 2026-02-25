import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CircularScore() {
    const { atsAnalysis } = useResume();
    const { score, improvements } = atsAnalysis;

    const size = 160;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score <= 40) return '#f43f5e'; // rose-500
        if (score <= 70) return '#f59e0b'; // amber-500
        return '#10b981'; // emerald-500
    };

    const getStatusText = () => {
        if (score <= 40) return 'Needs Work';
        if (score <= 70) return 'Getting There';
        return 'Strong Resume';
    };

    const color = getColor();

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-10 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Circular Gauge */}
            <div className="relative shrink-0">
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
                    <span className="text-4xl font-black tracking-tighter tabular-nums" style={{ color }}>{score}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</span>
                </div>
            </div>

            {/* Status & Improvements */}
            <div className="flex-1 space-y-6">
                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">ATS Compatibility</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                        <span className="text-lg font-black uppercase tracking-tight text-slate-900">{getStatusText()}</span>
                    </div>
                </div>

                {improvements.length > 0 ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                            <TrendingUp size={12} className="text-blue-500" />
                            How to improve
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {improvements.slice(0, 3).map((imp, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-slate-900 transition-all cursor-default">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                                        <p className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{imp.text}</p>
                                    </div>
                                    <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">+{imp.points}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Perfect! Your resume is fully optimized for ATS.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
