
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileQuestion } from 'lucide-react';

export const ApplicationProcess = () => {
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
          <FileQuestion size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Application Process
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section provides comprehensive guides and essential tips for navigating our application form,
          from efficiently finding the right roles to successfully submitting your final application.
          Learn how to prepare your documents and avoid common pitfalls for a smooth and successful experience.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Our goal is to make your application journey as clear and straightforward as possible.
          Here, you'll find articles on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>How to effectively search and filter for jobs.</li>
            <li>Tips for tailoring your resume and cover letter.</li>
            <li>Step-by-step walkthrough of the online application form.</li>
            <li>Understanding the different application stages and what to expect.</li>
            <li>How to save and resume your application draft.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          If you have further questions after reviewing the content here, please refer back to the main Help Center's FAQ section or use the contact form to reach our support team.
        </p>
      </div>
    </div>
  );
};