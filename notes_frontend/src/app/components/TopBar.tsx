import React from 'react';

export default function TopBar() {
  return (
    <nav className="w-full h-14 border-b border-gray-200 bg-white flex items-center px-8 fixed top-0 left-0 z-10">
      <span className="text-2xl font-bold text-primary select-none">
        Quick Notes
      </span>
    </nav>
  );
}
