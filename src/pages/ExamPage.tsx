import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../types';
import QuestionCard from '../components/exam/QuestionCard';
import { MCPQuestionService } from '../services/mcpQuestionService';
import { mcpIntegration } from '../services/mcpIntegration';
import { Clock, CheckCircle, AlertCircle, Globe, Database } from 'lucide-react';

const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string[]>>(new Map());
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [loading, setLoading] = useState(true);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [mcpStatus, setMcpStatus] = useState<'checking' | 'connected' | 'offline'>('checking');

  const questionService = new MCPQuestionService();

  useEffect(() => {
    if (examId) {
      loadQuestions();
      checkMCPStatus();
    }
  }, [examId]);

  useEffect(() => {
    let interval: number;
    if (examStarted && timeRemaining > 0 && !examSubmitted) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeRemaining, examSubmitted]);

  const checkMCPStatus = async () => {
    try {
      const isConnected = mcpIntegration.isConnectionAvailable();
      setMcpStatus(isConnected ? 'connected' : 'offline');
    } catch (error) {
      setMcpStatus('offline');
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const fetchedQuestions = await questionService.fetchQuestionsByExam(examId!);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, selectedAnswers: string[]) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, selectedAnswers);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const userAnswers = answers.get(question.id) || [];
      const correctAnswers = question.correctAnswers;
      
      // Check if arrays are equal (same elements, same length)
      if (userAnswers.length === correctAnswers.length &&
          userAnswers.every(answer => correctAnswers.includes(answer))) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 1000); // Microsoft scoring scale
  };

  const handleSubmitExam = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setExamSubmitted(true);
    setShowFeedback(true);
  };

  const startExam = () => {
    setExamStarted(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fabric-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h2>
        <p className="text-gray-600">Could not load questions for this exam. Please try again later.</p>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {examId} Practice Exam
        </h1>
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Exam Instructions</h2>
          <div className="text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Time Limit:</span>
              <span className="font-medium">3 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Passing Score:</span>
              <span className="font-medium">700/1000</span>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                • You can navigate between questions using Previous/Next buttons
              </p>
              <p className="text-sm text-gray-600">
                • Your answers are automatically saved as you progress
              </p>
              <p className="text-sm text-gray-600">
                • The exam will auto-submit when time expires
              </p>
            </div>
          </div>
        </div>
        <button onClick={startExam} className="btn-primary px-8 py-3 text-lg">
          Start Exam
        </button>
      </div>
    );
  }

  if (examSubmitted) {
    const passed = score! >= 700;
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
          <CheckCircle className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-red-600'}`} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Exam Completed
        </h1>
        <div className="card mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Your Score:</span>
              <span className={`text-2xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {score}/1000
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Result:</span>
              <span className={`font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-medium">
                {Math.round((score! / 1000) * questions.length)} / {questions.length}
              </span>
            </div>
          </div>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setShowFeedback(true);
            }}
            className="btn-secondary"
          >
            Review Answers
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Array.from(answers.keys()).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {examId} Practice Exam
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            {/* MCP Status Indicator */}
            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              mcpStatus === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : mcpStatus === 'offline'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {mcpStatus === 'connected' ? (
                <>
                  <Globe className="w-3 h-3 mr-1" />
                  Live Microsoft Docs
                </>
              ) : mcpStatus === 'offline' ? (
                <>
                  <Database className="w-3 h-3 mr-1" />
                  Comprehensive Bank
                </>
              ) : (
                'Checking connection...'
              )}
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{answeredCount} answered • {Math.round(progressPercentage)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-fabric-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswers={answers.get(currentQuestion.id) || []}
        onAnswer={(selectedAnswers) => handleAnswer(currentQuestion.id, selectedAnswers)}
        showFeedback={showFeedback}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-4">
          {!examSubmitted && (
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="btn-secondary"
            >
              {showFeedback ? 'Hide' : 'Show'} Feedback
            </button>
          )}
        </div>

        {currentIndex === questions.length - 1 && !examSubmitted ? (
          <button
            onClick={handleSubmitExam}
            className="btn-primary bg-green-600 hover:bg-green-700"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
