import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeView from '../../components/builder/ResumeView';
import TemplateSwitcher from '../../components/builder/TemplateSwitcher';
import { Download, Printer, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PreviewPage() {
    const { resumeData } = useResume();
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col">
            {/* Sticky Top Action Bar */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/builder')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <TemplateSwitcher />
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                        <Download size={14} />
                        Download PDF
                    </button>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
                        <Printer size={18} />
                    </button>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Main Preview Container */}
            <div className="flex-1 p-12 flex justify-center overflow-y-auto scrollbar-hide">
                <div className="w-full max-w-[900px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-white shadow-2xl rounded-sm">
                        <ResumeView data={resumeData} isPreview={false} />
                    </div>

                    <div className="text-center py-12">
                        <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-4"></div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">End of Document</p>
                    </div>
                </div>
            </div>

            {/* Minimal decoration */}
            <div className="fixed bottom-8 right-8 pointer-events-none opacity-5">
                <div className="text-[120px] font-black leading-none select-none">RESUME</div>
            </div>
        </div>
    );
}
