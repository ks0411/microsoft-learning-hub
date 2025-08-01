import React from 'react';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const mockStats = {
    totalQuestions: 245,
    correctAnswers: 189,
    timeSpent: '12h 45m',
    streak: 7
  };

  const mockProgress = {
    'DP-600': {
      overall: 78,
      topics: {
        'Plan & Manage Solutions': 85,
        'Prepare & Serve Data': 72,
        'Semantic Models': 80,
        'Explore & Analyze Data': 75
      }
    },
    'DP-700': {
      overall: 65,
      topics: {
        'Plan & Implement Solutions': 70,
        'Data Ingestion & Processing': 60,
        'Transform Data': 68,
        'Monitor & Optimize': 62
      }
    }
  };

  const recentActivity = [
    { exam: 'DP-600', topic: 'Semantic Models', score: 85, date: '2024-01-15' },
    { exam: 'DP-700', topic: 'Data Ingestion', score: 72, date: '2024-01-14' },
    { exam: 'DP-600', topic: 'Data Preparation', score: 90, date: '2024-01-13' },
    { exam: 'DP-700', topic: 'Transform Data', score: 68, date: '2024-01-12' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your progress and continue your certification journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Target className="w-8 h-8 text-fabric-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{mockStats.totalQuestions}</div>
          <div className="text-sm text-gray-600">Questions Attempted</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.round((mockStats.correctAnswers / mockStats.totalQuestions) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Accuracy Rate</div>
        </div>
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{mockStats.timeSpent}</div>
          <div className="text-sm text-gray-600">Study Time</div>
        </div>
        <div className="card text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{mockStats.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* DP-600 Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">DP-600 Progress</h2>
            <span className="text-2xl font-bold text-fabric-primary">
              {mockProgress['DP-600'].overall}%
            </span>
          </div>
          <div className="space-y-4">
            {Object.entries(mockProgress['DP-600'].topics).map(([topic, score]) => (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{topic}</span>
                  <span className="text-gray-600">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-fabric-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="/dp-600"
              className="btn-primary w-full text-center"
            >
              Continue DP-600 Study
            </a>
          </div>
        </div>

        {/* DP-700 Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">DP-700 Progress</h2>
            <span className="text-2xl font-bold text-fabric-secondary">
              {mockProgress['DP-700'].overall}%
            </span>
          </div>
          <div className="space-y-4">
            {Object.entries(mockProgress['DP-700'].topics).map(([topic, score]) => (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{topic}</span>
                  <span className="text-gray-600">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-fabric-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="/dp-700"
              className="btn-secondary w-full text-center"
            >
              Continue DP-700 Study
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.exam === 'DP-600' ? 'bg-fabric-primary' : 'bg-fabric-secondary'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">
                    {activity.exam} - {activity.topic}
                  </div>
                  <div className="text-sm text-gray-600">{activity.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activity.score >= 80 
                    ? 'bg-green-100 text-green-800'
                    : activity.score >= 70
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {activity.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recommended Study Areas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <div className="font-medium text-yellow-800">DP-700: Data Ingestion</div>
                <div className="text-sm text-yellow-600">Score below target (60%)</div>
              </div>
              <button className="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                Practice →
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-medium text-blue-800">DP-600: Data Preparation</div>
                <div className="text-sm text-blue-600">Strengthen your foundation</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Practice →
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-fabric-primary bg-opacity-10 rounded-lg border border-fabric-primary border-opacity-20 hover:bg-opacity-20 transition-colors">
              <div className="font-medium text-fabric-primary">Take Practice Exam</div>
              <div className="text-sm text-gray-600">Full-length DP-600 simulation</div>
            </button>
            <button className="w-full text-left p-3 bg-fabric-secondary bg-opacity-10 rounded-lg border border-fabric-secondary border-opacity-20 hover:bg-opacity-20 transition-colors">
              <div className="font-medium text-fabric-secondary">Review Weak Areas</div>
              <div className="text-sm text-gray-600">Focus on improvement areas</div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-700">Study Resources</div>
              <div className="text-sm text-gray-600">Access learning materials</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
