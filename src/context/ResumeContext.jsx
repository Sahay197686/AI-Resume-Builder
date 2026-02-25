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
    skills: ''
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
            link: 'github.com/johndoe/portfolio'
        }
    ],
    skills: 'React, TypeScript, Node.js, Tailwind CSS, AWS, Docker, PostgreSQL, GraphQL'
};

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeTemplate';

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        return localStorage.getItem(TEMPLATE_KEY) || 'classic';
    });

    // Autosave to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, [resumeData]);

    // Persist template choice
    useEffect(() => {
        localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }, [selectedTemplate]);

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info }
        }));
    };

    const addEntry = (section, entry) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...entry, id: crypto.randomUUID() }]
        }));
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

    const updateSkills = (skills) => {
        setResumeData(prev => ({ ...prev, skills }));
    };

    const loadSampleData = () => {
        setResumeData(SAMPLE_DATA);
    };

    // ATS Scoring Logic v1 + Improvement Logic
    const atsAnalysis = useMemo(() => {
        let score = 0;
        const suggestions = [];
        const improvements = [];

        // 1) Summary Length (40-120 words)
        const summaryWords = resumeData.personalInfo.summary.trim().split(/\s+/).filter(w => w.length > 0);
        if (summaryWords.length >= 40 && summaryWords.length <= 120) {
            score += 15;
        } else {
            suggestions.push('Write a stronger summary (40–120 words).');
            if (summaryWords.length < 40) improvements.push('Expand summary to at least 40 words.');
        }

        // 2) At least 2 projects
        if (resumeData.projects.length >= 2) {
            score += 10;
        } else {
            suggestions.push('Add at least 2 projects.');
            improvements.push('Add at least 2 technical projects.');
        }

        // 3) At least 1 experience entry
        if (resumeData.experience.length >= 1) {
            score += 10;
        } else {
            improvements.push('Add an internship or project work experience.');
        }

        // 4) Skills list >= 8 items
        const skillList = resumeData.skills.split(',').filter(s => s.trim().length > 0);
        if (skillList.length >= 8) {
            score += 10;
        } else {
            suggestions.push('Add more skills (target 8+).');
            improvements.push('Add 8+ relevant technical skills.');
        }

        // 5) GitHub or LinkedIn link
        if (resumeData.personalInfo.github || resumeData.personalInfo.linkedin) {
            score += 10;
        }

        // 6) Measurable Impact (Numbers/Quantifiers)
        const hasNumbers = [...resumeData.experience, ...resumeData.projects].some(item => {
            const text = (item.description || item.name || '').toLowerCase();
            return /[\d]+[%|k|x|+]|[\d]+/.test(text);
        });
        if (hasNumbers) {
            score += 15;
        } else {
            suggestions.push('Add measurable impact (numbers) in bullets.');
            improvements.push('Add numbers/impact (%, $, quantity) to results.');
        }

        // 7) Education complete
        const eduComplete = resumeData.education.length > 0 && resumeData.education.every(edu => edu.school && edu.degree && edu.date);
        if (eduComplete) {
            score += 10;
        }

        return {
            score: Math.min(score, 100),
            suggestions: suggestions.slice(0, 3),
            improvements: improvements.slice(0, 3) // Top 3 Improvements
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
            setSelectedTemplate
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
