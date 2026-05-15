import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Plus, Star, Menu, X, ChefHat, UserCircle, FlaskConical, 
  Dumbbell, Activity, HeartPulse, Stethoscope, UtensilsCrossed, 
  Coffee, Timer, Gauge, Check, ChevronRight, ChevronLeft, Loader2,
  Dna, Zap, ShieldCheck
} from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
  intensity?: number;
}

function TiltCard({ children, className }: TiltCardProps) {
  return (
    <div className={className}>
      <div>{children}</div>
    </div>
  );
}

import GreenGlow from "./GreenGlow";
import FittiCursor from "./FittiCursor";

function CustomSelect({ options, value, onChange, name, label }: { options: string[], value: string, onChange: (name: string, val: string) => void, name: string, label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 relative" ref={containerRef}>
      <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-black/10 hover:border-fitti-forest cursor-pointer text-3xl md:text-5xl font-black uppercase tracking-tighter py-6 flex justify-between items-center group transition-colors"
      >
        <span className={value ? "text-zinc-900" : "text-zinc-200"}>{value || "Select Option"}</span>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          <ChevronRight size={32} className="text-zinc-200 group-hover:text-fitti-forest transition-colors" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] left-0 right-0 top-full mt-4 bg-white/90 backdrop-blur-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden rounded-[2.5rem] p-3"
          >
            <div className="space-y-1">
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(name, opt);
                    setIsOpen(false);
                  }}
                  className="px-8 py-5 text-2xl font-black uppercase tracking-tighter text-zinc-400 hover:text-fitti-forest hover:bg-fitti-forest/5 cursor-pointer rounded-[1.5rem] transition-all relative flex items-center justify-between group"
                >
                  <span className="relative z-10">{opt}</span>
                  {value === opt && (
                    <motion.div 
                      layoutId={`accent-${name}`}
                      className="absolute left-0 w-1.5 h-10 bg-fitti-forest rounded-full"
                    />
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <Plus size={16} className="text-fitti-forest" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [membershipTab, setMembershipTab] = useState("Fat Loss");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    goal: "Weight Loss",
    age: "",
    height: "",
    weight: "",
    foodPreference: "Veg",
    hasMedicalCondition: "No",
    medicalDescription: "",
    location: "",
    planInterest: "Weekly Trial",
    requestConsultation: "No"
  });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  


  const rotateX = useTransform(smoothProgress, [0, 0.2], [0, 15]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const shape1Y = useTransform(smoothProgress, [0, 1], [0, -800]);
  const shape1Rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const shape2Y = useTransform(smoothProgress, [0, 1], [0, 400]);
  const shape2Rotate = useTransform(smoothProgress, [0, 1], [0, -180]);
  const shape3X = useTransform(smoothProgress, [0.3, 0.6], [-200, 200]);

  // Deep Parallax Layers
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -1200]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -600]);
  const layer3Y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const bgRotation = useTransform(smoothProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (formStep === 1 && (!formData.fullName || !formData.phone)) {
      alert("Please enter your name and phone.");
      return;
    }
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => setFormStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow submission on the final step
    if (formStep < 4) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col selection:bg-fitti-forest selection:text-white overflow-x-hidden bg-white text-zinc-900">
      <GreenGlow />
      <FittiCursor />
      <div className="noise-overlay" />

      {/* Blueprint Static Elements */}
      <div className="fixed inset-0 grid-overlay -z-20 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay-sub -z-20 pointer-events-none opacity-40 md:opacity-50" />
      
      {/* Floating 3D Graphic Accents & Themed Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 perspective-2000">
        <motion.div 
          style={{ y: layer1Y, rotate: bgRotation }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.012]"
        >
          <Dumbbell size={800} strokeWidth={0.1} className="rotate-45" />
        </motion.div>

        {/* Distributed Technical Accents */}
        <motion.div 
          style={{ y: layer2Y, rotate: shape1Rotate }}
          className="absolute top-[10%] -right-32 w-[35rem] h-[35rem] border border-black/5 rounded-[6rem] blur-[1px] opacity-[0.08]"
        />
        
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [400, -1000]), rotate: 15, scale: 1.2 }}
          className="absolute top-[5%] left-[10%] opacity-[0.015] text-fitti-forest"
        >
          <Activity size={400} strokeWidth={0.2} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [1200, -800]), rotate: -25 }}
          className="absolute top-[15%] right-[15%] opacity-[0.01] text-zinc-900"
        >
          <Dna size={500} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [2000, -400]), rotate: 45 }}
          className="absolute top-[30%] left-[5%] opacity-[0.01] text-fitti-forest"
        >
          <Zap size={300} strokeWidth={0.1} />
        </motion.div>
        
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [800, -500]), rotate: -10, scale: 0.8 }}
          className="absolute top-[40%] right-[5%] opacity-[0.015] text-black"
        >
          <Stethoscope size={350} strokeWidth={0.2} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [3500, -200]), rotate: 10 }}
          className="absolute top-[50%] left-[20%] opacity-[0.01] text-zinc-900"
        >
          <FlaskConical size={450} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [4500, 200]), rotate: -15 }}
          className="absolute top-[65%] right-[20%] opacity-[0.01] text-fitti-forest"
        >
          <ShieldCheck size={350} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [5500, 800]), rotate: 30 }}
          className="absolute top-[80%] left-[15%] opacity-[0.01] text-zinc-900"
        >
          <HeartPulse size={400} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ x: shape3X }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fitti-forest/10 to-transparent opacity-15"
        />
      </div>

      <div className="scanline" />

      {/* Navigation - Floating Island Design */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6 pointer-events-none">
        <motion.div 
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 glass-pill transition-all duration-700 ${scrolled ? "bg-white/80 shadow-lg scale-[0.98]" : "bg-white/40"}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        >
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
             className="text-xl font-black tracking-tighter text-fitti-forest cursor-pointer"
          >
            Fitti.
          </button>

          <div className="hidden md:flex items-center gap-8 font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <button onClick={() => scrollToSection("system")} className="hover:text-fitti-forest transition-colors cursor-pointer">System</button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-fitti-forest transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => scrollToSection("outcomes")} className="hover:text-fitti-forest transition-colors cursor-pointer">Outcomes</button>
            <button 
              onClick={() => scrollToSection("apply")} 
              className="px-5 py-2 bg-fitti-forest text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Apply
            </button>
          </div>

          <button className="md:hidden p-2 text-zinc-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </nav>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col items-center justify-center p-12 md:hidden"
          >
            <div className="flex flex-col gap-12 text-center">
              <button onClick={() => scrollToSection("system")} className="text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest">System</button>
              <button onClick={() => scrollToSection("pricing")} className="text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest">Pricing</button>
              <button onClick={() => scrollToSection("outcomes")} className="text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest">Outcomes</button>
              <button onClick={() => scrollToSection("apply")} className="text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest">Apply</button>
              <button onClick={() => setIsMenuOpen(false)} className="mt-12 text-white/40 uppercase tracking-[0.4em] text-xs">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <main className="flex-1 flex flex-col relative z-10">
        <section id="hero" className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 pt-20 sticky top-0 overflow-hidden perspective-2000">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, rotateX }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[25vw] md:text-[22rem] font-black tracking-tighter text-fitti-forest leading-[0.75] px-4"
            >
              Fitti.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center gap-4 mt-12"
            >
              <p className="text-2xl md:text-5xl font-serif italic tracking-tight text-zinc-400">
                Evolve Your Fitness.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-20 flex flex-col items-center gap-6 group cursor-pointer"
            onClick={() => scrollToSection("system")}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.6em] text-zinc-300 group-hover:text-fitti-forest transition-colors">
              Initiate Stream
            </div>
            <motion.div 
              animate={{ y: [0, 15, 0], opacity: [0.1, 0.5, 0.1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-16 bg-gradient-to-b from-fitti-forest to-transparent"
            />
          </motion.div>
        </section>

        <section id="system" className="flex flex-col justify-center py-16 md:py-24 px-4 md:px-12 lg:px-24 relative z-20">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                The Architecture
              </div>
              <h2 className="text-[18vw] md:text-[10rem] font-black tracking-tighter leading-[0.8] text-zinc-900">
                The <span className="text-fitti-forest">Ecosystem.</span>
              </h2>
              <p className="text-xl md:text-4xl font-serif italic text-zinc-400 max-w-3xl leading-tight">
                A high-performance blueprint where every calorie and repetition is monitored by a dedicated team of specialists.
              </p>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:auto-rows-[350px]">
              {/* Feature 1: Coach (Large) */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="md:col-span-8 md:row-span-2 double-bezel"
              >
                <div className="double-bezel-inner p-6 md:p-12 flex flex-col md:flex-row justify-between group overflow-hidden relative">
                   <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                     <UserCircle size={500} />
                   </div>
                   
                   <div className="flex flex-col justify-between h-full relative z-10 max-w-xl">
                     <div className="space-y-8">
                       <div className="w-16 h-16 rounded-2xl bg-fitti-forest/10 flex items-center justify-center border border-fitti-forest/20">
                         <UserCircle className="text-fitti-forest" size={32} />
                       </div>
                       <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-none">Personalized<br/>Directives.</h3>
                       <p className="text-xl md:text-2xl text-zinc-500 font-serif italic leading-relaxed">
                         Your dedicated expert. Every session is architected around your unique biology, 
                         real-time biometrics, and high-performance schedule.
                       </p>
                     </div>
                     <div className="flex items-center gap-4 mt-12 flex-wrap">
                        <div className="px-4 py-2 glass-pill text-[10px] font-black uppercase tracking-widest text-fitti-forest">
                          Elite Coaching
                        </div>
                        <div className="px-4 py-2 glass-pill text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          P2P Connection
                        </div>
                     </div>
                   </div>

                   <div className="hidden lg:flex flex-col justify-center gap-8 relative z-10 border-l border-black/5 pl-16 ml-16">
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-fitti-forest uppercase tracking-widest">Protocol 01</span>
                        <h4 className="text-xl font-black text-zinc-900">Neural Sync</h4>
                        <p className="text-xs text-zinc-400 font-serif italic">Real-time coaching adjustments based on feedback.</p>
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-fitti-forest uppercase tracking-widest">Protocol 02</span>
                        <h4 className="text-xl font-black text-zinc-900">Biometric Audit</h4>
                        <p className="text-xs text-zinc-400 font-serif italic">Weekly analysis of your physiological data points.</p>
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-fitti-forest uppercase tracking-widest">Protocol 03</span>
                        <h4 className="text-xl font-black text-zinc-900">Dynamic Load</h4>
                        <p className="text-xs text-zinc-400 font-serif italic">Evidence-based intensity scaling for maximum hypertrophy.</p>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Feature 2: Nutrition (Tall) */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 double-bezel"
              >
                <div className="double-bezel-inner p-8 flex flex-col justify-between group overflow-hidden">
                   <div className="space-y-6">
                     <ChefHat className="text-fitti-forest opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                     <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 leading-none">Nutrition Vault.</h3>
                     <p className="text-sm text-zinc-500 font-serif italic leading-relaxed">Cooked fresh. Delivered daily. Macro-accurate fuel designed for your specific metabolic window.</p>
                     
                     <ul className="space-y-3 pt-4 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <li className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400"><Check size={10} className="text-fitti-forest"/> KDS Tracking</li>
                        <li className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400"><Check size={10} className="text-fitti-forest"/> E2EE Logistics</li>
                        <li className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400"><Check size={10} className="text-fitti-forest"/> Fresh Delivery</li>
                     </ul>
                   </div>
                </div>
              </motion.div>

              {/* Feature 3: Health (Square) */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 double-bezel"
              >
                <div className="double-bezel-inner p-8 flex flex-col justify-between group overflow-hidden">
                   <div className="space-y-6">
                     <FlaskConical className="text-fitti-forest opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                     <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 leading-none">Vitality Gate.</h3>
                     <p className="text-sm text-zinc-500 font-serif italic leading-relaxed">Clinical progress tracking and evidence-based intensity adjustment via medical oversight.</p>
                     
                     <div className="pt-4 grid grid-cols-2 gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-fitti-forest uppercase tracking-widest">BPM</span>
                           <span className="text-xl font-black text-zinc-900 tracking-tighter">REST 52</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-fitti-forest uppercase tracking-widest">VO2</span>
                           <span className="text-xl font-black text-zinc-900 tracking-tighter">MAX 58</span>
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            </div>

            <div className="max-w-6xl mb-12 space-y-8 mt-24">
              <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-black/5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
                The Logistics
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase">
                Operational <span className="text-fitti-forest italic">Workflow.</span>
              </h2>
              <p className="text-lg md:text-2xl text-zinc-400 font-serif italic max-w-2xl leading-tight">
                Total visibility of your evolution. A 5-stage progress cycle built for absolute precision.
              </p>
            </div>

            <div className="space-y-16 w-full border-t border-black/5 pt-16">
               {[
                { id: "01", title: "Identity & Security Protocol.", desc: "Multi-stage onboarding with 256-bit NaCl E2EE encryption setup. Your private data stays in your secure browser memory." },
                { id: "02", title: "The Performance Directive.", desc: "Your dedicated coach issues 'Directives'—multi-day protocols that evolve weekly based on your performance dossier." },
                { id: "03", title: "The Nutrition Vault.", desc: "Macro-accurate meals delivered daily. Live status tracking from the Kitchen Display System (KDS) directly to your HUD." },
                { id: "04", title: "The Logistics Stream.", desc: "A 5-stage progress cycle: Pending → Processing → Secured → Transit → Deployed. Total visibility of your evolution." },
                { id: "05", title: "Clinical Vitality Gate.", desc: "Doctor-led medical oversight every 2-3 weeks. Clinical progress tracking and evidence-based intensity adjustment." }
               ].map((p, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                   whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                   transition={{ duration: 1, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                   viewport={{ once: true, margin: "-100px" }}
                   className="flex flex-col md:flex-row gap-16 items-start group relative border-l border-black/5 hover:border-fitti-forest/40 pl-12 transition-colors perspective-1000"
                 >
                   <span className="font-mono text-6xl md:text-9xl opacity-[0.03] group-hover:opacity-100 group-hover:text-fitti-forest transition-all duration-700 select-none text-zinc-900">{p.id}</span>
                   <div className="space-y-6 pt-4">
                     <h5 className="text-4xl md:text-6xl font-black tracking-tighter group-hover:translate-x-4 transition-transform duration-700 text-zinc-900">{p.title}</h5>
                     <p className="text-xl md:text-2xl text-zinc-500 max-w-5xl font-serif italic leading-relaxed">{p.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="flex flex-col justify-center py-16 md:py-24 px-4 md:px-12 lg:px-24">
          <div className="w-full text-center perspective-2000">
            <h2 className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-[0.8] text-zinc-900 mb-16">
              Biological<br/>
              <span className="text-fitti-forest">Optimization.</span>
            </h2>
            <p className="text-sm opacity-20 font-mono uppercase tracking-[0.5em] mb-16 text-zinc-900">[ Fat Loss // Muscle Gain // Body Recomposition ]</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
               {[
                 { 
                   label: "Performance", 
                   title: "Performance Architect", 
                   icon: <Dumbbell className="text-fitti-forest" size={20} />,
                   desc: "Your trainer architects daily calorie/macro targets and dynamic workout protocols tailored to your biometrics." 
                 },
                 { 
                   label: "Clinical", 
                   title: "Medical Oversight", 
                   icon: <Stethoscope className="text-fitti-forest" size={20} />,
                   desc: "Doctor-led monitoring with periodic health checkups to ensure absolute physiological safety and optimization." 
                 },
                 { 
                   label: "Logistics", 
                   title: "Cloud Kitchen", 
                   icon: <UtensilsCrossed className="text-fitti-forest" size={20} />,
                   desc: "Macro-accurate meals prepared in our sterile logistics hub and deployed fresh to your location every 24 hours." 
                 },
                 { 
                   label: "Interface", 
                   title: "Neural HUD", 
                   icon: <Gauge className="text-fitti-forest" size={20} />,
                   desc: "Real-time 1:1 chat with specialists and a custom dashboard to monitor your evolution in high-fidelity." 
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   whileInView={{ opacity: 1, y: 0 }}
                   initial={{ opacity: 0, y: 20 }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="double-bezel"
                 >
                   <div className="double-bezel-inner p-8 text-left space-y-6 h-full flex flex-col justify-between group">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="p-3 bg-fitti-forest/5 rounded-xl border border-fitti-forest/10">
                              {item.icon}
                           </div>
                           <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-[0.4em]">{item.label}</span>
                        </div>
                        <h4 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase group-hover:text-fitti-forest transition-colors">{item.title}</h4>
                        <p className="text-sm text-zinc-400 font-serif italic leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                         <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Active Stream</span>
                         <div className="w-1.5 h-1.5 rounded-full bg-fitti-forest animate-pulse" />
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-24 relative z-20">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                Investment
              </div>
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase">
                The <span className="text-fitti-forest italic">Protocol</span> <br/>Cost.
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-serif italic max-w-2xl leading-tight">
                Select your level of evolution. From rapid trials to total biological restructuring.
              </p>
            </div>

            {/* 6-Day Trial - The Hook */}
            <div className="mb-24">
              <div className="flex items-center gap-6 mb-16">
                <h3 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">01. The 6-Day Trial</h3>
                <div className="h-px flex-1 bg-black/5" />
                <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest">[ Low Barrier Entry ]</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Lean", price: "5,099", icon: <Activity size={24} /> },
                  { name: "Maintain", price: "5,499", icon: <Zap size={24} /> },
                  { name: "Bulk", price: "5,999", icon: <Dumbbell size={24} /> }
                ].map((plan, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="double-bezel group cursor-pointer"
                  >
                    <div className="double-bezel-inner p-10 space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        {plan.icon}
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Protocol</span>
                        <h4 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">{plan.name}</h4>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-black text-zinc-400">₹</span>
                        <span className="text-6xl font-black tracking-tighter text-fitti-forest">{plan.price}</span>
                      </div>
                      <div className="pt-6 border-t border-black/5 space-y-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                          Included: 3 Meals, 3 Deliveries, Online Doctor Consultation, and Packing.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Core Memberships - The Main Plans */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">02. Core Memberships</h3>
                  <p className="font-serif italic text-xl text-zinc-400">Monthly architectural scaling for sustained results.</p>
                </div>
                
                <div className="flex p-1 bg-zinc-100 rounded-full">
                  {["Fat Loss", "Maintain", "Bulk"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setMembershipTab(tab)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${membershipTab === tab ? "bg-white text-fitti-forest shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={membershipTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {(
                    membershipTab === "Fat Loss" ? [
                      { name: "Lite", price: "13,999", desc: "Essential biological optimization." },
                      { name: "Plus", price: "21,999", desc: "Advanced performance protocol." },
                      { name: "Elite", price: "27,999", desc: "Maximum biological evolution." }
                    ] : membershipTab === "Maintain" ? [
                      { name: "Lite", price: "14,999", desc: "Steady-state vitality maintenance." },
                      { name: "Plus", price: "23,999", desc: "Peak performance homeostasis." },
                      { name: "Elite", price: "28,999", desc: "Full spectrum metabolic balance." }
                    ] : [
                      { name: "Lite", price: "15,999", desc: "Structured mass accumulation." },
                      { name: "Plus", price: "25,999", desc: "Hypertrophy specialized directive." },
                      { name: "Elite", price: "29,999", desc: "Total structural reconstruction." }
                    ]
                  ).map((plan, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className={`double-bezel group ${plan.name === "Plus" ? "border-fitti-forest/20 shadow-2xl shadow-fitti-forest/5" : ""}`}
                    >
                      <div className="double-bezel-inner p-12 space-y-10 relative overflow-hidden">
                        {plan.name === "Plus" && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-fitti-forest" />
                        )}
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">{plan.name}</h4>
                            {plan.name === "Plus" && (
                              <span className="px-3 py-1 bg-fitti-forest text-white text-[8px] font-black uppercase tracking-widest rounded-full">Recommended</span>
                            )}
                          </div>
                          <p className="text-lg text-zinc-500 font-serif italic">{plan.desc}</p>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-zinc-400">₹</span>
                          <span className="text-7xl font-black tracking-tighter text-zinc-900 group-hover:text-fitti-forest transition-colors">{plan.price}</span>
                          <span className="text-sm font-mono text-zinc-300 ml-2">/ MO</span>
                        </div>

                        <ul className="space-y-4 pt-8 border-t border-black/5">
                          {[
                            "Precision Macro Tracking",
                            "Daily Performance Meals",
                            "Specialist Access",
                            "Biometric Analysis"
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              <Check size={12} className="text-fitti-forest" /> {item}
                            </li>
                          ))}
                        </ul>

                        <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${plan.name === "Plus" ? "bg-fitti-forest text-white shadow-lg shadow-fitti-forest/20" : "bg-zinc-900 text-white hover:bg-black"}`}>
                          Deploy Plan
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="apply" className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-24">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8 relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                Onboarding
              </div>
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase italic">
                Get Your<br/><span className="text-fitti-forest">Design.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-serif italic max-w-2xl leading-tight">
                The invitation is yours. Complete the analysis to receive your personalized architecture.
              </p>
            </div>

            <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-fitti-forest/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-fitti-forest/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto perspective-2000">
               <div className="double-bezel">
                <div className="double-bezel-inner p-10 md:p-20 relative overflow-hidden bg-white">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fitti-forest/[0.03] to-transparent pointer-events-none" />
                  
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 space-y-10"
                    >
                      <div className="w-24 h-24 bg-fitti-forest text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(118,185,0,0.2)]">
                        <Check size={48} strokeWidth={3} />
                      </div>
                      <h3 className="text-6xl font-black tracking-tighter text-zinc-900">SUCCESSFULLY LOGGED.</h3>
                      <p className="text-xl text-zinc-500 font-serif italic max-w-sm mx-auto">Our team will reach out within 24 hours to begin your transformation.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-12 px-10 py-5 bg-zinc-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform"
                      >
                        Reset Form
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-12">
                      <div className="flex justify-between items-center border-b border-black/5 pb-10">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.5em]">Phase</span>
                          <span className="text-5xl font-black tracking-tighter text-fitti-forest">0{formStep}</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`w-12 h-1 rounded-full transition-all duration-700 ${s <= formStep ? "bg-fitti-forest shadow-[0_0_10px_rgba(118,185,0,0.2)]" : "bg-zinc-100"}`} />
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-12">
                        <AnimatePresence mode="wait">
                          {formStep === 1 && (
                            <motion.div 
                              key="step1"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-10"
                            >
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Identified As</label>
                                <input 
                                  required={formStep === 1}
                                  type="text" 
                                  name="fullName"
                                  placeholder="SURNAME, GIVEN NAME"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-xl md:text-6xl font-black uppercase tracking-tighter transition-all py-6 placeholder:text-zinc-100 text-zinc-900"
                                />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Direct Communication Node</label>
                                <input 
                                  required={formStep === 1}
                                  type="tel" 
                                  name="phone"
                                  placeholder="+91 // 00000 00000"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-xl md:text-5xl font-black uppercase tracking-tighter transition-all py-6 placeholder:text-zinc-100 text-zinc-900"
                                />
                              </div>
                            </motion.div>
                          )}

                          {formStep === 2 && (
                            <motion.div 
                              key="step2"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-16"
                            >
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Age</label>
                                <input name="age" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Height (CM)</label>
                                <input name="height" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Weight (KG)</label>
                                <input name="weight" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <CustomSelect 
                                  name="goal"
                                  label="Objective"
                                  value={formData.goal}
                                  options={["Weight Loss", "Muscle Gain", "Maintain"]}
                                  onChange={(name, val) => setFormData(p => ({ ...p, [name]: val }))}
                                />
                              </div>
                            </motion.div>
                          )}

                          {formStep === 3 && (
                            <motion.div 
                              key="step3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-16"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Dietary Protocol</label>
                                  <div className="flex gap-4">
                                    {["Veg", "Non-veg"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, foodPreference: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.foodPreference === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Medical History</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, hasMedicalCondition: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.hasMedicalCondition === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {formData.hasMedicalCondition === "Yes" && (
                                <textarea 
                                  name="medicalDescription"
                                  placeholder="BRIEF CLINICAL OVERVIEW"
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border border-black/10 focus:border-fitti-forest outline-none text-xl font-medium p-8 rounded-3xl min-h-[150px] transition-all text-zinc-900"
                                />
                              )}
                            </motion.div>
                          )}

                          {formStep === 4 && (
                            <motion.div 
                              key="step4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-16"
                            >
                              <div className="space-y-8">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Logistics (Area / Pincode)</label>
                                <input required={formStep === 4} name="location" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-2xl md:text-6xl font-black py-6 uppercase transition-all text-zinc-900" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <CustomSelect 
                                  name="planInterest"
                                  label="Intervention Level"
                                  value={formData.planInterest}
                                  options={["Weekly Trial", "Monthly Plan"]}
                                  onChange={(name, val) => setFormData(p => ({ ...p, [name]: val }))}
                                />
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Consultation Required</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, requestConsultation: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.requestConsultation === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center pt-16 border-t border-black/5">
                          {formStep > 1 ? (
                            <button 
                              type="button"
                              onClick={prevStep}
                              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                              <ChevronLeft size={14} /> Previous
                            </button>
                          ) : <div />}

                          {formStep < 4 ? (
                            <button 
                              type="button"
                              onClick={nextStep}
                              className="flex items-center gap-4 bg-fitti-forest text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(118,185,0,0.2)]"
                            >
                              Next Phase <ChevronRight size={14} />
                            </button>
                          ) : (
                            <button 
                              disabled={isSubmitting}
                              type="submit"
                              className="flex items-center gap-4 bg-fitti-forest text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(118,185,0,0.2)]"
                            >
                              {isSubmitting ? (
                                <>Processing <Loader2 size={14} className="animate-spin" /></>
                              ) : (
                                <>Submit Application <Check size={14} /> </>
                              )}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                </div>
               </div>
            </div>

            <div className="text-center space-y-12 mt-64">
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-5xl md:text-7xl font-black italic tracking-tighter text-zinc-200"
               >
                 "Performance. Privacy. Perfection."
               </motion.div>
               <div className="font-mono text-[9px] uppercase tracking-[0.8em] text-zinc-300">[ End Operational Blueprint ]</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-50 p-6 md:p-20 flex flex-col md:flex-row items-center justify-between border-t border-black/5 bg-white gap-12">
        <div className="flex gap-4">
          <div className="w-6 h-6 bg-fitti-forest/20 rounded-sm border border-fitti-forest/40" />
          <div className="w-6 h-6 bg-black/5 rounded-sm border border-black/10" />
          <div className="w-6 h-6 bg-black/10 rounded-sm border border-black/20" />
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
               <span className="hover:text-fitti-forest cursor-pointer transition-colors">Twitter</span>
               <span className="hover:text-fitti-forest cursor-pointer transition-colors">Instagram</span>
               <span className="hover:text-fitti-forest cursor-pointer transition-colors">Privacy</span>
            </div>
            <Star className="w-4 h-4 text-fitti-forest/40" />
          </div>
          <span className="font-mono text-[9px] opacity-20 uppercase tracking-[0.4em] text-center md:text-right text-zinc-900">
            © 2026 Fitti Operations // All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
