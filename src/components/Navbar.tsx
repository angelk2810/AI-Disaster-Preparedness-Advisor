import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onHome: () => void;
  onAssessment: () => void;
  onEducation: () => void;
}

export const Navbar = ({ onHome, onAssessment, onEducation }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onHome}
          >
            <Shield className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              DisasterAI
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={onHome} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</button>
              <button onClick={onAssessment} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Assessment</button>
              <button onClick={onEducation} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Education</button>
              <button 
                onClick={onAssessment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-500/20"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 border-b border-white/10 px-2 pt-2 pb-3 space-y-1 sm:px-3"
        >
          <button onClick={() => { onHome(); setIsOpen(false); }} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Home</button>
          <button onClick={() => { onAssessment(); setIsOpen(false); }} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Assessment</button>
          <button onClick={() => { onEducation(); setIsOpen(false); }} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Education</button>
        </motion.div>
      )}
    </nav>
  );
};
