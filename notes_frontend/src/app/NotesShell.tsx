'use client';

import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import NoteView from './components/NoteView';
import { getNotes, getNote, createNote, updateNote, deleteNote } from './api';
import { Note } from './types';

type Mode = 'view' | 'edit' | 'create' | null;

export default function NotesShell() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [mode, setMode] = useState<Mode>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);

  // Fetch notes list
  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch(() => setNotes([]));
  }, [refreshFlag]);

  // Fetch active note if applicable
  useEffect(() => {
    if (!activeId) {
      setActiveNote(null);
      setMode(null);
      return;
    }
    setLoading(true);
    getNote(activeId)
      .then((note) => {
        setActiveNote(note);
        setMode('view');
      })
      .catch(() => {
        setActiveNote(null);
        setMode(null);
      })
      .finally(() => setLoading(false));
  }, [activeId]);

  // After deleting/creating, refresh notes and reset view
  const refreshNotes = () => setRefreshFlag((x) => x + 1);

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  const handleCreate = () => {
    setActiveNote(null);
    setMode('create');
  };

  const handleSaveNew = async (title: string, content: string) => {
    setLoading(true);
    try {
      const note = await createNote({ title, content });
      refreshNotes();
      setActiveId(note.id);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (title: string, content: string) => {
    if (!activeNote) return;
    setLoading(true);
    try {
      await updateNote(activeNote.id, { title, content });
      refreshNotes();
      setMode('view');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!activeNote) return;
    setLoading(true);
    await deleteNote(activeNote.id);
    setActiveId(null);
    refreshNotes();
    setMode(null);
    setActiveNote(null);
    setLoading(false);
  };

  // Main view logic
  let mainContent;
  if (mode === 'create') {
    mainContent = (
      <NoteEditor
        isNew
        onSave={handleSaveNew}
        isLoading={loading}
      />
    );
  } else if (mode === 'edit' && activeNote) {
    mainContent = (
      <NoteEditor
        note={activeNote}
        onSave={handleSaveEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />
    );
  } else if (activeNote && mode === 'view') {
    mainContent = (
      <div className="relative h-full">
        <button
          className="absolute top-2 right-2 px-3 py-1 text-sm rounded bg-accent text-white hover:bg-primary transition"
          onClick={() => setMode('edit')}
        >
          Edit
        </button>
        <NoteView note={activeNote} />
      </div>
    );
  } else {
    mainContent = (
      <div className="h-full flex items-center justify-center text-gray-400 font-semibold">
        Select a note or create a new one.
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="flex pt-14 h-[calc(100vh-56px)] relative">
        <Sidebar
          notes={notes}
          activeId={activeId ?? undefined}
          onSelect={handleSelect}
          onCreate={handleCreate}
        />
        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-3xl mx-auto h-full">{mainContent}</div>
        </main>
      </div>
    </div>
  );
}
