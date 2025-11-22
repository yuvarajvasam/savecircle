
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { Loader2, Heart } from 'lucide-react';
import { INITIAL_USER } from '../constants';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Initial Hardcoded Data (10 Units)
const INITIAL_UNITS = [
  {
    id: 1,
    title: "Intro to Investing",
    description: "Learn how to make your money grow.",
    color: "primary",
    lessons: [
      { id: '1-1', type: 'quiz', topic: 'Basics of Investing', icon: 'check_circle' },
      { id: '1-2', type: 'save', topic: 'Emergency Fund', icon: 'star' },
      { id: '1-3', type: 'quiz', topic: 'Risk vs Reward', icon: 'play_arrow' },
      { id: '1-4', type: 'quiz', topic: 'Stocks & Bonds', icon: 'lock' },
      { id: '1-5', type: 'quiz', topic: 'Diversification', icon: 'lock' },
      { id: '1-6', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 2,
    title: "Smart Budgeting",
    description: "Master the 50/30/20 rule.",
    color: "sky",
    lessons: [
      { id: '2-1', type: 'quiz', topic: 'Income vs Expenses', icon: 'lock' },
      { id: '2-2', type: 'quiz', topic: 'Needs vs Wants', icon: 'lock' },
      { id: '2-3', type: 'save', topic: 'First Savings', icon: 'lock' },
      { id: '2-4', type: 'quiz', topic: 'Tracking Spending', icon: 'lock' },
      { id: '2-5', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 3,
    title: "Credit & Debt",
    description: "Understand scores and loans.",
    color: "purple",
    lessons: [
        { id: '3-1', type: 'quiz', topic: 'Credit Scores', icon: 'lock' },
        { id: '3-2', type: 'quiz', topic: 'Interest Rates', icon: 'lock' },
        { id: '3-3', type: 'quiz', topic: 'Managing Debt', icon: 'lock' },
        { id: '3-4', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 4,
    title: "Banking Basics",
    description: "Savings, checking, and interest.",
    color: "primary",
    lessons: [
        { id: '4-1', type: 'quiz', topic: 'Checking Accounts', icon: 'lock' },
        { id: '4-2', type: 'quiz', topic: 'Savings Accounts', icon: 'lock' },
        { id: '4-3', type: 'quiz', topic: 'Compound Interest', icon: 'lock' },
        { id: '4-4', type: 'save', topic: 'Open a Vault', icon: 'lock' },
        { id: '4-5', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 5,
    title: "Taxes 101",
    description: "Understanding where your money goes.",
    color: "sky",
    lessons: [
        { id: '5-1', type: 'quiz', topic: 'Income Tax', icon: 'lock' },
        { id: '5-2', type: 'quiz', topic: 'Tax Brackets', icon: 'lock' },
        { id: '5-3', type: 'quiz', topic: 'Deductions', icon: 'lock' },
        { id: '5-4', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "It's never too early to start.",
    color: "purple",
    lessons: [
        { id: '6-1', type: 'quiz', topic: 'Why Start Early', icon: 'lock' },
        { id: '6-2', type: 'quiz', topic: '401k & PF', icon: 'lock' },
        { id: '6-3', type: 'quiz', topic: 'IRA Basics', icon: 'lock' },
        { id: '6-4', type: 'save', topic: 'Long Term Goal', icon: 'lock' },
        { id: '6-5', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 7,
    title: "Stock Market",
    description: "Bulls, bears, and dividends.",
    color: "primary",
    lessons: [
        { id: '7-1', type: 'quiz', topic: 'What is a Stock?', icon: 'lock' },
        { id: '7-2', type: 'quiz', topic: 'Market Indices', icon: 'lock' },
        { id: '7-3', type: 'quiz', topic: 'Dividends', icon: 'lock' },
        { id: '7-4', type: 'quiz', topic: 'Reading Charts', icon: 'lock' },
        { id: '7-5', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 8,
    title: "Real Estate",
    description: "Property as an investment.",
    color: "sky",
    lessons: [
        { id: '8-1', type: 'quiz', topic: 'Buying vs Renting', icon: 'lock' },
        { id: '8-2', type: 'quiz', topic: 'Mortgages', icon: 'lock' },
        { id: '8-3', type: 'quiz', topic: 'REITs', icon: 'lock' },
        { id: '8-4', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 9,
    title: "Insurance",
    description: "Protecting your wealth.",
    color: "purple",
    lessons: [
        { id: '9-1', type: 'quiz', topic: 'Health Insurance', icon: 'lock' },
        { id: '9-2', type: 'quiz', topic: 'Life Insurance', icon: 'lock' },
        { id: '9-3', type: 'quiz', topic: 'Premiums & Deductibles', icon: 'lock' },
        { id: '9-4', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  },
  {
    id: 10,
    title: "Financial Freedom",
    description: "Building passive income.",
    color: "primary",
    lessons: [
        { id: '10-1', type: 'quiz', topic: 'Passive Income', icon: 'lock' },
        { id: '10-2', type: 'quiz', topic: 'Side Hustles', icon: 'lock' },
        { id: '10-3', type: 'quiz', topic: 'FIRE Movement', icon: 'lock' },
        { id: '10-4', type: 'save', topic: 'Freedom Fund', icon: 'lock' },
        { id: '10-5', type: 'reward', topic: 'Unit Reward', icon: 'chest' },
    ]
  }
];

export const LearnPath: React.FC = () => {
  // Initialize units from localStorage or use default
  const [units, setUnits] = useState(() => {
    try {
      const storedUnits = localStorage.getItem('savecircle_units');
      return storedUnits ? JSON.parse(storedUnits) : INITIAL_UNITS;
    } catch (e) {
      console.error("Failed to load units from storage", e);
      return INITIAL_UNITS;
    }
  });
  
  const [processedUnits, setProcessedUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState(1);
  const [xp, setXp] = useState(INITIAL_USER.xp);
  
  // New State for Hearts & Gems in Header
  const [hearts, setHearts] = useState(() => {
      return parseInt(localStorage.getItem('savecircle_hearts') || '5');
  });
  const [gems, setGems] = useState(() => {
      return parseInt(localStorage.getItem('savecircle_gems') || INITIAL_USER.gems.toString());
  });

  const observerTarget = useRef(null);
  const location = useLocation();

  // On Mount & Route Change: Calculate Progress & Sync Stats
  useEffect(() => {
      const calculateProgress = () => {
          const storedCompleted = JSON.parse(localStorage.getItem('savecircle_completed_lessons') || '[]');
          const storedXP = localStorage.getItem('savecircle_xp');
          const storedHearts = localStorage.getItem('savecircle_hearts');
          const storedGems = localStorage.getItem('savecircle_gems');
          
          if (storedXP) setXp(parseInt(storedXP));
          if (storedHearts) setHearts(parseInt(storedHearts));
          if (storedGems) setGems(parseInt(storedGems));

          let firstCurrentFound = false;
          let calculatedActiveUnit = 1;

          const updated = units.map((unit: any) => {
              let unitCompletedCount = 0;
              
              const updatedLessons = unit.lessons.map((lesson: any) => {
                  if (storedCompleted.includes(lesson.id)) {
                      unitCompletedCount++;
                      return { ...lesson, status: 'completed', icon: lesson.type === 'reward' ? 'chest' : 'check_circle' };
                  } else if (!firstCurrentFound) {
                      firstCurrentFound = true;
                      calculatedActiveUnit = unit.id;
                      // Determine icon based on type if unlocked
                      let icon = lesson.icon;
                      if (icon === 'lock' || icon === 'check_circle') {
                          if (lesson.type === 'quiz') icon = 'play_arrow';
                          if (lesson.type === 'save') icon = 'star';
                          if (lesson.type === 'reward') icon = 'chest';
                      }
                      return { ...lesson, status: 'current', icon };
                  } else {
                      return { ...lesson, status: 'locked', icon: lesson.type === 'reward' ? 'chest' : 'lock' };
                  }
              });

              return {
                  ...unit,
                  completed: unitCompletedCount,
                  total: unit.lessons.length,
                  lessons: updatedLessons
              };
          });

          setProcessedUnits(updated);
          setActiveUnitId(calculatedActiveUnit);
      };

      calculateProgress();
  }, [units, location]);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          await generateMoreUnits();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [units, loading]);

  const generateMoreUnits = async () => {
    setLoading(true);
    try {
      const lastUnit = units[units.length - 1];
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          The current financial literacy curriculum ends with "${lastUnit.title}". 
          Generate 2 NEW, SEQUENTIAL units that logically follow this topic to continue the user's education.
          
          Examples of next topics could include: Crypto, Estate Planning, Behavioral Finance, Advanced Tax Strategies, Global Economics, etc.
          
          Return a JSON array.
          Schema per unit:
          - title (string)
          - description (string)
          - color (string: choose cyclically from "primary", "sky", "purple")
          - lessons (array of 4-5 objects):
            - topic (string)
            - type (string: "quiz" or "save")
            - icon (string: use Material Symbol name like "lock", "trending_up", "gavel", "psychology", "currency_bitcoin")
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        color: { type: Type.STRING },
                        lessons: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    topic: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    icon: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        }
      });

      if (response.text) {
        const newUnitsData = JSON.parse(response.text);
        
        // Transform Gemini data to match our internal state structure
        const newUnits = newUnitsData.map((u: any, idx: number) => {
            const newId = units.length + idx + 1;
            return {
                id: newId,
                title: u.title,
                description: u.description,
                color: u.color || 'primary',
                lessons: [
                    ...u.lessons.map((l: any, lIdx: number) => ({
                        id: `${newId}-${lIdx + 1}`,
                        type: l.type,
                        topic: l.topic,
                        icon: 'lock' // Default for raw data, processed effect handles status
                    })),
                    { id: `${newId}-${u.lessons.length + 1}`, type: 'reward', topic: 'Unit Reward', icon: 'chest' }
                ]
            };
        });

        setUnits((prev: any[]) => {
            const updated = [...prev, ...newUnits];
            // Persist new units to localStorage
            localStorage.setItem('savecircle_units', JSON.stringify(updated));
            return updated;
        });
      }

    } catch (error) {
      console.error("Failed to generate new units:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderUnit = (unit: any) => {
    // Layout Constants
    const BTN_LG = 96; // h-24 (6rem)
    const BTN_MD = 80; // h-20 (5rem)
    const GAP = 40; // Vertical space between nodes
    const BASE_WIDTH = 400; // Coordinate system width

    // Calculate positions
    let currentY = 0;
    const coords = unit.lessons.map((lesson: any, i: number) => {
        const isCurrent = lesson.status === 'current';
        const height = isCurrent ? BTN_LG : BTN_MD;
        
        // Snake Logic: 0->Center, 1->Left, 2->Center, 3->Right
        const posPattern = i % 4;
        let xPercent = 50;
        let xSvg = BASE_WIDTH / 2;

        if (posPattern === 1) {
             xPercent = 25;
             xSvg = BASE_WIDTH * 0.25;
        }
        if (posPattern === 3) {
             xPercent = 75;
             xSvg = BASE_WIDTH * 0.75;
        }

        const coord = {
            xPct: xPercent,
            x: xSvg,
            y: currentY,
            h: height,
            lesson
        };
        
        currentY += height + GAP;
        return coord;
    });

    const totalHeight = currentY - GAP + 40; // Add padding at bottom

    // Generate SVG Path
    let pathD = "";
    coords.forEach((pt: any, i: number) => {
        if (i === coords.length - 1) return;
        const next = coords[i+1];
        
        const startX = pt.x;
        const startY = pt.y + (pt.h / 2);
        const endX = next.x;
        const endY = next.y + (next.h / 2);

        if (i === 0) pathD += `M ${startX} ${startY} `;
        
        // Bezier Curve Logic for smooth "S" turns
        const cp1Y = startY + (endY - startY) * 0.5;
        const cp2Y = endY - (endY - startY) * 0.5;
        
        pathD += `C ${startX} ${cp1Y}, ${endX} ${cp2Y}, ${endX} ${endY} `;
    });

    return (
        <div className="relative w-full" style={{ height: totalHeight }}>
            {/* Background SVG Path */}
            <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                viewBox={`0 0 ${BASE_WIDTH} ${totalHeight}`}
                preserveAspectRatio="none"
            >
                <path 
                    d={pathD} 
                    fill="none" 
                    strokeWidth="3" // THINNER LINE
                    className="stroke-gray-300 dark:stroke-white/10" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeDasharray="6 6" // DOTTED LINE
                />
            </svg>

            {/* Lesson Nodes */}
            {coords.map((pt: any, i: number) => {
                const { lesson, xPct, y, h } = pt;
                const isLocked = lesson.status === 'locked';
                const isCurrent = lesson.status === 'current';
                const isCompleted = lesson.status === 'completed';
                
                let baseColor = 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-300'; // Default Locked
                
                if (isCompleted) {
                    baseColor = 'bg-[#ffd900] border-[#d4b400] text-[#7a6700]'; // Gold
                }
                
                if (isCurrent) {
                    if (unit.color === 'primary') baseColor = 'bg-primary border-[#a3cc39] text-background-dark';
                    if (unit.color === 'sky') baseColor = 'bg-sky-400 border-sky-600 text-white';
                    if (unit.color === 'purple') baseColor = 'bg-purple-500 border-purple-700 text-white';
                }

                const sizeClass = isCurrent ? 'w-24 h-24 border-b-[8px]' : 'w-20 h-20 border-b-[6px]';
                
                let iconElement;
                if (lesson.type === 'reward') {
                     const isChestOpen = isCompleted;
                     iconElement = (
                        <img 
                            src={isChestOpen ? "https://cdn-icons-png.flaticon.com/512/2902/2902985.png" : "https://cdn-icons-png.flaticon.com/512/2902/2902985.png"} 
                            className={isCurrent ? "w-14 h-14" : "w-10 h-10"} 
                            alt="chest" 
                            style={{
                                filter: isLocked ? 'grayscale(1) opacity(0.5)' : 'none',
                                transform: isCompleted ? 'scale(0.9)' : 'none'
                            }} 
                        />
                     );
                } else {
                    iconElement = <span className={`material-symbols-outlined filled ${sizeClass.includes('w-24') ? 'text-[40px]' : 'text-[30px]'}`}>{lesson.icon}</span>;
                }

                return (
                    <div 
                        key={lesson.id} 
                        className="absolute z-10 flex flex-col items-center justify-center"
                        style={{ 
                            top: y, 
                            left: `${xPct}%`, 
                            transform: 'translateX(-50%)',
                            height: h,
                            width: isCurrent ? 96 : 80
                        }}
                    >
                        {isLocked ? (
                             <div className={`${sizeClass} rounded-full flex items-center justify-center ${baseColor} bg-gray-200 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-400 dark:text-white/20`}>
                                {iconElement}
                             </div>
                        ) : (
                            <Link 
                                to={`/lesson/${lesson.id}?type=${lesson.type}&topic=${encodeURIComponent(lesson.topic)}`} 
                                className="flex flex-col items-center gap-2 relative group"
                            >
                                 {isCurrent && (
                                    <div className="absolute -top-12 animate-bounce-subtle w-max z-20 pointer-events-none">
                                        <div className={`
                                            ${unit.color === 'primary' ? 'bg-primary text-background-dark' : ''}
                                            ${unit.color === 'sky' ? 'bg-sky-400 text-white' : ''}
                                            ${unit.color === 'purple' ? 'bg-purple-500 text-white' : ''}
                                            text-xs font-bold px-3 py-1 rounded-lg shadow-md mb-1 border-2 border-white/20
                                        `}>
                                            START
                                        </div>
                                        <div className={`
                                            w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto
                                            ${unit.color === 'primary' ? 'border-t-primary' : ''}
                                            ${unit.color === 'sky' ? 'border-t-sky-400' : ''}
                                            ${unit.color === 'purple' ? 'border-t-purple-500' : ''}
                                        `}></div>
                                    </div>
                                 )}

                                 <div className={`${sizeClass} rounded-full flex items-center justify-center ${baseColor} active:border-b-0 active:translate-y-[6px] transition-all shadow-lg`}>
                                    {iconElement}
                                 </div>

                                 {!isCurrent && (
                                     <div className="absolute top-full mt-2 bg-white dark:bg-surface-dark px-3 py-1 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity w-max pointer-events-none z-20">
                                        <span className="text-xs font-bold text-text-primary-light dark:text-white">{lesson.topic}</span>
                                    </div>
                                 )}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
  };

  return (
    <div className="relative flex h-auto w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-x-hidden flex-1 transition-colors duration-300">
      
      {/* NEW DESIGNED HEADER */}
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-white/5 transition-all duration-300 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 text-background-dark">
                    <span className="material-symbols-outlined filled text-2xl">school</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-text-primary-light dark:text-white leading-tight">Learning Path</h1>
                    <div className="flex items-center gap-1">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                         <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">Unit {activeUnitId} Active</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                {/* STATS BUTTON */}
                <Link to="/learning-dashboard" className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center hover:bg-purple-500/20 transition-colors text-purple-500 dark:text-purple-400">
                    <span className="material-symbols-outlined filled text-2xl">bar_chart</span>
                </Link>

                <div className="h-11 px-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-1.5">
                    <Heart size={20} className="text-red-500 fill-current" />
                    <span className="font-bold text-red-600 dark:text-red-400">{hearts}</span>
                </div>
                <Link to="/shop" className="h-11 px-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center gap-1.5 hover:bg-sky-500/20 transition-colors">
                    <span className="material-symbols-outlined filled text-xl text-sky-500">diamond</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">{gems}</span>
                </Link>
            </div>
        </div>
      </header>

      <div className="relative w-full flex-1 pb-20">
        {processedUnits.map((unit) => (
            <div key={unit.id} className="mb-8 relative animate-fade-in">
                {/* Unit Header */}
                <div className="px-4 pt-6 mb-8 sticky top-[80px] z-10">
                    <div className={`
                        p-4 rounded-2xl border-b-[4px] flex justify-between items-center shadow-lg
                        ${unit.color === 'primary' ? 'bg-primary text-background-dark border-[#a3cc39]' : ''}
                        ${unit.color === 'sky' ? 'bg-sky-400 text-white border-sky-600' : ''}
                        ${unit.color === 'purple' ? 'bg-purple-500 text-white border-purple-700' : ''}
                    `}>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">{unit.title}</h2>
                            <p className="text-sm font-medium opacity-90">{unit.description}</p>
                        </div>
                        {/* Pass the title as a query param for the Guide page */}
                        <Link to={`/guide/${unit.id}?title=${encodeURIComponent(unit.title)}`} className="w-12 h-12 bg-black/10 hover:bg-black/20 transition-all rounded-xl flex items-center justify-center border-b-4 border-black/10 active:border-b-0 active:translate-y-[4px] active:bg-black/20">
                            <span className="material-symbols-outlined text-2xl">menu_book</span>
                        </Link>
                    </div>
                </div>

                {/* Lessons Path */}
                <div className="relative z-[1] w-full">
                    {renderUnit(unit)}
                </div>
            </div>
        ))}

        {/* Loader for Infinite Scroll */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center">
            {loading && (
                <div className="flex flex-col items-center text-text-secondary-light dark:text-text-secondary-dark">
                    <Loader2 className="animate-spin mb-2" size={24} />
                    <span className="text-xs font-bold uppercase tracking-wider">Generating Curriculum...</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
