"use client";
import { useState, useEffect } from 'react';
import { AnySpec } from '@/lib/spec/types';
import GlassCard from './GlassCard';
import CopyButton from './CopyButton';

interface HtmlPreviewProps {
  spec: AnySpec;
  className?: string;
}

export default function HtmlPreview({ spec, className = "" }: HtmlPreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateHtml = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spec }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate HTML');
      }
      
      const { html: generatedHtml } = await response.json();
      setHtml(generatedHtml);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spec.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (spec) {
      generateHtml();
    }
  }, [spec]);

  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">HTML Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={generateHtml}
            disabled={loading}
            className="px-3 py-1 text-sm bg-glass border border-glassStroke rounded-md hover:bg-glassStroke disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Refresh'}
          </button>
          {html && (
            <>
              <CopyButton text={html} />
              <button 
                onClick={downloadHtml}
                className="px-3 py-1 text-sm bg-glass border border-glassStroke rounded-md hover:bg-glassStroke"
              >
                Download
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-300">
          Error: {error}
        </div>
      )}

      {html ? (
        <div className="space-y-4">
          <div className="border border-glassStroke rounded-md overflow-hidden">
            <iframe
              srcDoc={html}
              className="w-full h-96 border-0"
              title="HTML Preview"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 opacity-60">
          {loading ? 'Generating preview...' : 'Click "Refresh" to generate HTML preview'}
        </div>
      )}
    </GlassCard>
  );
}
