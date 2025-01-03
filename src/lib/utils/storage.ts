const STORAGE_KEY = 'prompt_history';

export function saveToHistory(prompt: any) {
  try {
    const history = getHistory();
    const updatedHistory = [prompt, ...history].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

export function getHistory(): any[] {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}