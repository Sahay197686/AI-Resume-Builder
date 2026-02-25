import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import ResumeView from '../../components/builder/ResumeView';
import TemplateSwitcher from '../../components/builder/TemplateSwitcher';
import { Download, Printer, Share2, ArrowLeft, Copy, Check, AlertTriangle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PreviewPage() {
    const { resumeData, atsAnalysis } = useResume();
    const { isComplete } = atsAnalysis;
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleCopyText = async () => {
        const { personalInfo, education, experience, projects, skills } = resumeData;

        let text = `${personalInfo.name.toUpperCase()}\n`;
        text += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n`;
        if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`;
        if (personalInfo.github) text += `GitHub: ${personalInfo.github}\n`;
        text += `\nSUMMARY\n${personalInfo.summary}\n`;

        if (experience.length > 0) {
            text += `\nEXPERIENCE\n`;
            experience.forEach(exp => {
                text += `${exp.role} | ${exp.company} | ${exp.date}\n${exp.description}\n\n`;
            });
        }

        if (projects.length > 0) {
            text += `PROJECTS\n`;
            projects.forEach(proj => {
                text += `${proj.name}\n${proj.description}\n\n`;
            });
        }

        if (education.length > 0) {
            text += `EDUCATION\n`;
            education.forEach(edu => {
                text += `${edu.school} | ${edu.degree}\n`;
            });
        }

        text += `\nSKILLS\n${skills}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col print:bg-white">
            {/* Sticky Top Action Bar */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between print:hidden">
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
                    <button
                        onClick={handleCopyText}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-slate-900 hover:text-slate-900 transition-all active:scale-95"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy as Text'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                        <Printer size={14} />
                        Print / Save PDF
                    </button>
                </div>
            </div>

            {/* Validation Warning */}
            {!isComplete && (
                <div className="bg-amber-50 border-b border-amber-100 px-8 py-3 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top duration-500 print:hidden">
                    <AlertTriangle size={14} className="text-amber-500" />
                    <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Your resume may look incomplete. Consider adding more details.</p>
                </div>
            )}

            {/* Main Preview Container */}
            <div className="flex-1 p-12 flex justify-center overflow-y-auto scrollbar-hide print:p-0 print:overflow-visible">
                <div className="w-full max-w-[900px] animate-in fade-in slide-in-from-bottom-4 duration-700 print:max-w-none print:transform-none">
                    <div className="bg-white shadow-2xl rounded-sm print:shadow-none">
                        <ResumeView data={resumeData} isPreview={false} />
                    </div>

                    <div className="text-center py-12 print:hidden">
                        <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-4"></div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">End of Document</p>
                    </div>
                </div>
            </div>

            {/* Minimal decoration */}
            <div className="fixed bottom-8 right-8 pointer-events-none opacity-5 print:hidden">
                <div className="text-[120px] font-black leading-none select-none">RESUME</div>
            </div>
        </div>
    );
}
