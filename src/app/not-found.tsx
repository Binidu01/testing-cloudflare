import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-center px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Large 404 number */}
        <div className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          404
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
          Page not found
        </h1>
        
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Single button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:opacity-90 transition-all"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}