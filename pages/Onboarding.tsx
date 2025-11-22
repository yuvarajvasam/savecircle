import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [dailyGoal, setDailyGoal] = useState(100);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const navigate = useNavigate();
  const holdInterval = useRef<any>(null);

  const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6TyHudBytgnsX1TP01pWXlxTOkftaDq-aTVYZl7QQQagukh23HuQuuv2VDtsy2aJA4yC0cvRfgB2n-aRbCmgWUK7OLK0DMCW0Is3fgiCeZkkrBZFm0L46RC_DCLyJRw80n0ZOwIK6F8AF8oEs2MAiS2CG9um1EjBa0kx4o6Ux8zaKLo-VNrQij65TxZEj-85xa1O9VIFISx0BtRRNK-B1ufqZTnmYXf_epiFBbn6cS9vFtA_CsBIoF3jBR0gccSmD6XmKvG7ufYA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYYCShPm2xmfNw5VfnfplQJSO0fwCtWr6K64DWtEvPB8tOM3NzNYtSbcF-CHEC6LZ-Tz6A_ALmMBm71ivwzu2SH5U6-cQm3Xc_oH2qgagVK8o6I9GNK1Ck1LGWq_nqUOfOd33hlBut1_rOJA2qpALWIIhAqZtq6JomAzTpn8tviphMgt_sZqjT7VMht838Vf9VjHJslh4Mh2reN3-fFV0OlV3VE6pGYt73shJMfpF6gGzow-H-kPIl75DrW3BHErsQlnJKugjDEtQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCDYuNCAO6p-3B73zihfgImAKGh2zy-TSGIT-lFMlSJbu5jd7IFr7O66hTWUnmeFfgqOOEykUTRZuakTwH6lhDHx9Gh4WtR3pJ-BCD6x66Ob55h7sRRChVtJEVZGrJhzy9QK5AM36_HwAd1gGUWgy3CTUpaVwYXq--vQteBmAIohdH1H-znK_6P7UIJneQnK-lldArgJe5p2fK7oaS6OUMpi-MVxsStktiAuBOwIauUJ8vwPaKXsx60TJtlrEcJSRdtk3D2U2H5Gc0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQAOBXkpEZFMmiGQ7ZEzS88ymJrV6G8SyqtHA_mIO4eV6xAn_xyQo9-Pg296RPV0Vi0ARPcx5Q5Xt1ZIOhLEeKIaGBMrSJWj3I6_tZAaVsBfgO20kw66hk9NXMr-MrAKvVq9MKliwHflW73sPf_jaaCT7jAlpvpLz8eqyUAOXIYD3r3ZMV0kC4SGgeK46AEP2Ht7IXa2WSK3_PmBsuAEqWTb4fyB_iJDvxUxDkVG3j-Co9GeAU8TTIcb9SEFFI66EwNPkCfChfN-s',
  ];

  useEffect(() => {
    if (avatars.length > 0 && !selectedAvatar) {
        setSelectedAvatar(avatars[0]);
    }
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const startHold = () => {
    setHolding(true);
    let progress = 0;
    // Faster feedback loop
    holdInterval.current = setInterval(() => {
        progress += 3; 
        setHoldProgress(progress);
        if (progress >= 100) {
            clearInterval(holdInterval.current);
            setTimeout(() => finish(), 200); // Slight delay to see completion
        }
    }, 20);
  };

  const endHold = () => {
    if (holdProgress < 100) {
        setHolding(false);
        setHoldProgress(0);
        clearInterval(holdInterval.current);
    }
  };

  const finish = () => {
    // Persist user choices
    localStorage.setItem('savecircle_daily_goal', dailyGoal.toString());
    if (selectedAvatar) localStorage.setItem('savecircle_avatar', selectedAvatar);
    
    onComplete();
    navigate('/');
  };

  return (
    <div className="h-full w-full bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden font-display transition-colors duration-500">
      
      {/* Minimal Navigation */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-center">
        {step > 1 ? (
           <button onClick={prevStep} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <ChevronRight className="rotate-180" size={20} strokeWidth={1.5} />
           </button>
        ) : <div className="w-10" />}
        
        {/* Minimal Progress Indicator */}
        <div className="flex gap-2">
           {[1, 2, 3].map(i => (
             <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 dark:bg-white/10'}`} />
           ))}
        </div>
        <div className="w-10" />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full relative">
        
        {/* STEP 1: INTRO */}
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in text-center">
             <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center mb-12 relative">
                 <div className="absolute inset-0 border-8 border-primary opacity-20 rounded-full animate-ping"></div>
             </div>
             
             <h1 className="text-5xl font-bold text-text-primary-light dark:text-white mb-6 tracking-tight">
               SaveCircle
             </h1>
             <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-normal leading-relaxed max-w-xs">
               Master your money through <br/> consistency and community.
             </p>

             <div className="absolute bottom-10 w-full px-8">
                <button onClick={nextStep} className="w-full h-16 bg-text-primary-light dark:bg-white text-background-light dark:text-black rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                   Get Started
                </button>
             </div>
          </div>
        )}

        {/* STEP 2: GOAL */}
        {step === 2 && (
           <div className="flex-1 flex flex-col justify-center p-8 animate-slide-up">
              <p className="text-sm font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-4">Daily Target</p>
              
              <div className="relative mb-2">
                 <span className="text-7xl font-bold text-text-primary-light dark:text-white tracking-tighter">
                    ₹{dailyGoal}
                 </span>
              </div>
              
              <p className="text-lg text-primary-dark dark:text-primary font-medium mb-12 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                 That's ₹{(dailyGoal * 365).toLocaleString()} per year
              </p>

              <div className="mb-16">
                 <input 
                   type="range" 
                   min="50" 
                   max="1000" 
                   step="50" 
                   value={dailyGoal}
                   onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                   className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                 />
                 <div className="flex justify-between mt-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">
                    <span>₹50</span>
                    <span>₹1000</span>
                 </div>
              </div>

              <div className="absolute bottom-10 w-full px-8 left-0">
                <button onClick={nextStep} className="w-full h-16 bg-text-primary-light dark:bg-white text-background-light dark:text-black rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all">
                   Set Goal
                </button>
             </div>
           </div>
        )}

        {/* STEP 3: COMMIT (Renumbered from 4) */}
        {step === 3 && (
           <div className="flex-1 flex flex-col justify-between p-8 animate-slide-up">
              <div className="mt-8">
                 <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-8 text-center">Who are you?</h2>
                 
                 {/* Minimal Avatar Grid */}
                 <div className="grid grid-cols-4 gap-4 mb-12">
                    {avatars.map((src, i) => (
                        <button 
                           key={i} 
                           onClick={() => setSelectedAvatar(src)}
                           className={`aspect-square rounded-full overflow-hidden transition-all duration-300 ${selectedAvatar === src ? 'ring-4 ring-primary scale-110 opacity-100' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}`}
                        >
                           <img src={src} className="w-full h-full object-cover" alt="Avatar" />
                        </button>
                    ))}
                 </div>

                 {/* Summary Block */}
                 <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-white/5 text-center">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium uppercase tracking-widest mb-2">The Pledge</p>
                    <p className="text-2xl font-bold text-text-primary-light dark:text-white leading-relaxed">
                       I commit to saving <br/>
                       <span className="text-primary-dark dark:text-primary">₹{dailyGoal}</span> every day.
                    </p>
                 </div>
              </div>

              {/* Circular Hold Button - The visual representation of "Closing the deal" */}
              <div className="flex justify-center pb-8 relative">
                  <button 
                    className="relative w-24 h-24 rounded-full flex items-center justify-center transition-transform active:scale-95 touch-none select-none focus:outline-none"
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                  >
                     {/* Track */}
                     <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="46" fill="none" stroke="currentColor" className="text-gray-200 dark:text-white/10" strokeWidth="4" />
                        <circle 
                           cx="48" cy="48" r="46" 
                           fill="none" 
                           stroke="currentColor" 
                           className="text-primary transition-all duration-75 ease-linear" 
                           strokeWidth="4" 
                           strokeDasharray="289"
                           strokeDashoffset={289 - (289 * holdProgress / 100)}
                           strokeLinecap="round"
                        />
                     </svg>
                     
                     {/* Inner Content */}
                     <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${holdProgress > 0 ? 'bg-primary text-background-dark' : 'bg-text-primary-light dark:bg-white text-white dark:text-black'}`}>
                        {holdProgress >= 100 ? (
                           <Check size={32} strokeWidth={3} />
                        ) : (
                           <span className="font-bold text-sm">{holding ? 'HOLD' : 'START'}</span>
                        )}
                     </div>
                  </button>
                  
                  {!holding && (
                     <p className="absolute -bottom-4 text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium animate-pulse">Hold to commit</p>
                  )}
              </div>
           </div>
        )}

      </div>
    </div>
  );
};
