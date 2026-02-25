import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import StepPage from './pages/StepPage'
import ProofPage from './pages/ProofPage'
import Home from './pages/app/Home'
import BuilderPage from './pages/app/BuilderPage'
import PreviewPage from './pages/app/PreviewPage'
import AppProof from './pages/app/AppProof'
import AppLayout from './components/layout/AppLayout'
import { ResumeProvider } from './context/ResumeContext'

function App() {
    return (
        <ResumeProvider>
            <BrowserRouter>
                <Routes>
                    {/* AI Resume Builder App Routes */}
                    <Route path="/" element={<Home />} />
                    <Route element={<AppLayout />}>
                        <Route path="/builder" element={<BuilderPage />} />
                        <Route path="/preview" element={<PreviewPage />} />
                        <Route path="/app-proof" element={<AppProof />} />
                    </Route>

                    {/* Build Track Routes (Project 3 Infrastructure) */}
                    <Route element={<MainLayout />}>
                        <Route path="/rb/01-problem" element={<StepPage step={1} title="Problem Statement" />} />
                        <Route path="/rb/02-market" element={<StepPage step={2} title="Market Research" />} />
                        <Route path="/rb/03-architecture" element={<StepPage step={3} title="System Architecture" />} />
                        <Route path="/rb/04-hld" element={<StepPage step={4} title="High Level Design" />} />
                        <Route path="/rb/05-lld" element={<StepPage step={5} title="Low Level Design" />} />
                        <Route path="/rb/06-build" element={<StepPage step={6} title="Core Build" />} />
                        <Route path="/rb/07-test" element={<StepPage step={7} title="Testing & QA" />} />
                        <Route path="/rb/08-ship" element={<StepPage step={8} title="Final Ship" />} />
                        <Route path="/rb/proof" element={<ProofPage />} />
                    </Route>

                    <Route path="/proof" element={<Navigate to="/app-proof" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ResumeProvider>
    )
}

export default App
