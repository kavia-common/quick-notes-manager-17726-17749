import React from 'react';
import { Note } from '../types';

export default function NoteView({ note }: { note: Note }) {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">{note.title || '(Untitled)'}</h1>
      <div className="whitespace-pre-line text-gray-700">
        {note.content || <span className="text-gray-400">No content.</span>}
      </div>
      <div className="mt-8 text-xs text-gray-400">
        <span>
          Last updated:{' '}
          {note.updated_at
            ? new Date(note.updated_at).toLocaleString()
            : 'unknown'}
        </span>
      </div>
    </div>
  );
}
