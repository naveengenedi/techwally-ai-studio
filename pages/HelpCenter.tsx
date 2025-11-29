import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, LifeBuoy, FileQuestion, User, Settings, Shield, BookOpen, ArrowRight, Home, ChevronLeft, CalendarClock, Handshake, BriefcaseBusiness, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I start a new application?",
    answer: "You can browse open positions on our Careers page. Once you find a role you're interested in, click the 'Quick Apply' button to start the application process. Our application form is designed to be intuitive and user-friendly, guiding you through each step. Remember, you can save your progress at any time using the three-dot menu in the top-right corner of the application form to save a draft and continue later. This ensures you don't lose any work if you need to step away."
  },
  {
    question: "Can I apply for multiple jobs?",
    answer: "Yes, you are highly encouraged to apply for as many positions as you feel you are qualified for and genuinely interested in. Our system is designed to streamline this process; your personal information, like your name and contact details, will be saved from your last application. This makes subsequent applications faster and more convenient, allowing you to focus on tailoring your cover letter and resume for each specific role."
  },
  {
    question: "What format should my resume be in?",
    answer: "We strongly prefer resumes in PDF or DOCX format. These formats ensure consistent formatting and readability across all our devices and operating systems, preventing any display issues. The maximum file size allowed for your resume is 5MB. Please ensure your resume is not only up-to-date but also, if possible, tailored to highlight the skills and experience most relevant to the specific position you are applying for. A well-tailored resume can significantly enhance your chances."
  },
  {
    question: "How can I check the status of my application?",
    answer: "After successfully submitting your application, you will receive an immediate confirmation email, typically within a few minutes. Our dedicated recruitment team will then meticulously review your submission. If you are selected to move forward in the hiring process, we will proactively notify you via email, providing updates on the next steps (e.g., interview invitations). Due to the high volume of applications we receive, we regret that we are unable to provide individual status updates by phone or email outside of these official notifications."
  },
  {
    question: "I'm having technical issues with the application form.",
    answer: "If you encounter any technical problem or glitch during the application process, we recommend a few initial troubleshooting steps. First, try clearing your browser's cache and cookies, or attempt to use a different web browser (e.g., Chrome, Firefox, Edge) to see if the issue resolves. If the problem persists despite these efforts, please utilize the 'Report an Issue' option conveniently available in the three-dot menu located in the top-right corner of the application modal. This will send a detailed report directly to our technical team for prompt review and resolution."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We hold your data privacy and security with the utmost importance, making it a top priority for Techwally. All information submitted through our careers portal is rigorously encrypted using industry-standard protocols, including SSL/TLS, ensuring it remains confidential. Your data is stored securely on our servers in full compliance with global data protection regulations, such as GDPR and CCPA. For a complete and transparent understanding of our data handling practices, we encourage you to review our comprehensive Privacy Policy, which is readily available via a link in our website's footer."
  },
  {
    question: "What is the typical interview process?",
    answer: "Our interview process is thoughtfully designed to be thorough yet efficient, ensuring we find the best fit for both you and Techwally. It typically involves several distinct stages: an initial phone screen with one of our recruiters, a technical assessment (for roles requiring specific technical expertise), one or more virtual interviews with key team members and hiring managers, and sometimes a final conversation with a member of our leadership team. The exact steps and their sequence may vary slightly depending on the specific role, department, and seniority level."
  },
  {
    question: "Do you offer remote positions?",
    answer: "Yes, Techwally proudly embraces a remote-first, hybrid-optional work model. This approach is fundamental to our strategy, allowing us to offer exceptional flexibility to our employees and attract top talent from across the globe. Many of our positions are fully remote, enabling you to work from anywhere, while others provide the flexible option to work from one of our modern global offices when collaboration is most beneficial. Please check the individual job description for specific details regarding the work arrangement for each particular role."
  },
  {
    question: "Do you provide visa sponsorship?",
    answer: "Visa sponsorship is carefully considered for highly specialized roles where a unique set of expertise or skills is required and cannot be readily sourced locally. Decisions regarding sponsorship are made on a strict case-by-case basis and are always subject to the prevailing local legal requirements and Techwally's comprehensive company policy. If you require visa sponsorship, please ensure you indicate your needs clearly in your application. Our HR team will then meticulously review your eligibility and guide you through the potential processes."
  },
  {
    question: "What are the company benefits like?",
    answer: "Techwally is committed to supporting the holistic well-being and continuous growth of our employees, which is why we offer a comprehensive and highly competitive benefits package. This typically includes industry-leading salaries, robust health and dental insurance plans, generous paid time off policies, dedicated professional development stipends, secure retirement plans, and abundant opportunities for continuous learning and accelerated career advancement. It's important to note that specific benefits may vary slightly by region, employment type (full-time, part-time, contract), and local regulations."
  },
  {
    question: "Can I reapply if my application was unsuccessful?",
    answer: "Yes, we absolutely encourage you to reapply for other suitable positions within Techwally, especially if a period of approximately 6 months has passed since your last application. This waiting period allows you time to gain new skills, acquire additional relevant experience, or refine your professional profile, which would ultimately strengthen your candidacy. Please ensure your new application is thoroughly updated to accurately reflect any new qualifications or experiences you have acquired."
  },
  {
    question: "What is Techwally's company culture like?",
    answer: "Our company culture at Techwally is vibrantly built upon a strong foundation of innovation, seamless collaboration, and a deep commitment to continuous learning. We passionately foster an environment where our engineers and team members are genuinely empowered to take full ownership of their work, confidently solve complex and challenging problems, and contribute meaningfully to projects that have a real-world impact. We place immense value on diversity, inclusion, transparent open communication, and consistently strive to maintain a healthy and sustainable work-life balance for all our dedicated team members."
  },
  {
    question: "How do I report a technical issue or provide feedback on the application?",
    answer: "If you encounter any technical difficulties, bugs, or wish to provide valuable feedback on any aspect of the application process or our platform, please use the 'Report an Issue' option. This feature is conveniently located within the three-dot menu accessible from the application modal itself. Your input is incredibly invaluable in helping us continuously improve our platform and enhance the overall applicant experience for everyone, ensuring a smooth and fair process!"
  },
];

export const HelpCenter = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const supportTopics = [
    { 
      icon: <FileQuestion />, 
      title: "Application Process", 
      description: "Step-by-step guides and essential tips for navigating our application form, from efficiently finding the right roles to successfully submitting your final application. Learn how to prepare your documents and avoid common pitfalls for a smooth experience. This section covers everything from initial search filters to final submission.", 
      color: "blue",
      href: "/help-center/application-process"
    },
    { 
      icon: <User />, 
      title: "Managing Your Profile", 
      description: "Detailed instructions on how to create, effectively update, and efficiently manage your personal details, resume, cover letters, and all other essential application documents within our system. Maintain an up-to-date profile to ensure you're always ready for new opportunities and that recruiters have your latest information.", 
      color: "green",
      href: "/help-center/managing-profile"
    },
    { 
      icon: <Settings />, 
      title: "Technical Support", 
      description: "Comprehensive solutions and practical troubleshooting tips for common technical issues you might encounter while using our platform. This includes guidance on browser compatibility, file upload errors, form submission problems, and general system navigation. Get quick fixes and know when to report a more complex issue.", 
      color: "purple",
      href: "/help-center/technical-support"
    },
    { 
      icon: <Shield />, 
      title: "Privacy & Security", 
      description: "In-depth and transparent information on how Techwally rigorously protects your personal data, outlines our robust privacy policy, and details the advanced security measures we have meticulously put in place to safeguard your information. Understand your rights and how we ensure compliance with global data protection regulations.", 
      color: "red",
      href: "/help-center/privacy-security"
    },
    { 
      icon: <Handshake />, 
      title: "Interview Preparation", 
      description: "Valuable tips, extensive resources, and expert insights to help you prepare effectively and confidently for all stages of our interview process. This includes advice on common interview questions, virtual interview etiquette, technical assessment strategies, and how to make a lasting impression. Be ready to shine!", 
      color: "amber",
      href: "/help-center/interview-preparation"
    },
    { 
      icon: <BriefcaseBusiness />, 
      title: "Offer & Onboarding", 
      description: "Detailed information about what happens after you receive a job offer from Techwally. This section covers the stages of background checks, the necessary initial paperwork, and a comprehensive overview of our seamless onboarding process designed to integrate you smoothly into our team. Get ready for your first day!", 
      color: "teal",
      href: "/help-center/offer-onboarding"
    },
    { 
      icon: <CalendarClock />, 
      title: "Work-Life Balance", 
      description: "Explore Techwally's commitment to supporting a healthy work-life balance for all employees. Learn about our flexible work arrangements, remote-first policies, generous paid time off, and various initiatives specifically designed to support your personal well-being and foster professional growth. We believe happy employees are productive employees.", 
      color: "indigo",
      href: "/help-center/work-life-balance"
    },
    { 
      icon: <PiggyBank />, 
      title: "Compensation & Benefits", 
      description: "Understand our competitive salary structures, comprehensive health benefits, retirement plans, and a wide array of other perks and advantages offered to our valued employees. This section details our commitment to attracting and retaining top talent through a rewarding compensation package. Specifics may vary by region and role.", 
      color: "pink",
      href: "/help-center/compensation-benefits"
    },
  ];
  
  const gettingStarted = [
      { step: "01", title: "Find a Job", description: "Explore our diverse range of open positions across various departments and locations. Use our advanced filters to narrow down your search by category, work type, salary, and location to find the perfect match for your skills and career aspirations." },
      { step: "02", title: "Prepare Your Application", description: "Craft a compelling application that truly represents you. Ensure your resume highlights your most relevant experience and skills, and write a personalized cover letter that demonstrates your genuine interest in the role and alignment with our company culture. Quality over quantity!" },
      { step: "03", title: "Submit Your Application", description: "Complete our secure, multi-step online application form with all required details. Upload necessary documents, such as your resume and cover letter, and carefully review all your information before final submission. Remember, you can save your draft at any point if you need to take a break!" },
      { step: "04", title: "Track Your Status", description: "After successful submission, you'll receive a confirmation email detailing the next steps. Our dedicated recruitment team will meticulously review your application, and we'll keep you informed of your progress via email throughout each stage of the hiring process, from screening to interviews." }
  ]

  return (
    <div className="min-h-screen bg-gray-50 animate-[fadeIn_0.5s_ease-out]">
        {/* Simple Header */}
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-primary transition-colors">
                    <ChevronLeft size={24} /> Back to Main Site
                </Link>
                <Link to="/careers" className="text-lg font-bold text-primary hover:underline">
                    View All Jobs
                </Link>
            </nav>
        </header>

      <section className="bg-white py-16 md:py-24 border-b relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-[animate-fade-in-up_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-bold text-sm mb-6 border border-primary/20">
            <LifeBuoy size={16} /> Support Hub
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 tracking-tight">How can we help?</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Find comprehensive answers to common questions and get dedicated support for navigating our application process and platform.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for answers (e.g., 'resume format', 'interview tips')"
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 animate-[animate-fade-in-up_1s_ease-out_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-secondary mb-12 text-center">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {supportTopics.map((topic, i) => (
                <Link to={topic.href} key={i} className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all group flex flex-col items-start text-left`}>
                    <div className={`w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300`}>
                        {React.cloneElement(topic.icon, { size: 28 })}
                    </div>
                    <h3 className="font-bold text-xl text-secondary mb-3">{topic.title}</h3>
                    <p className="text-base text-gray-500 flex-grow leading-relaxed">{topic.description}</p>
                    <div className="mt-6 text-base font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight size={18} />
                    </div>
                </Link>
                ))}
            </div>
        </div>
      </section>
      
       <section className="py-16 md:py-20 bg-white border-y animate-[animate-fade-in-up_1s_ease-out_0.4s] opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-secondary mb-4">Getting Started: Your Application Journey</h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">Follow these simple, yet crucial, steps to successfully navigate and submit your application to Techwally.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative">
                <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
                {gettingStarted.map((item, i) => (
                    <div key={i} className="text-center relative bg-white px-4">
                        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white shadow-lg">{item.step}</div>
                        <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                        <p className="text-base text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-20 animate-[animate-fade-in-up_1s_ease-out_0.6s] opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Quick answers to common questions about our hiring process, work environment, and what to expect when applying with Techwally.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 shadow-sm">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeAccordion === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${activeAccordion === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <p className="text-lg text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 animate-[animate-fade-in-up_1s_ease-out_0.8s] opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl"></div>
             <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
             <p className="max-w-xl mx-auto text-primary-light mb-8 text-lg">Our dedicated support team is always here to help. Reach out to us for any further questions or assistance you may need.</p>
             <Link to="/contact" className="bg-white text-secondary px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Contact Us
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};