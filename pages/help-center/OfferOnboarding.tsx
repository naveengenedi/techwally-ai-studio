
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, BriefcaseBusiness } from 'lucide-react';

export const OfferOnboarding = () => {
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
          <BriefcaseBusiness size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Offer & Onboarding
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section provides detailed information about what happens after you receive
          a job offer from Techwally. We cover the stages of background checks, the necessary
          initial paperwork, and a comprehensive overview of our seamless onboarding process.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Congratulations on reaching this exciting stage! Here, you'll find information on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Understanding your job offer letter and compensation package.</li>
            <li>The typical timeline for background checks and verification.</li>
            <li>Completing essential new hire paperwork and documentation.</li>
            <li>What to expect during your first week and month at Techwally.</li>
            <li>Accessing your new team and initial resources.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our goal is to ensure your transition into Techwally is as smooth and welcoming as possible.
          We're excited to have you potentially join our team!
        </p>
      </div>
    </div>
  );
};