'use client';

import { useState, useEffect } from 'react';
import { TestString } from '@/data/curriculum';

interface TestStringsProps {
  testStrings: TestString[];
  regexPattern: string;
}

export default function TestStrings({ testStrings, regexPattern }: TestStringsProps) {
  const [testResults, setTestResults] = useState<boolean[]>([]);

  const escapeHtml = (text: string) => {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  useEffect(() => {
    if (!regexPattern) {
      setTestResults([]);
      return;
    }

    let regex;
    try {
      regex = new RegExp(regexPattern);
    } catch (e) {
      setTestResults([]);
      return;
    }

    const results = testStrings.map((testString) => {
      const matches = regex.test(testString.text);
      return matches === testString.shouldMatch;
    });

    setTestResults(results);
  }, [regexPattern, testStrings]);

  return (
    <div className="test-section">
      <div className="test-header">Test Cases</div>
      <div id="testStrings">
        {testStrings.map((testString, index) => {
          const isCorrect = testResults[index];
          const hasResult = testResults.length > 0;

          return (
            <div
              key={index}
              className={`test-string ${
                testString.shouldMatch ? 'match-expected' : 'no-match-expected'
              } ${hasResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            >
              <span
                className="test-string-text"
                dangerouslySetInnerHTML={{
                  __html: escapeHtml(testString.text)
                }}
              />
              <span
                className={`test-string-status ${hasResult ? 'active' : ''}`}
              >
                {testString.shouldMatch ? '✓' : '✗'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}