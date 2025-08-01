import React from 'react';
import { Play, BookOpen, Clock, Users } from 'lucide-react';

const DP700: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DP-700: Fabric Data Engineer Associate
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Design and implement data engineering solutions using Microsoft Fabric. 
          Master data pipelines, real-time analytics, and scalable data architectures.
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
            href="/exam/DP-700"
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
                <span className="text-sm font-medium">Plan & Implement Solutions</span>
                <span className="text-xs text-gray-500">25-30%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Implement & Manage Data Ingestion</span>
                <span className="text-xs text-gray-500">20-25%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Transform Data</span>
                <span className="text-xs text-gray-500">35-40%</span>
              </div>
            </button>
            <button className="w-full text-left p-2 rounded border border-gray-200 hover:border-fabric-primary transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monitor & Optimize</span>
                <span className="text-xs text-gray-500">10-15%</span>
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
            <h3 className="font-semibold text-fabric-primary mb-3">Plan and implement data engineering solutions (25–30%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Plan a data engineering solution</li>
              <li>• Plan and implement data architecture</li>
              <li>• Implement security features</li>
              <li>• Configure monitoring and auditing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Implement and manage data ingestion and processing (20–25%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Implement data ingestion with Data Factory</li>
              <li>• Implement data ingestion with Fabric Real-Time Intelligence</li>
              <li>• Process data with Apache Spark</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Transform data (35–40%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Implement data transformation logic</li>
              <li>• Manage the data transformation process</li>
              <li>• Optimize data processing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fabric-primary mb-3">Monitor and optimize data engineering solutions (10–15%)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Monitor data engineering pipelines</li>
              <li>• Optimize pipeline performance</li>
              <li>• Troubleshoot failed pipeline runs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Focus */}
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-6">Key Technologies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Data Factory</h3>
            <p className="text-sm text-gray-600">
              Build and orchestrate data pipelines with visual tools and code-free solutions.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Apache Spark</h3>
            <p className="text-sm text-gray-600">
              Process large datasets with distributed computing using Notebooks and Spark jobs.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Real-Time Intelligence</h3>
            <p className="text-sm text-gray-600">
              Stream analytics with KQL databases and real-time dashboards.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Lakehouse</h3>
            <p className="text-sm text-gray-600">
              Unified analytics platform combining data warehouse and data lake capabilities.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Dataflow Gen2</h3>
            <p className="text-sm text-gray-600">
              Self-service data preparation with Power Query and visual transformations.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-fabric-primary mb-2">Eventhouse</h3>
            <p className="text-sm text-gray-600">
              Store and analyze time-series and streaming data with KQL.
            </p>
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
              href="https://learn.microsoft.com/en-us/training/courses/dp-700t00"
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

export default DP700;
