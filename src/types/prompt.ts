export interface PromptInput {
  topic: string;
  tone: string;
  length: string;
  format: string;
}

export interface GeneratedPrompt {
  mainPrompt: string;
  variations: string[];
  tips: string[];
}