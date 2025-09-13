'use client';

import { curriculum } from '@/data/curriculum';

interface SidebarProps {
  isCollapsed: boolean;
  completedLessons: Set<string>;
  currentModuleIndex: number;
  currentLessonIndex: number;
  expandedModules: Set<number>;
  onToggleModule: (moduleIdx: number) => void;
  onGoToLesson: (moduleIdx: number, lessonIdx: number) => void;
}

export default function Sidebar({
  isCollapsed,
  completedLessons,
  currentModuleIndex,
  currentLessonIndex,
  expandedModules,
  onToggleModule,
  onGoToLesson
}: SidebarProps) {
  let lessonNumber = 1;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-section">
          <img src="/logo.png" alt="Regular Expressions" className="sidebar-logo" />
          <div>
            <div className="sidebar-title">Regular Expressions</div>
            <div className="sidebar-subtitle">For CMPSC 461 at Penn State</div>
          </div>
        </div>
      </div>
      <div id="courseIndex">
        {curriculum.map((module, moduleIdx) => (
          <div key={moduleIdx} className={`module ${expandedModules.has(moduleIdx) ? 'expanded' : ''}`}>
            <div
              className="module-header"
              onClick={() => onToggleModule(moduleIdx)}
            >
              <span>{module.module}</span>
              <span className="module-arrow">▶</span>
            </div>
            <div className="module-content">
              {module.lessons.map((lesson, lessonIdx) => {
                const lessonKey = `${moduleIdx}-${lessonIdx}`;
                const isCompleted = completedLessons.has(lessonKey);
                const isActive = moduleIdx === currentModuleIndex && lessonIdx === currentLessonIndex;
                const currentLessonNumber = lessonNumber++;

                return (
                  <div
                    key={lessonIdx}
                    className={`lesson ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    onClick={() => onGoToLesson(moduleIdx, lessonIdx)}
                  >
                    <span className="lesson-status"></span>
                    <span>{currentLessonNumber}. {lesson.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}