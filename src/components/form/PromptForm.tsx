import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { InputField } from './InputField';
import { PromptInput } from '../../types/prompt';

interface PromptFormProps {
  onSubmit: (input: PromptInput) => void;
  isLoading: boolean;
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [input, setInput] = useState<PromptInput>({
    topic: '',
    tone: '',
    length: 'Medium',
    format: 'Creative',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Topic"
        name="topic"
        value={input.topic}
        onChange={handleChange}
        placeholder="What would you like to write about?"
      />

      <InputField
        label="Tone"
        name="tone"
        value={input.tone}
        onChange={handleChange}
        placeholder="e.g., Professional, Casual, Humorous"
      />

      <InputField
        label="Length"
        name="length"
        value={input.length}
        onChange={handleChange}
        type="select"
        options={['Short', 'Medium', 'Long']}
      />

      <InputField
        label="Format"
        name="format"
        value={input.format}
        onChange={handleChange}
        type="select"
        options={['Creative', 'Academic', 'Business', 'Social Media']}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Wand2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Generating...
          </>
        ) : (
          'Generate Prompt'
        )}
      </button>
    </form>
  );
}