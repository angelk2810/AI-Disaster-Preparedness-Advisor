export type DisasterType = 'Flood' | 'Earthquake' | 'Wildfire' | 'Cyclone' | 'Heatwave';
export type LocationType = 'Urban' | 'Semi-Urban' | 'Rural';
export type FamilySize = '1-2' | '3-5' | '6+';
export type HouseStructure = 'Apartment' | 'Concrete house' | 'Temporary structure';

export interface Resources {
  firstAidKit: boolean;
  emergencyFood: boolean;
  waterStorage: boolean;
  backupElectricity: boolean;
  vehicleAccess: boolean;
  medicalSupplies: boolean;
}

export interface AssessmentInput {
  disasterType: DisasterType;
  locationType: LocationType;
  familySize: FamilySize;
  resources: Resources;
  houseStructure: HouseStructure;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type EvacuationPriority = 'Low' | 'Medium' | 'High';

export interface AssessmentResult {
  riskLevel: RiskLevel;
  evacuationPriority: EvacuationPriority;
  preparednessScore: number;
  recommendations: string[];
}
