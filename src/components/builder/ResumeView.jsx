import React from 'react';

export default function ResumeView({ data, isPreview = false }) {
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

    return (
        <div className={`bg-white text-slate-900 font-serif leading-relaxed ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
            {/* Header */}
            <header className="border-b-2 border-slate-900 pb-8 mb-8 text-center">
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

            {/* Summary */}
            {hasContent('summary') && (
                <section className="mb-10">
                    <SectionTitle title="Summary" />
                    <p className="text-sm font-medium leading-relaxed italic text-slate-700">
                        "{personalInfo.summary}"
                    </p>
                </section>
            )}

            {/* Experience */}
            {hasContent('experience') && (
                <section className="mb-10">
                    <SectionTitle title="Experience" />
                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div key={exp.id} className="space-y-2">
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

            {/* Projects */}
            {hasContent('projects') && (
                <section className="mb-10">
                    <SectionTitle title="Projects" />
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((proj) => (
                            <div key={proj.id} className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-sm font-black uppercase tracking-wider">{proj.name}</h4>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{proj.link}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-12">
                {/* Education */}
                {hasContent('education') && (
                    <section>
                        <SectionTitle title="Education" />
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="space-y-1">
                                    <h4 className="text-sm font-black uppercase tracking-wider">{edu.school}</h4>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{edu.degree}</div>
                                    <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{edu.date}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {hasContent('skills') && (
                    <section>
                        <SectionTitle title="Skills" />
                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {skills.split(',').map((skill, i) => (
                                <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Footer decoration */}
            <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center opacity-20 transition-opacity hover:opacity-100">
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">AI Resume Builder / KodNest Premium</span>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full"></div>)}
                </div>
            </footer>
        </div>
    );
}

function SectionTitle({ title }) {
    return (
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 border-b border-slate-100 pb-2 mb-4">
            {title}
        </h3>
    );
}
