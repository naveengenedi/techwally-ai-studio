
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../context';
import { Editable } from '../components/Editable';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Server, Smartphone, Cpu, ShieldCheck, Code2, Users, Rocket, BarChart3, Star, Zap, Building2, ShoppingCart, HeartPulse, Truck, Wallet, GraduationCap, Database, CarFront, Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../types';
import { Button } from '../components/Button';

const useAnimateOnScroll = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, inView];
};


const HeroSlider = () => {
    const { heroSlides, content, themeSettings } = useApp();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { layout } = themeSettings;
    const [progress, setProgress] = useState(0);
    const SLIDE_DURATION = 8000;

    // Swipe State
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();
        
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
            setProgress(newProgress);
        }, 50);

        const slideInterval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % heroSlides.length);
        }, SLIDE_DURATION);

        return () => {
            clearInterval(progressInterval);
            clearInterval(slideInterval);
        };
    }, [currentIndex, heroSlides.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const getGradientStyle = (type: string | undefined, color: string, opacity: number) => {
        const rgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const baseColor = color || '#000000';
        
        switch (type) {
            case 'left': return `linear-gradient(to right, ${rgba(baseColor, 0.9)} 0%, ${rgba(baseColor, 0.6)} 40%, transparent 100%)`;
            case 'right': return `linear-gradient(to left, ${rgba(baseColor, 0.9)} 0%, ${rgba(baseColor, 0.6)} 40%, transparent 100%)`;
            case 'bottom': return `linear-gradient(to top, ${rgba(baseColor, 0.9)} 0%, ${rgba(baseColor, 0.6)} 40%, transparent 100%)`;
            case 'radial': return `radial-gradient(circle at center, ${rgba(baseColor, 0.4)} 0%, ${rgba(baseColor, 0.9)} 100%)`;
            case 'none': 
            default: return rgba(baseColor, opacity);
        }
    };

    const getTextAlignmentClass = (align: string) => {
        switch(align) {
            case 'center': return 'items-center text-center mx-auto';
            case 'right': return 'items-end text-right ml-auto';
            default: return 'items-start text-left mr-auto';
        }
    };

    return (
        <section 
            className="relative w-full overflow-hidden bg-gray-900 group select-none"
            style={{ height: layout.heroHeight }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {heroSlides.map((slide, index) => {
                const isActive = index === currentIndex;
                const { 
                    badgeKey, titleKey, subtitleKey, ctaPrimaryKey, ctaSecondaryKey,
                    backgroundType, backgroundColor, backgroundImage, backgroundVideo,
                    overlayColor, overlayOpacity, overlayGradient,
                    textAlignment, textColor, heroImage, ctaPrimaryLink, ctaSecondaryLink
                } = slide;

                const overlayStyle = {
                    background: getGradientStyle(overlayGradient, overlayColor, overlayOpacity),
                };

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Background Media */}
                        <div className="absolute inset-0 z-0 h-full w-full">
                            <div className="absolute inset-0 bg-black/20 z-10"></div> {/* Base darkener */}
                            {backgroundType === 'color' && <div className="w-full h-full" style={{ backgroundColor }} />}
                            {backgroundType === 'image' && backgroundImage && (
                                <img 
                                    src={backgroundImage} 
                                    alt="" 
                                    className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`} 
                                />
                            )}
                            {backgroundType === 'video' && backgroundVideo && (
                                <video src={backgroundVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 z-20" style={overlayStyle}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                           <div className={`grid md:grid-cols-12 gap-12 items-center w-full ${textAlignment === 'right' ? 'direction-rtl' : ''}`}>
                               {/* Text Content */}
                                <div 
                                    className={`flex flex-col md:col-span-${layout.heroTextContainerWidth || 6} ${getTextAlignmentClass(textAlignment)}`}
                                    style={{ color: textColor || '#ffffff' }}
                                >
                                    <div className={`
                                        inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md 
                                        text-xs font-bold tracking-widest uppercase mb-8 transition-all duration-1000 delay-100
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                    `}>
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                        </span>
                                        <Editable id={badgeKey} defaultText="Badge Text" />
                                    </div>
                                    
                                    <h1 className={`
                                        text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]
                                        transition-all duration-1000 delay-300 drop-shadow-2xl
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                    `}>
                                        <Editable id={titleKey} defaultText="Hero Title" />
                                    </h1>
                                    
                                    <p className={`
                                        text-lg md:text-2xl opacity-90 mb-12 max-w-2xl leading-relaxed font-light
                                        transition-all duration-1000 delay-500 drop-shadow-md
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                    `}>
                                        <Editable id={subtitleKey} defaultText="Hero Subtitle" />
                                    </p>
                                    
                                    <div className={`
                                        flex flex-row items-center gap-3 mt-4
                                        transition-all duration-1000 delay-700
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                    `}>
                                        <Button 
                                            href={ctaPrimaryLink || '#'} 
                                            variant="primary" 
                                            className="text-sm font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 border-2 border-transparent tracking-wide transition-all hover:scale-105"
                                        >
                                            <Editable id={ctaPrimaryKey} defaultText="Primary Action" />
                                        </Button>
                                         <Button 
                                            href={ctaSecondaryLink || '#'} 
                                            variant="secondary" 
                                            className="text-sm font-bold px-8 py-4 rounded-xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 tracking-wide transition-all hover:scale-105"
                                        >
                                            <Editable id={ctaSecondaryKey} defaultText="Secondary Action" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Hero Image (Foreground) */}
                                {heroImage && textAlignment !== 'center' && (
                                    <div className={`hidden md:block md:col-span-${layout.heroImageContainerWidth || 6} relative z-10`}>
                                        <div className={`
                                            relative transition-all duration-1000 delay-500 transform perspective-1000
                                            ${isActive ? 'opacity-100 translate-x-0 rotate-y-0' : 'opacity-0 translate-x-20 rotate-y-12'}
                                        `}>
                                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl animate-pulse"></div>
                                            <img 
                                                src={heroImage} 
                                                alt="Hero visual" 
                                                className="relative w-full h-auto max-h-[600px] object-cover rounded-3xl shadow-2xl border border-white/10" 
                                            />
                                            {/* Floating elements decoration */}
                                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 animate-bounce delay-700 hidden lg:block"></div>
                                            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-primary/20 backdrop-blur-xl rounded-full border border-white/10 animate-pulse delay-1000 hidden lg:block"></div>
                                        </div>
                                    </div>
                                )}
                           </div>
                        </div>
                    </div>
                );
            })}

            {/* Bottom Controls */}
            <div className="absolute bottom-10 left-0 w-full z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                     {/* Progress Bar for Current Slide */}
                    <div className="hidden md:flex items-center gap-4">
                         <span className="text-white/50 text-sm font-bold">0{currentIndex + 1}</span>
                         <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-white transition-all duration-75 ease-linear" 
                                style={{ width: `${progress}%` }}
                            ></div>
                         </div>
                         <span className="text-white/50 text-sm font-bold">0{heroSlides.length}</span>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex gap-3 mx-auto md:mx-0">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

interface CardProps {
  cardType: 'services' | 'industries' | 'process' | 'testimonials';
  icon?: React.ReactNode;
  titleKey: string;
  descKey: string;
  buttonKey: string;
  step?: string;
}

const Card: React.FC<CardProps> = ({ cardType, icon, titleKey, descKey, buttonKey, step }) => {
    const { themeSettings } = useApp();
    const [isHovered, setIsHovered] = useState(false);
    const styles = themeSettings.cards[cardType];
    const { colors } = themeSettings;
    
    // Logic for Industry cards (requested specific style)
    const isIndustry = cardType === 'industries';
    
    // Services and Process cards use Primary color on hover for icon bg
    const isServiceOrProcess = cardType === 'services' || cardType === 'process';

    const cardStyle = {
        backgroundColor: isHovered ? styles.hoverBackgroundColor : styles.backgroundColor,
        padding: styles.padding,
        borderRadius: styles.borderRadius,
        borderColor: isHovered ? colors.primary : '#f3f4f6',
    };
    
    const iconContainerStyle = {
        backgroundColor: (isHovered && isServiceOrProcess) ? colors.primary : styles.iconContainerBackgroundColor,
        color: (isHovered && isServiceOrProcess) ? '#FFFFFF' : styles.iconColor,
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative shadow-sm hover:shadow-xl transition-all duration-300 border border-solid flex flex-col items-start group hover:-translate-y-2 h-full active:scale-[0.98] active:shadow-inner ${isIndustry ? 'overflow-hidden' : 'overflow-hidden'}`}
        >
             {step && (
                 <div className="text-5xl md:text-6xl font-black absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none z-0 text-gray-300">
                     {step}
                 </div>
             )}
             
             {/* Icon */}
             {icon && (
                <div style={iconContainerStyle} className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm group-hover:shadow-primary/20 relative z-10 ${isIndustry && isHovered ? '!bg-white !text-primary shadow-lg' : ''}`}>
                    {icon}
                </div>
            )}
            
            <h3 className="text-xl font-bold mb-4 relative z-10" style={{ color: styles.titleColor }}>
                <Editable id={titleKey} defaultText="Card Title" />
            </h3>
            
            <p className="leading-relaxed font-medium text-base line-clamp-3 mb-6 flex-grow relative z-10" style={{ color: styles.descriptionColor }}>
                 <Editable id={descKey} defaultText="Card Description" />
            </p>
            
            <div className="mt-auto relative z-10">
                <button 
                    style={{ color: styles.buttonColor || colors.primary }} 
                    className={`font-bold text-sm py-2 flex items-center gap-2 group-hover:gap-3 transition-all duration-300 ${isIndustry ? 'text-primary group-hover:text-white' : ''}`}
                >
                    <Editable id={buttonKey} defaultText="View More" /> <ArrowRight size={16} />
                </button>
            </div>
            
            {/* Active click effect overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 active:opacity-100 pointer-events-none transition-opacity duration-100 z-0"></div>
        </div>
    );
};

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section ref={ref} className={`${className} ${inView ? 'animate-[animate-fade-in-up_1s_ease-out_forwards]' : 'opacity-0'}`}>
      {children}
    </section>
  );
};

export const Home = () => {
  const { themeSettings, content } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const servicesData = [
      { icon: <Smartphone strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-1-title", descKey: "service-card-1-desc", buttonKey: "service-card-1-button" },
      { icon: <Cpu strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-2-title", descKey: "service-card-2-desc", buttonKey: "service-card-2-button" },
      { icon: <Server strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-3-title", descKey: "service-card-3-desc", buttonKey: "service-card-3-button" },
      { icon: <ShieldCheck strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-4-title", descKey: "service-card-4-desc", buttonKey: "service-card-4-button" },
      { icon: <Code2 strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-5-title", descKey: "service-card-5-desc", buttonKey: "service-card-5-button" },
      { icon: <Users strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-6-title", descKey: "service-card-6-desc", buttonKey: "service-card-6-button" },
      { icon: <Zap strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-7-title", descKey: "service-card-7-desc", buttonKey: "service-card-7-button" },
      { icon: <Database strokeWidth={1.5} className="w-8 h-8" />, titleKey: "service-card-8-title", descKey: "service-card-8-desc", buttonKey: "service-card-8-button" },
  ];

  const industriesData = [
      { icon: <HeartPulse strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-1-title", descKey: "industry-card-1-desc", buttonKey: "industry-card-1-button" },
      { icon: <Wallet strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-2-title", descKey: "industry-card-2-desc", buttonKey: "industry-card-2-button" },
      { icon: <ShoppingCart strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-3-title", descKey: "industry-card-3-desc", buttonKey: "industry-card-3-button" },
      { icon: <Truck strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-4-title", descKey: "industry-card-4-desc", buttonKey: "industry-card-4-button" },
      { icon: <GraduationCap strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-5-title", descKey: "industry-card-5-desc", buttonKey: "industry-card-5-button" },
      { icon: <Building2 strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-6-title", descKey: "industry-card-6-desc", buttonKey: "industry-card-6-button" },
      { icon: <CarFront strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-7-title", descKey: "industry-card-7-desc", buttonKey: "industry-card-7-button" },
      { icon: <Wind strokeWidth={1.5} className="w-8 h-8" />, titleKey: "industry-card-8-title", descKey: "industry-card-8-desc", buttonKey: "industry-card-8-button" }
  ];

  const processData = [
      { step: "01", titleKey: "process-card-1-title", descKey: "process-card-1-desc", icon: <Users strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16" />, buttonKey: "process-card-1-button" },
      { step: "02", titleKey: "process-card-2-title", descKey: "process-card-2-desc", icon: <Code2 strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16" />, buttonKey: "process-card-2-button" },
      { step: "03", titleKey: "process-card-3-title", descKey: "process-card-3-desc", icon: <Cpu strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16" />, buttonKey: "process-card-3-button" },
      { step: "04", titleKey: "process-card-4-title", descKey: "process-card-4-desc", icon: <Rocket strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16" />, buttonKey: "process-card-4-button" },
  ];
  
  const testimonials = [
    { nameKey: "testimonial-1-name", roleKey: "testimonial-1-role", quoteKey: "testimonial-1-quote", avatarKey: "testimonial-1-avatar" },
    { nameKey: "testimonial-2-name", roleKey: "testimonial-2-role", quoteKey: "testimonial-2-quote", avatarKey: "testimonial-2-avatar" },
    { nameKey: "testimonial-3-name", roleKey: "testimonial-3-role", quoteKey: "testimonial-3-quote", avatarKey: "testimonial-3-avatar" },
  ];
  
  // Create a large buffer for smoother infinite scrolling (6 sets)
  const testimonialsList = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationFrameId: number;
    const speed = 0.8; // Smooth speed
    
    const scroll = () => {
      if (scrollContainer && !isPaused) {
         scrollContainer.scrollLeft += speed;
         
         // Infinite Scroll Logic
         // 6 sets of data.
         // If we scroll past the halfway point (3 sets), we jump back 2 sets (1/3 of total width).
         // This keeps us in the "middle" of the infinite strip.
         
         const halfWidth = scrollContainer.scrollWidth / 2;
         const thirdWidth = scrollContainer.scrollWidth / 3;
         
         if (scrollContainer.scrollLeft >= halfWidth) {
             scrollContainer.scrollLeft -= thirdWidth;
         } else if (scrollContainer.scrollLeft <= 0) {
             // If user manually scrolls to start, jump forward to keep illusion
             scrollContainer.scrollLeft += thirdWidth;
         }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, testimonialsList.length]);

  return (
    <div>
      <HeroSlider />

      {/* Services Section */}
      <AnimatedSection className="py-[75px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-20 text-left">
            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 md:mb-6 tracking-tight">
                <Editable id="section-services-title" defaultText="Our Expertise" />
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                <Editable id="section-services-desc" defaultText="End-to-end capabilities from design to deployment. We build scalable systems that grow with your business." />
                </p>
            </div>
            <div className="mt-8">
                <Button href="/services" variant="primary" className="inline-flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1">
                    View All Services <ArrowRight size={18} />
                </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((s, i) => (
              <Card key={i} cardType="services" icon={s.icon} titleKey={s.titleKey} descKey={s.descKey} buttonKey={s.buttonKey} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Industries Section */}
      <AnimatedSection className="py-[75px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-20 text-left">
            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 md:mb-6 tracking-tight">
                <Editable id="section-industries-title" defaultText="Industries We Serve" />
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                <Editable id="section-industries-desc" defaultText="Specialized solutions tailored to the unique regulatory and operational demands of your sector." />
                </p>
            </div>
             <div className="mt-8">
                <Button href="/industries" variant="primary" className="inline-flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1">
                    View All Industries <ArrowRight size={18} />
                </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {industriesData.map((s, i) => (
              <Card key={i} cardType="industries" icon={s.icon} titleKey={s.titleKey} descKey={s.descKey} buttonKey={s.buttonKey} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-[75px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-left mb-12 md:mb-20">
             <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 md:mb-6">
                <Editable id="process-title" defaultText="How We Work" />
             </h2>
             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-4 font-medium">
                <Editable id="process-subtitle" defaultText="A proven agile methodology designed for transparency and speed." />
             </p>
           </div>
           <div className="grid md:grid-cols-4 gap-8 md:gap-10">
              {processData.map((item, i) => (
                <Card key={i} cardType="process" icon={item.icon} titleKey={item.titleKey} descKey={item.descKey} step={item.step} buttonKey={item.buttonKey} />
              ))}
           </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Slider */}
      <section className="py-[75px] bg-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 animate-[animate-fade-in-up_1s_ease-out_forwards] opacity-0">
           <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
             <Editable id="testimonial-title" defaultText="What our partners say" />
           </h2>
        </div>
        
        <div 
             ref={scrollRef}
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}
             onTouchStart={() => setIsPaused(true)}
             onTouchEnd={() => setIsPaused(false)}
             className="overflow-x-auto flex gap-6 px-4 sm:px-6 lg:px-8 py-12 scrollbar-hide snap-x snap-mandatory no-scrollbar"
        >
             {testimonialsList.map((t, i) => {
                const [isHovered, setIsHovered] = useState(false);
                const styles = themeSettings.cards.testimonials;
                const avatarUrl = content[t.avatarKey];
                 return (
                   <div key={i} 
                     style={{
                         backgroundColor: isHovered ? styles.hoverBackgroundColor : styles.backgroundColor,
                         padding: styles.padding,
                         borderRadius: styles.borderRadius,
                     }}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     className="backdrop-blur-sm border border-gray-700 w-[85vw] sm:w-[350px] md:w-[400px] flex-shrink-0 snap-center flex flex-col transition-all duration-300 hover:scale-[1.02] cursor-grab active:cursor-grabbing shadow-lg h-full"
                   >
                      <div className="flex text-yellow-400 mb-6 gap-1">
                        {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                      </div>
                      <p className="mb-8 text-lg leading-relaxed italic flex-grow" style={{ color: styles.descriptionColor }}>
                        "<Editable id={t.quoteKey} defaultText="..." />"
                      </p>
                      <div className="flex items-center gap-4 mt-auto border-t border-gray-700 pt-6">
                         <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold shadow-lg overflow-hidden shrink-0">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={content[t.nameKey]} className="w-full h-full object-cover" />
                            ) : (
                               <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">
                                        {content[t.nameKey]?.charAt(0) || 'A'}
                                    </span>
                               </div>
                            )}
                         </div>
                         <div>
                           <div className="font-bold text-base" style={{ color: styles.titleColor }}><Editable id={t.nameKey} defaultText="Name" /></div>
                           <div className="text-sm text-gray-400"><Editable id={t.roleKey} defaultText="Role" /></div>
                         </div>
                      </div>
                   </div>
                 )
             })}
        </div>
        
        <div className="absolute top-0 left-0 h-full w-8 md:w-32 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-8 md:w-32 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Why Choose Us */}
      <AnimatedSection className="py-[75px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
               <div className="order-2 md:order-1 text-left">
                   <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 md:mb-8">
                       <Editable id="section-why-title" defaultText="Why Techwally?" />
                   </h2>
                   <p className="text-gray-600 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed">
                       <Editable id="section-why-desc" defaultText="We are more than just a dev shop. We are your strategic technology partner committed to long-term success." />
                   </p>
                   <div className="grid grid-cols-1 gap-4 md:gap-6">
                       {['Agile Methodology & Transparency', 'Dedicated Senior Engineering Teams', 'Strict IP Protection & Security', '24/7 Global Support & Monitoring'].map((item) => (
                           <div key={item} className="flex items-center gap-3 md:gap-4 text-gray-800 font-bold text-base md:text-lg p-3 md:p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                   <CheckCircle2 size={14} className="text-white" />
                               </div>
                               {item}
                           </div>
                       ))}
                   </div>
               </div>
               <div className="order-1 md:order-2 bg-accent rounded-[2.5rem] md:rounded-[3rem] h-[300px] md:h-[500px] flex items-center justify-center relative overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-90"></div>
                   <img src="https://picsum.photos/800/800?random=10" alt="Team working" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-white/20 text-center max-w-xs mx-4">
                         <BarChart3 size={40} className="text-white mx-auto mb-3 md:mb-4" />
                         <div className="text-3xl md:text-4xl font-black text-white mb-2">300%</div>
                         <div className="text-gray-200 font-medium text-sm md:text-base">Average ROI for our enterprise clients</div>
                      </div>
                   </div>
               </div>
           </div>
        </div>
      </AnimatedSection>

      {/* Free Consultation CTA */}
      <AnimatedSection className="py-[75px] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                    <img 
                        src={themeSettings.ctaImage || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2070"} 
                        alt="Consultation" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-10 md:p-12 md:py-16 flex flex-col justify-center text-white relative z-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        <Editable id="cta-section-title" defaultText="Ready To Transform Your Business? Book a Free Consultation" />
                    </h2>
                    <p className="text-primary-light text-lg mb-8 leading-relaxed">
                        <Editable id="cta-section-desc" defaultText="Leave your email below to start a new project journey with us. Let's shape the future of your business together." />
                    </p>
                    
                     <form className="bg-white p-2 rounded-xl flex items-center shadow-lg w-full" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                        <div className="relative flex-grow">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                required
                                className="w-full bg-transparent pl-4 pr-2 py-3 text-gray-900 placeholder:text-gray-400 outline-none min-w-0"
                            />
                        </div>
                        <button type="submit" className="shrink-0 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-colors">
                            <Editable id="cta-section-button" defaultText="Stay in the Loop" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
};