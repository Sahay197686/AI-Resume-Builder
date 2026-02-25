import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeForm from '../../components/builder/ResumeForm';
import ResumeView from '../../components/builder/ResumeView';
import ScoreMeter from '../../components/builder/ScoreMeter';
import TemplateSwitcher from '../../components/builder/TemplateSwitcher';
import { Database } from 'lucide-react';

export default function BuilderPage() {
    const { resumeData, loadSampleData } = useResume();

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Left: Form Workspace (50%) */}
            <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Workspace</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Data Entry & Structure</p>
                    </div>
                    <button
                        onClick={loadSampleData}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                    >
                        <Database size={14} />
                        Load Sample Data
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
                    <ScoreMeter />
                    <ResumeForm />
                </div>
            </div>

            {/* Right: Live Preview Panel (50%) */}
            <div className="w-1/2 bg-slate-100 flex flex-col overflow-hidden relative">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Live Preview</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Real-time Visual Feedback</p>
                    </div>
                    <TemplateSwitcher />
                </div>

                <div className="flex-1 overflow-y-auto p-12 flex justify-center scrollbar-hide">
                    <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1000px] transform hover:scale-[1.01] transition-transform duration-500 origin-top">
                        <ResumeView data={resumeData} isPreview={true} />
                    </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <div className="w-64 h-64 border-r-8 border-t-8 border-slate-900"></div>
                </div>
            </div>
        </div>
    );
}
