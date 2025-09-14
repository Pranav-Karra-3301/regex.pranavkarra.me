'use client';

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const isDarkMode = saved === 'true';
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode.toString());
    }
  };

  return (
    <div className="theme-toggle-container">
      <button
        className={`theme-toggle ${isDark ? 'dark-mode' : 'light-mode'}`}
        onClick={toggleDarkMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <span className="toggle-icon">
              {isDark ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
        <span className="toggle-label">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    </div>
  );
}