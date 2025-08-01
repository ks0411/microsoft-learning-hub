// Question types and interfaces
export interface Question {
  id: string;
  examId: 'DP-600' | 'DP-700';
  category: string;
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'single-choice' | 'multiple-choice' | 'case-study' | 'drag-drop';
  question: string;
  options: Option[];
  correctAnswers: string[];
  explanation: string;
  reference: string;
  tags: string[];
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamSegment {
  id: string;
  name: string;
  weightage: string;
  topics: string[];
  questionCount: number;
}

export interface ExamConfig {
  examId: string;
  name: string;
  duration: number; // in minutes
  passingScore: number;
  totalQuestions: number;
  segments: ExamSegment[];
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: Date;
  segmentScores: { [segmentId: string]: number };
}

export interface UserProgress {
  userId: string;
  examResults: ExamResult[];
  practiceSessions: PracticeSession[];
  studyTime: number;
}

export interface PracticeSession {
  sessionId: string;
  examId: string;
  category: string;
  questionsCompleted: number;
  correctAnswers: number;
  timeSpent: number;
  date: Date;
}
