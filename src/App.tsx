/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "motion/react";
import { Menu, X } from "lucide-react";

// --- Reusable Animation Wrapper ---
const SectionReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Navigation ---
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Client Stories", href: "#testimonials" },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "top-0 bg-brand-bg/95 backdrop-blur-md py-4 border-b border-brand-accent/20" : "top-8 bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-2xl md:text-3xl tracking-widest uppercase text-brand-text relative z-50">
            Phinzo
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-accent tracking-widest uppercase text-brand-muted hover:text-brand-accent transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-block px-6 py-3 border border-brand-accent text-brand-accent font-accent text-sm tracking-widest uppercase hover:bg-brand-accent hover:text-brand-bg transition-all duration-300"
            >
              Book a Session
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-text hover:text-brand-accent transition-colors relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay (Slides from Right) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-brand-bg z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="text-2xl md:text-4xl font-display tracking-widest uppercase text-brand-text hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + navLinks.length * 0.1, duration: 0.5 }}
                className="mt-8 px-10 py-4 border border-brand-accent text-brand-accent font-accent text-sm tracking-widest uppercase hover:bg-brand-accent hover:text-brand-bg transition-all duration-300"
              >
                Book a Session
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden cinematic-hero bg-noise">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span className="block font-accent text-brand-accent tracking-[0.3em] uppercase text-sm md:text-base mb-6">
            Luxury Editorial Photography
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-brand-text leading-tight mb-8 text-balance"
        >
          Moments Frozen. <br className="hidden md:block" />
          <span className="italic text-brand-text/90">Stories Told.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Cinematic, bold, and refined imagery for those who appreciate the art of visual storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#portfolio"
            className="px-8 py-4 bg-brand-accent text-brand-bg font-accent tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 w-full sm:w-auto text-center"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-brand-accent/50 text-brand-text font-accent tracking-widest uppercase text-sm hover:border-brand-accent hover:text-brand-accent transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Book a Session
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-accent text-xs tracking-[0.2em] text-brand-muted uppercase mb-4">Scroll</span>
        <div className="w-[1px] h-16 bg-brand-muted/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}

// --- Stats Bar ---
function StatItem({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayValue(Math.floor(v));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 border border-brand-accent/10 bg-brand-surface/30 backdrop-blur-sm hover:border-brand-accent/30 transition-colors duration-500">
      <div className="font-display text-5xl md:text-6xl text-brand-accent mb-3">
        {displayValue}{suffix}
      </div>
      <div className="font-accent tracking-[0.2em] uppercase text-xs text-brand-muted text-center">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-16 px-6 bg-brand-bg relative z-10 border-y border-brand-accent/10">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          {/* Responsive Grid: 2x2 stacked on mobile/tablet, 4 across on desktop */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
            <StatItem label="Years Experience" value={12} suffix="+" />
            <StatItem label="Editorials Published" value={150} suffix="+" />
            <StatItem label="Awards Won" value={24} />
            <StatItem label="Happy Clients" value={500} suffix="+" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// --- Portfolio / Gallery ---

/*
  HOW TO ADD YOUR PHOTOS:
  1. Go to https://cloudinary.com and create a free account
  2. Click "Upload" and drag your photos in
  3. Click on any uploaded photo → copy the URL shown
  4. Paste that URL into the imageUrl field below
  5. Save, push to GitHub, then run on server:
     cd /var/www/html && git pull origin main && npm run build
  
  Example Cloudinary URL format:
  https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v123/photo.jpg
  
  Tips for best results:
  - Use landscape or portrait photos (portrait fits the 4:5 card best)  
  - Cloudinary auto-optimizes — no need to resize before uploading
  - Leave imageUrl as "" to keep the gradient placeholder
*/
const portfolioProjects = [
  { 
    id: 1, 
    title: "Midnight in Paris", 
    category: "Editorial", 
    bg: "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#0a0a0a]",
    imageUrl: "" 
  },
  { 
    id: 2, 
    title: "The Vow", 
    category: "Wedding", 
    bg: "bg-gradient-to-tr from-[#2c2a25] via-[#1a1a1a] to-[#0a0a0a]",
    imageUrl: "" 
  },
  { 
    id: 3, 
    title: "Raw Emotion", 
    category: "Portrait", 
    bg: "bg-gradient-to-bl from-[#1f1f1f] via-[#252525] to-[#0a0a0a]",
    imageUrl: "" 
  },
  { 
    id: 4, 
    title: "Desert Mirage", 
    category: "Editorial", 
    bg: "bg-gradient-to-br from-[#2a241a] via-[#1a1a1a] to-[#0a0a0a]",
    imageUrl: "" 
  },
  { 
    id: 5, 
    title: "Eternity", 
    category: "Wedding", 
    bg: "bg-gradient-to-t from-[#1a1a1a] via-[#222222] to-[#111111]",
    imageUrl: "" 
  },
  { 
    id: 6, 
    title: "Shadow & Light", 
    category: "Portrait", 
    bg: "bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#050505]",
    imageUrl: "" 
  },
];

const categories = ["All", "Editorial", "Wedding", "Portrait"];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 px-6 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl text-brand-text mb-6">Selected Works</h2>
            <div className="w-24 h-[1px] bg-brand-accent mx-auto mb-10"></div>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-accent tracking-widest uppercase text-xs md:text-sm transition-all duration-300 relative pb-2 ${
                    activeCategory === cat ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-accent"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden aspect-[4/5] cursor-pointer ${!project.imageUrl ? project.bg : 'bg-brand-bg'}`}
              >
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="font-accent text-brand-accent tracking-widest uppercase text-xs mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-brand-text transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <SectionReveal>
          <div className="mt-20 text-center">
            <a href="#contact" className="inline-block px-10 py-4 border border-brand-accent text-brand-accent font-accent tracking-widest uppercase text-sm hover:bg-brand-accent hover:text-brand-bg transition-all duration-500">
              Book a Session
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// --- Urgency Banner ---
function UrgencyBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-accent text-brand-bg py-2 px-4 text-center z-50 h-8 flex items-center justify-center">
      <p className="font-accent tracking-widest uppercase text-xs font-semibold">
        Limited dates available for 2025 bookings
      </p>
    </div>
  );
}

// --- Services ---
/*
  HOW TO ADD YOUR PHOTOS:
  1. Go to https://cloudinary.com and create a free account
  2. Click "Upload" and drag your photos in
  3. Click on any uploaded photo → copy the URL shown
  4. Paste that URL into the imageUrl field below
  5. Save, push to GitHub, then run on server:
     cd /var/www/html && git pull origin main && npm run build
  
  Example Cloudinary URL format:
  https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v123/photo.jpg
  
  Tips for best results:
  - Use landscape or portrait photos (portrait fits the 4:5 card best)  
  - Cloudinary auto-optimizes — no need to resize before uploading
  - Leave imageUrl as "" to keep the gradient placeholder
*/
const services = [
  {
    title: "Editorial & Fashion",
    price: "Starting at $2,500",
    desc: "High-end conceptual photography for brands, magazines, and designers. Includes creative direction, styling consultation, and full retouching.",
    bg: "bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a]",
    imageUrl: ""
  },
  {
    title: "Luxury Weddings",
    price: "Starting at $8,000",
    desc: "Cinematic documentation of your most important day. We capture the raw emotion, the grand details, and the fleeting moments in between.",
    bg: "bg-gradient-to-tr from-[#2c2a25] to-[#0a0a0a]",
    imageUrl: ""
  },
  {
    title: "Fine Art Portraiture",
    price: "Starting at $1,200",
    desc: "Intimate, evocative portraits that capture the essence of the subject. Shot in studio or on location with masterful lighting.",
    bg: "bg-gradient-to-bl from-[#1f1f1f] to-[#0a0a0a]",
    imageUrl: ""
  }
];

function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-brand-surface relative border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-20">
            <span className="font-accent text-brand-accent tracking-widest uppercase text-sm mb-4 block">Offerings</span>
            <h2 className="font-display text-4xl md:text-6xl text-brand-text mb-6">Curated Services</h2>
            <div className="w-24 h-[1px] bg-brand-accent mx-auto"></div>
          </div>
        </SectionReveal>

        <div className="space-y-24">
          {services.map((service, idx) => (
            <SectionReveal key={service.title}>
              <div className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className={`relative aspect-[4/3] overflow-hidden ${!service.imageUrl ? service.bg : 'bg-brand-bg'}`}>
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay"></div>
                        <div className="absolute inset-0 border border-brand-accent/20 m-4 pointer-events-none"></div>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h3 className="font-display text-3xl md:text-4xl text-brand-text mb-4">{service.title}</h3>
                  <p className="font-accent text-brand-accent tracking-widest uppercase text-sm mb-6">{service.price}</p>
                  <p className="text-brand-muted text-lg font-light leading-relaxed mb-8 max-w-lg">
                    {service.desc}
                  </p>
                  <a href="#contact" className="inline-block border-b border-brand-accent pb-1 text-brand-text font-accent tracking-widest uppercase text-sm hover:text-brand-accent transition-colors w-fit">
                    Inquire Details
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Testimonials ---
const testimonials = [
  {
    quote: "Phinzo doesn't just take photos; they craft cinematic masterpieces. Our wedding album looks like a spread in Vogue. Truly breathtaking work.",
    author: "Elena & Marcus",
    role: "Wedding Clients"
  },
  {
    quote: "The level of professionalism and artistic vision is unmatched. They elevated our brand campaign to a level we didn't know was possible.",
    author: "Sarah Jenkins",
    role: "Creative Director, Lumina"
  }
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-brand-bg border-t border-brand-accent/10">
      <div className="max-w-5xl mx-auto text-center">
        <SectionReveal>
          <span className="font-accent text-brand-accent tracking-widest uppercase text-sm mb-4 block">Kind Words</span>
          <h2 className="font-display text-4xl md:text-6xl text-brand-text mb-16">Client Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 border border-brand-accent/10 bg-brand-surface/50 relative">
                <div className="text-brand-accent font-display text-6xl absolute top-4 left-4 opacity-20">"</div>
                <p className="text-brand-text/90 text-lg md:text-xl font-light leading-relaxed mb-8 relative z-10 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-accent tracking-widest uppercase text-sm text-brand-text">{t.author}</p>
                  <p className="text-brand-muted text-xs mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20">
            <a href="#contact" className="inline-block px-10 py-4 bg-brand-accent text-brand-bg font-accent tracking-widest uppercase text-sm hover:bg-white transition-colors duration-500">
              Book a Session
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-brand-surface border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-accent text-brand-accent tracking-widest uppercase text-sm mb-4 block">Inquiries</span>
              <h2 className="font-display text-4xl md:text-6xl text-brand-text mb-6">Let's Create Together</h2>
              <p className="text-brand-muted text-lg font-light leading-relaxed mb-12 max-w-md">
                We take on a limited number of commissions each year to ensure the highest level of quality and attention for our clients. Please provide details about your project to begin the conversation.
              </p>
              
              <div className="space-y-6">
                <div>
                  <p className="font-accent tracking-widest uppercase text-xs text-brand-muted mb-1">Email</p>
                  <a href="mailto:hello@phinzophoto.com" className="text-brand-text hover:text-brand-accent transition-colors">hello@phinzophoto.com</a>
                </div>
                <div>
                  <p className="font-accent tracking-widest uppercase text-xs text-brand-muted mb-1">Studio</p>
                  <p className="text-brand-text">124 Creative Arts Blvd<br/>New York, NY 10012</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-bg p-8 md:p-12 border border-brand-accent/10">
              {formStatus === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full border border-brand-accent flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-brand-text mb-4">Inquiry Received</h3>
                  <p className="text-brand-muted font-light">Thank you for reaching out. We will review your details and respond within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-accent tracking-widest uppercase text-xs text-brand-muted">Name *</label>
                      <input required type="text" id="name" className="w-full bg-transparent border-b border-brand-accent/30 py-2 text-brand-text focus:outline-none focus:border-brand-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-accent tracking-widest uppercase text-xs text-brand-muted">Email *</label>
                      <input required type="email" id="email" className="w-full bg-transparent border-b border-brand-accent/30 py-2 text-brand-text focus:outline-none focus:border-brand-accent transition-colors" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="type" className="font-accent tracking-widest uppercase text-xs text-brand-muted">Inquiry Type *</label>
                      <select required id="type" className="w-full bg-transparent border-b border-brand-accent/30 py-2 text-brand-text focus:outline-none focus:border-brand-accent transition-colors appearance-none rounded-none">
                        <option value="" className="bg-brand-bg">Select an option</option>
                        <option value="wedding" className="bg-brand-bg">Wedding</option>
                        <option value="editorial" className="bg-brand-bg">Editorial / Commercial</option>
                        <option value="portrait" className="bg-brand-bg">Portrait Session</option>
                        <option value="other" className="bg-brand-bg">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="font-accent tracking-widest uppercase text-xs text-brand-muted">Date (Optional)</label>
                      <input type="date" id="date" className="w-full bg-transparent border-b border-brand-accent/30 py-2 text-brand-text focus:outline-none focus:border-brand-accent transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="details" className="font-accent tracking-widest uppercase text-xs text-brand-muted">Project Details *</label>
                    <textarea required id="details" rows={4} className="w-full bg-transparent border-b border-brand-accent/30 py-2 text-brand-text focus:outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 bg-brand-accent text-brand-bg font-accent tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 disabled:opacity-70"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Book a Session"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-brand-bg py-12 px-6 border-t border-brand-accent/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display text-2xl tracking-widest uppercase text-brand-text">
          Phinzo
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><span className="sr-only">Instagram</span>IG</a>
          <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><span className="sr-only">Pinterest</span>PT</a>
          <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><span className="sr-only">Vimeo</span>VM</a>
        </div>
        <div className="text-brand-muted text-xs font-accent tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Phinzo Photography. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---
export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <UrgencyBanner />
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
