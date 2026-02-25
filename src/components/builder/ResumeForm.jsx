import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, User, BookOpen, Briefcase, FolderGit2, Lightbulb, AlertCircle, Sparkles } from 'lucide-react';

export default function ResumeForm() {
    const { resumeData, updatePersonalInfo, addEntry, removeEntry, updateEntry, updateSkills } = useResume();

    const handlePersonalInfoChange = (e) => {
        updatePersonalInfo({ [e.target.name]: e.target.value });
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 border border-slate-200">
                <Icon size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest leading-none">{title}</h3>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Personal Info */}
            <section>
                <SectionHeader icon={User} title="Personal Info" />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Full Name" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} />
                    <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
                    <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                    <Input label="Location" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
                    <Input label="GitHub" name="github" value={resumeData.personalInfo.github} onChange={handlePersonalInfoChange} />
                    <Input label="LinkedIn" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Professional Summary</label>
                        <textarea
                            name="summary"
                            value={resumeData.personalInfo.summary}
                            onChange={handlePersonalInfoChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all h-32 resize-none font-medium"
                            placeholder="Briefly describe your career goals and key strengths..."
                        />
                    </div>
                </div>
            </section>

            {/* Education */}
            <section>
                <SectionHeader icon={BookOpen} title="Education" />
                <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                        <div key={edu.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button
                                onClick={() => removeEntry('education', edu.id)}
                                className="absolute top-4 right-4 text-slate-300 hover:rose-500 transition-colors"
                                title="Remove Education"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="School" value={edu.school} onChange={(e) => updateEntry('education', edu.id, { ...edu, school: e.target.value })} />
                                <Input label="Degree / Field" value={edu.degree} onChange={(e) => updateEntry('education', edu.id, { ...edu, degree: e.target.value })} />
                                <div className="col-span-2">
                                    <Input label="Date Range" value={edu.date} onChange={(e) => updateEntry('education', edu.id, { ...edu, date: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addEntry('education', { school: '', degree: '', date: '' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Add Education
                    </button>
                </div>
            </section>

            {/* Experience */}
            <section>
                <SectionHeader icon={Briefcase} title="Work Experience" />
                <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button
                                onClick={() => removeEntry('experience', exp.id)}
                                className="absolute top-4 right-4 text-slate-300 hover:rose-500 transition-colors"
                                title="Remove Experience"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Company" value={exp.company} onChange={(e) => updateEntry('experience', exp.id, { ...exp, company: e.target.value })} />
                                <Input label="Role" value={exp.role} onChange={(e) => updateEntry('experience', exp.id, { ...exp, role: e.target.value })} />
                                <Input label="Date Range" value={exp.date} onChange={(e) => updateEntry('experience', exp.id, { ...exp, date: e.target.value })} />
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</label>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => updateEntry('experience', exp.id, { ...exp, description: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all h-24 resize-none font-medium"
                                        placeholder="Key achievements and responsibilities..."
                                    />
                                    <BulletGuidance text={exp.description} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addEntry('experience', { company: '', role: '', date: '', description: '' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Add Experience
                    </button>
                </div>
            </section>

            {/* Projects */}
            <section>
                <SectionHeader icon={FolderGit2} title="Projects" />
                <div className="space-y-4">
                    {resumeData.projects.map((proj) => (
                        <div key={proj.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                            <button
                                onClick={() => removeEntry('projects', proj.id)}
                                className="absolute top-4 right-4 text-slate-300 hover:rose-500 transition-colors"
                                title="Remove Project"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Project Name" value={proj.name} onChange={(e) => updateEntry('projects', proj.id, { ...proj, name: e.target.value })} />
                                <Input label="Link" value={proj.link} onChange={(e) => updateEntry('projects', proj.id, { ...proj, link: e.target.value })} />
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</label>
                                    <textarea
                                        value={proj.description}
                                        onChange={(e) => updateEntry('projects', proj.id, { ...proj, description: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all h-24 resize-none font-medium"
                                        placeholder="Short project overview..."
                                    />
                                    <BulletGuidance text={proj.description} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addEntry('projects', { name: '', link: '', description: '' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Add Project
                    </button>
                </div>
            </section>

            {/* Skills */}
            <section>
                <SectionHeader icon={Lightbulb} title="Skills" />
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Technical Skills (Comma Separated)</label>
                    <input
                        type="text"
                        value={resumeData.skills}
                        onChange={(e) => updateSkills(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-medium"
                        placeholder="e.g. React, Node.js, Python..."
                    />
                </div>
            </section>
        </div>
    );
}

function Input({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
            <input
                type="text"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-medium"
                {...props}
            />
        </div>
    );
}

function BulletGuidance({ text }) {
    if (!text || text.trim().length === 0) return null;

    const actionVerbs = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated', 'managed', 'scaling', 'increased', 'reduced'];
    const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    const hasActionVerb = actionVerbs.includes(firstWord);
    const hasNumbers = /[\d]+[%|k|x|+]|[\d]+/.test(text);

    const errors = [];
    if (!hasActionVerb) errors.push({ id: 'verb', msg: 'Start with a strong action verb (e.g., Designed, Built).' });
    if (!hasNumbers) errors.push({ id: 'impact', msg: 'Add measurable impact (e.g., increased efficiency by 20%).' });

    if (errors.length === 0) {
        return (
            <div className="mt-2 flex items-center gap-2 text-emerald-600 animate-in fade-in slide-in-from-top-1 duration-300">
                <Sparkles size={10} />
                <span className="text-[10px] font-black uppercase tracking-widest">Optimized bullet structure</span>
            </div>
        );
    }

    return (
        <div className="mt-2 space-y-1">
            {errors.map(error => (
                <div key={error.id} className="flex items-center gap-2 text-slate-400 animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertCircle size={10} className="text-amber-500" />
                    <span className="text-[10px] font-bold tracking-tight">{error.msg}</span>
                </div>
            ))}
        </div>
    );
}
