import { Platform, AnalysisResult } from "../types";

const FLASK_API_URL = 'http://127.0.0.1:5000/analyze';

export const analyzeContent = async (text: string, platform: Platform): Promise<AnalysisResult> => {
  if (!text.trim()) {
    throw new Error("Text cannot be empty.");
  }

  try {
    const response = await fetch(FLASK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        platform,
      }),
    });

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Map Flask response to AnalysisResult format
    // Flask returns: { bias_score, toxicity_score }
    const result: AnalysisResult = {
      toxicityScore: data.toxicity_score || 0,
      biasScore: data.bias_score || 0,
      overallSummary: generateSummary(data.toxicity_score, data.bias_score),
      violations: generateViolations(text, data.toxicity_score, data.bias_score),
      rewrittenContent: text, // Flask API doesn't provide rewrite, so keep original
    };

    return result;
  } catch (error) {
    console.error("Flask Analysis Error:", error);
    throw new Error("Failed to analyze content. Ensure Flask API is running at http://127.0.0.1:5000");
  }
};

// Helper function to generate a summary based on scores
const generateSummary = (toxicityScore: number, biasScore: number): string => {
  const toxicityLevel = toxicityScore > 70 ? 'highly toxic' : toxicityScore > 40 ? 'moderately toxic' : 'low toxicity';
  const biasLevel = biasScore > 70 ? 'heavily biased' : biasScore > 40 ? 'somewhat biased' : 'fairly neutral';
  
  return `Content shows ${toxicityLevel} characteristics and is ${biasLevel}.`;
};

// Helper function to generate violations based on scores
const generateViolations = (text: string, toxicityScore: number, biasScore: number) => {
  const violations = [];

  if (toxicityScore > 50) {
    violations.push({
      quote: text.substring(0, Math.min(50, text.length)),
      rule: 'Toxicity',
      explanation: `This content contains toxic language (score: ${toxicityScore}/100).`,
      severity: toxicityScore > 80 ? 'Critical' : toxicityScore > 65 ? 'High' : 'Medium',
    });
  }

  if (biasScore > 50) {
    violations.push({
      quote: text.substring(0, Math.min(50, text.length)),
      rule: 'Bias',
      explanation: `This content may contain bias or subjective viewpoints (score: ${biasScore}/100).`,
      severity: biasScore > 80 ? 'Critical' : biasScore > 65 ? 'High' : 'Medium',
    });
  }

  return violations;
};
