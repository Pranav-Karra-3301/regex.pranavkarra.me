'use client';

import { Lesson } from '@/data/curriculum';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className="lesson-header">
      <h1 className="lesson-title" id="lessonTitle">{lesson.title}</h1>
      <p className="lesson-description" id="lessonDescription">{lesson.description}</p>

      <div className="concept-box" id="conceptBox">
        <div className="concept-title">Key Concept</div>
        <div
          className="concept-content"
          id="conceptContent"
          dangerouslySetInnerHTML={{ __html: lesson.concept }}
        />
      </div>
    </div>
  );
}