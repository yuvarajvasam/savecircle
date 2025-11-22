
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_USER, MOCK_SHOP_ITEMS } from '../constants';

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  // Use localStorage for gems to sync with Learn page
  const [userGems, setUserGems] = useState(() => {
      const stored = localStorage.getItem('savecircle_gems');
      return stored ? parseInt(stored) : INITIAL_USER.gems;
  });

  const handleBuy = (cost: number) => {
    if (userGems >= cost) {
        const newAmount = userGems - cost;
        setUserGems(newAmount);
        localStorage.setItem('savecircle_gems', newAmount.toString());
        // In a real app, also persist the item ownership here
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-text-primary-light dark:text-white">Shop</span>
         </div>
         <div className="flex items-center justify-end min-w-12">
            <div className="flex items-center gap-1 text-sky-500 font-bold bg-sky-500/10 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm filled">diamond</span>
                <span>{userGems}</span>
            </div>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-8">
         {/* Hero Banner */}
         <div className="p-6 flex flex-col items-center justify-center text-center border-b border-border-light dark:border-white/5">
            <img src="https://cdn-icons-png.flaticon.com/512/4129/4129528.png" alt="Shop" className="w-24 h-24 mb-4 drop-shadow-xl" />
            <h2 className="text-xl font-bold mb-2">Spend your Gems</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm max-w-xs">Use your hard-earned gems to buy power-ups and customize your experience.</p>
         </div>

         {/* Power Ups Section */}
         <div className="p-4">
            <h3 className="font-bold text-lg mb-4 px-2">Power-ups</h3>
            <div className="space-y-4">
                {MOCK_SHOP_ITEMS.filter(i => i.type === 'powerup').map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-border-light dark:border-white/10 bg-card-light dark:bg-card-dark hover:border-primary/50 transition-all shadow-sm dark:shadow-none">
                        <div className={`w-16 h-16 shrink-0 rounded-xl flex items-center justify-center ${item.id === 's1' ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/20' : 'bg-purple-100 text-purple-500 dark:bg-purple-900/20'}`}>
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base">{item.name}</h4>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{item.description}</p>
                            <button 
                                onClick={() => handleBuy(item.cost)}
                                disabled={userGems < item.cost}
                                className={`mt-3 px-4 py-2 rounded-lg font-bold text-sm w-full flex items-center justify-center gap-2 transition-colors ${userGems >= item.cost ? 'bg-primary text-background-dark hover:brightness-110 shadow-md' : 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}
                            >
                                {item.purchased ? 'Equipped' : (
                                    <>
                                        <span className="material-symbols-outlined text-sm filled">diamond</span>
                                        {item.cost}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Cosmetics Section */}
         <div className="p-4 pt-0">
            <h3 className="font-bold text-lg mb-4 px-2">Cosmetics</h3>
             <div className="space-y-4">
                {MOCK_SHOP_ITEMS.filter(i => i.type === 'cosmetic').map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-border-light dark:border-white/10 bg-card-light dark:bg-card-dark hover:border-primary/50 transition-all shadow-sm dark:shadow-none">
                        <div className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center bg-amber-100 text-amber-500 dark:bg-amber-900/20">
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base">{item.name}</h4>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{item.description}</p>
                            <button 
                                onClick={() => handleBuy(item.cost)}
                                disabled={userGems < item.cost}
                                className={`mt-3 px-4 py-2 rounded-lg font-bold text-sm w-full flex items-center justify-center gap-2 transition-colors ${userGems >= item.cost ? 'bg-primary text-background-dark hover:brightness-110 shadow-md' : 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}
                            >
                                <span className="material-symbols-outlined text-sm filled">diamond</span>
                                {item.cost}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};
