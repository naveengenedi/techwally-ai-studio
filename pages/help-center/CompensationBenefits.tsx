
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PiggyBank } from 'lucide-react';

export const CompensationBenefits = () => {
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
          <PiggyBank size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Compensation & Benefits
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section helps you understand our competitive salary structures, comprehensive
          health benefits, retirement plans, and a wide array of other perks and advantages
          offered to our valued employees.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Techwally is committed to attracting and retaining top talent through a rewarding
          compensation package. Here, you'll find details on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Our competitive base salary ranges.</li>
            <li>Health, dental, and vision insurance plans.</li>
            <li>Retirement savings plans (e.g., 401k matching).</li>
            <li>Paid time off, sick leave, and parental leave.</li>
            <li>Professional development allowances and educational assistance.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          Specific benefits may vary by region, employment type (full-time, part-time, contract),
          and local regulations. Please refer to your offer letter for precise details.
        </p>
      </div>
    </div>
  );
};