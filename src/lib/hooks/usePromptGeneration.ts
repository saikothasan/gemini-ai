import { useState } from 'react';
import { generatePrompt } from '../api/gemini';
import { PromptInput, GeneratedPrompt } from '../types/prompt';

export function usePromptGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedPrompt | null>(null);

  async function generate(input: PromptInput) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generatePrompt(input);
      const data = JSON.parse(response.candidates[0].content.parts[0].text);
      setResult(data);
    } catch (err) {
      setError('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return { generate, isLoading, error, result };
}