import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Shield, Heart, Info, ExternalLink } from 'lucide-react';

export const Education = () => {
  const articles = [
    {
      title: "Understanding Disaster Impact",
      description: "How different types of disasters affect infrastructure, health, and community stability.",
      icon: Info,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Essential Safety Guidelines",
      description: "Step-by-step instructions for immediate safety during floods, earthquakes, and fires.",
      icon: Shield,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Building Community Resilience",
      description: "How to work with neighbors and local authorities to create a safer environment for everyone.",
      icon: Heart,
      color: "text-red-400",
      bg: "bg-red-500/10"
    }
  ];

  return (
    <section id="education" className="py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Educational Resources</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Knowledge is your first line of defense. Explore our guides to better understand disaster preparedness.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
              >
                <div className={`w-14 h-14 ${article.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${article.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-3 transition-all">
                  Read Article
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 p-10 rounded-[40px] bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <BookOpen className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Informed, Stay Safe</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Disasters can strike at any time. Having a plan and being informed can reduce fear, anxiety, and losses that accompany disasters. Communities, families, and individuals should know what to do in the event of a fire and where to seek shelter during a tornado.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-2xl bg-white/10 text-white font-medium backdrop-blur-md">
                72-Hour Rule
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/10 text-white font-medium backdrop-blur-md">
                Evacuation Routes
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/10 text-white font-medium backdrop-blur-md">
                Emergency Kits
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
