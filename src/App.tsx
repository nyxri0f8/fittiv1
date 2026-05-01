import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Plus, Star, Menu, X, ChefHat, UserCircle, FlaskConical, 
  Dumbbell, Activity, HeartPulse, Stethoscope, UtensilsCrossed, 
  Coffee, Timer, Gauge, Check, ChevronRight, ChevronLeft, Loader2
} from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
  intensity?: number;
}

function TiltCard({ children, className, intensity = 10 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);
  const reflectionX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const reflectionY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: useTransform(
            [reflectionX, reflectionY],
            (latest) => `radial-gradient(circle at ${latest[0]} ${latest[1]}, rgba(255,255,255,0.4) 0%, transparent 60%)`
          ),
          transform: "translateZ(100px)",
        }}
      />
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div className="relative min-h-screen w-full flex flex-col selection:bg-fitti-forest selection:text-fitti-bg overflow-x-hidden">
      {/* Blueprint Static Elements */}
      <div className="fixed inset-0 grid-overlay -z-20 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay-sub -z-20 pointer-events-none opacity-40 md:opacity-50" />
      
      {/* Floating 3D Graphic Accents & Themed Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 perspective-2000">
        <motion.div 
          style={{ y: layer1Y, rotate: bgRotation }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]"
        >
          <Dumbbell size={800} strokeWidth={0.2} className="rotate-45" />
        </motion.div>

        <motion.div 
          style={{ y: layer2Y, rotate: shape1Rotate }}
          className="absolute top-[10%] -right-32 w-[35rem] h-[35rem] border border-fitti-forest/20 rounded-[6rem] blur-[2px] opacity-[0.1]"
        />
        <motion.div 
          style={{ y: layer3Y, rotate: shape2Rotate }}
          className="absolute bottom-[10%] -left-32 w-[30rem] h-[30rem] border border-fitti-terracotta/20 rounded-full blur-[4px] opacity-[0.1]"
        />
        
        {/* Deep Fitness Layer */}
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [400, -1000]), rotate: 15, scale: 1.2 }}
          className="absolute top-[5%] left-[10%] opacity-[0.05] text-fitti-forest"
        >
          <Activity size={400} strokeWidth={0.3} />
        </motion.div>
        
        {/* Medical/Health Layer */}
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [800, -500]), rotate: -10, scale: 0.8 }}
          className="absolute top-[40%] right-[5%] opacity-[0.05] text-fitti-terracotta"
        >
          <Stethoscope size={350} strokeWidth={0.3} />
        </motion.div>

        {/* Nutrition Layer */}
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [1200, -200]), rotate: 45 }}
          className="absolute bottom-[5%] left-[20%] opacity-[0.05] text-fitti-forest"
        >
          <UtensilsCrossed size={300} strokeWidth={0.3} />
        </motion.div>

        <motion.div 
          style={{ x: shape3X }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fitti-forest/30 to-transparent opacity-40"
        />

        {/* Floating Technical UI Bits */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              y: [Math.random() * 1000, Math.random() * -1000],
              x: [Math.random() * 500 - 250, Math.random() * 500 - 250],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute font-mono text-[8px] text-fitti-forest/20 tracking-tighter"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            DATA_STREAM_{i}_ACTIVE // {Math.random().toFixed(4)}
          </motion.div>
        ))}
      </div>

      <div className="scanline" />
      
      {/* Interactive Cursor Particle Swarm */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-fitti-forest/40 rounded-full"
            style={{
              x: useSpring(mouseX, { damping: 20 + i * 2, stiffness: 150 - i * 5 }),
              y: useSpring(mouseY, { damping: 20 + i * 2, stiffness: 150 - i * 5 }),
              left: -4 + i * 2,
              top: -4 + i * 2,
            }}
          />
        ))}
      </div>

      {/* Top Left: Plus Marker */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <Plus className="w-5 h-5 text-fitti-forest opacity-40" strokeWidth={1.5} />
      </div>

      {/* Top Right: Numerical Scale Stack */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-1 font-mono text-[10px] md:text-sm text-fitti-forest opacity-40 pointer-events-none">
        <span>710</span>
        <span>530</span>
        <div className="w-10 h-px bg-fitti-forest/20 my-1" />
        <span>0</span>
        <div className="w-10 h-px bg-fitti-forest/20 my-1" />
        <span>-150</span>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-700 ${scrolled ? "py-4 bg-fitti-bg/80 backdrop-blur-md border-b border-fitti-forest/5" : "py-10"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
             className="text-2xl font-black tracking-tighter text-fitti-forest cursor-pointer"
          >
            Fitti.
          </button>

          <div className="hidden md:flex items-center gap-10 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-fitti-forest">
            <button onClick={() => scrollToSection("system")} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">System</button>
            <button onClick={() => scrollToSection("outcomes")} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Outcomes</button>
            <button onClick={() => scrollToSection("apply")} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Apply</button>
            <button 
              onClick={() => scrollToSection("apply")}
              className="px-6 py-2 bg-fitti-forest text-fitti-bg rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-sm cursor-pointer"
            >
              Apply for Access
            </button>
          </div>

          <button className="md:hidden p-2 text-fitti-forest" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-fitti-bg flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="text-2xl font-black text-fitti-forest">Fitti.</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-fitti-forest" /></button>
            </div>
            <div className="flex flex-col gap-10">
              <button onClick={() => scrollToSection("system")} className="text-4xl font-bold uppercase tracking-tight text-fitti-forest/40 hover:text-fitti-forest text-left">System</button>
              <button onClick={() => scrollToSection("outcomes")} className="text-4xl font-bold uppercase tracking-tight text-fitti-forest/40 hover:text-fitti-forest text-left">Outcomes</button>
              <button onClick={() => scrollToSection("apply")} className="text-4xl font-bold uppercase tracking-tight text-fitti-forest/40 hover:text-fitti-forest text-left">Apply</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative z-10">
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 sticky top-0 overflow-hidden perspective-1000">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, rotateX }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14vw] md:text-[14rem] font-black tracking-tighter text-fitti-forest leading-[0.8] drop-shadow-[0_20px_50px_rgba(20,53,40,0.1)]"
            >
              Fitti.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-3xl font-medium tracking-tight text-fitti-forest/70 mt-8"
            >
              Evolve Your Fitness.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-28 flex flex-col items-center gap-6 group cursor-pointer"
            onClick={() => scrollToSection("system")}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
              Scroll Down
            </div>
            <motion.div 
              animate={{ y: [0, 15, 0], opacity: [0.2, 1, 0.2] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-24 bg-gradient-to-b from-fitti-forest to-transparent"
            />
          </motion.div>
        </section>

        <section id="system" className="min-h-screen flex flex-col justify-center py-24 md:py-48 px-6 md:px-12 relative z-20 bg-fitti-bg">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl mb-24 space-y-10">
              <h2 className="text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.85] text-fitti-forest">
                Fitness,<br/><span className="text-fitti-forest/20">FullyExecuted.</span>
              </h2>
              <p className="text-xl md:text-3xl font-medium opacity-70 max-w-2xl leading-tight">
                Dedicated coach. Daily meals delivered. Medical monitoring. One system. Zero excuses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 perspective-1000">
              {[
                { icon: UserCircle, title: "COACH", desc: "Your dedicated expert. Every session built around your body and schedule." },
                { icon: ChefHat, title: "NUTRITION", desc: "Designed for your body. Cooked fresh by experts. Delivered daily." },
                { icon: FlaskConical, title: "HEALTH", desc: "Medical check-ins built in. Clinical progress tracking. Evidence-based." }
              ].map((card, idx) => (
                <TiltCard 
                  key={idx}
                  className="p-12 border-2 border-fitti-forest rounded-[3rem] space-y-6 bg-fitti-cream/20 group hover:bg-fitti-forest hover:text-fitti-bg transition-all duration-500 shadow-xl hover:shadow-2xl cursor-default"
                >
                  <card.icon className="w-12 h-12 text-fitti-terracotta group-hover:text-fitti-bg transition-colors" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{card.title}</h3>
                  <p className="opacity-70 group-hover:opacity-100 leading-relaxed font-medium">{card.desc}</p>
                </TiltCard>
              ))}
            </div>

            <div className="space-y-24 max-w-5xl ml-auto border-t border-fitti-forest/10 pt-24">
               {[
                { id: "01", title: "You define your goal.", desc: "We begin with your objective, your timeline, and your constraints. The program starts from your reality, not a template." },
                { id: "02", title: "We assign your dedicated coach.", desc: "You are paired with an expert who owns your transformation end-to-end and adapts every move to your body and schedule." },
                { id: "03", title: "Your coach trains you and designs nutrition.", desc: "Training intensity and meal composition evolve weekly, based on your performance and recovery trends." },
                { id: "04", title: "Your meals are prepared and delivered daily.", desc: "Macro-accurate meals arrive ready each day. No grocery planning, no meal prep, no decision fatigue." },
                { id: "05", title: "A doctor monitors your progress every 2-3 weeks.", desc: "Clinical oversight is built in, so decisions are evidence-based and your health markers move in the right direction." }
               ].map((p, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 50, rotateY: 20 }}
                   whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                   transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                   viewport={{ once: true, margin: "-100px" }}
                   className="flex flex-col md:flex-row gap-12 items-start group relative border-l-2 border-transparent hover:border-fitti-forest/20 pl-8 transition-colors perspective-1000"
                 >
                   <span className="font-mono text-5xl md:text-8xl opacity-10 group-hover:opacity-100 transition-all duration-700 select-none">{p.id}</span>
                   <div className="space-y-4">
                     <h5 className="text-3xl md:text-5xl font-black tracking-tight group-hover:translate-x-2 transition-transform duration-500">{p.title}</h5>
                     <p className="text-lg opacity-60 max-w-2xl font-medium leading-relaxed">{p.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="min-h-screen flex flex-col justify-center py-24 md:py-48 px-6 md:px-12 bg-fitti-forest/[0.01]">
          <div className="container mx-auto text-center perspective-2000">
            <h2 className="text-6xl md:text-[8.5rem] font-black tracking-tighter leading-[0.8] text-fitti-forest mb-12">
              Pick your outcome.<br/>
              <span className="text-fitti-terracotta">We engineer the path.</span>
            </h2>
            <p className="text-lg opacity-40 font-mono uppercase tracking-[0.3em] mb-32">[ Fat Loss // Muscle Gain // Body Recomposition ]</p>
            
            <motion.div 
               whileInView={{ opacity: [0, 1], scale: [0.95, 1], rotateX: [10, 0] }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               viewport={{ once: true }}
               className="py-40 border-2 border-dashed border-fitti-forest/20 rounded-[5rem] bg-white/40 shadow-sm relative overflow-hidden group"
            >
               <motion.div 
                 animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-48 -right-48 w-96 h-96 border border-fitti-forest/5 rounded-full pointer-events-none" 
               />
               <motion.div 
                 animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute -bottom-48 -left-48 w-80 h-80 border border-fitti-terracotta/5 rounded-full pointer-events-none" 
               />

               <motion.div
                 className="relative z-10 space-y-8"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 1 }}
               >
                 <h3 className="text-5xl md:text-8xl font-black text-fitti-forest/60 tracking-tighter italic group-hover:text-fitti-forest transition-all duration-1000 group-hover:scale-105">
                    Be the first to shine.
                 </h3>
                 <p className="font-mono text-xs opacity-20 uppercase tracking-[0.5em]">Awaiting Initial Subject Transformation Data</p>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* REPLACED APPLY SECTION WITH SINGLE FORM TILE */}
        <section id="apply" className="min-h-screen flex flex-col justify-center py-24 md:py-48 px-6 md:px-12 bg-fitti-bg">
          <div className="container mx-auto">
            <div className="max-w-4xl mb-24 space-y-8">
              <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] text-fitti-forest uppercase italic">
                Get Your<br/>Design.
              </h2>
              <p className="text-xl md:text-2xl opacity-60 font-medium max-w-2xl leading-snug">
                The invitation is yours. Complete the analysis to receive your personalized architecture.
              </p>
            </div>

            <div className="max-w-4xl mx-auto perspective-2000">
               <TiltCard className="p-12 md:p-24 bg-fitti-forest text-fitti-bg rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(20,53,40,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 space-y-8"
                    >
                      <div className="w-24 h-24 bg-fitti-bg text-fitti-forest rounded-full flex items-center justify-center mx-auto mb-10">
                        <Check size={48} strokeWidth={3} />
                      </div>
                      <h3 className="text-5xl font-black tracking-tighter">SUCCESSFULLY LOGGED.</h3>
                      <p className="text-xl opacity-60 font-medium uppercase tracking-widest max-w-sm mx-auto">Our team will reach out within 24 hours to begin your transformation.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-12 px-10 py-5 bg-fitti-bg text-fitti-forest rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                      >
                        Reset Form
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-12">
                      <div className="flex justify-between items-center border-b border-fitti-bg/10 pb-8">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.5em]">Phase</span>
                          <span className="text-4xl font-black tracking-tighter">0{formStep}</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`w-12 h-1 rounded-full ${s <= formStep ? "bg-fitti-bg" : "bg-fitti-bg/20"}`} />
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-10">
                        <AnimatePresence mode="wait">
                          {formStep === 1 && (
                            <motion.div 
                              key="step1"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="space-y-8"
                            >
                              <div className="space-y-6">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Identified As</label>
                                <input 
                                  required
                                  type="text" 
                                  name="fullName"
                                  placeholder="SURNAME, GIVEN NAME"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-2xl md:text-5xl font-black uppercase tracking-tighter transition-colors py-4 placeholder:text-fitti-bg/10"
                                />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Direct Communication Node (91+)</label>
                                <input 
                                  required
                                  type="tel" 
                                  name="phone"
                                  placeholder="PHONE_NUM"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-2xl md:text-4xl font-black uppercase tracking-tighter transition-colors py-4 placeholder:text-fitti-bg/10"
                                />
                              </div>
                            </motion.div>
                          )}

                          {formStep === 2 && (
                            <motion.div 
                              key="step2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                              <div className="space-y-4">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Age</label>
                                <input name="age" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-4xl font-black p-4" />
                              </div>
                              <div className="space-y-4">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Height (CM)</label>
                                <input name="height" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-4xl font-black p-4" />
                              </div>
                              <div className="space-y-4">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Weight (KG)</label>
                                <input name="weight" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-4xl font-black p-4" />
                              </div>
                              <div className="space-y-4">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Objective</label>
                                <select name="goal" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-2xl font-black p-4 appearance-none">
                                  <option value="Weight Loss" className="text-fitti-forest">Weight Loss</option>
                                  <option value="Muscle Gain" className="text-fitti-forest">Muscle Gain</option>
                                  <option value="Maintain" className="text-fitti-forest">Maintain</option>
                                </select>
                              </div>
                            </motion.div>
                          )}

                          {formStep === 3 && (
                            <motion.div 
                              key="step3"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="space-y-12"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                  <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Dietary Protocol</label>
                                  <div className="flex gap-4">
                                    {["Veg", "Non-veg"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, foodPreference: o }))}
                                        className={`flex-1 py-4 border-2 rounded-2xl font-black uppercase tracking-tighter ${formData.foodPreference === o ? "bg-fitti-bg text-fitti-forest lg:border-fitti-bg" : "border-fitti-bg/20 opacity-40"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Medical History</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, hasMedicalCondition: o }))}
                                        className={`flex-1 py-4 border-2 rounded-2xl font-black uppercase tracking-tighter ${formData.hasMedicalCondition === o ? "bg-fitti-bg text-fitti-forest border-fitti-bg" : "border-fitti-bg/20 opacity-40"}`}
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
                                  className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-xl font-medium p-4 min-h-[100px]"
                                />
                              )}
                            </motion.div>
                          )}

                          {formStep === 4 && (
                            <motion.div 
                              key="step4"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="space-y-12"
                            >
                              <div className="space-y-6">
                                <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Logistics (Area / Pincode)</label>
                                <input required name="location" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-3xl font-black py-4 uppercase" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                  <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Intervention Level</label>
                                  <select name="planInterest" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-fitti-bg/20 focus:border-fitti-bg outline-none text-2xl font-black p-4 appearance-none">
                                    <option value="Weekly Trial">Weekly Trial</option>
                                    <option value="Monthly Plan">Monthly Plan</option>
                                  </select>
                                </div>
                                <div className="space-y-4">
                                  <label className="block text-xs font-mono uppercase tracking-[0.3em] opacity-40">Direct Call Consultation</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, requestConsultation: o }))}
                                        className={`flex-1 py-4 border-2 rounded-2xl font-black uppercase tracking-tighter ${formData.requestConsultation === o ? "bg-fitti-bg text-fitti-forest border-fitti-bg" : "border-fitti-bg/20 opacity-40"}`}
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

                        <div className="flex justify-between items-center pt-12 border-t border-fitti-bg/10">
                          {formStep > 1 ? (
                            <button 
                              type="button"
                              onClick={prevStep}
                              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                            >
                              <ChevronLeft size={16} /> Back
                            </button>
                          ) : <div />}

                          {formStep < 4 ? (
                            <button 
                              type="button"
                              onClick={nextStep}
                              className="flex items-center gap-4 bg-fitti-bg text-fitti-forest px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                            >
                              Forward <ChevronRight size={16} />
                            </button>
                          ) : (
                            <button 
                              disabled={isSubmitting}
                              type="submit"
                              className="flex items-center gap-4 bg-fitti-bg text-fitti-forest px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>Processing <Loader2 size={16} className="animate-spin" /></>
                              ) : (
                                <>Submit Application <Check size={16} /> </>
                              )}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
               </TiltCard>
            </div>

            <div className="text-center space-y-8 opacity-20 hover:opacity-100 transition-opacity mt-48">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="text-4xl md:text-5xl font-black italic tracking-tighter text-fitti-forest"
               >
                 "The system is the engine. You are the fuel."
               </motion.div>
               <div className="font-mono text-xs uppercase tracking-[0.6em]">[ End Transmission ]</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-50 p-8 md:p-12 flex items-end justify-between border-t border-fitti-forest/5 bg-fitti-bg">
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-fitti-forest" />
          <div className="w-5 h-5 bg-fitti-mint-light" />
          <div className="w-5 h-5 bg-fitti-mint-deep" />
          <div className="w-5 h-5 bg-fitti-terracotta" />
          <div className="w-5 h-5 bg-fitti-cream" />
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-4">
            <Star className="w-5 h-5 text-fitti-forest/60" />
            <span className="font-mono text-[9px] opacity-30 uppercase tracking-[0.2em] text-right">
              © 2026 Fitti Operations
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
