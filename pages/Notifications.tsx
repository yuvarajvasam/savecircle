
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full font-display flex flex-col transition-colors duration-300">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
          <div className="flex w-12 shrink-0 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                 <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
          <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Notifications</h1>
          <div className="w-12 shrink-0"></div> 
        </header>

        {/* Notification List */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] border border-border-light dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none">
            
            {/* List Item 1: Unread Achievement */}
            <div className="flex items-center gap-4 border-b border-border-light dark:border-white/5 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500">
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                <p className="font-bold text-text-primary-light dark:text-white text-sm line-clamp-2">You've unlocked the 'Super Saver' badge!</p>
                <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">2h ago</p>
                </div>
            </div>

            {/* List Item 2: Unread Account Alert */}
            <div className="flex items-center gap-4 border-b border-border-light dark:border-white/5 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500">
                    <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                <p className="font-bold text-text-primary-light dark:text-white text-sm line-clamp-2">Your weekly deposit of $50 was successful.</p>
                <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">Yesterday</p>
                </div>
            </div>

            {/* List Item 3: Read Social Update */}
            <div className="flex items-center gap-4 border-b border-border-light dark:border-white/5 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <div className="size-2 rounded-full bg-transparent"></div> 
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-text-primary-light dark:text-white">
                    <span className="material-symbols-outlined text-2xl">group</span>
                </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                <p className="font-bold text-text-primary-light dark:text-white text-sm line-clamp-2">Alex joined your 'Vacation Fund' circle.</p>
                <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">3 days ago</p>
                </div>
            </div>

            {/* List Item 4: Read Achievement */}
            <div className="flex items-center gap-4 border-b border-border-light dark:border-white/5 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <div className="size-2 rounded-full bg-transparent"></div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500">
                    <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                <p className="font-bold text-text-primary-light dark:text-white text-sm line-clamp-2">You maintained your 7-day saving streak!</p>
                <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">4 days ago</p>
                </div>
            </div>

            {/* List Item 5: Read Account Alert */}
            <div className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <div className="size-2 rounded-full bg-transparent"></div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-text-primary-light dark:text-white">
                    <span className="material-symbols-outlined text-2xl">trending_up</span>
                </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                <p className="font-bold text-text-primary-light dark:text-white text-sm line-clamp-2">Your investment in S&P 500 is up 2.5% this week.</p>
                <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-0.5">5 days ago</p>
                </div>
            </div>
          </div>
        </main>
    </div>
  );
};
