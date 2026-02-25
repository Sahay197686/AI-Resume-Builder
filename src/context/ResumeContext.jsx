import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const INITIAL_DATA = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        summary: ''
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    }
};

const SAMPLE_DATA = {
    personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 000-0000',
        location: 'San Francisco, CA',
        github: 'github.com/johndoe',
        linkedin: 'linkedin.com/in/johndoe',
        summary: 'Versatile Software Engineer with 5+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture.'
    },
    education: [
        {
            id: '1',
            school: 'Tech Institute of Technology',
            degree: 'B.S. in Computer Science',
            date: '2015 - 2019'
        }
    ],
    experience: [
        {
            id: '1',
            company: 'InnovateCorp',
            role: 'Senior Frontend Developer',
            date: '2021 - Present',
            description: 'Lead developer for the flagship SaaS product, achieving 40% performance improvement.'
        },
        {
            id: '2',
            company: 'StartUp Hub',
            role: 'Software Engineer',
            date: '2019 - 2021',
            description: 'Developed and maintained various client-facing features using React and Redux.'
        }
    ],
    projects: [
        {
            id: '1',
            name: 'AI Portfolio Builder',
            description: 'An automated tool that uses LLMs to generate professional portfolios from GitHub repositories.',
            liveUrl: 'portfolio-builder.ai',
            githubUrl: 'github.com/johndoe/portfolio',
            techStack: ['React', 'Node.js', 'OpenAI']
        }
    ],
    skills: {
        technical: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['Git', 'Docker', 'AWS']
    }
};

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeTemplate';
const COLOR_KEY = 'resumeAccentColor';

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Data Migration: Ensure skills is an object
            if (typeof parsed.skills === 'string') {
                parsed.skills = { technical: parsed.skills.split(',').map(s => s.trim()).filter(Boolean), soft: [], tools: [] };
            }
            return parsed;
        }
        return INITIAL_DATA;
    });

    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        return localStorage.getItem(TEMPLATE_KEY) || 'classic';
    });

    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem(COLOR_KEY) || 'hsl(168, 60%, 40%)';
    });

    // Autosave to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, [resumeData]);

    // Persist template choice
    useEffect(() => {
        localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }, [selectedTemplate]);

    // Persist color choice
    useEffect(() => {
        localStorage.setItem(COLOR_KEY, accentColor);
    }, [accentColor]);

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info }
        }));
    };

    const addEntry = (section, entry) => {
        const newId = crypto.randomUUID();
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...entry, id: newId }]
        }));
        return newId;
    };

    const updateEntry = (section, id, updatedEntry) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === id ? updatedEntry : item)
        }));
    };

    const removeEntry = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const updateSkills = (category, skills) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: skills
            }
        }));
    };

    const loadSampleData = () => {
        setResumeData(SAMPLE_DATA);
    };

    // ATS Scoring Logic v1.1
    const atsAnalysis = useMemo(() => {
        let score = 0;
        const improvements = [];

        const { personalInfo, experience, projects, skills } = resumeData;

        // 1) Personal Info rules
        if (personalInfo.name?.trim()) score += 10;
        else improvements.push({ text: 'Add your professional name', points: 10 });

        if (personalInfo.email?.trim()) score += 10;
        else improvements.push({ text: 'Add a contact email', points: 10 });

        if (personalInfo.phone?.trim()) score += 5;
        else improvements.push({ text: 'Add a phone number', points: 5 });

        if (personalInfo.linkedin?.trim()) score += 5;
        else improvements.push({ text: 'Add LinkedIn profile link', points: 5 });

        if (personalInfo.github?.trim()) score += 5;
        else improvements.push({ text: 'Add GitHub profile link', points: 5 });

        // 2) Summary rules
        const hasLongSummary = personalInfo.summary?.trim().length > 50;
        if (hasLongSummary) score += 10;
        else improvements.push({ text: 'Add a professional summary (> 50 chars)', points: 10 });

        const ACTION_VERBS = ['built', 'led', 'designed', 'improved', 'developed', 'managed', 'created', 'implemented', 'optimized', 'spearheaded'];
        const hasActionVerbs = ACTION_VERBS.some(verb => personalInfo.summary?.toLowerCase().includes(verb));
        if (hasActionVerbs) score += 10;
        else improvements.push({ text: 'Use action verbs in summary (built, led, etc.)', points: 10 });

        // 3) Content rules
        const hasExperienceWithBullets = experience.length > 0 && experience.some(exp => exp.description?.includes('\n') || exp.description?.includes('•') || exp.description?.length > 100);
        if (hasExperienceWithBullets) score += 15;
        else improvements.push({ text: 'Add detailed experience with bullet points', points: 15 });

        if (resumeData.education.length > 0) score += 10;
        else improvements.push({ text: 'Add your educational background', points: 10 });

        const totalSkills = Object.values(skills).flat().filter(Boolean).length;
        if (totalSkills >= 5) score += 10;
        else improvements.push({ text: 'Add at least 5 professional skills', points: 10 });

        if (projects.length > 0) score += 10;
        else improvements.push({ text: 'Add at least one key project', points: 10 });

        return {
            score: Math.min(score, 100),
            improvements: improvements.sort((a, b) => b.points - a.points),
            isComplete: personalInfo.name?.trim() && experience.length > 0
        };
    }, [resumeData]);

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonalInfo,
            addEntry,
            updateEntry,
            removeEntry,
            updateSkills,
            loadSampleData,
            atsAnalysis,
            selectedTemplate,
            setSelectedTemplate,
            accentColor,
            setAccentColor
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
