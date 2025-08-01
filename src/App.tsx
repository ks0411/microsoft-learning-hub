import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import DP600 from './pages/DP600';
import DP700 from './pages/DP700';
import ExamPage from './pages/ExamPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dp-600" element={<DP600 />} />
          <Route path="/dp-700" element={<DP700 />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
