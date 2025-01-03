import React from 'react';
import { Sparkles } from 'lucide-react';
import { PromptForm } from './components/form/PromptForm';
import { ResultDisplay } from './components/display/ResultDisplay';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { usePromptGeneration } from './lib/hooks/usePromptGeneration';
import { trackEvent } from './lib/utils/analytics';

function App() {
  const { generate, isLoading, error, result } = usePromptGeneration();

  const handleGenerate = async (input: any) => {
    trackEvent('generate_prompt', { format: input.format });
    await generate(input);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Sparkles className="mx-auto h-12 w-12 text-indigo-600" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
              AI Prompt Generator
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Transform your ideas into engaging prompts
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8 ring-1 ring-gray-900/5">
              <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-8 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {result && (
              <div className="bg-white shadow-lg rounded-lg p-6 ring-1 ring-gray-900/5">
                <ResultDisplay result={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;