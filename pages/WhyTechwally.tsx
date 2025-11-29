import React from 'react';
import { Editable } from '../components/Editable';
import { ArrowRight, CheckCircle2, Shield, Zap, Users, Code2, TrendingUp, Lock, Award, Briefcase, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhyTechwally = () => {
  const differentiators = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Senior-Only Engineering",
      desc: "We don't hire junior developers. Every project is staffed with seasoned experts, ensuring higher code quality, faster delivery, and less overhead."
    },
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: "Deep Industry Expertise",
      desc: "Our teams are organized by industry, bringing specialized knowledge of your sector's unique challenges, regulations, and opportunities."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Pragmatic Innovation",
      desc: "We leverage cutting-edge tech like Generative AI not as a buzzword, but as a practical tool to solve real-world business problems efficiently."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparent Partnership",
      desc: "No black boxes. You get full access to our project boards, code repositories, and team members, ensuring complete transparency and alignment."
    }
  ];

  const stats = [
    { value: "40%", label: "Faster Time-to-Market", desc: "on average for our clients" },
    { value: "98%", label: "Client Retention Rate", desc: "over a 5-year period" },
    { value: "3x", label: "Higher ROI", desc: "compared to in-house teams" }
  ];

  return (
    <div className="min-h-screen bg-white pt-[112px]">
      <section className="relative py-[75px] overflow-hidden bg-gray-50">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-bold tracking-wide uppercase mb-8 border border-primary/20">
            <Award size={14} /> Your Strategic Technology Partner
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-secondary tracking-tight mb-8 leading-[1.1]">
            <Editable id="why-hero-title" defaultText="Go Beyond Outsourcing. Achieve True Partnership." />
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            <Editable id="why-hero-desc" defaultText="We integrate seamlessly into your organization, acting as a high-performing extension of your team to accelerate innovation and drive measurable business outcomes." />
          </p>
          <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2 group w-fit mx-auto">
            Discuss Your Project
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-[75px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">
              <Editable id="why-diff-title" defaultText="The Techwally Difference" />
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <Editable id="why-diff-desc" defaultText="Why leading enterprises choose us over the competition." />
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, i) => (
              <div key={i} className="bg-gray-50 p-10 md:p-12 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-white text-primary rounded-2xl flex items-center justify-center mb-8 shadow-md border border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[75px] bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
                <Editable id="why-partnership-title" defaultText="An Extension of Your Team" />
              </h2>
              <p className="text-xl text-gray-300/80 leading-relaxed mb-10">
                <Editable id="why-partnership-desc" defaultText="We move beyond the traditional client-vendor relationship. Our model is built on co-creation, shared ownership, and a deep investment in your long-term success." />
              </p>
              <ul className="space-y-6">
                {['Embedded Pods', 'Joint Roadmapping', 'Shared KPIs & Goals', 'Direct Engineer Access'].map(item => (
                  <li key={item} className="flex items-center gap-4 text-xl font-medium">
                    <CheckCircle2 className="text-green-400 w-7 h-7 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-primary/30 rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0"></div>
              <div className="absolute inset-0 bg-accent/40 rounded-[3rem] rotate-3 transition-transform duration-500 hover:rotate-0"></div>
              <div className="absolute inset-4 bg-secondary rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center border border-primary/50 shadow-2xl">
                <Briefcase size={48} className="text-accent mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Your On-Demand Tech Hub</h3>
                <p className="text-gray-300">Scale your capabilities instantly with our pool of elite talent, ready to tackle any challenge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[75px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                <div className="text-5xl md:text-7xl font-black text-primary mb-4">{stat.value}</div>
                <h3 className="text-xl font-bold text-secondary mb-2">{stat.label}</h3>
                <p className="text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-[75px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">
              <Editable id="why-tech-title" defaultText="Built on a Foundation of Excellence" />
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <Editable id="why-tech-desc" defaultText="We utilize best-in-class technologies and adhere to the strictest security standards to deliver robust, reliable, and secure solutions." />
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <Code2 size={24} className="text-primary" />
                <h3 className="text-2xl font-bold text-secondary">Modern Tech Stack</h3>
              </div>
              <p className="text-gray-600 mb-6">Our expertise spans the latest frameworks and platforms to ensure your product is scalable and future-proof.</p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'Python', 'Go', 'Kubernetes', 'AWS', 'Azure', 'Terraform'].map(tech => (
                  <span key={tech} className="bg-gray-100 text-gray-700 text-sm font-bold px-3 py-1.5 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <Lock size={24} className="text-primary" />
                <h3 className="text-2xl font-bold text-secondary">Enterprise-Grade Security</h3>
              </div>
              <p className="text-gray-600 mb-6">Security is not an afterthought; it's embedded in our DNA. We are compliant with major global standards.</p>
              <div className="flex flex-wrap gap-3">
                {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'HIPAA'].map(standard => (
                  <span key={standard} className="bg-green-50 text-green-700 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                    <CheckCircle2 size={14} /> {standard}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[75px] bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-secondary rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
             <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
               <Editable id="why-final-cta-title" defaultText="Ready to Build Your Competitive Edge?" />
             </h2>
             <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto relative z-10">
               <Editable id="why-final-cta-desc" defaultText="Partner with a team that's as invested in your success as you are. Let's start the conversation." />
             </p>
             <Link to="/contact" className="bg-white text-secondary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg relative z-10 w-auto">
                Schedule Your Free Strategy Call
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};