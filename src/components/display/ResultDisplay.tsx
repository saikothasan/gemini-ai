import React from 'react';
import { Lightbulb } from 'lucide-react';
import { PromptCard } from './PromptCard';
import { GeneratedPrompt } from '../../types/prompt';

interface ResultDisplayProps {
  result: GeneratedPrompt;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Generated Prompt</h2>
        <PromptCard title="Main Prompt" content={result.mainPrompt} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Variations</h2>
        {result.variations.map((variation, index) => (
          <PromptCard
            key={index}
            title={`Variation ${index + 1}`}
            content={variation}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Writing Tips</h2>
        <div className="bg-yellow-50 rounded-lg p-4">
          <ul className="space-y-2">
            {result.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}