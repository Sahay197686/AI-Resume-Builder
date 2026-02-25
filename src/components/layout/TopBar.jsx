import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function TopBar() {
    const location = useLocation()
    const path = location.pathname

    // Extract step number from path (e.g., /rb/01-problem -> 1)
    const stepMatch = path.match(/\/rb\/(\d{2})/)
    const currentStep = stepMatch ? parseInt(stepMatch[1]) : null
    const isProof = path.includes('proof')

    return (
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    R
                </div>
                <span className="font-bold text-slate-800 tracking-tight">AI Resume Builder</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                    {isProof ? 'Final Submission' : currentStep ? `Project 3 — Step ${currentStep} of 8` : 'Project 3'}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <ShieldCheck size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Premium System</span>
                </div>
            </div>
        </header>
    )
}
