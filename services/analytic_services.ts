import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Platform, AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    toxicityScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 indicating how toxic the content is. 0 is safe, 100 is extremely toxic.",
    },
    biasScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 indicating how biased or subjective the content is against a particular group. 0 is neutral, 100 is heavily biased.",
    },
    overallSummary: {
      type: Type.STRING,
      description: "A brief 1-2 sentence summary of the safety analysis.",
    },
    violations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          quote: {
            type: Type.STRING,
            description: "The exact substring from the user's text that triggered the violation.",
          },
          rule: {
            type: Type.STRING,
            description: "The specific platform guideline violated (e.g., 'Hate Speech', 'Harassment', 'Misinformation').",
          },
          explanation: {
            type: Type.STRING,
            description: "A short explanation of why this text violates the rule.",
          },
          severity: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High", "Critical"],
            description: "The severity of the violation.",
          },
        },
        required: ["quote", "rule", "explanation", "severity"],
      },
    },
    rewrittenContent: {
      type: Type.STRING,
      description: "A rewritten version of the input content that maintains the original meaning but removes toxicity, bias, and violations. It should be tone-appropriate for the selected platform.",
    },
  },
  required: ["toxicityScore", "biasScore", "overallSummary", "violations", "rewrittenContent"],
};

export const analyzeContent = async (text: string, platform: Platform): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    Act as a professional Trust & Safety content moderator for ${platform}.
    Analyze the following text for toxicity, bias, and adherence to community guidelines specific to ${platform}.
    
    If the content is safe, scores should be low.
    If the content violates policies (e.g., hate speech, harassment, spam, dangerous content), identify them strictly.
    Provide a balanced, rewritten version that conveys the user's intent without the harmful elements.

    User Content:
    "${text}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze content. Please try again.");
  }
};
