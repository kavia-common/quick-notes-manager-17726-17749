'use client';

import { Note } from './types';

const API_URL =
  process.env.NEXT_PUBLIC_NOTES_API_URL ||
  'http://localhost:8000/api/notes'; // Update this if actual backend URL/env var differs

// PUBLIC_INTERFACE
export async function getNotes(): Promise<Note[]> {
  /** Fetches all notes. */
  const res = await fetch(API_URL, { next: { revalidate: 3 } });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

// PUBLIC_INTERFACE
export async function getNote(id: string): Promise<Note> {
  /** Fetches a single note by ID. */
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

// PUBLIC_INTERFACE
export async function createNote(note: {
  title: string;
  content: string;
}): Promise<Note> {
  /** Creates a new note. */
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, note: {
  title: string;
  content: string;
}): Promise<Note> {
  /** Updates a note by ID. */
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  /** Deletes a note by ID. */
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete note');
}

