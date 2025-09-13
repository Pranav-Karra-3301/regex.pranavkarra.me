'use client';

interface SuccessModalProps {
  isVisible: boolean;
  onContinue: () => void;
}

export default function SuccessModal({ isVisible, onContinue }: SuccessModalProps) {
  return (
    <div className={`success-overlay ${isVisible ? 'show' : ''}`} id="successOverlay">
      <div className="success-modal">
        <div className="success-icon">✓</div>
        <div className="success-title">Perfect!</div>
        <div className="success-subtitle">You&apos;ve mastered this pattern</div>
        <button className="btn primary" id="continueBtn" onClick={onContinue}>
          Continue to Next Lesson
        </button>
      </div>
    </div>
  );
}