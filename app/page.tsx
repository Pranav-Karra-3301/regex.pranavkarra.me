'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import ProgressBar from '@/components/ProgressBar';
import LessonContent from '@/components/LessonContent';
import RegexInput, { RegexInputRef } from '@/components/RegexInput';
import TestStrings from '@/components/TestStrings';
import SuccessModal from '@/components/SuccessModal';
import DarkModeToggle from '@/components/DarkModeToggle';
import { curriculum } from '@/data/curriculum';

export default function Home() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [regexPattern, setRegexPattern] = useState('');
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const regexInputRef = useRef<RegexInputRef>(null);

  const currentLesson = curriculum[currentModuleIndex].lessons[currentLessonIndex];

  // Load saved progress and check for mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedLessons');
      if (saved) {
        setCompletedLessons(new Set(JSON.parse(saved)));
      }

      // Start with sidebar collapsed on mobile devices
      const isMobile = window.innerWidth <= 768;
      setIsSidebarCollapsed(isMobile);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleModule = (moduleIdx: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleIdx)) {
        newSet.delete(moduleIdx);
      } else {
        newSet.add(moduleIdx);
      }
      return newSet;
    });
  };

  const goToLesson = (moduleIdx: number, lessonIdx: number) => {
    setCurrentModuleIndex(moduleIdx);
    setCurrentLessonIndex(lessonIdx);
    setRegexPattern('');
  };

  const markLessonComplete = () => {
    const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonKey);
    setCompletedLessons(newCompleted);

    if (typeof window !== 'undefined') {
      localStorage.setItem('completedLessons', JSON.stringify([...newCompleted]));
    }
  };

  const nextLesson = () => {
    const currentModule = curriculum[currentModuleIndex];

    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < curriculum.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
      // Expand the next module
      setExpandedModules(prev => new Set([...prev, currentModuleIndex + 1]));
    } else {
      // Course complete
      alert("Congratulations! You've completed the Regex Mastery course!");
      return;
    }

    setRegexPattern('');
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(curriculum[currentModuleIndex - 1].lessons.length - 1);
    }

    setRegexPattern('');
  };

  const handleValidationChange = (isSuccess: boolean) => {
    if (isSuccess) {
      markLessonComplete();
      // Skip showing the modal popup and auto-advance
      setTimeout(() => {
        nextLesson();
      }, 1500);
    }
  };

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
    nextLesson();
  };

  const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;
  const isLastLesson = currentModuleIndex === curriculum.length - 1 &&
                      currentLessonIndex === curriculum[currentModuleIndex].lessons.length - 1;

  // Update sidebar module expansion based on current lesson
  useEffect(() => {
    setExpandedModules(prev => new Set([...prev, currentModuleIndex]));
  }, [currentModuleIndex]);

  return (
    <>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          completedLessons={completedLessons}
          currentModuleIndex={currentModuleIndex}
          currentLessonIndex={currentLessonIndex}
          expandedModules={expandedModules}
          onToggleModule={toggleModule}
          onGoToLesson={goToLesson}
        />

        {/* Main Content */}
        <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="main-content-inner">
        {/* Progress Section */}
        <ProgressBar
          currentModuleIndex={currentModuleIndex}
          currentLessonIndex={currentLessonIndex}
          completedLessons={completedLessons}
        />

        {/* Lesson Content */}
        <LessonContent lesson={currentLesson} />

        {/* Input Section */}
        <RegexInput
          ref={regexInputRef}
          lesson={currentLesson}
          onValidationChange={handleValidationChange}
          onPatternChange={setRegexPattern}
        />

        {/* Test Cases */}
        <TestStrings
          testStrings={currentLesson.testStrings}
          regexPattern={regexPattern}
        />

        {/* Controls */}
        <div className="controls">
          <button
            className="btn"
            onClick={previousLesson}
            disabled={isFirstLesson}
          >
            <span>←</span>
            <span>Previous</span>
          </button>
          <button
            className="btn"
            onClick={() => regexInputRef.current?.showHint()}
          >
            <span className="keyboard-hint">Tab</span>
            <span>Get Hint</span>
          </button>
          <button
            className="btn"
            onClick={() => regexInputRef.current?.showSolution()}
          >
            <span>Show Solution</span>
          </button>
          <button className="btn primary" onClick={nextLesson}>
            <span>{isLastLesson ? 'Complete Course' : 'Next Lesson'}</span>
            {!isLastLesson && <span>→</span>}
          </button>
        </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className={`sidebar-toggle ${!isSidebarCollapsed ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
      >
        <span>☰</span>
        <span>Menu</span>
      </button>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Success Overlay - Disabled for better UX */}
      {/* <SuccessModal
        isVisible={showSuccessModal}
        onContinue={handleSuccessContinue}
      /> */}

      {/* Attribution */}
      <div className="attribution">
        Made by <a href="https://pranavkarra.me" target="_blank" rel="noopener noreferrer">Pranav Karra</a> and <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a> • Studying for CMPSC 461 at Penn State
      </div>
    </>
  );
}