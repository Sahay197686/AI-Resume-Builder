import React from 'react';
import { ShieldCheck, FileType, CheckCircle2 } from 'lucide-react';

export default function AppProof() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-slate-900/20">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Project Artifacts</h1>
                    <p className="text-slate-500 font-medium">Technical proof and design documentation for the AI Resume Builder.</p>
                </div>

                <div className="space-y-4">
                    <ArtifactCard title="Technical Architecture" type="PDF" status="Awaiting Upload" />
                    <ArtifactCard title="UI/UX Design Specs" type="FIGMA" status="Awaiting Upload" />
                    <ArtifactCard title="API Documentation" type="SWAGGER" status="Awaiting Upload" />
                </div>
            </div>
        </div>
    );
}

function ArtifactCard({ title, type, status }) {
    return (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-slate-900 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <FileType size={24} />
                </div>
                <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-900">{title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{type} DOCUMENT</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{status}</span>
            </div>
        </div>
    );
}
