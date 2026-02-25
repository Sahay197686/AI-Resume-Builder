import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

const TEMPLATES = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Serif, Single Column',
        sketch: (color) => (
            <div className="w-full h-full bg-white flex flex-col p-2 gap-1 border border-slate-100 rounded">
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="flex justify-center gap-1">
                    <div className="h-1 w-8 bg-slate-50" />
                    <div className="h-1 w-8 bg-slate-50" />
                </div>
                <div className="h-0.5 w-full bg-slate-200" style={{ backgroundColor: color }} />
                <div className="space-y-1 mt-1">
                    <div className="h-1 w-1/2 bg-slate-50" />
                    <div className="h-1 w-full bg-slate-50" />
                    <div className="h-1 w-full bg-slate-50" />
                </div>
                <div className="h-0.5 w-full bg-slate-200" />
            </div>
        )
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Sans, Sidebar',
        sketch: (color) => (
            <div className="w-full h-full bg-slate-50 flex border border-slate-100 rounded overflow-hidden">
                <div className="w-1/3 h-full" style={{ backgroundColor: color }} />
                <div className="flex-1 bg-white p-2 space-y-2">
                    <div className="h-1 w-3/4 bg-slate-100 rounded" />
                    <div className="h-1 w-full bg-slate-50 rounded" />
                    <div className="h-1 w-full bg-slate-50 rounded" />
                    <div className="h-1 w-full bg-slate-50 rounded" />
                </div>
            </div>
        )
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean, Sans',
        sketch: (color) => (
            <div className="w-full h-full bg-white flex flex-col p-3 gap-2 border border-slate-100 rounded">
                <div className="h-2 w-1/2 bg-slate-100 rounded" />
                <div className="space-y-1">
                    <div className="h-1 w-1/4 bg-slate-100" style={{ backgroundColor: color }} />
                    <div className="h-1 w-full bg-slate-50" />
                </div>
                <div className="space-y-1">
                    <div className="h-1 w-1/4 bg-slate-100" style={{ backgroundColor: color }} />
                    <div className="h-1 w-full bg-slate-50" />
                </div>
            </div>
        )
    }
];

const COLORS = [
    { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
    { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
    { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
    { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
];

export default function TemplateSwitcher() {
    const { selectedTemplate, setSelectedTemplate, accentColor, setAccentColor } = useResume();

    return (
        <div className="space-y-6 mb-8 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Template Selection */}
            <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Choose Template</label>
                <div className="grid grid-cols-3 gap-4">
                    {TEMPLATES.map((tmpl) => (
                        <button
                            key={tmpl.id}
                            onClick={() => setSelectedTemplate(tmpl.id)}
                            className={`group relative text-left transition-all duration-300 ${selectedTemplate === tmpl.id ? 'transform scale-[1.02]' : 'hover:translate-y-[-2px]'
                                }`}
                        >
                            <div className={`w-full aspect-[4/3] rounded-xl mb-2 overflow-hidden transition-all duration-300 ${selectedTemplate === tmpl.id
                                    ? 'ring-2 ring-blue-500 ring-offset-2'
                                    : 'ring-1 ring-slate-200 grayscale-[0.5] group-hover:grayscale-0'
                                }`}>
                                <div className="w-full h-full p-2 bg-slate-50">
                                    {tmpl.sketch(accentColor)}
                                </div>
                                {selectedTemplate === tmpl.id && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white animate-in zoom-in duration-300">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <h4 className={`text-[11px] font-bold ${selectedTemplate === tmpl.id ? 'text-blue-600' : 'text-slate-600'
                                }`}>{tmpl.name}</h4>
                            <p className="text-[9px] text-slate-400 font-medium">{tmpl.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Color Palette */}
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Accent Color</label>
                    <div className="flex gap-3">
                        {COLORS.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setAccentColor(color.value)}
                                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center ${accentColor === color.value
                                        ? 'border-slate-800 scale-110 shadow-md ring-2 ring-slate-100'
                                        : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            >
                                {accentColor === color.value && (
                                    <Check size={14} className="text-white drop-shadow-sm" strokeWidth={3} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Live Preview</div>
                    <div className="text-[9px] font-bold text-slate-400">Updates instantly</div>
                </div>
            </div>
        </div>
    );
}
