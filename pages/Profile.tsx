
import React from 'react';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  // Mock Data
  const achievements = [
      {
          id: 1,
          title: 'Streak Master',
          description: 'Reach a 50-day streak',
          level: 2,
          maxLevel: 3,
          progress: 42,
          target: 50,
          icon: 'local_fire_department',
          color: 'text-orange-500',
          bgColor: 'bg-orange-100 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-900/40'
      },
      {
          id: 2,
          title: 'Super Saver',
          description: 'Save ₹10,000 total',
          level: 1,
          maxLevel: 5,
          progress: 6430,
          target: 10000,
          icon: 'savings',
          color: 'text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-900/40'
      },
      {
          id: 3,
          title: 'Scholar',
          description: 'Complete 20 lessons',
          level: 3,
          maxLevel: 3,
          progress: 20,
          target: 20,
          icon: 'school',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-900/40'
      },
       {
          id: 4,
          title: 'Social Butterfly',
          description: 'Invite 3 friends',
          level: 0,
          maxLevel: 3,
          progress: 1,
          target: 3,
          icon: 'group_add',
          color: 'text-purple-500',
          bgColor: 'bg-purple-100 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-900/40'
      }
  ];

  return (
    <div className="flex flex-col bg-background-light dark:bg-background-dark flex-1 min-h-full font-display transition-colors duration-300">
       {/* Header - Keep consistent with app */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <Link to="/settings" className="flex h-10 w-10 items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
        <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Profile</h1>
        <div className="flex w-12 items-center justify-end">
           <button className="flex h-10 w-10 items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
             <span className="material-symbols-outlined">share</span>
           </button>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto pb-8">
        
        {/* Profile Header Section */}
        <div className="px-5 pt-6 pb-8 border-b border-border-light dark:border-white/5">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-1">Alex Taylor</h2>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">@alextaylor</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Joined Jan 2024</span>
                    </div>
                     <div className="flex gap-5 mt-3">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-text-primary-light dark:text-white">14</span>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">Following</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-text-primary-light dark:text-white">28</span>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">Followers</span>
                        </div>
                    </div>
                </div>
                <div className="relative group cursor-pointer">
                     <div className="w-20 h-20 rounded-full p-[3px] border-2 border-dashed border-primary">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIv61cYgr3lj4NRA6q-SFOzNSf7Awc_JKab9g6o2pO0QndAdmrV-IyhYGEuhjbtIpMYVmTfvL9j0LFRN9wT8svx5uzNrhfPAfMEtYC2AlobCZIQgjqsqNrtt02sK7g2wx6cq_8f_I7RI26oTspFYK4-492yztFQpVXnhMn-8VpRNup48uQfbobRQuAVtg2y0DwvuOJtwY0YhO5atJ67oYUHO2nmPbAb8G3maLq2hhyZ-q_A6836aepoR4vthpGn7mJr3bfD3dco4Y" className="w-full h-full rounded-full object-cover bg-surface-dark" />
                     </div>
                     {/* League Icon / Flag */}
                     <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 border-[3px] border-background-light dark:border-background-dark flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined text-sm">military_tech</span>
                     </div>
                </div>
            </div>

            <div className="flex gap-3">
                 <button className="flex-1 h-11 rounded-xl bg-primary text-primary-content dark:text-background-dark font-bold text-sm flex items-center justify-center gap-2 border-b-4 border-[#a3cc39] active:border-b-0 active:translate-y-[4px] transition-all uppercase tracking-wide">
                    <span className="material-symbols-outlined text-xl">person_add</span>
                    Add Friends
                 </button>
                  <button className="h-11 w-11 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-white/10 text-text-primary-light dark:text-white font-bold flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-[4px] transition-all">
                    <span className="material-symbols-outlined text-xl">qr_code</span>
                 </button>
            </div>
        </div>

        {/* Statistics Section */}
        <div className="px-5 py-6">
            <h3 className="font-bold text-xl text-text-primary-light dark:text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-border-light dark:border-white/5 bg-card-light dark:bg-card-dark">
                    <span className="material-symbols-outlined text-2xl text-orange-500">local_fire_department</span>
                    <div>
                         <div className="text-lg font-bold text-text-primary-light dark:text-white">42</div>
                         <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Day Streak</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-border-light dark:border-white/5 bg-card-light dark:bg-card-dark">
                    <span className="material-symbols-outlined text-2xl text-yellow-500">bolt</span>
                    <div>
                         <div className="text-lg font-bold text-text-primary-light dark:text-white">12.5k</div>
                         <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Total XP</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-border-light dark:border-white/5 bg-card-light dark:bg-card-dark">
                    <span className="material-symbols-outlined text-2xl text-blue-500">military_tech</span>
                    <div>
                         <div className="text-lg font-bold text-text-primary-light dark:text-white">Diamond</div>
                         <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">League</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-border-light dark:border-white/5 bg-card-light dark:bg-card-dark">
                    <span className="material-symbols-outlined text-2xl text-green-500">savings</span>
                    <div>
                         <div className="text-lg font-bold text-text-primary-light dark:text-white">₹5.2k</div>
                         <div className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Saved</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Achievements Section */}
        <div className="px-5">
            <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-xl text-text-primary-light dark:text-white">Achievements</h3>
                 <Link to="#" className="text-primary-dark dark:text-primary font-bold text-sm uppercase tracking-wide hover:opacity-80">View All</Link>
            </div>
            
            <div className="space-y-4">
                {achievements.map(item => (
                    <div key={item.id} className="flex flex-col w-full">
                        <div className="flex items-center gap-4 mb-2">
                             {/* Icon Box */}
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-b-4 ${item.bgColor} ${item.color} ${item.borderColor} shrink-0`}>
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-text-primary-light dark:text-white text-base">{item.title}</h4>
                                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">Level {item.level}/{item.maxLevel}</span>
                                </div>
                                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${item.progress >= item.target ? 'bg-yellow-400' : 'bg-primary'}`}
                                        style={{width: `${Math.min(100, (item.progress / item.target) * 100)}%`}}
                                    ></div>
                                </div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1.5 font-medium">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
};
