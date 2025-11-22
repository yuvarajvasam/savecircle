
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Vault: React.FC = () => {
  const [dailyGoal, setDailyGoal] = useState(100);
  const [savedTotal, setSavedTotal] = useState(5210);

  useEffect(() => {
    const storedGoal = localStorage.getItem('savecircle_daily_goal');
    if (storedGoal) setDailyGoal(parseInt(storedGoal));
  }, []);

  const annualGoal = dailyGoal * 365;
  const percentage = Math.min(100, Math.round((savedTotal / annualGoal) * 100));

  const transactions = [
      { id: 1, title: 'Daily Save', amount: dailyGoal, date: 'Today, 9:00 AM', type: 'credit' },
      { id: 2, title: 'Daily Save', amount: dailyGoal, date: 'Yesterday, 8:30 AM', type: 'credit' },
      { id: 3, title: 'Bonus Deposit', amount: 500, date: 'Oct 24', type: 'credit' },
      { id: 4, title: 'Daily Save', amount: dailyGoal, date: 'Oct 23', type: 'credit' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col transition-colors duration-300">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
         <div className="flex w-12 items-center justify-start">
            <button className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-text-primary-light dark:text-white">My Vault</h1>
            <p className="text-xs text-primary-dark dark:text-primary font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Personal Saving
            </p>
         </div>
         <div className="flex w-12 items-center justify-end">
            <Link to="/settings" className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">settings</span>
            </Link>
         </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-6 flex flex-col items-center">
            {/* Circular Progress Visualization */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                {/* Background Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" className="stroke-gray-200 dark:stroke-[#333] transition-colors duration-300" strokeWidth="6" />
                    {/* Progress Arc */}
                    <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#c9f158" 
                        strokeWidth="6" 
                        strokeDasharray="283" 
                        strokeDashoffset={283 - (283 * (percentage / 100))} 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                
                <div className="flex flex-col items-center text-center z-10">
                    <div className="w-12 h-12 rounded-full bg-card-light dark:bg-white/5 border border-border-light dark:border-white/10 flex items-center justify-center mb-2 shadow-sm">
                        <span className="material-symbols-outlined text-primary-dark dark:text-white">lock</span>
                    </div>
                    <h2 className="text-4xl font-bold text-text-primary-light dark:text-white mb-1">₹{savedTotal.toLocaleString()}</h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-wider">Saved this year</p>
                </div>
                
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Goal Context */}
            <div className="w-full bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-border-light dark:border-white/5 mb-8 flex items-center justify-between shadow-sm dark:shadow-none">
                <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-bold uppercase">Annual Goal</span>
                    <span className="text-lg font-bold text-text-primary-light dark:text-white">₹{annualGoal.toLocaleString()}</span>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-primary-dark dark:text-primary">{percentage}%</span>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Completed</p>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                 <button className="bg-primary text-background-dark h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20">
                     <span className="material-symbols-outlined">add</span>
                     Add Funds
                 </button>
                 <button className="bg-card-light dark:bg-surface-dark text-text-primary-light dark:text-white border border-border-light dark:border-white/10 h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95">
                     <span className="material-symbols-outlined">history</span>
                     History
                 </button>
            </div>

            {/* Transaction History */}
            <div className="w-full">
                <h3 className="font-bold text-text-primary-light dark:text-white text-lg mb-4 px-2">Recent Activity</h3>
                <div className="space-y-3">
                    {transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <span className="material-symbols-outlined text-xl">arrow_downward</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary-light dark:text-white">{t.title}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{t.date}</p>
                                </div>
                            </div>
                            <span className="font-bold text-green-600 dark:text-green-400">+₹{t.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
