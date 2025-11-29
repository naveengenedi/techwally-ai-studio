
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CalendarClock } from 'lucide-react';

export const WorkLifeBalance = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-[fadeIn_0.5s_ease-out]">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link to="/help-center" className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-primary transition-colors">
            <ChevronLeft size={24} /> Back to Help Center
          </Link>
          <Link to="/careers" className="text-lg font-bold text-primary hover:underline">
            View All Jobs
          </Link>
        </nav>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 text-primary mb-6">
          <CalendarClock size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Work-Life Balance
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section explores Techwally's profound commitment to supporting a healthy work-life balance
          for all our dedicated employees. Learn about our flexible work arrangements, remote policies,
          generous paid time off, and various initiatives specifically designed to support your personal
          well-being and foster professional growth.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          We believe that happy and well-rested employees are productive employees. Here, you'll discover:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Our remote-first, hybrid-optional work model.</li>
            <li>Details on flexible working hours and arrangements.</li>
            <li>Information on paid time off, holidays, and sick leave.</li>
            <li>Programs and resources for mental health and well-being.</li>
            <li>Opportunities for professional development and continuous learning.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          Techwally strives to create an environment where you can thrive both professionally and personally.
        </p>
      </div>
    </div>
  );
};