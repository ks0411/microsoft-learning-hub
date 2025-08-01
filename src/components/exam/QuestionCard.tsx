import React, { useState, useEffect } from 'react';
import { Question } from '../../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswers: string[];
  onAnswer: (answers: string[]) => void;
  showFeedback: boolean;
  questionNumber?: number;
  totalQuestions?: number;
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswer,
  showFeedback,
  questionNumber,
  totalQuestions
}) => {
  const [localSelectedAnswers, setLocalSelectedAnswers] = useState<string[]>(selectedAnswers);

  useEffect(() => {
    setLocalSelectedAnswers(selectedAnswers);
  }, [selectedAnswers]);

  const handleOptionSelect = (optionId: string) => {
    let newSelectedAnswers: string[];

    if (question.type === 'single-choice') {
      newSelectedAnswers = [optionId];
    } else {
      // multiple-choice
      if (localSelectedAnswers.includes(optionId)) {
        newSelectedAnswers = localSelectedAnswers.filter(id => id !== optionId);
      } else {
        newSelectedAnswers = [...localSelectedAnswers, optionId];
      }
    }

    setLocalSelectedAnswers(newSelectedAnswers);
    onAnswer(newSelectedAnswers);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOptionClass = (option: QuestionOption) => {
    const isSelected = localSelectedAnswers.includes(option.id);
    
    if (!showFeedback) {
      return `option-button ${isSelected ? 'option-selected' : ''}`;
    }

    // Show feedback
    if (option.isCorrect) {
      return 'option-button option-correct';
    } else if (isSelected && !option.isCorrect) {
      return 'option-button option-incorrect';
    } else {
      return 'option-button';
    }
  };

  return (
    <div className="question-card">
      {/* Question Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {questionNumber && totalQuestions && (
            <span className="text-sm text-gray-500 font-medium">
              Question {questionNumber} of {totalQuestions}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {question.type === 'single-choice' ? 'Single Choice' : 'Multiple Choice'}
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <span className="text-sm text-fabric-primary font-medium">
          {question.category}
        </span>
        {question.subcategory && (
          <span className="text-sm text-gray-500 ml-2">
            → {question.subcategory}
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option: QuestionOption) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={getOptionClass(option)}
            disabled={showFeedback}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current mr-3 mt-0.5 flex items-center justify-center">
                <span className="text-xs font-medium">
                  {option.id.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-left">
                {option.text}
              </div>
              {showFeedback && option.isCorrect && (
                <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
              )}
              {showFeedback && localSelectedAnswers.includes(option.id) && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-red-600 ml-2" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div className="border-t border-gray-200 pt-4">
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
            <p className="text-gray-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">
                Correct Answer{question.correctAnswers.length > 1 ? 's' : ''}: {question.correctAnswers.map(id => id.toUpperCase()).join(', ')}
              </span>
            </div>
            <a
              href={question.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fabric-primary hover:text-fabric-secondary font-medium"
            >
              View Reference →
            </a>
          </div>

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;