export function validatePromptInput(topic: string, tone: string): string | null {
  if (!topic.trim()) {
    return 'Topic is required';
  }
  if (!tone.trim()) {
    return 'Tone is required';
  }
  if (topic.length > 200) {
    return 'Topic must be less than 200 characters';
  }
  return null;
}