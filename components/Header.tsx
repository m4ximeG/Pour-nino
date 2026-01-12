
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Section } from '../types';
import { SITE_NAME, SOCIAL_LINKS } from '../constants';

interface HeaderProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: Section }[] = [
    { label: 'Accueil', value: 'accueil' },
    { label: 'Services', value: 'services' },
    { label: 'Galerie', value: 'galerie' },
    { label: 'Blog', value: 'blog' },
    { label: 'À propos', value: 'propos' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavClick = (value: Section) => {
    setSection(value);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#5D2E5D]/95 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <div 
            className="cursor-pointer group flex items-center justify-center"
            onClick={() => handleNavClick('accueil')}
          >
            <h1 className="text-xl md:text-2xl font-serif italic text-white group-hover:text-[#E1AEE1] transition-colors tracking-tight">
              {SITE_NAME}
            </h1>
          </div>

          <nav className="hidden lg:flex space-x-8 items-center justify-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
                  currentSection === item.value ? 'text-[#E1AEE1] border-b-2 border-[#E1AEE1]' : 'text-white/60 hover:text-white'
                } pb-1 px-1`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6 justify-end">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#E1AEE1] transition-all transform hover:scale-125"
              >
                {React.cloneElement(link.icon as React.ReactElement<any>, { size: 18 })}
              </a>
            ))}
          </div>

          <div className="lg:hidden flex items-center justify-end">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:bg-white/5 rounded-full transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-[#5D2E5D] z-50 p-8 flex flex-col justify-center items-center animate-reveal overflow-y-auto">
          <nav className="flex flex-col space-y-6 text-center w-full items-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-4xl md:text-5xl font-serif italic py-2 transition-all ${
                  currentSection === item.value ? 'text-[#E1AEE1] scale-110' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center space-x-10 pt-12 border-t border-white/10 w-full max-w-xs">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#E1AEE1] transition-all transform scale-150"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
