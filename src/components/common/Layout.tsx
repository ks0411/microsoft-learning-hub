import React from 'react';
import { Book, Users, Award, Clock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Book className="h-8 w-8 text-fabric-primary" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    MS Exam Skillup
                  </span>
                </div>
              </div>
              <nav className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="/"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="/dashboard"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/dp-600"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    DP-600
                  </a>
                  <a
                    href="/dp-700"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    DP-700
                  </a>
                </div>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>Microsoft Fabric Certifications</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Certifications
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="/dp-600" className="text-base text-gray-500 hover:text-gray-900">
                    DP-600: Fabric Analytics Engineer
                  </a>
                </li>
                <li>
                  <a href="/dp-700" className="text-base text-gray-500 hover:text-gray-900">
                    DP-700: Fabric Data Engineer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Features
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-base text-gray-500">
                  <Award className="h-4 w-4 mr-2" />
                  Practice Exams
                </li>
                <li className="flex items-center text-base text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  Timed Tests
                </li>
                <li className="flex items-center text-base text-gray-500">
                  <Book className="h-4 w-4 mr-2" />
                  Study Materials
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                About
              </h3>
              <p className="mt-4 text-base text-gray-500">
                Comprehensive Microsoft Fabric certification preparation platform with 
                dynamic content from Microsoft Learn.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2025 MS Exam Skillup. Unofficial practice portal for Microsoft Fabric certifications.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
