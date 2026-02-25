import React, { createContext, useContext, useState } from 'react';

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

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(INITIAL_DATA);

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

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonalInfo,
            addEntry,
            updateEntry,
            removeEntry,
            updateSkills,
            loadSampleData
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
