"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Mail, Phone, MapPin
} from 'lucide-react';
import * as si from 'simple-icons';

// ============================================
// SIMPLE ICON WRAPPER
// ============================================
const SimpleIcon: React.FC<{ icon: any; className?: string }> = ({ 
  icon, 
  className = "w-5 h-5" 
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

// ============================================
// HEADER COMPONENT
// ============================================
export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Platforms', 'Services', 'About', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-lg border-b border-blue-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="h-16 w-48 overflow-hidden flex items-center justify-center">
              <img 
                src="/logo.svg" 
                alt="Bini Corp" 
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.8)' }}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-black/98 backdrop-blur-lg border-t border-blue-500/10 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block text-gray-300 hover:text-white transition-colors py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
export const Footer: React.FC = () => {
  const links = ['Platforms', 'Services', 'About', 'Contact', 'Blog', 'Careers'];
  const social = [
    { icon: si.siGithub, label: 'GitHub' },
    { icon: si.siX, label: 'Twitter' },
    { icon: si.siYoutube, label: 'YouTube' }
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img src="/logo.svg" alt="Bini Corp" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building native applications for iOS, Android, Windows, and macOS.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-500 text-sm hover:text-blue-400 transition-colors">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>hello@binicorp.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm hover:text-blue-400 transition-colors">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm hover:text-blue-400 transition-colors">
                <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Follow Us</h4>
            <div className="flex space-x-3">
              {social.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-200"
                  aria-label={item.label}
                >
                  <SimpleIcon icon={item.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bini Corporation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Navbar = {
  Header,
  Footer
};

export default Navbar;