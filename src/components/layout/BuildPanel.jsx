import React, { useState } from 'react'
import { Copy, Terminal, ExternalLink, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react'

export default function BuildPanel() {
    const [copied, setCopied] = useState(false)
    const [status, setStatus] = useState(null) // 'worked', 'error', 'screenshot'

    const handleCopy = () => {
        const text = document.getElementById('lovable-prompt')?.value
        if (text) {
            navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-[30%] bg-white border-l border-slate-200 flex flex-col h-full shadow-2xl z-40">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-1">
                    <Terminal size={16} className="text-primary" />
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-700">Build Panel</h3>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">PROMPT ENGINEERING WORKSPACE</p>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Copy This Into Lovable
                    </label>
                    <div className="relative group">
                        <textarea
                            id="lovable-prompt"
                            readOnly
                            className="w-full h-64 bg-slate-900 text-slate-300 p-4 rounded-xl text-xs font-mono resize-none border border-slate-800 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all scrollbar-hide"
                            value={`// SYSTEM: BUILD TRACK - PROJECT 3\n// STEP: X\n\nImplement the feature according to the specs...`}
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all active:scale-90"
                        >
                            {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                        <ExternalLink size={14} />
                        Build in Lovable
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setStatus('worked')}
                            className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter flex items-center justify-center gap-2 transition-all border ${status === 'worked' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-200 hover:text-emerald-600'
                                }`}
                        >
                            <CheckCircle2 size={12} />
                            It Worked
                        </button>
                        <button
                            onClick={() => setStatus('error')}
                            className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter flex items-center justify-center gap-2 transition-all border ${status === 'error' ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-600'
                                }`}
                        >
                            <AlertCircle size={12} />
                            Error
                        </button>
                    </div>

                    <button
                        onClick={() => setStatus('screenshot')}
                        className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border ${status === 'screenshot' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
                            }`}
                    >
                        <ImageIcon size={14} />
                        Add Screenshot
                    </button>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>STATUS: STANDBY</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
