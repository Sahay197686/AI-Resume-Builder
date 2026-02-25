import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-900 text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Sparkles size={14} className="text-primary" />
                    KodNest Premium Series
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    Build a Resume <br />
                    <span className="text-slate-400">That Gets Read.</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Premium design, AI-powered insights, and ATS-optimized layouts to help you land your dream job faster.
                </p>
            </div>

            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Link
                    to="/builder"
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 shadow-2xl shadow-slate-900/20 transition-all active:scale-95"
                >
                    Start Building
                    <ArrowRight size={18} />
                </Link>
            </div>

            <div className="absolute bottom-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Design Systems / Craftsmanship / AI
            </div>
        </div>
    );
}
