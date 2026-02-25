import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Github, Link as LinkIcon, ExternalLink } from 'lucide-react';

export default function ResumeView({ data, isPreview = false }) {
    const { selectedTemplate, accentColor } = useResume();
    const { personalInfo, education, experience, projects, skills } = data;

    const hasContent = (section) => {
        if (section === 'personalInfo') return personalInfo.name || personalInfo.email || personalInfo.phone;
        if (section === 'summary') return personalInfo.summary && personalInfo.summary.trim().length > 0;
        if (section === 'education') return education.length > 0;
        if (section === 'experience') return experience.length > 0;
        if (section === 'projects') return projects.length > 0;
        if (section === 'skills') {
            return (skills.technical?.length > 0) || (skills.soft?.length > 0) || (skills.tools?.length > 0);
        }
        return false;
    };

    const SectionTitle = ({ title }) => {
        if (selectedTemplate === 'minimal') {
            return <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>{title}</h3>;
        }
        if (selectedTemplate === 'classic') {
            return (
                <div className="border-b mb-4 pb-1" style={{ borderColor: accentColor }}>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{title}</h3>
                </div>
            );
        }
        return <h3 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-100 pb-2 mb-4" style={{ color: accentColor }}>{title}</h3>;
    };

    const SkillPills = ({ category, items }) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="space-y-2">
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">{category}</span>
                <div className="flex flex-wrap gap-1.5">
                    {items.map((item, i) => (
                        <span key={i} className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-700" style={{ borderLeftColor: accentColor, borderLeftWidth: '2px' }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const ProjectCard = ({ proj, isClassic = false }) => (
        <div key={proj.id} className={`${isClassic ? 'space-y-1' : 'p-4 bg-slate-50/50 border border-slate-100 rounded-xl space-y-3'} break-inside-avoid relative group`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900">{proj.name}</h4>
                    <div className="flex gap-3 mt-1">
                        {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" style={{ color: accentColor }}>
                                <Github size={12} />
                            </a>
                        )}
                        {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" style={{ color: accentColor }}>
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <p className="text-[11px] font-medium text-slate-600 leading-relaxed">{proj.description}</p>
            {proj.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.map((tech, i) => (
                        <span key={i} className="text-[8px] font-bold px-1.5 py-0.5 bg-white border border-slate-100 rounded text-slate-400 uppercase tracking-tighter" style={{ color: accentColor }}>
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );

    // 1. CLASSIC TEMPLATE
    if (selectedTemplate === 'classic') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-serif leading-relaxed h-full print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <header className="pb-8 mb-8 text-center border-b-2" style={{ borderColor: accentColor }}>
                    <h1 className="text-4xl font-black uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>{personalInfo.name || 'Your Name'}</h1>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                    <div className="flex justify-center gap-4 mt-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
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
                                    <div className="text-[11px] font-black italic uppercase tracking-widest" style={{ color: accentColor }}>{exp.company}</div>
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
                                        <ProjectCard key={proj.id} proj={proj} isClassic />
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
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest" style={{ color: accentColor }}>{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {hasContent('skills') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Skills" />
                                <div className="space-y-4">
                                    <SkillPills category="Technical" items={skills.technical} />
                                    <SkillPills category="Soft Skills" items={skills.soft} />
                                    <SkillPills category="Tools" items={skills.tools} />
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 2. MODERN TEMPLATE
    if (selectedTemplate === 'modern') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-sans leading-relaxed h-full flex print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <aside className="w-1/3 text-white pr-8 mr-8 space-y-10 print:w-1/4 rounded-r-3xl" style={{ backgroundColor: accentColor, padding: '32px' }}>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">{personalInfo.name || 'Your Name'}</h1>
                        <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
                            {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.location && <div>{personalInfo.location}</div>}
                        </div>
                    </div>

                    {hasContent('skills') && (
                        <section className="break-inside-avoid text-white">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/20 pb-2 mb-4">Skills</h3>
                            <div className="space-y-4">
                                {Object.entries(skills).map(([category, items]) => items.length > 0 && (
                                    <div key={category} className="space-y-2">
                                        <span className="text-[8px] font-black uppercase tracking-wider opacity-60">{category}</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {items.map((item, i) => (
                                                <span key={i} className="text-[9px] font-bold px-2 py-0.5 bg-white/10 rounded text-white">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent('education') && (
                        <section className="break-inside-avoid text-white">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/20 pb-2 mb-4">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 className="text-[11px] font-black uppercase tracking-wider">{edu.school}</h4>
                                        <p className="text-[10px] opacity-80 font-medium">{edu.degree}</p>
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
                                        <div className="text-[10px] font-black uppercase tracking-tight" style={{ color: accentColor }}>{exp.role}</div>
                                        <p className="text-xs font-medium text-slate-600 leading-normal mt-2">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent('projects') && (
                        <section>
                            <SectionTitle title="Projects" />
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((proj) => (
                                    <ProjectCard key={proj.id} proj={proj} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        );
    }

    // 3. MINIMAL TEMPLATE
    if (selectedTemplate === 'minimal') {
        return (
            <div id="resume-root" className={`bg-white text-slate-900 font-sans leading-relaxed h-full print:p-0 print:shadow-none ${isPreview ? 'p-8 scale-[0.85] origin-top' : 'p-16 max-w-4xl mx-auto min-h-screen shadow-xl'}`}>
                <header className="mb-12">
                    <h1 className="text-5xl font-black uppercase tracking-[-0.05em] mb-4" style={{ color: accentColor }}>{personalInfo.name || 'Your Name'}</h1>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </header>

                <div className="space-y-12">
                    {hasContent('summary') && (
                        <section className="break-inside-avoid">
                            <p className="text-sm font-medium text-slate-800 leading-relaxed max-w-2xl border-l-4 pl-6" style={{ borderColor: accentColor }}>{personalInfo.summary}</p>
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
                                            <h4 className="text-sm font-black uppercase tracking-tight">{exp.role} <span className="text-slate-300 mx-2">/</span> <span style={{ color: accentColor }}>{exp.company}</span></h4>
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
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="grid grid-cols-[120px_1fr] gap-8 break-inside-avoid">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{proj.liveUrl || proj.githubUrl ? 'PROJECT' : 'DOC'}</span>
                                        <ProjectCard proj={proj} />
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
                                            <p className="text-[10px] text-slate-500 font-bold" style={{ color: accentColor }}>{edu.degree}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {hasContent('skills') && (
                            <section className="break-inside-avoid">
                                <SectionTitle title="Skills" />
                                <div className="space-y-4">
                                    <SkillPills category="Technical" items={skills.technical} />
                                    <SkillPills category="Soft Skills" items={skills.soft} />
                                    <SkillPills category="Tools" items={skills.tools} />
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
