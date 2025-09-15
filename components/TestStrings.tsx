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

    const results = testStrings.map((testString) => {
      try {
        // Create a fresh regex instance for each test to avoid state persistence
        const regex = new RegExp(regexPattern);
        const matches = regex.test(testString.text);
        return matches === testString.shouldMatch;
      } catch (e) {
        return false;
      }
    });

    setTestResults(results);
  }, [regexPattern, testStrings]);

  // Separate test strings into matching and non-matching groups
  const matchingStrings = testStrings.filter((_, index) => testStrings[index].shouldMatch);
  const nonMatchingStrings = testStrings.filter((_, index) => !testStrings[index].shouldMatch);

  const renderTestString = (testString: TestString, originalIndex: number) => {
    const isCorrect = testResults[originalIndex];
    const hasResult = testResults.length > 0;

    return (
      <div
        key={originalIndex}
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
  };

  return (
    <div className="test-section">
      <div className="test-header">Test Cases</div>
      <div className="test-explanation">
        Your regex should <strong>match</strong> the green cases and <strong>NOT match</strong> the gray cases.
      </div>
      <div id="testStrings">
        {/* Should Match Section */}
        {matchingStrings.length > 0 && (
          <div className="test-group">
            <div className="test-group-header should-match">
              <span className="test-group-icon">✓</span>
              <span>Should Match ({matchingStrings.length})</span>
            </div>
            {testStrings.map((testString, index) =>
              testString.shouldMatch ? renderTestString(testString, index) : null
            )}
          </div>
        )}

        {/* Should NOT Match Section */}
        {nonMatchingStrings.length > 0 && (
          <div className="test-group">
            <div className="test-group-header should-not-match">
              <span className="test-group-icon">✗</span>
              <span>Should NOT Match ({nonMatchingStrings.length})</span>
            </div>
            {testStrings.map((testString, index) =>
              !testString.shouldMatch ? renderTestString(testString, index) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}