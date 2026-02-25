import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, User, BookOpen, Briefcase, FolderGit2, Lightbulb, AlertCircle, Sparkles, X, ChevronDown, ChevronUp, Link as LinkIcon, Github, Loader2 } from 'lucide-react';

export default function ResumeForm() {
    const { resumeData, updatePersonalInfo, addEntry, removeEntry, updateEntry, updateSkills } = useResume();
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [expandedProject, setExpandedProject] = useState(null);

    const handlePersonalInfoChange = (e) => {
        updatePersonalInfo({ [e.target.name]: e.target.value });
    };

    const handleSuggestSkills = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            updateSkills('technical', ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"]);
            updateSkills('soft', ["Team Leadership", "Problem Solving"]);
            updateSkills('tools', ["Git", "Docker", "AWS"]);
            setIsSuggesting(false);
        }, 1000);
    };

    const SectionHeader = ({ icon: Icon, title, children }) => (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 border border-slate-200">
                    <Icon size={16} />
                </div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest leading-none">{title}</h3>
            </div>
            {children}
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
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
                                className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
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
                                className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
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
                        <div key={proj.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all">
                            {/* Project Header (Collapsible) */}
                            <button
                                onClick={() => setExpandedProject(expandedProject === proj.id ? null : proj.id)}
                                className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-100/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center">
                                        {expandedProject === proj.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-950">
                                        {proj.name || 'New Project'}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeEntry('projects', proj.id); }}
                                    className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </button>

                            {/* Project Details */}
                            {expandedProject === proj.id && (
                                <div className="p-5 border-t border-slate-200 bg-white grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                                    <Input label="Project Title" value={proj.name} onChange={(e) => updateEntry('projects', proj.id, { ...proj, name: e.target.value })} />
                                    <Input label="Live URL" icon={LinkIcon} value={proj.liveUrl} onChange={(e) => updateEntry('projects', proj.id, { ...proj, liveUrl: e.target.value })} />
                                    <Input label="GitHub URL" icon={Github} value={proj.githubUrl} onChange={(e) => updateEntry('projects', proj.id, { ...proj, githubUrl: e.target.value })} />

                                    <div className="col-span-2">
                                        <TagInput
                                            label="Tech Stack"
                                            tags={proj.techStack || []}
                                            onChange={(tags) => updateEntry('projects', proj.id, { ...proj, techStack: tags })}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Description</label>
                                            <span className={`text-[9px] font-bold ${(proj.description?.length || 0) > 180 ? 'text-amber-500' : 'text-slate-400'}`}>
                                                {proj.description?.length || 0}/200
                                            </span>
                                        </div>
                                        <textarea
                                            value={proj.description}
                                            maxLength={200}
                                            onChange={(e) => updateEntry('projects', proj.id, { ...proj, description: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all h-24 resize-none font-medium"
                                            placeholder="Highlight specific role and technical challenges..."
                                        />
                                        <BulletGuidance text={proj.description} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={async () => {
                            const id = addEntry('projects', { name: '', liveUrl: '', githubUrl: '', description: '', techStack: [] });
                            setExpandedProject(id);
                        }}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Add Project
                    </button>
                </div>
            </section>

            {/* Skills */}
            <section>
                <SectionHeader icon={Lightbulb} title="Skills">
                    <button
                        onClick={handleSuggestSkills}
                        disabled={isSuggesting}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-all"
                    >
                        {isSuggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        {isSuggesting ? 'Suggesting...' : '✨ Suggest Skills'}
                    </button>
                </SectionHeader>

                <div className="space-y-6">
                    <TagInput
                        label={`Technical Skills (${resumeData.skills.technical.length})`}
                        tags={resumeData.skills.technical}
                        onChange={(tags) => updateSkills('technical', tags)}
                    />
                    <TagInput
                        label={`Soft Skills (${resumeData.skills.soft.length})`}
                        tags={resumeData.skills.soft}
                        onChange={(tags) => updateSkills('soft', tags)}
                    />
                    <TagInput
                        label={`Tools & Technologies (${resumeData.skills.tools.length})`}
                        tags={resumeData.skills.tools}
                        onChange={(tags) => updateSkills('tools', tags)}
                    />
                </div>
            </section>
        </div>
    );
}

function Input({ label, icon: Icon, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Icon size={14} />
                    </div>
                )}
                <input
                    type="text"
                    className={`w-full bg-white border border-slate-200 rounded-xl ${Icon ? 'pl-10 mr-4' : 'px-4'} py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-medium`}
                    {...props}
                />
            </div>
        </div>
    );
}

function TagInput({ label, tags = [], onChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onChange([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
            <div className="min-h-[48px] p-2 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-slate-900/5 transition-all">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold border border-slate-200 group animate-in zoom-in-95 duration-200"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(index)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press Enter..."
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm font-medium py-1 px-2"
                />
            </div>
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
