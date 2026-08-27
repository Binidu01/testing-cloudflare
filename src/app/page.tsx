import React, { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Docs',     desc: 'Read the documentation',   href: 'https://bini.js.org'                           },
  { label: 'Examples', desc: 'Browse starter templates', href: 'https://github.com/Binidu01/bini-examples'     },
  { label: 'npm',      desc: 'View on npm registry',     href: 'https://www.npmjs.com/package/create-bini-app' },
  { label: 'GitHub',   desc: 'Star us on GitHub',        href: 'https://github.com/Binidu01'                   },
];
const platforms = ['Web', 'Windows', 'macOS', 'Linux', 'Android', 'iOS'];

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span className={`inline-block ${className}`} style={{ overflow: 'visible' }}>
      <span
        style={{
          background: 'linear-gradient(to right, #22D3EE, #3B82F6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          WebkitMaskImage: 'none',
          maskImage: 'none',
          paddingBottom: '0.2em',
          paddingTop: '0.05em',
          marginBottom: '-0.15em',
          lineHeight: '1.2',
        }}
      >
        {children}
      </span>
      <span
        style={{
          position: 'absolute',
          color: '#3B82F6',
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fitContent = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const content = container.firstElementChild as HTMLElement;
      if (!content) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      
      const scaleX = viewportWidth / contentWidth;
      const scaleY = viewportHeight / contentHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
    };

    fitContent();
    window.addEventListener('resize', fitContent);
    
    const timeout = setTimeout(fitContent, 100);
    
    return () => {
      window.removeEventListener('resize', fitContent);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-white dark:bg-black flex items-center justify-center"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-8 sm:py-12 gap-4 sm:gap-6">
          <img 
            src="/logo.png" 
            alt="Bini.js Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
            Welcome to{' '}
            <GradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Bini.js
            </GradientText>
          </h1>
          
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-md px-4 sm:px-0">
            Build full-stack React apps that run on web, desktop, and mobile — powered by Tauri.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2">
            {platforms.map((p) => (
              <span key={p}
                className="text-[10px] sm:text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1">
                {p}
              </span>
            ))}
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 px-4">
            Get started by editing{' '}
            <code className="font-mono text-[10px] sm:text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
              src/app/page.tsx
            </code>
          </p>
          
          <section className="px-4 sm:px-8 pb-8 sm:pb-12 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {links.map((l) => (
                <a 
                  key={l.label} 
                  href={l.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">{l.label} ↗</span>
                  <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{l.desc}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
