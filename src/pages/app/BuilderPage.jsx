import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeForm from '../../components/builder/ResumeForm';
import ResumeView from '../../components/builder/ResumeView';
import ScoreMeter from '../../components/builder/ScoreMeter';
import TemplateSwitcher from '../../components/builder/TemplateSwitcher';
import { Database, Eye, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BuilderPage() {
    const { resumeData, loadSampleData } = useResume();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left: Form Workspace */}
            <div className="w-full lg:w-1/2 flex flex-col border-r border-slate-200 bg-white h-full">
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

                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 scrollbar-hide">
                    <ScoreMeter />
                    <ResumeForm />
                </div>
            </div>

            {/* Right: Live Preview Panel (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-100 flex-col overflow-hidden relative">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                            <Layout size={16} className="text-blue-500" />
                            Live Preview
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Real-time Visual Feedback</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center scrollbar-hide">
                    <div className="w-full max-w-[800px] mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <TemplateSwitcher />
                    </div>

                    <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1000px] transform hover:scale-[1.01] transition-transform duration-500 origin-top animate-in zoom-in-95 duration-700">
                        <ResumeView data={resumeData} isPreview={true} />
                    </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <div className="w-64 h-64 border-r-8 border-t-8 border-slate-900"></div>
                </div>
            </div>

            {/* Mobile: View Preview FAB */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => navigate('/preview')}
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl font-black text-xs uppercase tracking-widest animate-bounce hover:scale-105 active:scale-95 transition-all ring-4 ring-white"
                >
                    <Eye size={18} />
                    View Preview
                </button>
            </div>
        </div>
    );
}
