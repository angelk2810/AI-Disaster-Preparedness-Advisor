import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldAlert, Activity, Users } from 'lucide-react';

export const Hero = ({ onStart }: { onStart: () => void }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <Activity className="w-4 h-4 mr-2" />
            AI-Powered Risk Analysis
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Prepare for the <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Unexpected</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our AI Disaster Preparedness Advisor uses machine learning to analyze your unique situation and generate a personalized survival strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              Start Risk Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#education"
              className="px-8 py-4 text-gray-300 hover:text-white font-semibold transition-colors border border-white/10 rounded-full hover:bg-white/5"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-left">Risk Analysis</h3>
            <p className="text-gray-400 text-left leading-relaxed">
              Advanced ML models evaluate your geographic and structural vulnerabilities.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-left">Real-time Insights</h3>
            <p className="text-gray-400 text-left leading-relaxed">
              Get immediate feedback on your preparedness level and evacuation priority.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-left">Family Safety</h3>
            <p className="text-gray-400 text-left leading-relaxed">
              Customized plans tailored to your family size and specific resource needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
