import * as tf from '@tensorflow/tfjs';
import { AssessmentInput, AssessmentResult, RiskLevel, EvacuationPriority } from '../types';

/**
 * AI Disaster Preparedness Model
 * This class handles the logic for analyzing disaster risks using TensorFlow.js
 */
export class DisasterAIModel {
  private model: tf.LayersModel | null = null;

  constructor() {
    this.initModel();
  }

  private async initModel() {
    // Create a simple sequential model
    const model = tf.sequential();
    
    // Input layer: 12 features (disasterType, location, familySize, 6 resources, houseStructure)
    model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [12] }));
    model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 3, activation: 'sigmoid' })); // Outputs: Risk, Evacuation, Preparedness

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError'
    });

    this.model = model;
    
    // Pre-train with some synthetic data to simulate a decision tree
    await this.preTrain();
  }

  private async preTrain() {
    if (!this.model) return;

    // Synthetic training data
    // Features: [disasterTypeIdx, locationIdx, familySizeIdx, ...resources, houseStructureIdx]
    // Labels: [risk, evacuation, preparedness]
    const xs = tf.tensor2d([
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], // Low risk scenario
      [1, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0], // High risk scenario
      [2, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Moderate
    ], [3, 12]);

    const ys = tf.tensor2d([
      [0.1, 0.1, 0.9], // Low risk, Low evac, High preparedness
      [0.9, 0.9, 0.1], // Critical risk, High evac, Low preparedness
      [0.5, 0.5, 0.5], // Moderate
    ], [3, 3]);

    await this.model.fit(xs, ys, { epochs: 10 });
    xs.dispose();
    ys.dispose();
  }

  private encodeInput(input: AssessmentInput): number[] {
    const disasterMap: Record<string, number> = { 'Flood': 0, 'Earthquake': 1, 'Wildfire': 2, 'Cyclone': 3, 'Heatwave': 4 };
    const locationMap: Record<string, number> = { 'Urban': 0, 'Semi-Urban': 1, 'Rural': 2 };
    const familyMap: Record<string, number> = { '1-2': 0, '3-5': 1, '6+': 2 };
    const houseMap: Record<string, number> = { 'Apartment': 0, 'Concrete house': 1, 'Temporary structure': 2 };

    return [
      disasterMap[input.disasterType] / 4,
      locationMap[input.locationType] / 2,
      familyMap[input.familySize] / 2,
      input.resources.firstAidKit ? 1 : 0,
      input.resources.emergencyFood ? 1 : 0,
      input.resources.waterStorage ? 1 : 0,
      input.resources.backupElectricity ? 1 : 0,
      input.resources.vehicleAccess ? 1 : 0,
      input.resources.medicalSupplies ? 1 : 0,
      houseMap[input.houseStructure] / 2,
      0, 0 // Padding for 12 features
    ];
  }

  public async analyze(input: AssessmentInput): Promise<AssessmentResult> {
    if (!this.model) {
      await this.initModel();
    }

    const encoded = this.encodeInput(input);
    const inputTensor = tf.tensor2d([encoded], [1, 12]);
    const prediction = this.model!.predict(inputTensor) as tf.Tensor;
    const data = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();

    const [riskVal, evacVal, prepVal] = Array.from(data);

    const riskLevel: RiskLevel = 
      riskVal < 0.25 ? 'Low' :
      riskVal < 0.5 ? 'Moderate' :
      riskVal < 0.75 ? 'High' : 'Critical';

    const evacuationPriority: EvacuationPriority = 
      evacVal < 0.33 ? 'Low' :
      evacVal < 0.66 ? 'Medium' : 'High';

    const preparednessScore = Math.round(prepVal * 100);

    return {
      riskLevel,
      evacuationPriority,
      preparednessScore,
      recommendations: this.generateRecommendations(input, riskLevel)
    };
  }

  private generateRecommendations(input: AssessmentInput, risk: RiskLevel): string[] {
    const recs: string[] = [];
    
    if (!input.resources.firstAidKit) recs.push("Acquire a comprehensive first aid kit immediately.");
    if (!input.resources.waterStorage) recs.push("Store at least 3 gallons of water per person.");
    if (!input.resources.emergencyFood) recs.push("Stock up on non-perishable food for at least 72 hours.");
    
    if (input.houseStructure === 'Temporary structure') {
      recs.push("Reinforce your living structure or identify a nearby concrete shelter.");
    }

    if (risk === 'Critical' || risk === 'High') {
      recs.push("Prepare a 'Go-Bag' and map out at least two evacuation routes.");
    }

    if (input.disasterType === 'Flood') {
      recs.push("Install check valves in plumbing to prevent floodwater backup.");
    }

    return recs;
  }
}

export const aiModel = new DisasterAIModel();
