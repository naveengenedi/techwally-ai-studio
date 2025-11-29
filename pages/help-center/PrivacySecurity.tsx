
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield } from 'lucide-react';

export const PrivacySecurity = () => {
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
          <Shield size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Privacy & Security
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section provides in-depth and transparent information on how Techwally rigorously
          protects your personal data. We outline our robust privacy policy and detail the
          advanced security measures we have meticulously put in place to safeguard all your information.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Your data privacy and security are paramount to us. We adhere to the highest industry standards.
          Here, you will learn about:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Our comprehensive Privacy Policy and Terms of Service.</li>
            <li>How personal data is collected, used, and stored.</li>
            <li>The encryption and data protection protocols in place.</li>
            <li>Our compliance with global data protection regulations (e.g., GDPR, CCPA).</li>
            <li>Your rights regarding your personal information.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          We are committed to maintaining your trust and ensuring your data is handled responsibly
          and securely at all times.
        </p>
      </div>
    </div>
  );
};