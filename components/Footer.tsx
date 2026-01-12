
import React from 'react';
import { Section } from '../types';
import { SITE_NAME, OWNER_NAME, ACTIVITY, SOCIAL_LINKS } from '../constants';

interface FooterProps {
  setSection: (section: Section) => void;
}

const Footer: React.FC<FooterProps> = ({ setSection }) => {
  return (
    <footer className="bg-[#411F41] text-white/60 py-20 md:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center">
          <div className="space-y-6 flex flex-col items-center">
            <h3 className="text-white text-3xl font-serif italic">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed font-light italic max-w-sm">
              "Dans chaque herbe folle réside un secret de guérison." Une invitation à renouer avec l'essentiel et la sagesse du végétal.
            </p>
          </div>
          <div className="space-y-6 flex flex-col items-center">
            <h4 className="text-white uppercase tracking-widest text-[10px] font-black">Localisation</h4>
            <div className="text-sm space-y-2 font-light">
              <p className="text-white font-medium">{OWNER_NAME}</p>
              <p className="opacity-70">{ACTIVITY}</p>
              <p className="opacity-70">Thaon Les Vosges (88)</p>
              <p className="opacity-70">+33 6 02 71 89 68</p>
              <p className="opacity-70">herbierdutemps@gmail.com</p>
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center">
            <h4 className="text-white uppercase tracking-widest text-[10px] font-black">Réseaux Sociaux</h4>
            <div className="flex justify-center space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 p-4 rounded-full hover:bg-[#E1AEE1] hover:text-[#5D2E5D] transition-all text-white border border-white/10 flex items-center justify-center shadow-md hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] opacity-40 text-center">
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <button 
            onClick={() => { setSection('admin'); window.scrollTo(0,0); }}
            className="hover:text-white transition-colors underline decoration-dotted"
          >
            Accès Espace Gestion
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
