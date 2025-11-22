
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (document.documentElement.classList.contains('dark')) return 'dark';
    return 'light';
  });

  const toggleTheme = (mode: 'light' | 'dark') => {
    setTheme(mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className="flex flex-col bg-background-light dark:bg-background-dark flex-1 font-display text-text-primary-light dark:text-text-primary-dark h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-lg font-bold">Settings</h1>
        <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-8">
        {/* User Profile Snippet */}
        <div className="flex items-center gap-4 p-4 bg-card-light dark:bg-card-dark rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
           <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIv61cYgr3lj4NRA6q-SFOzNSf7Awc_JKab9g6o2pO0QndAdmrV-IyhYGEuhjbtIpMYVmTfvL9j0LFRN9wT8svx5uzNrhfPAfMEtYC2AlobCZIQgjqsqNrtt02sK7g2wx6cq_8f_I7RI26oTspFYK4-492yztFQpVXnhMn-8VpRNup48uQfbobRQuAVtg2y0DwvuOJtwY0YhO5atJ67oYUHO2nmPbAb8G3maLq2hhyZ-q_A6836aepoR4vthpGn7mJr3bfD3dco4Y" className="w-14 h-14 rounded-full object-cover border-2 border-primary" alt="Profile" />
           <div className="flex-1">
             <h2 className="font-bold text-lg text-text-primary-light dark:text-white">Alex Taylor</h2>
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">alex@savecircle.app</p>
           </div>
           <button className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary border border-border-light dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
             <span className="material-symbols-outlined text-xl">edit</span>
           </button>
        </div>

        {/* Appearance */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Appearance</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="flex items-center justify-between p-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Theme</span>
                 </div>
                 <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-xl border border-border-light dark:border-white/5">
                    <button 
                      onClick={() => toggleTheme('light')}
                      className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white dark:bg-white/10 shadow-sm text-primary-content dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      <Sun size={20} />
                    </button>
                    <button 
                      onClick={() => toggleTheme('dark')}
                      className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-white dark:bg-white/10 shadow-sm text-primary-content dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      <Moon size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Preferences */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Preferences</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              {/* Notification Item */}
              <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">notifications</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Push Notifications</span>
                 </div>
                 <Switch defaultChecked />
              </div>
              {/* Email Digest */}
              <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">mail</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Email Digest</span>
                 </div>
                 <Switch />
              </div>
               {/* Sound */}
               <div className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">volume_up</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Sound Effects</span>
                 </div>
                 <Switch defaultChecked />
              </div>
           </div>
        </section>

        {/* Account */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Account</h3>
            <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <button className="w-full flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">currency_rupee</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Currency</span>
                 </div>
                 <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="text-sm font-medium">INR</span>
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                 </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">account_balance</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Linked Accounts</span>
                 </div>
                 <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="text-sm font-medium">2 Active</span>
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                 </div>
              </button>
           </div>
        </section>

        {/* Support */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Support</h3>
            <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <button className="w-full flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">help</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Help Center</span>
                 </div>
                 <span className="material-symbols-outlined text-xl text-text-secondary-light dark:text-text-secondary-dark">chevron_right</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">info</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">About SaveCircle</span>
                 </div>
                 <span className="material-symbols-outlined text-xl text-text-secondary-light dark:text-text-secondary-dark">chevron_right</span>
              </button>
           </div>
        </section>

        <section className="pt-2">
            <button onClick={() => {
                localStorage.removeItem('savecircle_onboarded');
                window.location.reload();
            }} className="w-full p-4 bg-red-500/10 text-red-500 font-bold rounded-[1.5rem] border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">logout</span>
                Log Out
            </button>
            <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-6 font-medium">Version 1.0.2 (Build 450)</p>
        </section>

      </main>
    </div>
  )
}

const Switch = ({defaultChecked}: {defaultChecked?: boolean}) => (
  <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full bg-gray-200 dark:bg-[#404040] p-1 has-[:checked]:bg-primary transition-colors duration-300">
    <input className="peer sr-only" type="checkbox" defaultChecked={defaultChecked}/>
    <div className="h-[20px] w-[20px] rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-[20px] shadow-sm"></div>
  </label>
)
