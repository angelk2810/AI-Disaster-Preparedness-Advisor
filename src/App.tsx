import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RiskAssessmentForm } from './components/RiskAssessmentForm';
import { Dashboard } from './components/Dashboard';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { AssessmentInput, AssessmentResult } from './types';
import { aiModel } from './ai/model';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [assessmentResult, setAssessmentResult] = React.useState<AssessmentResult | null>(null);
  const [assessmentInput, setAssessmentInput] = React.useState<AssessmentInput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleAssessmentSubmit = async (data: AssessmentInput) => {
    setIsAnalyzing(true);
    setAssessmentInput(data);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = await aiModel.analyze(data);
      setAssessmentResult(result);
      
      // Scroll to dashboard
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAssessmentResult(null);
    setAssessmentInput(null);
  };

  const scrollToAssessment = () => {
    if (assessmentResult) {
      setAssessmentResult(null);
      setAssessmentInput(null);
      setTimeout(() => {
        const element = document.getElementById('assessment');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('assessment');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEducation = () => {
    if (assessmentResult) {
      setAssessmentResult(null);
      setAssessmentInput(null);
      setTimeout(() => {
        const element = document.getElementById('education');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('education');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    if (assessmentResult) {
      setAssessmentResult(null);
      setAssessmentInput(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onHome={scrollToHome}
        onAssessment={scrollToAssessment}
        onEducation={scrollToEducation}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!assessmentResult ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={scrollToAssessment} />
              <div id="assessment">
                {isAnalyzing ? (
                  <div className="py-32 flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                      <Loader2 className="w-10 h-10 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">Analyzing Risk Factors</h3>
                      <p className="text-gray-400">Our AI is processing your data and generating a survival strategy...</p>
                    </div>
                  </div>
                ) : (
                  <RiskAssessmentForm onSubmit={handleAssessmentSubmit} />
                )}
              </div>
              <Education />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <Dashboard 
                result={assessmentResult} 
                input={assessmentInput!} 
                onReset={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
