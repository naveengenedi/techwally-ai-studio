import React, { useState } from 'react';
import { Editable } from '../components/Editable';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, CheckCircle2, Clock, Globe, Send, ChevronDown, ChevronUp, HelpCircle, Building2, Navigation } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Timelines vary by project scope. A typical MVP takes 8-12 weeks, while complex enterprise migrations can take 6-12 months. We provide detailed roadmaps during the discovery phase."
    },
    {
      question: "Do you work with startups?",
      answer: "Yes! We partner with funded startups to build scalable MVPs and product iterations. We also have specific engagement models tailored for high-growth companies."
    },
    {
      question: "How do you handle post-launch support?",
      answer: "We offer tiered maintenance retainers (SLA) covering security updates, bug fixes, and feature enhancements. Our team monitors your system 24/7."
    },
    {
      question: "What is your pricing model?",
      answer: "We work on both Time & Materials (T&M) for agile projects and Fixed Price for well-defined scopes. We are transparent about costs and provide detailed estimates."
    }
  ];

  const offices = [
    {
        city: "Toowoomba",
        country: "Australia (HQ)",
        address: "9 McCook St, Toowoomba, Queensland 4350",
        phone: "+61 (07) 5550 1234",
        email: "support@techwally.com",
        image: "https://images.unsplash.com/photo-1523482580638-014319f70b45?auto=format&fit=crop&q=80&w=600",
        timezone: "AEST (UTC+10)"
    },
    {
        city: "New York",
        country: "USA",
        address: "450 Lexington Ave, New York, NY 10017",
        phone: "+1 (555) 123-4567",
        email: "usa@techwally.com",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
        timezone: "EST (UTC-5)"
    },
    {
        city: "London",
        country: "United Kingdom",
        address: "1 Canada Square, Canary Wharf, London E14 5AB",
        phone: "+44 20 7946 0000",
        email: "uk@techwally.com",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600",
        timezone: "GMT (UTC+0)"
    },
    {
        city: "Hyderabad",
        country: "India",
        address: "Hitech City, Hyderabad, Telangana 500081",
        phone: "+91 40 1234 5678",
        email: "india@techwally.com",
        image: "https://images.unsplash.com/photo-1595650221319-9430852b7193?auto=format&fit=crop&q=80&w=600",
        timezone: "IST (UTC+5:30)"
    },
    {
        city: "Singapore",
        country: "Singapore",
        address: "12 Marina View, Asia Square, Singapore 018961",
        phone: "+65 6789 0123",
        email: "asia@techwally.com",
        image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=600",
        timezone: "SGT (UTC+8)"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-[112px]">
      <section className="bg-secondary py-[75px] relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-gray-200 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Accepting New Projects
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <Editable id="contact-hero-title" defaultText="Let's Build Something Great" />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            <Editable id="contact-hero-desc" defaultText="Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours." />
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 pb-[75px] relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Global HQ</h4>
                    <p className="text-2xl font-extrabold text-gray-900 mb-1">Australia</p>
                    <p className="text-gray-600 text-base">9 McCook St, Toowoomba<br/>Queensland 4350</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</h4>
                    <a href="mailto:support@techwally.com" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors">support@techwally.com</a>
                    <p className="text-gray-600 text-sm mt-1">For general inquiries & sales</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</h4>
                    <a href="tel:+61755501234" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors">+61 (07) 5550 1234</a>
                    <p className="text-gray-600 text-sm mt-1">Mon-Fri, 9am - 6pm AEST</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="bg-secondary rounded-2xl p-6 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-x-6 -translate-y-6 blur-xl"></div>
                   <h4 className="font-bold mb-2 flex items-center gap-2"><HelpCircle size={18} /> Need Support?</h4>
                   <p className="text-sm text-gray-400 mb-4">Existing clients can access the portal for 24/7 assistance.</p>
                   <button className="text-sm font-bold text-white border border-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white hover:text-secondary transition-all w-fit group">
                       Client Login <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 h-full flex flex-col relative overflow-hidden">
               {isSuccess ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center animate-[scaleIn_0.3s_ease-out]">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
                        <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                        Thank you for contacting Techwally. One of our consultants will review your inquiry and get back to you within 24 hours.
                    </p>
                    <button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors"
                    >
                        Send Another Message
                    </button>
                 </div>
               ) : (
                 <>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                        <p className="text-gray-500 mt-2">Fill out the form below and we'll get the conversation started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-gray-900"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Work Email</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="john@company.com"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-gray-900"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Acme Inc."
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-gray-900"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Service Interest</label>
                                <div className="relative">
                                    <select 
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                                        value={formData.service}
                                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                                    >
                                        <option value="">Select a Service...</option>
                                        <option value="Custom Software">Custom Software Dev</option>
                                        <option value="Mobile App">Mobile App Development</option>
                                        <option value="AI & Data">AI & Data Solutions</option>
                                        <option value="Cloud">Cloud Migration</option>
                                        <option value="Staffing">IT Staffing</option>
                                        <option value="Other">Other Inquiry</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Details</label>
                            <textarea 
                                required
                                rows={5}
                                placeholder="Tell us about your project goals, timeline, and requirements..."
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-gray-900 resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSubmitting ? 'Sending...' : <>Send Message <Send size={20} /></>}
                        </button>
                    </form>
                 </>
               )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-[75px] bg-gray-50 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-secondary mb-4">Our Global Offices</h2>
               <p className="text-gray-600 max-w-2xl mx-auto">Operating across multiple time zones to deliver 24/7 support and rapid development cycles.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
               {offices.map((office, i) => (
                  <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col">
                     <div className="h-40 overflow-hidden relative shrink-0">
                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src={office.image} alt={office.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 z-20 shadow-sm flex items-center gap-1">
                           <Clock size={12} className="text-primary" /> {office.timezone}
                        </div>
                     </div>
                     <div className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-0.5">{office.city}</h3>
                        <div className="text-primary text-xs font-bold uppercase tracking-wider mb-6">{office.country}</div>
                        
                        <div className="space-y-4 mt-auto">
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-base font-semibold text-gray-700">
                                <a href={`tel:${office.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors whitespace-nowrap">
                                    <Phone size={18} className="text-primary shrink-0" />
                                    <span>{office.phone}</span>
                                </a>
                                <a href={`mailto:${office.email}`} className="flex items-center gap-2 hover:text-primary transition-colors whitespace-nowrap">
                                    <Mail size={18} className="text-primary shrink-0" />
                                    <span>{office.email}</span>
                                </a>
                            </div>
                            
                            <div className="flex items-start gap-3 border-t border-gray-50 pt-4">
                              <MapPin size={20} className="text-primary shrink-0 mt-1" />
                              <div className="leading-snug text-lg text-gray-800">
                                 {office.address}
                              </div>
                           </div>

                           <a 
                               href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                               target="_blank"
                               rel="noopener noreferrer" 
                               className="inline-flex items-center gap-2 mt-2 text-sm font-bold text-primary hover:bg-primary-light px-4 py-2.5 rounded-xl transition-colors border border-primary/20 hover:border-primary/30 w-fit"
                            >
                                <Navigation size={16} /> Get Directions
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-[75px] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-secondary mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Quick answers to common questions about our engagement model.</p>
            </div>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
                        <button 
                            onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                            className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-100 transition-colors"
                        >
                            <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeAccordion === index ? 'bg-primary text-white rotate-180' : 'bg-gray-200 text-gray-500'}`}>
                                <ChevronDown size={18} />
                            </div>
                        </button>
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                        >
                            <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};