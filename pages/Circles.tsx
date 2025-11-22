

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MOCK_CIRCLES, INITIAL_USER } from '../constants';
import { Button } from '../components/Button';
import { CircularProgress } from '../components/CircularProgress';
import { Send, Plus, ArrowRight, TrendingUp, Calendar, Target, ShieldCheck, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { UPIGateway } from '../components/UPIGateway';
import { Circle } from '../types';

export const Circles: React.FC = () => {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  
  // Local state to track circle data so we can update it visually after "payments"
  const [circlesData, setCirclesData] = useState<Circle[]>([]);

  useEffect(() => {
      // Initialize circles, checking for local 'joined' overrides
      const initializedCircles = MOCK_CIRCLES.map(c => {
          const hasJoined = localStorage.getItem(`joined_${c.id}`) === 'true';
          if (hasJoined) {
              return { ...c, isUserMember: true };
          }
          return c;
      });
      setCirclesData(initializedCircles);
  }, []);

  // Payment State
  const [showPayment, setShowPayment] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({ amount: 0, recipientName: '', recipientContext: '' });

  useEffect(() => {
    if (circleId) {
      setSelectedCircleId(circleId);
    } else {
      setSelectedCircleId(null);
    }
  }, [circleId]);

  // Find the selected circle based on ID from our LOCAL state
  const selectedCircle = circlesData.find(c => c.id === selectedCircleId);

  const handleBack = () => {
    setSelectedCircleId(null);
    navigate('/circles');
  };

  const handlePaymentSuccess = (amount: number) => {
    // Update the pool total locally
    if (selectedCircleId) {
        setCirclesData(prev => prev.map(c => {
            if (c.id === selectedCircleId) {
                return { ...c, poolTotal: c.poolTotal + amount };
            }
            return c;
        }));
    }
  };

  const triggerPayment = (amount: number, name: string, context: string) => {
      setPaymentConfig({ amount, recipientName: name, recipientContext: context });
      setShowPayment(true);
  };

  // Theme helper
  const getThemeGradient = (theme: string | undefined) => {
      switch(theme) {
          case 'obsidian': return 'bg-gradient-to-br from-[#2c3e50] to-[#000000]';
          case 'lime': return 'bg-gradient-to-br from-lime-400 to-emerald-600';
          case 'sky': return 'bg-gradient-to-br from-sky-400 to-blue-600';
          case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
          case 'sunset': return 'bg-gradient-to-br from-orange-400 to-pink-600';
          default: return 'bg-gradient-to-br from-[#202020] to-[#000000]';
      }
  };

  const getThemeColor = (theme: string | undefined) => {
      switch(theme) {
          case 'lime': return 'text-lime-900';
          default: return 'text-white';
      }
  };

  // LIST VIEW RENDER
  if (!selectedCircleId || !selectedCircle) {
      // Filter circles where user is a member
      const myCircles = circlesData.filter(c => c.isUserMember);
      
      // Separate Circles based on Member Count AND ID for Vault distinction
      const personalCircles = myCircles.filter(c => c.membersCount === 1);
      const vaultCircle = personalCircles.find(c => c.id === 'vault');
      const goalCircles = personalCircles.filter(c => c.id !== 'vault');
      
      const socialCircles = myCircles.filter(c => c.membersCount > 1);

      return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
            <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-text-primary-light dark:text-white">My Circles</h1>
                </div>
                <Link to="/create-circle" className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">add_circle</span>
                </Link>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-8">
                
                {/* Personal Section */}
                <section>
                    {/* Vault - The Primary Account */}
                    {vaultCircle && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between px-1 mb-3">
                                <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Primary Balance</h2>
                            </div>
                            <button 
                                onClick={() => navigate(`/circles/${vaultCircle.id}`)}
                                className={`w-full bg-[#1a1a1a] dark:bg-[#000000] p-6 rounded-[2rem] shadow-xl relative overflow-hidden text-left group active:scale-[0.98] transition-all duration-300 border border-gray-800 dark:border-white/10`}
                            >
                                {/* Gold/Premium Accent */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                                
                                <div className="relative z-10 flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                                            <span className="material-symbols-outlined text-primary text-sm">lock</span>
                                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wide">My Vault</span>
                                        </div>
                                        <span className="text-white/40 text-xs font-mono">**** 8821</span>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-xs font-medium mb-1 uppercase tracking-wider">Total Saved</p>
                                        <h3 className="text-4xl font-display font-bold text-white tracking-tight">₹{vaultCircle.poolTotal.toLocaleString()}</h3>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm font-medium text-white/60">
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-lg text-primary">trending_up</span>
                                            <span className="text-white">+12% this month</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Goals - Specific Targets */}
                    {goalCircles.length > 0 && (
                        <div>
                             <div className="flex items-center justify-between px-1 mb-3">
                                <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Solo Goals</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {goalCircles.map(circle => (
                                    <button 
                                        key={circle.id}
                                        onClick={() => navigate(`/circles/${circle.id}`)}
                                        className={`w-full ${getThemeGradient(circle.theme)} p-5 rounded-[2rem] shadow-lg relative overflow-hidden text-left group active:scale-[0.98] transition-all duration-300 border border-white/10 min-h-[140px] flex flex-col justify-between`}
                                    >
                                        {/* Decorative Blur */}
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -ml-8 -mb-8"></div>
                                        
                                        <div className="relative z-10 flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md text-white shadow-inner border border-white/10">
                                                <span className="material-symbols-outlined">flag</span>
                                            </div>
                                            <div className="bg-black/20 px-2 py-1 rounded-lg backdrop-blur-md">
                                                <p className="text-[10px] font-bold text-white">Goal</p>
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className={`text-xl font-bold mb-1 ${getThemeColor(circle.theme)}`}>{circle.name}</h3>
                                            
                                            <div className="flex items-end justify-between">
                                                 <p className="text-sm text-white/90 font-medium">₹{circle.poolTotal.toLocaleString()}</p>
                                                 <div className="flex flex-col items-end">
                                                    <div className="w-24 bg-black/20 h-1.5 rounded-full overflow-hidden mb-1">
                                                        <div className="h-full bg-white w-[45%] rounded-full"></div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-white/70">45%</span>
                                                 </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Social Circles Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1 mt-4">
                        <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Circles</h2>
                    </div>

                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/create-circle" className="p-4 rounded-[1.5rem] bg-primary text-background-dark flex flex-col items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20">
                            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                                <Plus size={18} strokeWidth={3} />
                            </div>
                            <span className="font-bold text-sm">Create Circle</span>
                        </Link>
                        <Link to="/join-circle" className="p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95">
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-text-primary-light dark:text-white">
                                <Users size={18} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-sm text-text-primary-light dark:text-white">Join with Code</span>
                        </Link>
                    </div>

                    {socialCircles.map((circle) => (
                        <button 
                            key={circle.id} 
                            onClick={() => navigate(`/circles/${circle.id}`)}
                            className="w-full bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none text-left hover:border-primary/50 dark:hover:border-primary/50 transition-all group active:scale-[0.98]"
                        >
                             <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md ${getThemeGradient(circle.theme)}`}>
                                        {circle.name.substring(0, 1)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none text-text-primary-light dark:text-white group-hover:text-primary transition-colors">{circle.name}</h3>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">
                                            {circle.membersCount} Members • {circle.streak} Day Streak
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-bold uppercase tracking-wider mb-1">Total Pool</p>
                                    <p className="text-2xl font-display font-bold text-text-primary-light dark:text-white">₹{circle.poolTotal.toLocaleString()}</p>
                                </div>
                                
                                <div className="flex items-center -space-x-2">
                                    {circle.members.slice(0, 3).map(m => (
                                        <div key={m.id} className="w-8 h-8 rounded-full border-2 border-card-light dark:border-card-dark overflow-hidden bg-gray-200">
                                            <img src={m.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-full h-full object-cover" alt={m.name} />
                                        </div>
                                    ))}
                                    {circle.membersCount > 3 && (
                                        <div className="w-8 h-8 rounded-full border-2 border-card-light dark:border-card-dark bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">
                                            +{circle.membersCount - 3}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </section>
            </main>
        </div>
      );
  }

  // DETAIL VIEW RENDER
  return (
      <>
        <CircleDetailView 
            circle={selectedCircle} 
            onBack={handleBack} 
            onTriggerPayment={triggerPayment}
        />
        <UPIGateway 
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
            amount={paymentConfig.amount}
            recipientName={paymentConfig.recipientName}
            recipientContext={paymentConfig.recipientContext}
        />
      </>
  );
};

// --- OVERVIEW COMPONENTS ---

const SoloOverview: React.FC<{ circle: Circle, themeGradient: string, onTriggerPayment: (amount: number, name: string, ctx: string) => void }> = ({ circle, themeGradient, onTriggerPayment }) => {
    const target = 150000; // Mock target
    const progress = (circle.poolTotal / target) * 100;
    const remaining = target - circle.poolTotal;

    const trendData = [
        { name: 'Mon', value: circle.poolTotal - 5000 },
        { name: 'Tue', value: circle.poolTotal - 4500 },
        { name: 'Wed', value: circle.poolTotal - 3000 },
        { name: 'Thu', value: circle.poolTotal - 2000 },
        { name: 'Fri', value: circle.poolTotal - 500 },
        { name: 'Sat', value: circle.poolTotal },
    ];

    return (
        <div className="space-y-6">
            {/* Hero Stats Card */}
            <div className={`w-full rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden ${themeGradient}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Solo Goal</span>
                                </div>
                            </div>
                            <p className="text-4xl font-display font-bold">₹{circle.poolTotal.toLocaleString()}</p>
                            <p className="text-sm text-white/70 font-medium mt-1">of ₹{target.toLocaleString()} goal</p>
                        </div>
                        {/* Circular Progress */}
                        <div className="shrink-0">
                            <CircularProgress percentage={progress} size={80} strokeWidth={8} color="white" trackColor="rgba(255,255,255,0.2)">
                                <span className="font-bold text-sm">{Math.round(progress)}%</span>
                            </CircularProgress>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-2">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 text-xs bg-white text-black hover:bg-gray-100 border-none h-10"
                            onClick={() => onTriggerPayment(500, "SaveCircle Vault", circle.name)}
                        >
                            Add Funds
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1 text-xs bg-black/20 border-white/20 text-white hover:bg-black/30 h-10">History</Button>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 mb-2">
                        <span className="material-symbols-outlined">local_fire_department</span>
                    </div>
                    <span className="text-lg font-bold text-text-primary-light dark:text-white">{circle.streak}</span>
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Day Streak</span>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 mb-2">
                        <Calendar size={20} />
                    </div>
                    <span className="text-lg font-bold text-text-primary-light dark:text-white">Nov 12</span>
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Projected</span>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-2">
                        <TrendingUp size={20} />
                    </div>
                    <span className="text-lg font-bold text-text-primary-light dark:text-white">₹520</span>
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Daily Avg</span>
                </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Savings Growth</h3>
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+12% vs last week</span>
                </div>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#c9f158" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#c9f158" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip 
                                cursor={{stroke: '#e5e7eb', strokeWidth: 1}} 
                                contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#202020', color: '#fff', fontSize: '12px'}} 
                            />
                            <Area type="monotone" dataKey="value" stroke="#c9f158" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const CircleOverview: React.FC<{ circle: Circle, themeGradient: string, onTriggerPayment: (amount: number, name: string, ctx: string) => void }> = ({ circle, themeGradient, onTriggerPayment }) => {
    // Mock Social Data
    const contributionData = [
        { name: 'Week 1', value: 2500 },
        { name: 'Week 2', value: 2500 },
        { name: 'Week 3', value: 2000 },
        { name: 'Week 4', value: 3000 },
    ];

    return (
        <div className="space-y-6">
            {/* Hero Stats Card */}
            <div className={`w-full rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden ${themeGradient}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                         <div>
                             <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Pool</p>
                             <h2 className="text-4xl font-display font-bold">₹{circle.poolTotal.toLocaleString()}</h2>
                         </div>
                         <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                             <span className="text-xs font-bold">Round 3/12</span>
                         </div>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/5 backdrop-blur-md flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-yellow-400">emoji_events</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/60 font-bold uppercase">Next Payout</p>
                                <p className="font-bold text-sm">Riya Singh</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">₹15k</p>
                            <p className="text-[10px] text-white/60 font-bold">Nov 1st</p>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 text-xs bg-white text-black hover:bg-gray-100 border-none h-10"
                            onClick={() => onTriggerPayment(2500, "Pool Contribution", circle.name)}
                        >
                            Pay Share
                        </Button>
                    </div>
                </div>
            </div>

            {/* Member Contribution Status */}
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Contributions</h3>
                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">This Cycle</span>
                </div>
                <div className="space-y-3">
                    {circle.members.map((member, idx) => {
                        const isPaid = idx < circle.members.length - 1; // Mock logic
                        return (
                            <div key={member.id} className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={member.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/5" />
                                    {isPaid && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card-light dark:border-card-dark rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-[10px] text-white font-bold">check</span></div>}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-text-primary-light dark:text-white">{member.name}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{isPaid ? 'Paid on time' : 'Pending payment'}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPaid ? 'bg-green-500/10 text-green-600' : 'bg-gray-100 dark:bg-white/5 text-text-secondary-light'}`}>
                                    {isPaid ? '₹500' : 'Due'}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Pool Activity</h3>
                </div>
                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contributionData}>
                             <Tooltip 
                                cursor={{fill: 'transparent'}} 
                                contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#202020', color: '#fff', fontSize: '12px'}} 
                            />
                            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                                {contributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 3 ? '#c9f158' : '#3f3f46'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Sub-component for the detail view wrapper
const CircleDetailView: React.FC<{ 
    circle: Circle, 
    onBack: () => void,
    onTriggerPayment: (amount: number, name: string, ctx: string) => void 
}> = ({ circle, onBack, onTriggerPayment }) => {
  const isSolo = circle.membersCount === 1;
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'chat' | 'journal'>('overview');
  const [msgText, setMsgText] = useState('');
  const [copied, setCopied] = useState(false);

  const getThemeGradient = (theme: string | undefined) => {
      switch(theme) {
          case 'obsidian': return 'bg-gradient-to-br from-[#2c3e50] to-[#000000]';
          case 'lime': return 'bg-gradient-to-br from-lime-400 to-emerald-600';
          case 'sky': return 'bg-gradient-to-br from-sky-400 to-blue-600';
          case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
          case 'sunset': return 'bg-gradient-to-br from-orange-400 to-pink-600';
          default: return 'bg-gradient-to-br from-[#202020] to-[#000000]';
      }
  };

  const chatMessages = isSolo ? [
      { id: 1, userId: 'u1', text: 'Added ₹500 to my emergency fund.', time: '10:30 AM', type: 'msg' },
      { id: 2, userId: 'sys', text: `You reached your weekly goal!`, time: 'Yesterday', type: 'event' },
      { id: 3, userId: 'u1', text: 'Saving up for that new laptop.', time: 'Oct 22', type: 'msg' },
  ] : [
    { id: 1, userId: circle.members[1]?.id || 'u2', text: 'Just deposited my share! 💸', time: '10:30 AM', type: 'msg' },
    { id: 2, userId: 'sys', text: `${circle.members[1]?.name || 'Riya'} saved ₹500`, time: '10:30 AM', type: 'event' },
    { id: 3, userId: 'u1', text: 'Nice! We are almost at the goal for this month.', time: '10:45 AM', type: 'msg' },
    { id: 4, userId: 'sys', text: 'New cycle started', time: 'Yesterday', type: 'event' },
  ];

  const tabs = isSolo ? ['Overview', 'Journal'] : ['Overview', 'Members', 'Chat'];

  const handleCopyCode = () => {
      if(circle.inviteCode) {
          navigator.clipboard.writeText(circle.inviteCode);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex items-center gap-3">
            <button onClick={onBack} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${getThemeGradient(circle.theme)}`}>
                    {isSolo ? <span className="material-symbols-outlined text-sm">{circle.id === 'vault' ? 'lock' : 'flag'}</span> : circle.name.substring(0, 1)}
                </div>
                <div>
                    <h1 className="text-base font-bold leading-none text-text-primary-light dark:text-white">{circle.name}</h1>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        {isSolo ? (circle.id === 'vault' ? 'Primary Balance' : 'Savings Goal') : `${circle.membersCount} Members • Active`}
                    </p>
                </div>
            </div>
         </div>
         <button className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
         </button>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[64px] z-20 bg-background-light dark:bg-background-dark border-b border-border-light dark:border-white/5 px-4">
        <div className="flex gap-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase() as any)}
                    className={`py-3 text-sm font-bold border-b-[3px] transition-all px-1 ${
                        activeTab === tab.toLowerCase() 
                        ? 'border-primary text-text-primary-light dark:text-white' 
                        : 'border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-black/20">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="p-4 pb-24 animate-fade-in">
                {isSolo ? (
                    <SoloOverview 
                        circle={circle} 
                        themeGradient={getThemeGradient(circle.theme)} 
                        onTriggerPayment={onTriggerPayment}
                    />
                ) : (
                    <CircleOverview 
                        circle={circle} 
                        themeGradient={getThemeGradient(circle.theme)} 
                        onTriggerPayment={onTriggerPayment}
                    />
                )}
            </div>
        )}

        {/* MEMBERS TAB */}
        {activeTab === 'members' && !isSolo && (
             <div className="p-4 space-y-4 animate-fade-in pb-24">
                 
                 {/* Invite Code Card - Only if Invite Code Exists */}
                 {circle.inviteCode && (
                     <div className="bg-primary/10 dark:bg-primary/5 p-5 rounded-[1.5rem] border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-dark dark:text-primary mb-2">Invite Friends</p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-4 max-w-[200px]">Share this code to let your friends join this circle instantly.</p>
                        
                        <button 
                            onClick={handleCopyCode}
                            className="flex items-center gap-3 bg-card-light dark:bg-surface-dark px-6 py-3 rounded-xl shadow-sm border border-border-light dark:border-white/10 active:scale-95 transition-all hover:border-primary/50 group"
                        >
                            <span className="font-mono text-2xl font-bold text-text-primary-light dark:text-white tracking-widest group-hover:text-primary transition-colors">{circle.inviteCode}</span>
                            <span className="w-px h-6 bg-gray-200 dark:bg-white/10"></span>
                            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                        </button>
                        {copied && <p className="text-[10px] text-green-500 font-bold mt-2 absolute bottom-2">Copied to clipboard!</p>}
                     </div>
                 )}

                 <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-3 items-start">
                     <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                     <div>
                         <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Saving Rules</h4>
                         <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Everyone contributes ₹500 every Monday. Missed payments affect the circle streak.</p>
                     </div>
                 </div>

                 <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5">
                     {circle.members.map((m, i) => (
                         <div key={m.id} className="p-4 flex items-center gap-4 border-b border-border-light dark:border-white/5 last:border-0">
                             <span className="font-bold text-text-secondary-light dark:text-text-secondary-dark w-4">{i + 1}</span>
                             <div className="relative">
                                <img src={m.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/5" />
                                {m.id === 'u1' && <div className="absolute -top-1 -right-1 bg-primary text-[8px] font-bold px-1 rounded-sm text-background-dark">ME</div>}
                             </div>
                             <div className="flex-1">
                                 <p className="font-bold text-text-primary-light dark:text-white text-sm">{m.name}</p>
                                 <div className="flex items-center gap-1 mt-1">
                                    <div className="h-1.5 w-16 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{width: `${m.consistency}%`}}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">{m.consistency}%</span>
                                 </div>
                             </div>
                             <button className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                                 <span className="material-symbols-outlined text-xl">chat_bubble</span>
                             </button>
                         </div>
                     ))}
                 </div>
                 
                 <Button variant="secondary" fullWidth className="mt-4">
                    <span className="material-symbols-outlined">person_add</span> Invite Friend
                 </Button>
             </div>
        )}

        {/* CHAT / JOURNAL TAB */}
        {(activeTab === 'chat' || activeTab === 'journal') && (
            <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
                    <div className="text-center py-4">
                        <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark bg-gray-200 dark:bg-white/5 inline-block px-3 py-1 rounded-full">Today</p>
                    </div>

                    {chatMessages.map((msg) => {
                        if (msg.type === 'event') {
                            return (
                                <div key={msg.id} className="flex items-center justify-center gap-2 opacity-60 my-4">
                                    <div className="h-[1px] w-8 bg-gray-400"></div>
                                    <p className="text-[10px] font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark">{msg.text}</p>
                                    <div className="h-[1px] w-8 bg-gray-400"></div>
                                </div>
                            );
                        }

                        // For solo mode, messages are effectively 'notes'
                        const isMe = msg.userId === 'u1';
                        return (
                            <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {!isMe && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 shrink-0 overflow-hidden">
                                        <img src={circle.members.find(m => m.id === msg.userId)?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                                    isMe 
                                    ? 'bg-primary text-background-dark rounded-tr-sm' 
                                    : 'bg-white dark:bg-card-dark border border-border-light dark:border-white/5 text-text-primary-light dark:text-white rounded-tl-sm shadow-sm'
                                }`}>
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-black/40' : 'text-gray-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                {/* Message Input Area (Fixed at bottom of tab view) */}
                <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 fixed bottom-[70px] left-0 w-full max-w-md mx-auto">
                    <div className="flex gap-2 items-center bg-gray-100 dark:bg-white/5 p-2 rounded-full border border-transparent focus-within:border-primary/50 transition-colors">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-xl">{isSolo ? 'edit' : 'add_circle'}</span>
                        </button>
                        <input 
                            type="text" 
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            placeholder={isSolo ? "Add a note..." : "Message..."}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-text-primary-light dark:text-white placeholder:text-text-secondary-light"
                        />
                        <button 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${msgText ? 'bg-primary text-background-dark rotate-0' : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark rotate-0'}`}
                            disabled={!msgText}
                        >
                            <Send size={18} fill={msgText ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}