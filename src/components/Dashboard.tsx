import React from 'react';
import { motion } from 'motion/react';
import { AssessmentResult, AssessmentInput } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  Map, 
  Phone,
  Droplets,
  Utensils,
  Stethoscope,
  Lightbulb,
  Battery,
  Car
} from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  result: AssessmentResult;
  input: AssessmentInput;
  onReset: () => void;
}

export const Dashboard = ({ result, input, onReset }: Props) => {
  const dashboardRef = React.useRef<HTMLDivElement>(null);

  const radarData = {
    labels: ['First Aid', 'Food', 'Water', 'Electricity', 'Vehicle', 'Medical'],
    datasets: [
      {
        label: 'Resource Readiness',
        data: [
          input.resources.firstAidKit ? 100 : 0,
          input.resources.emergencyFood ? 100 : 0,
          input.resources.waterStorage ? 100 : 0,
          input.resources.backupElectricity ? 100 : 0,
          input.resources.vehicleAccess ? 100 : 0,
          input.resources.medicalSupplies ? 100 : 0,
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ['Preparedness', 'Remaining'],
    datasets: [
      {
        data: [result.preparednessScore, 100 - result.preparednessScore],
        backgroundColor: ['#10b981', 'rgba(255, 255, 255, 0.05)'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Risk Level', 'Evacuation Urgency'],
    datasets: [
      {
        label: 'Score',
        data: [
          result.riskLevel === 'Low' ? 25 : result.riskLevel === 'Moderate' ? 50 : result.riskLevel === 'High' ? 75 : 100,
          result.evacuationPriority === 'Low' ? 33 : result.evacuationPriority === 'Medium' ? 66 : 100,
        ],
        backgroundColor: ['#ef4444', '#f59e0b'],
        borderRadius: 8,
      },
    ],
  };

  const exportPDF = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current, {
      backgroundColor: '#0a0a0a',
      scale: 2,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('disaster-preparedness-plan.pdf');
  };

  const checklistItems = [
    { icon: Droplets, label: 'Water Supply (3 gal/person)', key: 'waterStorage' },
    { icon: Utensils, label: 'Non-perishable Food (72h)', key: 'emergencyFood' },
    { icon: Stethoscope, label: 'First Aid Kit', key: 'firstAidKit' },
    { icon: Battery, label: 'Power Bank / Batteries', key: 'backupElectricity' },
    { icon: Lightbulb, label: 'Flashlights', key: 'backupElectricity' },
    { icon: Car, label: 'Vehicle Fuel / Access', key: 'vehicleAccess' },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Your AI Preparedness Plan</h2>
          <p className="text-gray-400">Generated based on your risk assessment for {input.disasterType}.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportPDF}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
          >
            New Assessment
          </button>
        </div>
      </div>

      <div ref={dashboardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Risk Analysis</h3>
              <AlertTriangle className={`w-6 h-6 ${
                result.riskLevel === 'Critical' ? 'text-red-500' : 
                result.riskLevel === 'High' ? 'text-orange-500' : 'text-yellow-500'
              }`} />
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-gray-400 text-sm block mb-1">Risk Level</span>
                <span className={`text-2xl font-bold ${
                  result.riskLevel === 'Critical' ? 'text-red-500' : 
                  result.riskLevel === 'High' ? 'text-orange-500' : 'text-yellow-500'
                }`}>{result.riskLevel}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block mb-1">Evacuation Priority</span>
                <span className={`text-2xl font-bold ${
                  result.evacuationPriority === 'High' ? 'text-red-500' : 
                  result.evacuationPriority === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                }`}>{result.evacuationPriority}</span>
              </div>
              <div className="h-48">
                <Bar 
                  data={barData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { 
                      y: { display: false, max: 100 },
                      x: { ticks: { color: '#9ca3af' }, grid: { display: false } }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Preparedness Score</h3>
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="relative h-64 flex items-center justify-center">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  cutout: '80%', 
                  plugins: { legend: { display: false } } 
                }} 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">{result.preparednessScore}%</span>
                <span className="text-gray-400 text-sm">Ready</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center mt-6">
              {result.preparednessScore > 80 ? "You are well prepared for this disaster." : "Significant improvements needed in your resource readiness."}
            </p>
          </div>
        </motion.div>

        {/* Resource Radar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Resource Matrix</h3>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          <div className="h-64">
            <Radar 
              data={radarData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { 
                  r: { 
                    max: 100, 
                    min: 0, 
                    ticks: { display: false },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#9ca3af', font: { size: 10 } }
                  } 
                },
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Recommendations</h4>
            <div className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Survival Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Survival Checklist</h3>
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item, i) => {
              const Icon = item.icon;
              const isReady = input.resources[item.key as keyof typeof input.resources];
              return (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isReady ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${isReady ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`font-medium ${isReady ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    isReady ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                  }`}>
                    {isReady && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-blue-700 text-white"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Emergency Action</h3>
            <Phone className="w-6 h-6" />
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-white/60 text-xs uppercase font-bold tracking-widest block mb-1">Primary Route</span>
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                <span className="font-semibold">Local High Ground / Shelter</span>
              </div>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <span className="text-white/60 text-xs uppercase font-bold tracking-widest block mb-1">Emergency Services</span>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Dial 911 or Local Emergency</span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/80 leading-relaxed italic">
                "Preparation is the key to resilience. Keep your Go-Bag within reach and stay informed via local radio."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
