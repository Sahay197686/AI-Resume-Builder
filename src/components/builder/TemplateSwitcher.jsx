import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Layout, Maximize2, Minimize2, AlignLeft } from 'lucide-react';

export default function TemplateSwitcher() {
    const { selectedTemplate, setSelectedTemplate } = useResume();

    const templates = [
        { id: 'classic', name: 'Classic', icon: AlignLeft },
        { id: 'modern', name: 'Modern', icon: Layout },
        { id: 'minimal', name: 'Minimal', icon: Minimize2 }
    ];

    return (
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
            {templates.map((template) => {
                const Icon = template.icon;
                const isActive = selectedTemplate === template.id;

                return (
                    <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
              ${isActive
                                ? 'bg-white text-slate-900 shadow-md transform scale-105'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                            }
            `}
                    >
                        <Icon size={14} className={isActive ? 'text-primary' : ''} />
                        {template.name}
                    </button>
                );
            })}
        </div>
    );
}
