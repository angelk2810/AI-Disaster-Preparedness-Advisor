# AI Disaster Preparedness Advisor

An AI-powered platform to help individuals and families prepare for disasters by analyzing risk factors and generating personalized preparedness plans.

## Features

- **Modern Landing Page**: Beautiful hero section with glassmorphism design.
- **Risk Assessment Tool**: Interactive multi-step form to capture disaster type, location, family size, and resources.
- **AI Analysis**: Uses TensorFlow.js to classify risk levels and evacuation priorities.
- **Visualization Dashboard**: Real-time charts using Chart.js for risk scores and preparedness levels.
- **Survival Checklist**: Interactive checklist for essential supplies.
- **PDF Export**: Download your personalized emergency plan as a PDF.
- **Educational Resources**: Guides on disaster impact and safety tips.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **AI/ML**: TensorFlow.js
- **Visualization**: Chart.js, react-chartjs-2
- **Animations**: Framer Motion (motion/react)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF, html2canvas

## How the AI Model Works

The application implements a neural network using TensorFlow.js that acts as a classifier. It takes 12 input features including:
- Disaster Type (Flood, Earthquake, etc.)
- Location Type (Urban, Rural, etc.)
- Family Size
- Resource Availability (First Aid, Food, Water, etc.)
- Housing Structure

The model outputs:
1. **Risk Level**: Low, Moderate, High, or Critical.
2. **Evacuation Priority**: Low, Medium, or High.
3. **Preparedness Score**: A percentage based on resource readiness.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## License

Apache-2.0
