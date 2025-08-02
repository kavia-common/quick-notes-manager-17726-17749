'use client';

import React from 'react';
import { Note } from '../types';

interface SidebarProps {
  notes: Note[];
  activeId?: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export default function Sidebar({
  notes,
  activeId,
  onSelect,
  onCreate,
}: SidebarProps) {
  return (
    <aside className="h-full w-[270px] overflow-y-auto border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">Notes</span>
        <button
          aria-label="Create note"
          className="rounded bg-accent text-white px-3 py-1 font-semibold hover:bg-primary transition text-sm"
          onClick={onCreate}
          type="button"
        >
          +
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto px-1">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => onSelect(note.id)}
              className={`w-full flex items-start gap-2 text-left px-4 py-3 rounded-md mb-1 ${
                note.id === activeId
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
              style={{
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              <span className="font-semibold truncate max-w-[180px]">{note.title || '(Untitled)'}</span>
            </button>
          </li>
        ))}
        {notes.length === 0 && (
          <li className="px-4 py-2 text-gray-400">No notes yet.</li>
        )}
      </ul>
    </aside>
  );
}
