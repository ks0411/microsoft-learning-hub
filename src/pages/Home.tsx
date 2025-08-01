import React from 'react';
import { ArrowRight, BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Master Microsoft Fabric
          <span className="block text-fabric-primary">Certifications</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Comprehensive practice exams for DP-600 and DP-700 certifications with 
          real-time content from Microsoft Learn. Get certified with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/dp-600"
            className="btn-primary inline-flex items-center px-6 py-3 text-lg"
          >
            Start DP-600 Practice
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="/dp-700"
            className="btn-secondary inline-flex items-center px-6 py-3 text-lg"
          >
            Start DP-700 Practice
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Certification Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* DP-600 Card */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Award className="h-8 w-8 text-microsoft-blue mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">DP-600</h2>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Fabric Analytics Engineer Associate
          </h3>
          <p className="text-gray-600 mb-4">
            Design and implement analytical solutions using Microsoft Fabric. 
            Master data preparation, semantic modeling, and advanced analytics.
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium">180 minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Questions:</span>
              <span className="font-medium">40-60</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Passing Score:</span>
              <span className="font-medium">700/1000</span>
            </div>
          </div>
          <a href="/dp-600" className="btn-primary w-full text-center">
            Practice DP-600
          </a>
        </div>

        {/* DP-700 Card */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Award className="h-8 w-8 text-microsoft-green mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">DP-700</h2>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Fabric Data Engineer Associate
          </h3>
          <p className="text-gray-600 mb-4">
            Design and implement data engineering solutions using Microsoft Fabric. 
            Master data ingestion, transformation, and monitoring.
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium">180 minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Questions:</span>
              <span className="font-medium">40-60</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Passing Score:</span>
              <span className="font-medium">700/1000</span>
            </div>
          </div>
          <a href="/dp-700" className="btn-primary w-full text-center">
            Practice DP-700
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose MS Exam Skillup?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-fabric-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Dynamic Content
            </h3>
            <p className="text-gray-600">
              Questions sourced directly from Microsoft Learn documentation, 
              ensuring up-to-date and accurate content.
            </p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-fabric-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Realistic Simulation
            </h3>
            <p className="text-gray-600">
              Practice exams that mirror the actual Microsoft certification 
              exam format and difficulty progression.
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-fabric-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed analytics and 
              performance insights across all exam topics.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-fabric-primary rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
        <p className="text-xl mb-6 text-blue-100">
          Join thousands of professionals who have successfully passed their 
          Microsoft Fabric certifications.
        </p>
        <a
          href="/dashboard"
          className="bg-white text-fabric-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold inline-flex items-center"
        >
          View Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default Home;
