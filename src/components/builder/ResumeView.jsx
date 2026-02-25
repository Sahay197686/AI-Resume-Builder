import React from 'react';
import { useResume } from '../../context/ResumeContext';

export default function ResumeView({ data, isPreview = false }) {
    const { selectedTemplate } = useResume();
    const { personalInfo, education, experience, projects, skills } = data;

    const hasContent = (section) => {
        if (section === 'personalInfo') return personalInfo.name || personalInfo.email || personalInfo.phone;
        if (section === 'summary') return personalInfo.summary && personalInfo.summary.trim().length > 0;
        if (section === 'education') return education.length > 0;
        if (section === 'experience') return experience.length > 0;
        if (section === 'projects') return projects.length > 0;
        if (section === 'skills') return skills && skills.trim().length > 0;
        return false;
    };

    const SectionTitle = ({ title }) => {
        if (selectedTemplate === 'minimal') {
            return <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 border-l-2 border-slate-900 pl-3 mb-4">{title}</h3>;
        }
        return <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 border-b border-slate-100 pb-2 mb-4">{title}</h3>;
    };

    // 1. CLASSIC TEMPLATE (Centered Header, Serif)
    if (selectedTemplate === 'classic') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-serif leading-relaxed h-full print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <header className="border-b-2 border-slate-900 pb-8 mb-8 text-center print:border-slate-300">
                    <h1 className="text-4xl font-black uppercase tracking-[0.15em] mb-2">{personalInfo.name || 'Your Name'}</h1>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                    <div className="flex justify-center gap-4 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                        {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                    </div>
                </header>

                {hasContent('summary') && (
                    <section className="mb-10 break-inside-avoid">
                        <SectionTitle title="Summary" />
                        <p className="text-sm font-medium leading-relaxed italic text-slate-700">"{personalInfo.summary}"</p>
                    </section>
                )}

                {hasContent('experience') && (
                    <section className="mb-10">
                        <SectionTitle title="Experience" />
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id} className="space-y-2 break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="text-sm font-black uppercase tracking-wider">{exp.role}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.date}</span>
                                    </div>
                                    <div className="text-[11px] font-black italic text-slate-500 uppercase tracking-widest">{exp.company}</div>
                                    <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12 print:block print:space-y-10">
                    <div className="space-y-10">
                        {hasContent('projects') && (
                            <section>
                                <SectionTitle title="Projects" />
                                <div className="space-y-6">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="space-y-1 break-inside-avoid">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-sm font-black uppercase tracking-wider">{proj.name}</h4>
                                            </div>
                                            <p className="text-xs font-medium text-slate-700 leading-relaxed">{proj.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="space-y-10">
                        {hasContent('education') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Education" />
                                <div className="space-y-6">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="space-y-1">
                                            <h4 className="text-sm font-black uppercase tracking-wider">{edu.school}</h4>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {hasContent('skills') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Skills" />
                                <div className="flex flex-wrap gap-x-3 gap-y-2">
                                    {skills.split(',').map((skill, i) => (
                                        <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-slate-100 print:bg-white print:border print:border-slate-100 px-2 py-1 rounded">{skill.trim()}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 2. MODERN TEMPLATE (Sidebar Header, Sans Layout)
    if (selectedTemplate === 'modern') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-sans leading-relaxed h-full flex print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <aside className="w-1/3 border-r border-slate-100 pr-8 mr-8 space-y-10 print:border-slate-100 print:w-1/4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">{personalInfo.name || 'Your Name'}</h1>
                        <div className="space-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.location && <div>{personalInfo.location}</div>}
                        </div>
                    </div>

                    {hasContent('skills') && (
                        <section className="break-inside-avoid">
                            <SectionTitle title="Skills" />
                            <div className="flex flex-col gap-2">
                                {skills.split(',').map((skill, i) => (
                                    <div key={i} className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                                        {skill.trim()}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent('education') && (
                        <section className="break-inside-avoid">
                            <SectionTitle title="Education" />
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 className="text-[11px] font-black uppercase tracking-wider">{edu.school}</h4>
                                        <p className="text-[10px] text-slate-500 font-medium">{edu.degree}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                <main className="w-2/3 print:w-3/4 space-y-10">
                    {hasContent('summary') && (
                        <section className="break-inside-avoid">
                            <SectionTitle title="About" />
                            <p className="text-xs font-medium text-slate-700 leading-normal">{personalInfo.summary}</p>
                        </section>
                    )}

                    {hasContent('experience') && (
                        <section>
                            <SectionTitle title="Experience" />
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="space-y-1 break-inside-avoid">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-xs font-black uppercase tracking-wider">{exp.company}</h4>
                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{exp.date}</span>
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{exp.role}</div>
                                        <p className="text-xs font-medium text-slate-600 leading-normal mt-2">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent('projects') && (
                        <section>
                            <SectionTitle title="Projects" />
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="space-y-1 break-inside-avoid">
                                        <h4 className="text-xs font-black uppercase tracking-wider">{proj.name}</h4>
                                        <p className="text-xs font-medium text-slate-600 leading-normal">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        );
    }

    // 3. MINIMAL TEMPLATE (No Borders, Bold Typography, Left Aligned)
    if (selectedTemplate === 'minimal') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-sans leading-relaxed h-full print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <header className="mb-12">
                    <h1 className="text-5xl font-black uppercase tracking-[-0.05em] mb-4">{personalInfo.name || 'Your Name'}</h1>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </header>

                <div className="space-y-12">
                    {hasContent('summary') && (
                        <section className="break-inside-avoid">
                            <p className="text-sm font-medium text-slate-800 leading-relaxed max-w-2xl">{personalInfo.summary}</p>
                        </section>
                    )}

                    {hasContent('experience') && (
                        <section>
                            <SectionTitle title="Experience" />
                            <div className="space-y-10">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-8 break-inside-avoid">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{exp.date}</span>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-black uppercase tracking-tight">{exp.role} <span className="text-slate-300 mx-2">/</span> {exp.company}</h4>
                                            <p className="text-xs font-medium text-slate-600 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent('projects') && (
                        <section>
                            <SectionTitle title="Projects" />
                            <div className="space-y-8">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="grid grid-cols-[120px_1fr] gap-8 break-inside-avoid">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{proj.link ? 'LINK' : 'DOC'}</span>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black uppercase tracking-tight">{proj.name}</h4>
                                            <p className="text-xs font-medium text-slate-600 leading-relaxed">{proj.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-12 print:block print:space-y-10">
                        {hasContent('education') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Education" />
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <h4 className="text-[11px] font-black uppercase">{edu.school}</h4>
                                            <p className="text-[10px] text-slate-500">{edu.degree}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {hasContent('skills') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Skills" />
                                <div className="flex flex-wrap gap-2">
                                    {skills.split(',').map((skill, i) => (
                                        <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full print:bg-white">{skill.trim()}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-16 text-center text-slate-300 uppercase font-black tracking-widest text-xs">
            Template Layout Error
        </div>
    );
}
