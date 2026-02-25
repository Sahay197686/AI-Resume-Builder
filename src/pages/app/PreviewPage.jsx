import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeView from '../../components/builder/ResumeView';
import { Download, Share2, Printer } from 'lucide-react';

export default function PreviewPage() {
    const { resumeData } = useResume();

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Final Preview</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Minimalist Black & White System</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-slate-900 hover:border-slate-900 transition-all active:scale-95">
                            <Share2 size={14} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-slate-900 hover:border-slate-900 transition-all active:scale-95">
                            <Printer size={14} />
                            Print
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                            <Download size={14} />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-2xl rounded-sm">
                    <ResumeView data={resumeData} />
                </div>

                <div className="text-center py-12">
                    <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-4"></div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">End of Document</p>
                </div>
            </div>
        </div>
    );
}
