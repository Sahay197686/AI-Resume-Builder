import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <AppNav />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
