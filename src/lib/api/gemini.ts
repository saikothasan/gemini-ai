import { API_CONFIG } from './config';
import { APIError } from './error';
import { GeminiResponse } from '../types/api';
import { PromptInput } from '../types/prompt';

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = API_CONFIG.maxRetries
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error.code
      );
    }

    return response;
  } catch (error) {
    if (retries > 0 && error instanceof Error && error.name !== 'AbortError') {
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function generatePrompt(input: PromptInput): Promise<GeminiResponse> {
  const url = `${API_CONFIG.baseUrl}/models/${API_CONFIG.model}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

  try {
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a ${input.format} prompt about ${input.topic} with a ${input.tone} tone. Length: ${input.length}.
                   Include 2 variations and 3 writing tips. Format as JSON with mainPrompt, variations array, and tips array.`
          }]
        }]
      })
    });

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : 'Failed to generate prompt'
    );
  }
}