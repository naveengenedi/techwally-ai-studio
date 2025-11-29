
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Settings } from 'lucide-react';

export const TechnicalSupport = () => {
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
          <Settings size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Technical Support
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section offers comprehensive solutions and practical troubleshooting tips for common
          technical issues you might encounter while using our application platform.
          We cover a range of problems to help you get back on track quickly.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Encountering a technical glitch can be frustrating, but many issues have simple fixes.
          Here, you'll find guidance on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Resolving browser compatibility issues.</li>
            <li>Troubleshooting file upload errors (e.g., size limits, unsupported formats).</li>
            <li>Fixing form submission problems.</li>
            <li>General system navigation and performance tips.</li>
            <li>What to do if the "Continue" button is unresponsive.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          If, after reviewing these solutions, the issue persists, please utilize the 'Report an Issue' option
          available in the three-dot menu within the application modal. Our technical team will investigate promptly.
        </p>
      </div>
    </div>
  );
};