'use client';

import { curriculum } from '@/data/curriculum';

interface ProgressBarProps {
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: Set<string>;
}

export default function ProgressBar({
  currentModuleIndex,
  currentLessonIndex,
  completedLessons
}: ProgressBarProps) {
  const totalLessons = curriculum.reduce((sum, module) => sum + module.lessons.length, 0);
  const currentLessonNumber = curriculum
    .slice(0, currentModuleIndex)
    .reduce((sum, module) => sum + module.lessons.length, 0) + currentLessonIndex + 1;
  const completedCount = completedLessons.size;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="progress-section">
      <div className="progress-info">
        <span className="progress-text" id="progressText">
          Lesson {currentLessonNumber} of {totalLessons}
        </span>
        <span className="progress-text" id="progressPercent">
          {percentage}% Complete
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          id="progressFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}