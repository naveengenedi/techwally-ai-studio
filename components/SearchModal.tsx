
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context';
import { X, Search, Settings, Briefcase, FileText, TrendingUp, Clock, MessageSquare, Calendar, Globe, Cloud, ShieldCheck, BriefcaseBusiness, Contact, Link as LinkIcon, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const SearchModal = () => {
  const { closeSearch, navigationStructure, jobs, blogs } = useApp();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem('techwally_recent_searches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const addRecentSearch = (term: string) => {
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('techwally_recent_searches', JSON.stringify(updatedSearches));
  };

  const allServices = useMemo(() => 
    navigationStructure
      .flatMap(nav => nav.children?.flatMap(cat => cat.items) || [])
      .map(item => ({ ...item, type: 'Service' })), 
  [navigationStructure]);

  const allJobs = useMemo(() => jobs.filter(j => j.active).map(job => ({ ...job, type: 'Job' })), [jobs]);
  
  const allBlogs = useMemo(() => blogs.filter(b => b.status === 'published').map(blog => ({ ...blog, type: 'Blog' })), [blogs]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return { services: [], jobs: [], blogs: [] };
    const q = debouncedQuery.toLowerCase();
    
    const services = allServices.filter(s => s.label.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    const jobs = allJobs.filter(j => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
    const blogs = allBlogs.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));

    return { services, jobs, blogs };
  }, [debouncedQuery, allServices, allJobs, allBlogs]);

  const filteredResults = useMemo(() => {
    const all = [...searchResults.services, ...searchResults.jobs, ...searchResults.blogs];
    if (activeFilter === 'all') return all;
    if (activeFilter === 'services') return searchResults.services;
    if (activeFilter === 'jobs') return searchResults.jobs;
    if (activeFilter === 'blogs') return searchResults.blogs;
    return [];
  }, [activeFilter, searchResults]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(query.trim()) addRecentSearch(query.trim());
  };

  const handleLinkClick = () => {
      if (query.trim()) addRecentSearch(query.trim());
      closeSearch();
  };

  const ResultIcon = ({ type }: { type: string }) => {
    switch(type) {
      case 'Service': return <Settings size={18} className="text-gray-400" />;
      case 'Job': return <Briefcase size={18} className="text-gray-400" />;
      case 'Blog': return <FileText size={18} className="text-gray-400" />;
      default: return <LinkIcon size={18} className="text-gray-400" />;
    }
  };

  const popularSearches = [
    { term: 'cloud migration', type: 'Services', icon: <Cloud /> },
    { term: 'cybersecurity audit', type: 'Services', icon: <ShieldCheck /> },
    { term: 'IT support jobs', type: 'Jobs', icon: <BriefcaseBusiness /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-gray-900/60 backdrop-blur-sm p-4 md:p-10 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-full" onClick={e => e.stopPropagation()}>
        <div className="p-4 md:p-6 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold flex items-center gap-3"><Search size={20} className="text-primary"/> Advanced Search</h2>
            <button onClick={closeSearch} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"><X size={20} /></button>
        </div>

        <div className="p-4 md:p-6 border-b">
            <form onSubmit={handleSearch}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Search for services, jobs, documentation, case studies..." 
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg text-gray-900 placeholder:text-gray-400"
                    />
                </div>
            </form>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll">
          <div className="grid lg:grid-cols-12 gap-6 p-4 md:p-6">
            <div className="lg:col-span-8">
              {debouncedQuery ? (
                <div>
                   <div className="flex flex-wrap gap-2 mb-6">
                      <FilterButton label="All Results" count={searchResults.services.length + searchResults.jobs.length + searchResults.blogs.length} active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
                      <FilterButton label="Services" count={searchResults.services.length} active={activeFilter === 'services'} onClick={() => setActiveFilter('services')} />
                      <FilterButton label="Jobs" count={searchResults.jobs.length} active={activeFilter === 'jobs'} onClick={() => setActiveFilter('jobs')} />
                       <FilterButton label="Blogs" count={searchResults.blogs.length} active={activeFilter === 'blogs'} onClick={() => setActiveFilter('blogs')} />
                   </div>
                   <div className="space-y-2">
                       {filteredResults.length > 0 ? filteredResults.map((item: any, i) => (
                          <Link to={item.href || `/careers`} onClick={handleLinkClick} key={i} className="block p-4 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 mb-1">
                                <ResultIcon type={item.type} />
                                <div className="font-bold text-base text-gray-900 group-hover:text-primary">{item.label || item.title}</div>
                                <span className="text-xs font-bold text-gray-400">{item.type}</span>
                              </div>
                              <p className="text-sm text-gray-500 pl-8 line-clamp-2">{item.description || item.excerpt}</p>
                          </Link>
                       )) : <p className="text-center text-gray-500 py-10">No results found for "{debouncedQuery}"</p>}
                   </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><TrendingUp size={16}/> Popular Searches</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                      {popularSearches.map((ps, i) => (
                         <button key={i} onClick={() => setQuery(ps.term)} className="text-left bg-white border border-gray-200 p-4 rounded-xl hover:border-primary hover:bg-primary-light transition-all flex items-start gap-3">
                             <div className="w-8 h-8 flex items-center justify-center text-primary bg-primary-light rounded-lg shrink-0">{ps.icon}</div>
                             <div>
                                 <div className="font-bold text-gray-900">{ps.term}</div>
                                 <div className="text-xs text-gray-500">{ps.type}</div>
                             </div>
                         </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl border">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Clock size={16}/> Recent Searches</h3>
                    <div className="space-y-2">
                        {recentSearches.length > 0 ? recentSearches.map((term, i) => (
                           <button key={i} onClick={() => setQuery(term)} className="w-full text-left flex items-center gap-2 text-gray-600 hover:text-primary transition-colors p-1 group">
                             <Search size={14} className="text-gray-400 group-hover:text-primary" /> {term}
                           </button>
                        )) : <p className="text-xs text-gray-400 text-center py-2">No recent searches.</p>}
                    </div>
                </div>
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">Quick Actions</h3>
                    <div className="space-y-2">
                        <Link to="/contact" onClick={closeSearch} className="flex items-center gap-2 text-blue-800 hover:underline p-1"><Contact size={14}/> Contact Support</Link>
                        <Link to="/contact" onClick={closeSearch} className="flex items-center gap-2 text-blue-800 hover:underline p-1"><Calendar size={14}/> Schedule Consultation</Link>
                        <Link to="/services" onClick={closeSearch} className="flex items-center gap-2 text-blue-800 hover:underline p-1"><Building2 size={14}/> View All Services</Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ label, count, active, onClick }: {label: string, count: number, active: boolean, onClick: () => void}) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-bold rounded-full flex items-center gap-2 transition-colors ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      {label}
      <span className={`px-2 py-0.5 text-xs rounded-full ${active ? 'bg-white/20' : 'bg-gray-200'}`}>{count}</span>
    </button>
);
