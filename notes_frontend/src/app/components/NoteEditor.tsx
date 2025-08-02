'use client';

import React, { useEffect, useState } from 'react';
import { Note } from '../types';

interface NoteEditorProps {
  note?: Note; // undefined if creating
  onSave: (title: string, content: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
  isNew?: boolean;
}

export default function NoteEditor({
  note,
  onSave,
  onDelete,
  isLoading,
  isNew,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setDirty(false);
    setError('');
    // Add note?.title / note?.content for proper effect dependency handling
  }, [note?.id, note?.title, note?.content]);

  const handleSave = async () => {
    setError('');
    try {
      if (!title.trim()) {
        setError('Title is required');
        return;
      }
      await onSave(title, content);
      setDirty(false);
    } catch {
      setError('Error saving note');
    }
  };

  return (
    <form
      className="flex flex-col gap-4 h-full px-6 py-6"
      onSubmit={e => {
        e.preventDefault();
        handleSave();
      }}
    >
      <input
        className="text-xl font-bold mb-2 outline-none border-b border-gray-200 bg-white placeholder-gray-400"
        type="text"
        placeholder="Title..."
        value={title}
        onChange={e => {
          setTitle(e.target.value);
          setDirty(true);
        }}
        disabled={isLoading}
        maxLength={96}
        autoFocus={isNew}
      />
      <textarea
        className="flex-1 resize-none min-h-[24em] rounded-md p-2 bg-gray-50 outline-none border border-gray-200 font-mono tracking-tight"
        placeholder="Type your note..."
        value={content}
        onChange={e => {
          setContent(e.target.value);
          setDirty(true);
        }}
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <div>
          {onDelete && (
            <button
              type="button"
              className="px-3 py-1 rounded text-white bg-secondary hover:bg-accent transition"
              onClick={onDelete}
              disabled={isLoading}
            >
              Delete
            </button>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="px-5 py-2 rounded bg-primary text-white font-semibold disabled:bg-gray-300"
            disabled={isLoading || !dirty}
          >
            {isLoading ? 'Saving...' : isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
      {error && (
        <div className="text-red-500 pt-1 text-sm">{error}</div>
      )}
    </form>
  );
}
