import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Upload, FileCheck, Info, FileText, ChevronRight } from 'lucide-react'

export default function StepPage({ step, title }) {
    const { markStepComplete, isComplete } = useOutletContext()
    const [uploading, setUploading] = useState(false)

    const handleUpload = () => {
        setUploading(true)
        // Simulate upload delay
        setTimeout(() => {
            markStepComplete(step)
            setUploading(false)
        }, 1500)
    }

    const stepContents = {
        1: "Define the core problem your AI Resume Builder solves. Who is the target user? What are their pain points?",
        2: "Analyze the competitive landscape. What are existing solutions? How will yours differentiate?",
        3: "Design the high-level system architecture. How do segments like AI processing and data storage interact?",
        4: "Detailed High Level Design of the application components and flow.",
        5: "Low Level Design including database schema and API specifications.",
        6: "Core implementation of the resume building logic and AI integration.",
        7: "Testing strategy, unit tests, and quality assurance checks.",
        8: "Final checks, deployment preparation, and project shipping."
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Instructions</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                    <p className="text-slate-600 leading-relaxed font-medium">
                        {stepContents[step]}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    Required Artifact
                </h3>

                <div className={`
          border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center text-center gap-4
          ${isComplete
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-white hover:border-primary/50 cursor-pointer'}
        `}>
                    {isComplete ? (
                        <>
                            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <FileCheck size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black text-emerald-900">Artifact Uploaded</h4>
                                <p className="text-emerald-600/70 text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
                                    rb_step_{step.toString().padStart(2, '0')}_artifact.pdf
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                                <Upload size={32} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-black text-slate-900">Drop your artifact here</h4>
                                <p className="text-slate-400 text-xs">PDF, PNG, or JSON files accepted</p>
                            </div>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Processing...' : 'Upload Artifact'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {!isComplete && (
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex shrink-0 items-center justify-center">
                        <Info size={20} />
                    </div>
                    <div>
                        <h5 className="font-black text-xs uppercase tracking-widest text-amber-900 mb-1">Gating Reminder</h5>
                        <p className="text-[11px] text-amber-800 font-medium">
                            You must upload the artifact for this step to unlock the next phase of the build track.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
