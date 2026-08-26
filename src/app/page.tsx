"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer } from '@/components/navbar';

// ============================================
// HERO WITH 3D PARALLAX
// ============================================
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateX = mouseY * -5;
  const rotateY = mouseX * 5;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-black">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-blue-500/[0.03] rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/[0.02] rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y, opacity, scale }}
          >
            <div className="mb-8">
              <motion.div 
                className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-400 text-xs font-medium tracking-widest">Full-Service Agency</span>
              </motion.div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1]">
                Build, Deploy,
                <br />
                <span className="font-medium text-blue-400">Secure</span>
              </h1>
            </div>

            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              Web development, mobile apps, desktop applications, hosting, domains, SEO, and security auditing.
            </p>

            <div className="flex gap-4 mt-10">
              <motion.button 
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg font-medium transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
              </motion.button>
              <motion.button 
                className="text-gray-400 hover:text-white px-8 py-3.5 rounded-lg font-medium transition-all duration-200 border border-gray-800 hover:border-gray-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Work
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="perspective-1000"
            style={{ 
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Development', type: 'Web · Mobile · Desktop', gradient: 'from-blue-500/20 to-blue-600/5' },
                { label: 'Deployment', type: 'Hosting · Domains', gradient: 'from-blue-400/20 to-blue-500/5' },
                { label: 'Security', type: 'Audits · Testing', gradient: 'from-blue-600/20 to-blue-700/5' },
                { label: 'SEO', type: 'Optimization · Strategy', gradient: 'from-blue-500/20 to-blue-400/5' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`bg-gradient-to-br ${item.gradient} border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.06] transition-all duration-300`}
                  whileHover={{ 
                    y: -6,
                    scale: 1.02,
                    borderColor: 'rgba(59,130,246,0.2)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-xl font-medium text-white mb-1">{item.label}</div>
                  <span className="text-xs text-gray-500">{item.type}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-700"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-blue-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// SERVICES WITH 3D CARDS
// ============================================
const Services: React.FC = () => {
  const services = [
    {
      title: 'Web Development',
      desc: 'React · Next.js · TypeScript',
      detail: 'Modern, scalable websites and web applications.'
    },
    {
      title: 'Mobile Apps',
      desc: 'iOS · Android · React Native',
      detail: 'Native and cross-platform mobile experiences.'
    },
    {
      title: 'Desktop Apps',
      desc: 'Windows · macOS · Tauri',
      detail: 'Cross-platform desktop applications.'
    },
    {
      title: 'Hosting & Domains',
      desc: 'Vercel · Netlify · AWS · Cloudflare',
      detail: 'Domain registration, hosting setup, and management.'
    },
    {
      title: 'Deployment',
      desc: 'CI/CD · Automated Deploys',
      detail: 'Continuous integration and deployment pipelines.'
    },
    {
      title: 'Security Audits',
      desc: 'Vulnerability Testing · OWASP',
      detail: 'Comprehensive security assessments and penetration testing for all sites.'
    },
    {
      title: 'SEO Optimization',
      desc: 'Technical SEO · Content Strategy',
      detail: 'Improve search rankings and organic traffic.'
    },
    {
      title: 'Site Audits',
      desc: 'Performance · Security · SEO',
      detail: 'Complete website audits including vibe coded sites.'
    }
  ];

  return (
    <section id="services" className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest">Services</span>
          <h2 className="text-3xl font-light text-white mt-2">
            What We <span className="font-medium">Deliver</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 hover:bg-white/[0.06] transition-all duration-300 perspective-1000"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                borderColor: 'rgba(59,130,246,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
              <p className="text-blue-400 text-sm font-mono mb-3">{service.desc}</p>
              <p className="text-gray-400 text-sm">{service.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PLATFORMS WITH 3D ROTATION
// ============================================
const Platforms: React.FC = () => {
  const platforms = [
    { name: 'Web', tech: 'React · Next.js · TypeScript' },
    { name: 'Mobile', tech: 'iOS · Android · React Native' },
    { name: 'Desktop', tech: 'Windows · macOS · Tauri' },
    { name: 'Hosting', tech: 'Vercel · Netlify · AWS · Cloudflare' }
  ];

  return (
    <section id="platforms" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest">Platforms</span>
          <h2 className="text-3xl font-light text-white mt-2">
            Every <span className="font-medium">Platform</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 perspective-1000">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 hover:bg-white/[0.06] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -6,
                scale: 1.03,
                borderColor: 'rgba(59,130,246,0.2)'
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-2xl font-medium text-white mb-2">{platform.name}</h3>
              <p className="text-gray-400 text-sm">{platform.tech}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS WITH COUNTER ANIMATION
// ============================================
const Stats: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Projects' },
    { value: '4', label: 'Platforms' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-light text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS
// ============================================
const Process: React.FC = () => {
  const steps = [
    { step: '01', title: 'Discovery' },
    { step: '02', title: 'Build' },
    { step: '03', title: 'Deploy' },
    { step: '04', title: 'Secure' }
  ];

  return (
    <section id="about" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest">Process</span>
          <h2 className="text-3xl font-light text-white mt-2">
            How We <span className="font-medium">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 perspective-1000">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-5xl font-light text-blue-400/20 mb-2">{step.step}</div>
              <h3 className="text-xl font-medium text-white">{step.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TECH
// ============================================
const Tech: React.FC = () => {
  const tech = [
    'React', 'Next.js', 'TypeScript', 'React Native',
    'Tauri', 'Node.js', 'Python', 'Tailwind',
    'Vercel', 'Netlify', 'AWS', 'Cloudflare'
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest">Technology</span>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {tech.map((t, index) => (
              <motion.span
                key={t}
                className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-gray-300 text-sm font-medium hover:border-white/10 transition-all duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// CTA WITH 3D HOVER
// ============================================
const CTA: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-white">
            Let's <span className="font-medium">Build</span>
          </h2>
          <p className="text-gray-400 text-lg mt-3 mb-10">
            From development to deployment and security. We handle everything.
          </p>
          <motion.button 
            className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-xl font-medium text-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN
// ============================================
export default function Home() {
  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      <Header />
      <Hero />
      <Services />
      <Platforms />
      <Stats />
      <Process />
      <Tech />
      <CTA />
      <Footer />
    </main>
  );
}