
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavItem } from '../types';
import { Search, ChevronDown, Menu, X, ArrowRight, User, Phone, Rocket, Trophy, Building2, BookOpen, HelpCircle, Briefcase, ChevronRight, LogIn } from 'lucide-react';
import { useApp } from '../context';
import { Logo } from './Logo';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { currentUser, navigationStructure, openSearch, openAuthModal } = useApp();
  const timeoutRef = useRef<any>(null);
  const navigate = useNavigate();

  const activeItem = activeDropdown ? navigationStructure.find(item => item.label === activeDropdown) : null;

  const handleMouseEnter = (label: string) => {
    if (isLocked) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (isLocked) return;
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };
  
  const handleLinkClick = (e: React.MouseEvent, item: NavItem) => {
    if (!item.children) {
      closeDropdown();
      return;
    }
    e.preventDefault();
    if (activeDropdown === item.label && isLocked) {
      closeDropdown();
    } else {
      setIsLocked(true);
      setActiveDropdown(item.label);
    }
  };

  const closeDropdown = () => {
    setIsLocked(false);
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const getNavIcon = (label: string) => {
    switch (label) {
        case 'What we Deliver': return <Rocket size={22} className="text-primary shrink-0" />;
        case 'Industry Excellence': return <Trophy size={22} className="text-primary shrink-0" />;
        case 'Company': return <Building2 size={22} className="text-primary shrink-0" />;
        case 'Resource Hub': return <BookOpen size={22} className="text-primary shrink-0" />;
        case 'Why Techwally?': return <HelpCircle size={22} className="text-primary shrink-0" />;
        case 'Careers': return <Briefcase size={22} className="text-primary shrink-0" />;
        case 'Contact': return <Phone size={22} className="text-primary shrink-0" />;
        default: return <div className="w-5 h-5 bg-primary-light rounded-full shrink-0" />;
    }
  };

  return (
    <>
    <div onMouseLeave={handleMouseLeave} className="relative">
      <header className="fixed w-full z-40 bg-white border-b border-gray-100 transition-all duration-300 h-16 sm:h-[112px]">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Top Bar - Desktop Only */}
          <div className="hidden sm:flex justify-end items-center h-10 border-b border-gray-100 text-xs font-medium text-gray-500 gap-6">
             {currentUser ? (
                <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
                   <User size={12} /> Admin Dashboard
                </Link>
             ) : (
                <button onClick={() => openAuthModal('login')} className="hover:text-primary transition-colors flex items-center gap-1">
                   <User size={12} /> Portal Login
                </button>
             )}
             <div className="w-px h-3 bg-gray-300"></div>
             <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
                <Phone size={12} /> Support
             </Link>
             <div className="w-px h-3 bg-gray-300"></div>
             <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                Globe <ChevronDown size={10} />
             </div>
          </div>

          <div className="flex justify-between items-center h-16 sm:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center z-50" title="Techwally Home"> {/* Removed onDoubleClick */}
                <Logo darkText={true} />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-1 items-center h-full">
              {navigationStructure.map((item: NavItem) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                >
                  <Link
                    to={item.href || '#'}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`font-bold text-[15px] transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg ${activeDropdown === item.label ? 'bg-primary-light text-primary' : 'text-black hover:text-primary hover:bg-gray-50'}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
               {currentUser && (
                  <div className="hidden md:block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200 animate-pulse">
                      ADMIN
                  </div>
              )}
               
               <button 
                  onClick={openSearch} 
                  className="flex items-center justify-center transition-colors w-10 h-10 rounded-full text-gray-700 hover:text-primary hover:bg-gray-100"
                  aria-label="Search"
                >
                  <Search size={22} />
              </button>

              {/* Hidden on mobile, visible on desktop - Explicitly wrapped to prevent display issues */}
              <div className="hidden lg:block">
                <Button href="/contact" variant="primary" className="shadow-lg shadow-primary/20 rounded-lg px-6">
                  Contact us
                </Button>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 transition-colors text-gray-900 hover:text-primary bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl shrink-0 flex items-center justify-center border border-transparent"
                aria-label="Menu"
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full screen dropdown container */}
      <div 
        className={`fixed inset-x-0 z-30 transition-opacity duration-300 lg:pointer-events-none ${activeItem ? 'lg:pointer-events-auto' : ''}`}
        style={{ top: '112px' }}
      >
        {activeItem && activeItem.children && (
          <div 
            className="relative z-10 animate-[fadeIn_0.3s_ease-out]" 
            onMouseEnter={() => handleMouseEnter(activeItem.label)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-b-2xl border border-t-0 border-gray-100 shadow-2xl flex overflow-hidden max-h-[calc(100vh-120px)] overflow-y-auto">
                {/* Left Featured Column */}
                {activeItem.featured && (
                  <div className="w-[380px] shrink-0 bg-primary p-10 flex flex-col border-r border-primary-dark">
                    <div className="h-40 rounded-xl overflow-hidden mb-8 relative group shadow-lg">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img src={activeItem.featured.image} alt={activeItem.featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-4">{activeItem.featured.title}</h3>
                    <p className="text-primary-light text-base leading-relaxed mb-8 flex-grow">{activeItem.featured.description}</p>
                    <Link 
                      to={activeItem.featured.href} 
                      onClick={closeDropdown} 
                      className="mt-auto text-sm font-bold flex items-center gap-2 group/link text-white hover:text-white transition-colors bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-lg w-fit"
                    >
                      Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
                
                {/* Right Links Column */}
                <div className="flex-1 p-10 bg-white">
                  {activeItem.children.map((category) => (
                    <div key={category.title} className="h-full flex flex-col">
                      <h3 className="font-extrabold text-gray-400 text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
                          {category.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {category.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            onClick={closeDropdown}
                            className="group block p-5 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary-light/10 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">{subItem.label}</span>
                                <ArrowRight size={16} className="text-gray-300 group-hover:text-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">{subItem.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>


    {/* Mobile Menu Overlay */}
    <div 
      className={`fixed inset-0 bg-gray-900/60 z-50 lg:hidden transition-opacity duration-300 backdrop-blur-sm ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      onClick={() => setMobileMenuOpen(false)} 
    />

    {/* Mobile Menu Drawer - Slide from Left */}
    <div className={`fixed inset-y-0 left-0 z-50 w-[85%] sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-white h-20">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                 <Logo darkText={true} />
            </Link>
            <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
                <X size={24} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white custom-scroll">
            <div className="space-y-1">
                {navigationStructure.map((item) => {
                    const isExpanded = expandedItems.includes(item.label);
                    
                    return (
                        <div key={item.label} className="border-b border-gray-50 last:border-0 pb-1">
                            {item.children ? (
                                <div>
                                    <button 
                                        onClick={() => toggleMobileSubmenu(item.label)}
                                        className={`w-full flex justify-between items-center py-4 text-left group transition-all duration-300 rounded-xl px-2 ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {getNavIcon(item.label)}
                                            <span className={`text-lg font-bold transition-colors ${isExpanded ? 'text-primary' : 'text-gray-800'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-white text-primary rotate-90 shadow-sm' : 'text-gray-400'}`}>
                                            <ChevronRight size={18} />
                                        </div>
                                    </button>
                                    
                                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="pl-4 pr-2 pb-4 space-y-4 pt-2">
                                                {item.children.map((cat) => (
                                                    <div key={cat.title} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                                                        {item.label !== 'Company' && item.label !== 'Resource Hub' && (
                                                            <div className="text-xs font-extrabold text-primary uppercase mb-3 tracking-widest flex items-center gap-2">
                                                                <span className="w-1 h-1 bg-primary rounded-full"></span> {cat.title}
                                                            </div>
                                                        )}
                                                        <div className="space-y-1">
                                                            {cat.items.map(sub => (
                                                                <Link 
                                                                    key={sub.label} 
                                                                    to={sub.href} 
                                                                    className="block text-gray-600 text-base font-medium hover:text-primary transition-colors py-2 px-2 hover:bg-white rounded-lg" 
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to={item.href || '#'} 
                                    className="block py-4 px-2 text-lg font-bold text-gray-800 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors flex justify-start items-center gap-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {getNavIcon(item.label)}
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3">
             <Link 
                to="/contact" 
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all text-center" 
                onClick={() => setMobileMenuOpen(false)}
            >
              <Rocket size={18} /> Start a Project 
            </Link>
            <div className="grid grid-cols-2 gap-3">
                {currentUser ? (
                    <Link to="/admin" // Link to Admin Dashboard
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 rounded-xl font-bold text-sm transition-all" 
                        onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={16} /> Admin Dashboard
                    </Link>
                ) : (
                    <button 
                        onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 rounded-xl font-bold text-sm transition-all" 
                    >
                      <LogIn size={16} /> Portal Login
                    </button>
                )}
                <Link 
                    to="/contact" 
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 rounded-xl font-bold text-sm transition-all" 
                    onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={16} /> Contact Us
                </Link>
            </div>
            
            <div className="text-center text-[10px] text-gray-400 font-medium pt-2">
                © {new Date().getFullYear()} Techwally. Enterprise Solutions.
            </div>
        </div>
    </div>
    </>
  );
};