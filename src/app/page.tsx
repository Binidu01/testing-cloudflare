import React from 'react';

const links = [
  { label: 'Docs',     desc: 'Read the documentation',   href: 'https://bini.js.org'                           },
  { label: 'Examples', desc: 'Browse starter templates', href: 'https://github.com/Binidu01/bini-examples'     },
  { label: 'npm',      desc: 'View on npm registry',     href: 'https://www.npmjs.com/package/create-bini-app' },
  { label: 'GitHub',   desc: 'Star us on GitHub',        href: 'https://github.com/Binidu01'                   },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20 gap-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className="w-20 h-20">
          <defs>
            <linearGradient id="hero-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00CFFF" />
              <stop offset="100%" stopColor="#0077FF" />
            </linearGradient>
          </defs>
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
            fontFamily="Segoe UI, Arial, sans-serif" fontSize="90" fontWeight="700" fill="url(#hero-g)">ß</text>
        </svg>
        <h1 className="text-6xl font-bold tracking-tight text-black dark:text-white">
          Welcome to{' '}
          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Bini.js
          </span>
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-md">
          The React framework for the modern web. Fast, lightweight, and easy to use.
        </p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          Get started by editing{' '}
          <code className="font-mono text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
            src/app/page.tsx
          </code>
        </p>
      </main>
      <section className="px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors">
              <span className="text-sm font-semibold text-black dark:text-white">{l.label} ↗</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{l.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
