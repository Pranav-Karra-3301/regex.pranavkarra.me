'use client';

import { useState, useEffect } from 'react';

interface IntroModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroModal({ isVisible, onComplete }: IntroModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Regex Mastery!",
      content: (
        <div>
          <p>Learn regular expressions through interactive lessons and hands-on practice.</p>
          <p>Each lesson contains:</p>
          <ul>
            <li>📖 Clear explanations of regex concepts</li>
            <li>🧪 Test cases to validate your patterns</li>
            <li>💡 Hints when you need help</li>
            <li>✅ Solutions you can reveal</li>
          </ul>
        </div>
      )
    },
    {
      title: "Understanding Test Cases",
      content: (
        <div>
          <p>Test cases show you what your regex should and shouldn&apos;t match:</p>
          <div className="test-demo">
            <div className="test-group-header should-match">
              <span className="test-group-icon">✓</span>
              <span>Should Match</span>
            </div>
            <div className="test-string match-expected">
              <span>These strings should match your pattern</span>
              <span className="test-string-status active">✓</span>
            </div>

            <div className="test-group-header should-not-match">
              <span className="test-group-icon">✗</span>
              <span>Should NOT Match</span>
            </div>
            <div className="test-string no-match-expected">
              <span>These strings should NOT match your pattern</span>
              <span className="test-string-status active">✗</span>
            </div>
          </div>
          <p>Your regex is correct when all test cases pass!</p>
        </div>
      )
    },
    {
      title: "How Feedback Works",
      content: (
        <div>
          <p>As you type your regex pattern, you&apos;ll see real-time feedback:</p>
          <div className="feedback-demo">
            <div className="test-string match-expected correct">
              <span>✅ Correct: This should match and does</span>
            </div>
            <div className="test-string no-match-expected correct">
              <span>✅ Correct: This shouldn&apos;t match and doesn&apos;t</span>
            </div>
            <div className="test-string match-expected incorrect">
              <span>❌ Wrong: This should match but doesn&apos;t</span>
            </div>
            <div className="test-string no-match-expected incorrect">
              <span>❌ Wrong: This shouldn&apos;t match but does</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Helpful Features",
      content: (
        <div>
          <p>Use these features to help you learn:</p>
          <ul>
            <li><span className="keyboard-hint">Tab</span> Get progressive hints</li>
            <li><span className="keyboard-hint">Enter</span> Continue when correct</li>
            <li><strong>Show Solution</strong> reveals the answer (no auto-advance)</li>
            <li><strong>Progress bar</strong> tracks your completion</li>
          </ul>
          <p>Ready to start learning regex? Let&apos;s begin!</p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <div className="intro-modal-overlay">
      <div className="intro-modal">
        <div className="intro-modal-header">
          <h2>{steps[currentStep].title}</h2>
          <div className="intro-progress">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="intro-modal-content">
          {steps[currentStep].content}
        </div>

        <div className="intro-modal-footer">
          <button
            className="btn secondary"
            onClick={handleSkip}
          >
            Skip Tutorial
          </button>

          <div className="intro-nav-buttons">
            <button
              className="btn"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="btn primary"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Start Learning!' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}