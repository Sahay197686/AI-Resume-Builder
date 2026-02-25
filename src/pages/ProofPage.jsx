import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Globe, Github, Rocket, Copy, Check } from 'lucide-react'

export default function ProofPage() {
    const [artifacts, setArtifacts] = useState({})
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    })
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const saved = {}
        for (let i = 1; i <= 8; i++) {
            saved[i] = localStorage.getItem(`rb_step_${i}_artifact`) !== null
        }
        setArtifacts(saved)
    }, [])

    const handleCopySubmission = () => {
        const text = `PROJECT 3: AI RESUME BUILDER\n\nStatus:\n${Object.entries(artifacts).map(([s, v]) => `Step ${s}: ${v ? 'PASSED' : 'PENDING'}`).join('\n')}\n\nLinks:\n- Lovable: ${links.lovable}\n- GitHub: ${links.github}\n- Deploy: ${links.deploy}`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const steps = [
        { n: 1, name: 'Problem' },
        { n: 2, name: 'Market' },
        { n: 3, name: 'Arch' },
        { n: 4, name: 'HLD' },
        { n: 5, name: 'LLD' },
        { n: 6, name: 'Build' },
        { n: 7, name: 'Test' },
        { n: 8, name: 'Ship' }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Proof</h1>
                <p className="text-slate-500 font-medium">Verify your progress and submit your final build.</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {steps.map((step) => (
                    <div
                        key={step.n}
                        className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${artifacts[step.n]
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest">Step {step.n}</span>
                        {artifacts[step.n] ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                        <span className="text-xs font-bold">{step.name}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Project Links</h3>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Lovable Link</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Rocket size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="https://lovable.dev/projects/..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={links.lovable}
                                onChange={(e) => setLinks({ ...links, lovable: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">GitHub Repository</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Github size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="https://github.com/..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={links.github}
                                onChange={(e) => setLinks({ ...links, github: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Deployment URL</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Globe size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="https://ai-resume-builder.vercel.app"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={links.deploy}
                                onChange={(e) => setLinks({ ...links, deploy: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleCopySubmission}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-[0.98]"
                >
                    {copied ? (
                        <>
                            <Check size={18} />
                            Copied to Clipboard
                        </>
                    ) : (
                        <>
                            <Copy size={18} />
                            Copy Final Submission
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
