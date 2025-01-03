import React from 'react';
import { Copy } from 'lucide-react';

interface PromptCardProps {
  title: string;
  content: string;
}

export function PromptCard({ title, content }: PromptCardProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-gray-600"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}