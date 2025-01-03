const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function generateVideoPrompt(prompt: VideoPrompt): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Create a detailed video script for a ${prompt.duration} video with the following requirements:
                   Title: ${prompt.title}
                   Description: ${prompt.description}
                   Style: ${prompt.style}
                   Mood: ${prompt.mood}
                   
                   Format the response as a JSON with:
                   - scenes: array of scenes with description, duration, and visualElements
                   - suggestions: array of improvement suggestions`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate video prompt');
    }

    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error generating video prompt:', error);
    throw error;
  }
}