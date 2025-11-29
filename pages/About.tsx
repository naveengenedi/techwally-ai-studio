import React from 'react';
import { Editable } from '../components/Editable';
import { Users, Target, Shield, Zap, Globe, Award, ArrowRight, CheckCircle2, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  const stats = [
    { label: "Years of Excellence", value: "12+" },
    { label: "Enterprise Clients", value: "500+" },
    { label: "Global Engineers", value: "150+" },
    { label: "Projects Delivered", value: "1.2k" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Uncompromising Security",
      desc: "We build with a security-first mindset. Every line of code is audited, and every architecture is stress-tested to banking standards."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Radical Innovation",
      desc: "We don't just follow trends; we set them. Our R&D labs are constantly exploring Generative AI, Quantum Computing, and Edge IoT."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Centricity",
      desc: "Your success is our KPI. We embed ourselves in your teams, aligning our engineering velocity with your business goals."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Perspective",
      desc: "With offices in 5 countries, we bring diverse thinking and 24/7 delivery cycles to solve complex global challenges."
    }
  ];

  const leadership = [
    {
      name: "Eleanor Sterling",
      role: "Chief Executive Officer",
      bio: "Former VP of Engineering at Google. Eleanor founded Techwally to bring Silicon Valley velocity to enterprise digital transformation.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Dr. Marcus Chen",
      role: "Chief Technology Officer",
      bio: "PhD in AI from MIT. Marcus leads our technical strategy, ensuring we stay ahead of the curve in AI and Cloud architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sarah Jenkins",
      role: "VP of Product",
      bio: "Product visionary with a track record of launching SaaS unicorns. Sarah ensures our solutions are not just functional, but delightful.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "James Wilson",
      role: "Head of Operations",
      bio: "Operational expert ensuring seamless delivery across our global offices. James keeps the Techwally engine running smoothly.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-[112px]">
      <section className="relative py-[75px] overflow-hidden bg-secondary text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Award size={14} /> Since 2012
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              <Editable id="about-hero-title" defaultText="Architects of the Digital Future." />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300/80 max-w-2xl leading-relaxed font-light mb-10">
              <Editable id="about-hero-desc" defaultText="We are a collective of engineers, designers, and strategists obsessed with building software that matters. We don't just write code; we solve business problems." />
            </p>
            <div className="flex gap-4">
               <Link to="/contact" className="bg-white text-secondary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Partner With Us
               </Link>
               <Link to="/careers" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                  Join the Team
               </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 md:mx-0">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl md:rounded-none md:rounded-b-[3rem] shadow-xl md:shadow-none border border-gray-100 md:border-0 p-8 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
               {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                     <div className="text-4xl md:text-5xl font-black text-secondary mb-2">{stat.value}</div>
                     <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-[75px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                 <div className="absolute inset-0 bg-accent rounded-[2.5rem] rotate-3 opacity-10"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Team collaboration" 
                    className="relative rounded-[2.5rem] shadow-2xl z-10 w-full"
                 />
                 <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 border border-gray-100 max-w-xs hidden md:block">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <TrendingUp size={20} />
                       </div>
                       <div className="font-bold text-gray-900">Continuous Growth</div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                       From a garage startup in 2012 to a global enterprise partner in 2024.
                    </p>
                 </div>
              </div>
              
              <div>
                 <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-8">
                    <Editable id="about-story-title" defaultText="Engineering with Purpose" />
                 </h2>
                 <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                       <Editable id="about-story-p1" defaultText="Techwally began with a simple premise: Enterprise software doesn't have to be clunky, slow, or ugly. We set out to bridge the gap between consumer-grade UX and enterprise-grade reliability." />
                    </p>
                    <p>
                       <Editable id="about-story-p2" defaultText="Over the last decade, we've helped startups become unicorns and Fortune 500s act like startups. Our philosophy is rooted in 'Pragmatic Innovation'—using cutting-edge tech not just because it's new, but because it solves real friction." />
                    </p>
                    <p>
                       <Editable id="about-story-p3" defaultText="Today, we are a diverse team of thinkers and doers, united by a culture of curiosity and a relentless drive for excellence. We don't just deliver projects; we deliver outcomes." />
                    </p>
                 </div>
                 
                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Agile at Scale', 'Product-Led Growth', 'Cloud Native', 'Human-Centric Design'].map(item => (
                       <div key={item} className="flex items-center gap-3 font-bold text-gray-800">
                          <CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> {item}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-[75px] bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
               <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Our DNA</h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide every decision, every hire, and every line of code.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {values.map((val, i) => (
                  <div key={i} className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                     <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {val.icon}
                     </div>
                     <h3 className="text-2xl font-bold text-secondary mb-4">{val.title}</h3>
                     <p className="text-lg text-gray-600 leading-relaxed">{val.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-[75px]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-16">
               <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Meet the Leadership</h2>
               <p className="text-xl text-gray-600 max-w-2xl">Visionaries, technologists, and strategists steering the ship.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {leadership.map((leader, i) => (
                  <div key={i} className="group relative">
                     <div className="h-[400px] rounded-3xl overflow-hidden relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <img 
                           src={leader.image} 
                           alt={leader.name} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                           <p className="text-white text-sm leading-relaxed">{leader.bio}</p>
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-secondary">{leader.name}</h3>
                     <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">{leader.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-[75px] bg-secondary text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Life at Techwally</h2>
                  <p className="text-xl text-gray-300/80 leading-relaxed mb-8">
                     We believe that happy engineers write better code. Our culture is built on autonomy, mastery, and purpose. We work hard, but we also respect downtime, mental health, and personal growth.
                  </p>
                  <ul className="space-y-4 mb-10">
                     {[
                        'Remote-First, Hybrid-Optional',
                        'Annual Tech Stipend & Learning Budget',
                        'Regular Hackathons & Innovation Days',
                        'Global Offsites & Team Retreats'
                     ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-lg font-medium">
                           <Heart className="text-pink-500 w-6 h-6 shrink-0 fill-pink-500" /> {item}
                        </li>
                     ))}
                  </ul>
                  <Link to="/careers" className="inline-flex items-center gap-2 bg-white text-secondary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                     View Open Positions <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg opacity-80 hover:opacity-100 transition-opacity" alt="Office vibe" />
                     <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg opacity-80 hover:opacity-100 transition-opacity" alt="Meeting" />
                  </div>
                  <div className="space-y-4">
                     <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg opacity-80 hover:opacity-100 transition-opacity" alt="Working together" />
                     <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg opacity-80 hover:opacity-100 transition-opacity" alt="Team cheer" />
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};