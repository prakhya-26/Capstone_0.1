export enum Platform {
  TWITTER = 'Twitter/X',
  BLOG = 'General Blog/Web',
  YOUTUBE = 'YouTube',
  INSTAGRAM = 'Instagram'
}

export interface Violation {
  quote: string;
  rule: string;
  explanation: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface AnalysisResult {
  toxicityScore: number;
  biasScore: number;
  overallSummary: string;
  violations: Violation[];
  rewrittenContent: string;
}

export interface AnalysisHistoryItem {
  id: string;
  timestamp: Date;
  preview: string;
  score: number;
}
