import React from 'react';
import { Play, BookOpen, Clock, Users } from 'lucide-react';

const DP600: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DP-600: Fabric Analytics Engineer Associate
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Design and implement analytical solutions using Microsoft Fabric. 
          Master data preparation, semantic modeling, and advanced analytics.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Practice Exam</h2>
          <p className="text-gray-600 mb-4">
            Take a full-length practice exam with questions covering all exam objectives.
          </p>
          <div className="space-y-2 mb-4 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>180 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Questions:</span>
              <span>40-60</span>
            </div>
            <div className="flex justify-between">
              <span>Passing Score:</span>
              <span>700/1000</span>
            </div>
          </div>
          <a
            href="/exam/DP-600"
            className="btn-primary w-full text-center inline-flex items-center justify-center"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Practice Exam
          </a>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Study by Topic</h2>
          <p className="text-gray-600 mb-4">
            Practice specific exam domains and track your progress in each area.
          </p>
          <div className="space-y-2 mb-4">
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Plan & Manage Solutions</span>
                <span className="text-xs text-gray-500">10-15%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Prepare & Serve Data</span>
                <span className="text-xs text-gray-500">40-45%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Semantic Models</span>
                <span className="text-xs text-gray-500">20-25%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Explore & Analyze Data</span>
                <span className="text-xs text-gray-500">20-25%</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Exam Objectives */}
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-6">Exam Objectives</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Plan, implement, and manage a solution for data analytics (10–15%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Design a data analytics solution</li>
              <li>• Implement and manage a data analytics solution</li>
              <li>• Optimize performance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Prepare and serve data (40–45%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Ingest data into a Fabric analytics solution</li>
              <li>• Transform data</li>
              <li>• Implement a data cleansing solution</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Implement and manage semantic models (20–25%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Design and build semantic models</li>
              <li>• Create calculations in semantic models</li>
              <li>• Optimize performance of semantic models</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Explore and analyze data (20–25%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Query data by using SQL</li>
              <li>• Create reports and dashboards</li>
              <li>• Implement advanced analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Study Resources */}
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6">Study Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <BookOpen className="w-8 h-8 text-fabric-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Microsoft Learn</h3>
            <p className="text-sm text-gray-600 mb-3">
              Official learning paths and modules from Microsoft.
            </p>
            <a
              href="https://learn.microsoft.com/en-us/training/courses/dp-600t00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fabric-primary hover:text-fabric-secondary font-medium text-sm"
            >
              View Course →
            </a>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-fabric-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Practice Tests</h3>
            <p className="text-sm text-gray-600 mb-3">
              Timed practice exams with detailed explanations.
            </p>
            <button className="text-fabric-primary hover:text-fabric-secondary font-medium text-sm">
              Start Practice →
            </button>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-fabric-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-600 mb-3">
              Connect with other certification candidates.
            </p>
            <a
              href="https://techcommunity.microsoft.com/t5/microsoft-fabric/bd-p/MicrosoftFabric"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fabric-primary hover:text-fabric-secondary font-medium text-sm"
            >
              Join Community →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DP600;
