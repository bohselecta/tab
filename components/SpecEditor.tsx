"use client";
import { useState } from 'react';
import { AnySpec } from '@/lib/spec/types';
import GlassCard from './GlassCard';
import CopyButton from './CopyButton';

interface SpecEditorProps {
  spec: AnySpec;
  onUpdate?: (spec: AnySpec) => void;
  className?: string;
}

export default function SpecEditor({ spec, onUpdate, className = "" }: SpecEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSpec, setEditedSpec] = useState(spec);

  const handleSave = () => {
    onUpdate?.(editedSpec);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSpec(spec);
    setIsEditing(false);
  };

  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Spec Editor</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-glass border border-glassStroke rounded-md hover:bg-glassStroke"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="px-3 py-1 text-sm bg-transparent border border-glassStroke rounded-md hover:bg-glassStroke"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-glass border border-glassStroke rounded-md hover:bg-glassStroke"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={JSON.stringify(editedSpec, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setEditedSpec(parsed);
            } catch (err) {
              // Invalid JSON, keep the text but don't update spec
            }
          }}
          className="w-full h-64 bg-transparent border border-glassStroke rounded-md p-3 font-mono text-sm"
        />
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Raw Spec JSON</h3>
            <pre className="bg-glass p-3 rounded-md text-xs overflow-auto max-h-64">
              {JSON.stringify(spec, null, 2)}
            </pre>
            <div className="mt-2">
              <CopyButton text={JSON.stringify(spec, null, 2)} />
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
