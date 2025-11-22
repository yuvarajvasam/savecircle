
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { User, Users, Calendar, Target, Repeat, Wallet } from 'lucide-react';

export const CreateCircle: React.FC = () => {
  const navigate = useNavigate();
  
  // Mode State: 'solo' | 'social'
  const [mode, setMode] = useState<'solo' | 'social'>('solo');

  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('💰');
  const [selectedTheme, setSelectedTheme] = useState('obsidian');
  
  // Solo Inputs
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  // Social Inputs
  const [contribution, setContribution] = useState('500');
  const [frequency, setFrequency] = useState('Weekly');

  const icons = ['💰', '✈️', '🚗', '🏠', '🎁', '🎓', '💍', '💻', '🎸', '⚽', '🌴', '👶', '🚀', '🍕', '🐶'];
  const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];
  
  const themes = [
      { id: 'obsidian', name: 'Obsidian', class: 'bg-gradient-to-br from-[#2c3e50] to-[#000000]', text: 'text-white' },
      { id: 'lime', name: 'Lime', class: 'bg-gradient-to-br from-lime-400 to-emerald-600', text: 'text-lime-900' },
      { id: 'sky', name: 'Sky', class: 'bg-gradient-to-br from-sky-400 to-blue-600', text: 'text-white' },
      { id: 'purple', name: 'Royal', class: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'text-white' },
      { id: 'sunset', name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 to-pink-600', text: 'text-white' }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold">New {mode === 'solo' ? 'Solo' : 'Circle'}</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
         
         {/* Mode Toggle */}
         <div className="bg-gray-200 dark:bg-white/5 p-1 rounded-2xl flex relative">
             {/* Sliding Background */}
             <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 ease-spring ${mode === 'solo' ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
             
             <button 
                onClick={() => setMode('solo')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 font-bold text-sm transition-colors ${mode === 'solo' ? 'text-primary-dark dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
             >
                 <User size={18} />
                 Solo
             </button>
             <button 
                onClick={() => setMode('social')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 font-bold text-sm transition-colors ${mode === 'social' ? 'text-primary-dark dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
             >
                 <Users size={18} />
                 Circle
             </button>
         </div>

         {/* Live Preview Card */}
         <section className="flex flex-col items-center py-2">
            <div className={`w-full max-w-xs ${currentTheme.class} rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden border border-white/10 transition-all duration-500 group hover:scale-[1.02]`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-[30px] -ml-8 -mb-8 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full min-h-[180px] justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl border border-white/10 shadow-inner backdrop-blur-md">
                            {selectedIcon}
                        </div>
                        <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                                {mode === 'solo' ? 'Solo' : 'Circle'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className={`text-2xl font-bold leading-tight mb-1 drop-shadow-sm ${currentTheme.text === 'text-lime-900' ? 'text-lime-950' : 'text-white'}`}>
                            {name || (mode === 'solo' ? "New Laptop" : "Weekend Trip")}
                        </h2>
                        <p className={`text-xs font-medium opacity-80 ${currentTheme.text === 'text-lime-900' ? 'text-lime-900' : 'text-white'}`}>
                            {mode === 'solo' ? 'Just you' : 'You + Friends'}
                        </p>
                    </div>
                    
                    {/* Dynamic Footer based on Mode */}
                    <div className="mt-4 bg-black/20 rounded-xl p-3 border border-white/5 backdrop-blur-md">
                        {mode === 'solo' ? (
                             <div className="flex justify-between items-end">
                                 <div>
                                     <p className="text-[10px] text-white/60 uppercase font-bold mb-0.5">Target</p>
                                     <p className="text-lg font-bold text-white">₹{targetAmount ? parseInt(targetAmount).toLocaleString() : '0'}</p>
                                 </div>
                                 <div className="flex flex-col items-end">
                                     <div className="w-20 h-1.5 bg-white/20 rounded-full mb-1 overflow-hidden">
                                         <div className="w-0 h-full bg-white rounded-full"></div>
                                     </div>
                                     <span className="text-[10px] text-white/60 font-bold">0%</span>
                                 </div>
                             </div>
                        ) : (
                             <div className="flex justify-between items-center">
                                <div>
                                     <p className="text-[10px] text-white/60 uppercase font-bold mb-0.5">Contribution</p>
                                     <p className="text-lg font-bold text-white">₹{contribution}</p>
                                </div>
                                <div className="text-right">
                                     <p className="text-[10px] text-white/60 uppercase font-bold mb-0.5">Frequency</p>
                                     <p className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded-lg">{frequency}</p>
                                </div>
                             </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Theme Dots */}
            <div className="flex gap-3 mt-6">
                {themes.map(theme => (
                    <button 
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`w-6 h-6 rounded-full ${theme.class} border-2 transition-all duration-300 ${selectedTheme === theme.id ? 'border-text-primary-light dark:border-white scale-125 shadow-sm' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-110'}`}
                    />
                ))}
            </div>
         </section>

         {/* Input Form */}
         <div className="space-y-4">
             
             {/* Common: Name & Icon */}
             <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-1 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                 <div className="p-5 border-b border-border-light dark:border-white/5">
                     <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider ml-1 mb-2 block">
                        {mode === 'solo' ? 'Goal Name' : 'Circle Name'}
                     </label>
                     <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={mode === 'solo' ? "e.g. Emergency Fund" : "e.g. Goa Trip 2024"}
                        className="w-full bg-transparent border-none p-0 text-xl font-bold text-text-primary-light dark:text-white placeholder:text-text-secondary-light/50 focus:ring-0"
                     />
                 </div>
                 <div className="p-5">
                     <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider ml-1 mb-3 block">Icon</label>
                     <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        {icons.map(icon => (
                            <button 
                                key={icon}
                                onClick={() => setSelectedIcon(icon)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all duration-200 ${selectedIcon === icon ? 'bg-primary scale-110 shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                            >
                                {icon}
                            </button>
                        ))}
                     </div>
                 </div>
             </div>

             {/* Dynamic Inputs based on Mode */}
             <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-5 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none animate-fade-in">
                {mode === 'solo' ? (
                    // SOLO FIELDS
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <Target size={18} />
                                </div>
                                <label className="font-bold text-text-primary-light dark:text-white">Target Amount</label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark font-bold text-lg">₹</span>
                                <input 
                                    type="number" 
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    placeholder="50,000"
                                    className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-4 pl-10 pr-4 text-2xl font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-secondary-light/30"
                                />
                            </div>
                        </div>

                        <div>
                             <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Calendar size={18} />
                                </div>
                                <label className="font-bold text-text-primary-light dark:text-white">Target Date (Optional)</label>
                            </div>
                            <input 
                                type="date" 
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-3 px-4 font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>
                ) : (
                    // SOCIAL FIELDS
                    <div className="space-y-6">
                        <div>
                             <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <Wallet size={18} />
                                </div>
                                <label className="font-bold text-text-primary-light dark:text-white">Contribution Amount</label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark font-bold text-lg">₹</span>
                                <input 
                                    type="number" 
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-4 pl-10 pr-4 text-2xl font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>
                             <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2 ml-1">
                                Amount each member pays per cycle.
                            </p>
                        </div>

                        <div>
                             <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <Repeat size={18} />
                                </div>
                                <label className="font-bold text-text-primary-light dark:text-white">Frequency</label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {frequencies.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFrequency(f)}
                                        className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all ${frequency === f ? 'border-primary bg-primary/10 text-primary-dark dark:text-primary' : 'border-transparent bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
             </div>
         </div>
      </main>

      {/* Fixed Footer */}
      <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 fixed bottom-0 left-0 w-full z-30 max-w-md mx-auto transition-colors duration-300">
          <Button 
            fullWidth 
            size="lg" 
            disabled={!name || (mode === 'solo' && !targetAmount) || (mode === 'social' && !contribution)} 
            onClick={() => navigate('/circles')} 
            className={(!name || (mode === 'solo' && !targetAmount) || (mode === 'social' && !contribution)) ? 'opacity-50' : 'shadow-lg shadow-primary/20'}
          >
              {mode === 'solo' ? 'Create Solo' : 'Create Circle'}
          </Button>
      </div>
    </div>
  );
};
