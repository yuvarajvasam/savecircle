
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, Tooltip, Cell, PolarRadiusAxis
} from 'recharts';
import { Trophy, Flame, Target, BookOpen, Share2, Award } from 'lucide-react';
import { INITIAL_USER } from '../constants';

// Mock Data for Financial IQ (Static for now as we don't track skill-specific XP yet)
const SKILL_DATA = [
  { subject: 'Budgeting', A: 90, fullMark: 100 },
  { subject: 'Investing', A: 65, fullMark: 100 },
  { subject: 'Credit', A: 70, fullMark: 100 },
  { subject: 'Taxes', A: 30, fullMark: 100 },
  { subject: 'Risk', A: 60, fullMark: 100 },
  { subject: 'Banking', A: 85, fullMark: 100 },
];

// Mock Data for Weekly Activity (Could be persisted in a real app)
const ACTIVITY_DATA = [
  { day: 'M', xp: 120 },
  { day: 'T', xp: 200 },
  { day: 'W', xp: 150 },
  { day: 'T', xp: 80 },
  { day: 'F', xp: 250 },
  { day: 'S', xp: 100 },
  { day: 'S', xp: 40 },
];

export const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(INITIAL_USER.xp);
  const [completedLessons, setCompletedLessons] = useState(0);
  
  useEffect(() => {
      const storedXp = localStorage.getItem('savecircle_xp');
      if (storedXp) setXp(parseInt(storedXp));

      const storedLessons = JSON.parse(localStorage.getItem('savecircle_completed_lessons') || '[]');
      setCompletedLessons(storedLessons.length);
  }, []);

  const nextLevelXp = 3800;
  const xpProgress = Math.min(100, (xp / nextLevelXp) * 100);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-lg font-bold">Learning Stats</h1>
        <div className="flex w-12 items-center justify-end">
           <button className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <Share2 size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-8 space-y-6">
        
        {/* Hero Level Card */}
        <section className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-8 -mt-8 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-emerald-500 p-[3px] shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center">
                        <span className="text-3xl">🎓</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-1">Current Rank</p>
                    <h2 className="text-2xl font-bold text-text-primary-light dark:text-white leading-none mb-2">Scholar Lvl 3</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{width: `${xpProgress}%`}}></div>
                        </div>
                        <span className="text-xs font-bold text-primary-dark dark:text-primary">{xp} / {nextLevelXp} XP</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 relative z-10">
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-xl flex flex-col items-center text-center border border-border-light dark:border-white/5">
                    <Flame size={20} className="text-orange-500 mb-1 fill-orange-500" />
                    <span className="font-bold text-lg">12</span>
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold">Day Streak</span>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-xl flex flex-col items-center text-center border border-border-light dark:border-white/5">
                    <BookOpen size={20} className="text-blue-500 mb-1" />
                    <span className="font-bold text-lg">{completedLessons}</span>
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold">Lessons</span>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-xl flex flex-col items-center text-center border border-border-light dark:border-white/5">
                    <Target size={20} className="text-purple-500 mb-1" />
                    <span className="font-bold text-lg">92%</span>
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark uppercase font-bold">Accuracy</span>
                </div>
            </div>
        </section>

        {/* Financial IQ Radar Chart */}
        <section className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Financial IQ</h3>
                <span className="text-xs font-bold bg-primary/10 text-primary-dark dark:text-primary px-2 py-1 rounded-lg">Balanced</span>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-6">Your mastery across different financial topics.</p>
            
            <div className="h-[250px] w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                        <PolarGrid strokeOpacity={0.2} />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold', opacity: 0.7 }} 
                            className="text-text-secondary-light dark:text-white"
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Mike"
                            dataKey="A"
                            stroke="#c9f158"
                            strokeWidth={3}
                            fill="#c9f158"
                            fillOpacity={0.4}
                        />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#202020', color: '#fff', fontSize: '12px'}}
                            itemStyle={{color: '#c9f158'}}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </section>

        {/* Weekly Activity */}
        <section className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Weekly Activity</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    XP Earned
                </div>
            </div>
            
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ACTIVITY_DATA} barSize={12}>
                        <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: 'currentColor', fontSize: 12, fontWeight: 'bold', opacity: 0.5}}
                            dy={10}
                            className="text-text-secondary-light dark:text-white"
                        />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#202020', color: '#fff', fontSize: '12px'}}
                        />
                        <Bar dataKey="xp" radius={[4, 4, 4, 4]}>
                            {ACTIVITY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.xp > 150 ? '#c9f158' : '#3f3f46'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>

        {/* Recent Badges */}
        <section>
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Recent Badges</h3>
                <button className="text-primary-dark dark:text-primary text-xs font-bold uppercase tracking-wide hover:opacity-80">View All</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-2">
                <div className="min-w-[140px] bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-border-light dark:border-white/5 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3 text-2xl border-2 border-yellow-500/20">
                        ⚡
                    </div>
                    <p className="font-bold text-sm mb-1">Fast Learner</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Complete 5 lessons in 1 day</p>
                </div>
                 <div className="min-w-[140px] bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-border-light dark:border-white/5 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 text-2xl border-2 border-blue-500/20">
                        🧠
                    </div>
                    <p className="font-bold text-sm mb-1">Quiz Master</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">100% score on 3 quizzes</p>
                </div>
                 <div className="min-w-[140px] bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-border-light dark:border-white/5 flex flex-col items-center text-center opacity-50">
                    <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-3 text-2xl grayscale">
                        🛡️
                    </div>
                    <p className="font-bold text-sm mb-1">Risk Manager</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Locked</p>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};
