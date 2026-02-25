import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import TopBar from './TopBar'
import BuildPanel from './BuildPanel'
import ProofFooter from './ProofFooter'
import ContextHeader from './ContextHeader'

export default function MainLayout() {
    const location = useLocation()
    const path = location.pathname

    // Extract step number from path
    const stepMatch = path.match(/\/rb\/(\d{2})/)
    const currentStep = stepMatch ? parseInt(stepMatch[1]) : null
    const isProof = path.includes('proof')

    // Gating State: Track which steps have artifacts
    const [artifacts, setArtifacts] = useState(() => {
        const saved = {}
        for (let i = 1; i <= 8; i++) {
            saved[i] = localStorage.getItem(`rb_step_${i}_artifact`) !== null
        }
        return saved
    })

    // Check if current step is unlocked (Previous step must have artifact)
    // Step 1 is always unlocked.
    const isPathUnlocked = () => {
        if (currentStep === 1 || isProof) return true
        if (!currentStep) return true // For /rb/proof or other routes

        // For step X, step X-1 must be completed
        return artifacts[currentStep - 1]
    }

    // Redirect if locked
    if (!isPathUnlocked()) {
        // Find the furthest unlocked step
        let furthest = 1
        for (let i = 1; i <= 8; i++) {
            if (artifacts[i]) furthest = i + 1
            else break
        }
        const target = furthest > 8 ? '/rb/proof' : `/rb/${furthest.toString().padStart(2, '0')}`
        return <Navigate to={target} replace />
    }

    const markStepComplete = (stepNum) => {
        localStorage.setItem(`rb_step_${stepNum}_artifact`, 'uploaded')
        setArtifacts(prev => ({ ...prev, [stepNum]: true }))
    }

    const getStepTitle = () => {
        const titles = {
            1: 'Problem Statement',
            2: 'Market Research',
            3: 'System Architecture',
            4: 'High Level Design',
            5: 'Low Level Design',
            6: 'Core Build',
            7: 'Testing & QA',
            8: 'Final Ship'
        }
        return titles[currentStep] || 'Build Track'
    }

    const nextPath = currentStep < 8
        ? `/rb/${(currentStep + 1).toString().padStart(2, '0')}-next` // The routes in App match the pattern
        : null

    // AppRoutes has specific names, let's fix the nextPath mapping
    const nextPaths = {
        1: '/rb/02-market',
        2: '/rb/03-architecture',
        3: '/rb/04-hld',
        4: '/rb/05-lld',
        5: '/rb/06-build',
        6: '/rb/07-test',
        7: '/rb/08-ship',
        8: '/rb/proof'
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <TopBar />
            <div className="flex-1 flex overflow-hidden">
                {/* Main Workspace (70%) */}
                <div className="w-[70%] flex flex-col h-full bg-white relative">
                    {!isProof && <ContextHeader title={getStepTitle()} />}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
                        <Outlet context={{ markStepComplete, isComplete: artifacts[currentStep] }} />
                    </main>
                    {!isProof && (
                        <ProofFooter
                            isUnlocked={artifacts[currentStep]}
                            nextPath={nextPaths[currentStep]}
                        />
                    )}
                </div>

                {/* Build Panel (30%) */}
                <BuildPanel />
            </div>
        </div>
    )
}
