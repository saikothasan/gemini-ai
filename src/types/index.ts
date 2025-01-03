export interface VideoPrompt {
  title: string;
  description: string;
  duration: string;
  style: string;
  mood: string;
}

export interface GeminiResponse {
  scenes: {
    description: string;
    duration: string;
    visualElements: string[];
  }[];
  suggestions: string[];
}