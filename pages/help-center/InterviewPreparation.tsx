
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Handshake } from 'lucide-react';

export const InterviewPreparation = () => {
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
          <Handshake size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Interview Preparation
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section offers valuable tips, extensive resources, and expert insights to help you
          prepare effectively and confidently for all stages of our interview process.
          We aim to equip you with the knowledge needed to showcase your best self.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          A well-prepared candidate is a confident candidate. Here, you'll find guidance on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Understanding the typical Techwally interview stages.</li>
            <li>Tips for acing virtual interviews and making a strong impression remotely.</li>
            <li>Strategies for technical assessments and problem-solving exercises.</li>
            <li>How to articulate your experience and skills effectively.</li>
            <li>Preparing questions to ask your interviewers.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          We encourage you to review these materials thoroughly to maximize your chances of success.
          Good luck with your interviews!
        </p>
      </div>
    </div>
  );
};