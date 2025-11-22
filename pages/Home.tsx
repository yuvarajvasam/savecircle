
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_USER, MOCK_CIRCLES } from '../constants';
import { CircularProgress } from '../components/CircularProgress';
import { 
  Bell, 
  Plus, 
  Zap, 
  Target,
  Users,
  ChevronRight,
  Wallet,
  Trophy,
  TrendingUp,
  Calendar
} from 'lucide-react';

export const Home: React.FC = () => {
  const dailyTarget = INITIAL_USER.dailyGoal;
  const savedToday = 50; 
  const progressPercentage = Math.min(100, (savedToday / dailyTarget) * 100);

  // Use persistent gem state for display consistency
  const [gems] = useState(() => {
      const stored = localStorage.getItem('savecircle_gems');
      return stored ? parseInt(stored) : INITIAL_USER.gems;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300 pb-24">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center gap-3">
           <Link to="/profile" className="relative group">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                 <img src={INITIAL_USER.avatar} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
           </Link>
           
           <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-transparent hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-amber-500 text-lg filled">currency_rupee</span>
              <span className="font-bold text-sm text-text-primary-light dark:text-white">{INITIAL_USER.totalSaved.toLocaleString()}</span>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Link to="/shop" className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sky-500 text-2xl filled">diamond</span>
              <span className="font-bold text-sky-500">{gems}</span>
           </Link>
           <Link to="/notifications" className="w-10 h-10 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
           </Link>
        </div>
      </header>

      <main className="flex-1 px-6 space-y-8 overflow-y-auto no-scrollbar pt-6">
        
        {/* HERO SECTION */}
        <section className="w-full rounded-[2.5rem] bg-[#202020] text-white p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                       <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                       <h2 className="font-bold text-xs uppercase tracking-widest">Daily Goal</h2>
                    </div>
                    <div className="text-4xl font-bold mb-1">₹{savedToday}</div>
                    <div className="text-sm text-white/60 font-medium">of ₹{dailyTarget} target</div>
                    
                    <Link 
                        to="/circles/vault" 
                        className="mt-6 inline-flex items-center gap-2 bg-primary text-[#202020] px-6 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
                    >
                        <span className="material-symbols-outlined filled text-lg">savings</span>
                        Deposit
                    </Link>
                </div>

                <div className="relative">
                     <CircularProgress percentage={progressPercentage} size={120} strokeWidth={10} color="#c9f158" trackColor="rgba(255,255,255,0.1)">
                        <span className="text-xl font-bold">{Math.round(progressPercentage)}%</span>
                     </CircularProgress>
                </div>
            </div>
        </section>

        {/* PROGRESS RINGS (Reverted Feature) */}
        <section>
            <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-4 px-1">Your Progress</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                {/* Monthly Savings Ring */}
                <div className="shrink-0 p-5 bg-card-light dark:bg-card-dark rounded-[2rem] border border-border-light dark:border-white/5 flex flex-col items-center gap-3 min-w-[140px]">
                    <CircularProgress percentage={65} size={80} strokeWidth={8} color="#3b82f6" trackColor="rgba(0,0,0,0.05)">
                        <span className="material-symbols-outlined text-blue-500 text-2xl">calendar_month</span>
                    </CircularProgress>
                    <div className="text-center">
                        <p className="font-bold text-lg text-text-primary-light dark:text-white">₹2.8k</p>
                        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Monthly</p>
                    </div>
                </div>

                {/* Streak Ring */}
                <div className="shrink-0 p-5 bg-card-light dark:bg-card-dark rounded-[2rem] border border-border-light dark:border-white/5 flex flex-col items-center gap-3 min-w-[140px]">
                    <CircularProgress percentage={80} size={80} strokeWidth={8} color="#f97316" trackColor="rgba(0,0,0,0.05)">
                         <span className="material-symbols-outlined text-orange-500 text-2xl">local_fire_department</span>
                    </CircularProgress>
                    <div className="text-center">
                        <p className="font-bold text-lg text-text-primary-light dark:text-white">{INITIAL_USER.streak} Days</p>
                        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Streak</p>
                    </div>
                </div>

                {/* Consistency Ring */}
                <div className="shrink-0 p-5 bg-card-light dark:bg-card-dark rounded-[2rem] border border-border-light dark:border-white/5 flex flex-col items-center gap-3 min-w-[140px]">
                     <CircularProgress percentage={92} size={80} strokeWidth={8} color="#10b981" trackColor="rgba(0,0,0,0.05)">
                         <span className="material-symbols-outlined text-green-500 text-2xl">trending_up</span>
                    </CircularProgress>
                    <div className="text-center">
                        <p className="font-bold text-lg text-text-primary-light dark:text-white">92%</p>
                        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Consistency</p>
                    </div>
                </div>
            </div>
        </section>

        {/* MY CIRCLES */}
        <section>
           <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-bold text-text-primary-light dark:text-white">Your Circles</h3>
              <Link to="/circles" className="text-primary-dark dark:text-primary font-bold text-xs uppercase tracking-wide hover:opacity-80">View All</Link>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
              <Link to="/create-circle" className="shrink-0 w-32 flex flex-col items-center justify-center gap-3 p-4 rounded-[1.5rem] border-2 border-dashed border-gray-300 dark:border-white/10 text-gray-400 hover:border-primary hover:text-primary transition-colors group">
                 <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} strokeWidth={3} />
                 </div>
                 <span className="text-xs font-bold uppercase">Create New</span>
              </Link>

              {MOCK_CIRCLES.filter(c => c.isUserMember).map((circle) => (
                 <Link key={circle.id} to={`/circles/${circle.id}`} className="shrink-0 w-40 p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 shadow-sm transition-all group active:scale-95">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 shadow-sm ${
                        circle.theme === 'obsidian' ? 'bg-gray-800 text-white' :
                        circle.theme === 'lime' ? 'bg-lime-100 text-lime-700' :
                        circle.theme === 'sky' ? 'bg-sky-100 text-sky-600' :
                        circle.theme === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                    }`}>
                       {circle.membersCount === 1 ? (circle.id === 'vault' ? <Wallet size={20} /> : <Target size={20} />) : <Users size={20} />}
                    </div>
                    <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark mb-1 uppercase tracking-wide">
                       {circle.id === 'vault' ? 'Primary' : `${circle.membersCount} Members`}
                    </p>
                    <h4 className="font-bold text-text-primary-light dark:text-white text-sm truncate mb-3 group-hover:text-primary transition-colors">{circle.name}</h4>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full" style={{width: '65%'}}></div>
                    </div>
                 </Link>
              ))}
           </div>
        </section>

        {/* DAILY ACTIVITIES */}
        <section className="space-y-3">
            <h3 className="text-lg font-bold text-text-primary-light dark:text-white px-1">Daily Activities</h3>
            
            <Link to="/learning-dashboard" className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined text-2xl filled">monitoring</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-text-primary-light dark:text-white">Learning Stats</h4>
                    <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Check your Financial IQ</p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                    <ChevronRight size={20} />
                </div>
            </Link>
            
            <Link to="/challenges" className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Trophy size={24} fill="currentColor" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-text-primary-light dark:text-white">Weekly Raffle</h4>
                    <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">Win ₹1000 • 1 Ticket</p>
                </div>
                 <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                    <ChevronRight size={20} />
                </div>
            </Link>
        </section>

        <div className="h-8"></div>
      </main>
    </div>
  );
};
