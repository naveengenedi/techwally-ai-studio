
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, User } from 'lucide-react';

export const ManagingProfile = () => {
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
          <User size={36} className="text-primary-dark" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Managing Your Profile
          </h1>
        </div>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          This section provides comprehensive instructions on how to create, effectively update,
          and efficiently manage your personal details, uploaded resume, cover letters, and
          all other essential application documents within our secure system.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Maintaining an up-to-date profile is crucial to ensure you're always ready for new
          opportunities and that our recruiters have access to your latest and most accurate information.
          Here, you'll find guides on:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-lg text-gray-600">
            <li>Creating and updating your personal information (name, email, phone, date of birth).</li>
            <li>Uploading and managing multiple resume versions.</li>
            <li>Editing and saving cover letter templates.</li>
            <li>Adding and verifying your portfolio links.</li>
            <li>Ensuring your contact information is always current.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          Regularly reviewing and updating your profile helps expedite the application process
          and presents you in the best possible light.
        </p>
      </div>
    </div>
  );
};