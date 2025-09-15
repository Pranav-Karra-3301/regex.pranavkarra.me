'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Lesson } from '@/data/curriculum';

interface RegexInputProps {
  lesson: Lesson;
  onValidationChange: (isSuccess: boolean, wasManualSolution?: boolean) => void;
  onPatternChange: (pattern: string) => void;
}

export interface RegexInputRef {
  showSolution: () => void;
  showHint: () => void;
}

const RegexInput = forwardRef<RegexInputRef, RegexInputProps>(({ lesson, onValidationChange, onPatternChange }, ref) => {
  const [pattern, setPattern] = useState('');
  const [inputClass, setInputClass] = useState('');
  const [hintText, setHintText] = useState('');
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isHintVisible, setIsHintVisible] = useState(false);

  useEffect(() => {
    setPattern('');
    setInputClass('');
    setHintText('');
    setCurrentHintIndex(0);
    setIsHintVisible(false);
  }, [lesson]);

  const validateRegex = (inputPattern: string) => {
    if (!inputPattern) {
      setInputClass('');
      onValidationChange(false);
      return;
    }

    // Check if pattern matches all test cases correctly
    let correctCount = 0;
    lesson.testStrings.forEach((testString) => {
      try {
        // Create a fresh regex instance for each test to avoid state persistence
        const regex = new RegExp(inputPattern);
        const matches = regex.test(testString.text);
        if (matches === testString.shouldMatch) {
          correctCount++;
        }
      } catch (e) {
        // Invalid regex - will be caught below
        return;
      }
    });

    // Validate regex syntax
    try {
      new RegExp(inputPattern);
    } catch (e) {
      setInputClass('error');
      onValidationChange(false);
      return;
    }

    const totalCount = lesson.testStrings.length;

    // First check: does it match all test cases?
    if (correctCount === totalCount) {
      // Second check: is it a valid/acceptable solution?
      if (isValidSolution(inputPattern, lesson.solution)) {
        setInputClass('success');
        onValidationChange(true, false);
      } else {
        // Matches test cases but isn't the right pattern
        setInputClass('partial');
        onValidationChange(false);
      }
    } else if (correctCount > 0) {
      setInputClass('partial');
      onValidationChange(false);
    } else {
      setInputClass('');
      onValidationChange(false);
    }
  };

  const isValidSolution = (userPattern: string, expectedSolution: string) => {
    // For most lessons, require exact match or equivalent patterns
    const normalizedUser = userPattern.toLowerCase().trim();
    const normalizedSolution = expectedSolution.toLowerCase().trim();

    // Direct match
    if (normalizedUser === normalizedSolution) {
      return true;
    }

    // Define equivalent patterns for flexibility
    const equivalentPatterns: { [key: string]: string[] } = {
      'cat': ['cat'],
      'c.t': ['c.t'],
      '\\.': ['\\.'],
      '[cbr]at': ['[cbr]at', '[bcr]at', '[rcb]at', '[rbc]at', '[crb]at', '[brc]at'],
      '[a-z]': ['[a-z]'],
      '[^0-9]': ['[^0-9]', '[^\\d]'],
      '\\d': ['\\d', '[0-9]'],
      '\\D': ['\\D', '[^0-9]', '[^\\d]'],
      '\\w': ['\\w', '[A-Za-z0-9_]', '[a-zA-Z0-9_]'],
      '\\s': ['\\s'],
      '^Hello': ['^Hello'],
      'world$': ['world$'],
      '\\bcat\\b': ['\\bcat\\b'],
      '\\Bcat': ['\\Bcat'],
      '^ab*$': ['^ab*$'],
      'ab+': ['ab+'],
      'colou?r': ['colou?r'],
      '\\d{4}': ['\\d{4}', '[0-9]{4}'],
      '^\\d{2,4}$': ['^\\d{2,4}$', '^[0-9]{2,4}$'],
      '<.*?>': ['<.*?>'],
      '^(ab)+$': ['^(ab)+$'],
      '^(cat|dog)$': ['^(cat|dog)$', '^(dog|cat)$'],
      '^(?:https?://).*': ['^(?:https?://).*', '^(?:http|https)://.*'],
      '(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})': ['(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})'],
      '\\b(\\w+)\\s+\\1\\b': ['\\b(\\w+)\\s+\\1\\b'],
      '\\w+(?=@)': ['\\w+(?=@)'],
      '\\w+\\.(?!txt)': ['\\w+\\.(?!txt)'],
      '(?<=\\$)\\d+': ['(?<=\\$)\\d+'],
      '(?<![_-])cat': ['(?<![_-])cat'],
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$': ['^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'],
      '^(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3}[\\s.-]?\\d{4}$': ['^(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'],
      '^https?://[\\w.-]+\\.[a-z]{2,}(/.*)?$': ['^https?://[\\w.-]+\\.[a-z]{2,}(/.*)?$'],
      '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$': ['^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'],
      '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$': ['^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$'],
      '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$': ['^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'],
      '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$': ['^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'],
      '^([01][0-9]|2[0-3]):[0-5][0-9]$': ['^([01][0-9]|2[0-3]):[0-5][0-9]$'],
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$': ['^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'],
      '<([a-zA-Z0-9]+)>.*?</\\1>': ['<([a-zA-Z0-9]+)>.*?</\\1>']
    };

    // Check if user pattern is in the equivalent patterns for the solution
    const solutionEquivalents = equivalentPatterns[normalizedSolution] || [normalizedSolution];
    return solutionEquivalents.includes(normalizedUser);
  };

  useImperativeHandle(ref, () => ({
    showSolution,
    showHint
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    onPatternChange(newPattern);
    validateRegex(newPattern);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      showHint();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // If current pattern is valid, proceed to next lesson
      if (inputClass === 'success') {
        onValidationChange(true, false);
      }
    }
  };

  const showHint = () => {
    if (currentHintIndex < lesson.hints.length) {
      setHintText(lesson.hints[currentHintIndex]);
      setIsHintVisible(true);
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const showSolution = () => {
    setPattern(lesson.solution);
    onPatternChange(lesson.solution);
    validateRegex(lesson.solution);
    // Pass true to indicate this was a manual solution
    onValidationChange(true, true);
  };

  return (
    <div>
      <div className="input-wrapper">
        <label className="input-label">Your Pattern</label>
        <input
          type="text"
          className={`regex-input ${inputClass}`}
          id="regexInput"
          placeholder="Type your regex pattern..."
          autoComplete="off"
          spellCheck="false"
          value={pattern}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {inputClass === 'success' && (
          <div className="success-hint">
            <span className="keyboard-shortcut">Enter</span> to continue to next lesson
          </div>
        )}
        <div className={`hint-box ${isHintVisible ? 'visible' : ''}`} id="hintBox">
          {hintText}
        </div>
      </div>
    </div>
  );
});

RegexInput.displayName = 'RegexInput';

export default RegexInput;