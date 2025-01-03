import React from 'react';
import type { GeminiResponse } from '../types';
import { Clock, List, Lightbulb } from 'lucide-react';

interface ResultDisplayProps {
  result: GeminiResponse | null;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-lg font-semibold text-gray-900">Scene Breakdown</h2>
        <div className="mt-4 space-y-6">
          {result.scenes.map((scene, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{scene.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="mr-1.5 h-4 w-4" />
                    <span>{scene.duration}</span>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Visual Elements
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {scene.visualElements.map((element, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <List className="mr-2 h-4 w-4" />
                          {element}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">Suggestions</h2>
        <ul className="mt-4 space-y-3">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
              <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}