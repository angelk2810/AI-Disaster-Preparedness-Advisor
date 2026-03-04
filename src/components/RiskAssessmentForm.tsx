import React from 'react';
import { motion } from 'motion/react';
import { AssessmentInput, DisasterType, LocationType, FamilySize, HouseStructure } from '../types';
import { Shield, MapPin, Users, Home, Package, ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  onSubmit: (data: AssessmentInput) => void;
}

export const RiskAssessmentForm = ({ onSubmit }: Props) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<AssessmentInput>({
    disasterType: 'Flood',
    locationType: 'Urban',
    familySize: '1-2',
    houseStructure: 'Apartment',
    resources: {
      firstAidKit: false,
      emergencyFood: false,
      waterStorage: false,
      backupElectricity: false,
      vehicleAccess: false,
      medicalSupplies: false,
    }
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="assessment" className="py-20 bg-black/20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Risk Assessment Tool</h2>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-1.5 w-12 rounded-full transition-all ${step >= i ? 'bg-emerald-500' : 'bg-white/10'}`} 
              />
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
        >
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Primary Disaster Concern
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Flood', 'Earthquake', 'Wildfire', 'Cyclone', 'Heatwave'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, disasterType: type as DisasterType })}
                        className={`p-4 rounded-2xl border transition-all text-sm font-medium ${
                          formData.disasterType === type 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Location Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Urban', 'Semi-Urban', 'Rural'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, locationType: type as LocationType })}
                        className={`p-4 rounded-2xl border transition-all text-sm font-medium ${
                          formData.locationType === type 
                            ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <Users className="w-5 h-5 text-purple-400" />
                    Family Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['1-2', '3-5', '6+'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData({ ...formData, familySize: size as FamilySize })}
                        className={`p-4 rounded-2xl border transition-all text-sm font-medium ${
                          formData.familySize === size 
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <Home className="w-5 h-5 text-orange-400" />
                    Housing Structure
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Apartment', 'Concrete house', 'Temporary structure'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, houseStructure: type as HouseStructure })}
                        className={`p-4 rounded-2xl border transition-all text-sm font-medium ${
                          formData.houseStructure === type 
                            ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <Package className="w-5 h-5 text-emerald-400" />
                    Available Resources
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(formData.resources).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          resources: {
                            ...formData.resources,
                            [key]: !formData.resources[key as keyof typeof formData.resources]
                          }
                        })}
                        className={`p-4 rounded-2xl border transition-all text-left text-sm font-medium flex items-center justify-between ${
                          formData.resources[key as keyof typeof formData.resources]
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.resources[key as keyof typeof formData.resources] ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                        }`}>
                          {formData.resources[key as keyof typeof formData.resources] && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-between gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-8 py-3 rounded-2xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-10 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-500/40"
                >
                  Generate AI Plan
                  <Shield className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
