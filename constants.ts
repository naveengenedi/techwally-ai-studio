

import { NavItem, Job, BlogPost, ContentMap, HeroSlide, ThemeSettings, AdminConfig, User } from './types';

export const INITIAL_NAVIGATION_STRUCTURE: NavItem[] = [
  {
    label: 'What we Deliver',
    featured: {
      title: 'What We Deliver',
      description: 'We are a forward-thinking technology partner, dedicated to making digital transformation seamless and impactful. At Techwally, we blend innovation, expertise, and strategic insight to create solutions that drive efficiency, growth, and meaningful outcomes.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
      href: '/services'
    },
    children: [
      {
        title: 'Core Services',
        items: [
          { label: 'Strategic Advisory', href: '/services/advisory', description: 'Guiding organizations with forward-thinking strategies and actionable insights to drive growth.' },
          { label: 'Data Analytics', href: '/services/data-analytics', description: 'Transforming complex datasets into meaningful intelligence for smarter, data-driven decisions.' },
          { label: 'Cloud Enablement', href: '/services/cloud', description: 'Designing scalable, secure, and high-performance cloud ecosystems for future-ready operations.' },
          { label: 'DevOps Automation', href: '/services/devops', description: 'Accelerating software delivery through integrated pipelines, automation, and collaboration.' },
          { label: 'Information Management', href: '/services/info-management', description: 'Optimizing data governance, quality, and accessibility to maximize business value.' },
          { label: 'Legacy Modernization', href: '/services/modernization', description: 'Upgrading and transforming legacy infrastructure into agile, high-performing solutions.' },
          { label: 'Workforce Management', href: '/services/workforce', description: 'Enhancing employee productivity, engagement, and operational efficiency with intelligent solutions.' },
          { label: 'Cyber Solutions', href: '/services/cyber-security', description: 'Protecting digital assets while leveraging AI, IoT, and emerging tech to unlock opportunities.' },
        ],
      },
    ],
  },
  {
    label: 'Industry Excellence',
     featured: {
      title: 'Industry Excellence',
      description: 'We provide specialized solutions tailored to the unique regulatory, operational, and market demands of your sector. Our deep industry expertise ensures your technology is not just powerful, but also compliant and competitive.',
      image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800',
      href: '/industries'
    },
    children: [
      {
        title: 'Key Sectors',
        items: [
          { label: 'Healthcare', href: '/industries/healthcare', description: 'HIPAA-compliant solutions that improve patient outcomes and streamline operations.' },
          { label: 'FinTech', href: '/industries/fintech', description: 'Secure, scalable platforms for next-generation financial services.' },
          { label: 'Real Estate', href: '/industries/real-estate', description: 'PropTech solutions for modern property management and sales.' },
          { label: 'Education', href: '/industries/education', description: 'LMS and EdTech platforms for personalized learning experiences.' },
          { label: 'eCommerce', href: '/industries/ecommerce', description: 'Omnichannel retail solutions that drive higher conversion rates.' },
        ],
      },
      {
        title: 'Specialized',
        items: [
          { label: 'Logistics', href: '/industries/logistics', description: 'Optimizing global distribution with predictive analytics and automation.' },
          { label: 'Hospitality', href: '/industries/hospitality', description: 'Enhancing guest experiences with integrated management systems.' },
          { label: 'Startups', href: '/industries/startups', description: 'Building scalable MVPs and product iterations for high-growth companies.' },
          { label: 'Government', href: '/industries/government', description: 'Secure and compliant digital services for the public sector.' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    featured: {
      title: 'Our Company',
      description: 'Techwally is built on a foundation of integrity, innovation, and a relentless commitment to client success. Discover our story and the values that drive us.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
      href: '/company'
    },
    children: [
        {
            title: 'Who We Are',
            items: [
                { label: 'About Techwally', href: '/company', description: 'Learn about our mission, values, and the team driving innovation.' },
                { label: 'Leadership', href: '/company/leadership', description: 'Meet the visionaries steering our strategic direction.' },
                { label: 'Careers', href: '/careers', description: 'Explore open positions and join our team of experts.' },
                { label: 'Contact Us', href: '/contact', description: 'Get in touch with our global offices.' },
            ]
        }
    ]
  },
  {
    label: 'Resource Hub',
    featured: {
      title: 'Resource Hub',
      description: 'Dive deep into the latest technology trends, strategic insights, and success stories from our team of experts. Your knowledge base for digital transformation.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      href: '/blog'
    },
    children: [
        {
            title: 'Knowledge Base',
            items: [
                { label: 'Latest Insights (Blog)', href: '/blog', description: 'Explore articles on technology, strategy, and industry trends.' },
                { label: 'Case Studies', href: '/contact', description: 'See how we have delivered success for our clients.' },
                { label: 'Whitepapers', href: '/contact', description: 'Download in-depth reports and analysis from our experts.' },
            ]
        }
    ]
  },
  { label: 'Why Techwally?', href: '/why-techwally' },
];

export const INITIAL_THEME_SETTINGS: ThemeSettings = {
  colors: {
    primary: '#004849',
    secondary: '#111827',
    accent: '#007C7E',
  },
  logoUrl: '',
  buttons: {
    primary: {
      backgroundColor: '#004849',
      textColor: '#FFFFFF',
      hoverBackgroundColor: '#002d2d',
      borderRadius: '8px',
      paddingX: '20px',
      paddingY: '12px',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      textColor: '#FFFFFF',
      hoverBackgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      paddingX: '20px',
      paddingY: '12px',
    },
  },
  layout: {
    heroHeight: '100vh',
    heroTextContainerWidth: 6,
    heroImageContainerWidth: 6,
    contactEmail: 'support@techwally.com',
    logoHeight: 32,
  },
  cards: {
    services: {
      backgroundColor: '#FFFFFF',
      padding: '32px',
      borderRadius: '24px',
      hoverBackgroundColor: '#F0FDFA',
      iconContainerBackgroundColor: '#F0F7F7',
      iconColor: '#004849',
      titleColor: '#111827',
      descriptionColor: '#6B7280',
      buttonColor: '#004849',
    },
    industries: {
      backgroundColor: '#004849',
      padding: '32px',
      borderRadius: '24px',
      hoverBackgroundColor: '#003838',
      iconContainerBackgroundColor: '#FFFFFF',
      iconColor: '#004849',
      titleColor: '#FFFFFF',
      descriptionColor: '#E5E7EB',
      buttonColor: '#FFFFFF',
    },
    process: {
      backgroundColor: '#FFFFFF',
      padding: '40px',
      borderRadius: '24px',
      hoverBackgroundColor: '#F0FDF4',
      iconContainerBackgroundColor: '#F0F7F7',
      iconColor: '#004849',
      titleColor: '#111827',
      descriptionColor: '#6B7280',
      buttonColor: '#004849',
    },
    testimonials: {
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      padding: '40px',
      borderRadius: '40px',
      hoverBackgroundColor: 'rgba(31, 41, 55, 0.8)',
      iconContainerBackgroundColor: '#004849',
      iconColor: '#FFFFFF',
      titleColor: '#FFFFFF',
      descriptionColor: '#D1D5DB',
      buttonColor: '#FFFFFF',
    },
  },
  footer: {
      backgroundColor: '#111827',
      textColor: '#D1D5DB',
      headingColor: '#FFFFFF',
      linkColor: '#9CA3AF',
      bottomBorderColor: '#1F2937',
      socialLinks: [
          { id: '1', platform: 'linkedin', url: 'https://linkedin.com' },
          { id: '2', platform: 'twitter', url: 'https://twitter.com' },
          { id: '3', platform: 'facebook', url: 'https://facebook.com' },
          { id: '4', platform: 'instagram', url: 'https://instagram.com' }
      ],
      socialIconStyle: {
          size: 20,
          backgroundColor: '#1F2937',
          color: '#FFFFFF',
          hoverBackgroundColor: '#004849',
          hoverColor: '#FFFFFF',
          borderRadius: '50%'
      },
      columns: [
          {
              id: 'col1',
              title: 'What we Deliver',
              links: [
                  { label: 'Strategic Advisory', url: '/services/advisory' },
                  { label: 'Data Analytics', url: '/services/data-analytics' },
                  { label: 'Cloud Enablement', url: '/services/cloud' },
                  { label: 'DevOps Automation', url: '/services/devops' }
              ]
          },
          {
              id: 'col2',
              title: 'Industry Excellence',
              links: [
                  { label: 'FinTech', url: '/industries/fintech' },
                  { label: 'Healthcare', url: '/industries/healthcare' },
                  { label: 'eCommerce', url: '/industries/ecommerce' },
                  { label: 'Logistics', url: '/industries/logistics' }
              ]
          },
           {
              id: 'col3',
              title: 'Company',
              links: [
                  { label: 'About Us', url: '/company' },
                  { label: 'Careers', url: '/careers' },
                  { label: 'Blog', url: '/blog' },
                  { label: 'Case Studies', url: '/contact' }
              ]
          },
          {
              id: 'col4',
              title: 'Contact',
              links: [
                  { label: 'New York, NY 10012', url: '/contact' },
                  { label: 'support@techwally.com', url: 'mailto:support@techwally.com' },
                  { label: '+1 (555) 123-4567', url: 'tel:+15551234567' },
                  { label: 'Help Center', url: '/help-center' }
              ]
          }
      ]
  },
  ctaImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2070',
};

export const INITIAL_ADMIN_CONFIG: AdminConfig = {
  general: {
    siteName: 'Techwally',
    language: 'English',
    timezone: '(UTC+10:00) Australian Eastern Standard Time',
  },
  profile: {
    name: 'Admin User',
    email: 'admin@techwally.com',
    role: 'Super Admin',
  },
  notifications: {
    jobApplications: true,
    contactInquiries: true,
    marketingEmails: false,
    securityAlerts: true,
  },
  // Two-Factor Auth settings are now part of the User object, not AdminConfig
};

// Initial Users for the new User Management System
// Passwords are plaintext for demo purposes (should be hashed in a real app)
export const INITIAL_USERS: User[] = [
  {
    id: 'user1',
    name: 'Super Admin',
    email: 'admin@techwally.com',
    role: 'Super Admin',
    password: 'password123', 
    twoFactorEnabled: false,
    twoFactorSecret: 'JBSWY3DPEHPK3PXP' // A predefined, secure Base32 secret
  },
  {
    id: 'user2',
    name: 'HR Manager',
    email: 'hr@techwally.com',
    role: 'HR',
    password: 'password123',
    twoFactorEnabled: false,
    twoFactorSecret: undefined,
  },
  {
    id: 'user3',
    name: 'Employee One',
    email: 'employee@techwally.com',
    role: 'Employee',
    password: 'password123',
    twoFactorEnabled: false,
    twoFactorSecret: undefined,
  },
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide1',
    titleKey: 'hero-title-1',
    subtitleKey: 'hero-subtitle-1',
    badgeKey: 'hero-badge-1',
    ctaPrimaryKey: 'cta-primary-1',
    ctaSecondaryKey: 'cta-secondary-1',
    ctaPrimaryLink: '/contact',
    ctaSecondaryLink: '/services',
    backgroundType: 'image',
    backgroundColor: '#F0F7F7',
    backgroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070',
    backgroundVideo: '',
    overlayColor: '#004849',
    overlayOpacity: 0.2,
    overlayGradient: 'left',
    textAlignment: 'left',
    textColor: '#FFFFFF',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1332'
  },
  {
    id: 'slide2',
    titleKey: 'hero-title-2',
    subtitleKey: 'hero-subtitle-2',
    badgeKey: 'hero-badge-2',
    ctaPrimaryKey: 'cta-primary-2',
    ctaSecondaryKey: 'cta-secondary-2',
    ctaPrimaryLink: '/services/ai',
    ctaSecondaryLink: '/services/cloud',
    backgroundType: 'image',
    backgroundColor: '#000000',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072',
    backgroundVideo: '',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    overlayGradient: 'left',
    textAlignment: 'left',
    textColor: '#FFFFFF',
    heroImage: ''
  },
];

export const INITIAL_CONTENT: ContentMap = {
  // Slide 1 Content
  'hero-title-1': 'Building the Future of Enterprise Software',
  'hero-subtitle-1': 'Techwally delivers premium, scalable, and secure digital solutions. We transform complex challenges into elegant software.',
  'hero-badge-1': 'Leading Enterprise Tech Partner',
  'cta-primary-1': 'Start a Project',
  'cta-secondary-1': 'View Case Studies',

  // Slide 2 Content
  'hero-title-2': 'Innovate with AI & Cloud Solutions',
  'hero-subtitle-2': 'Harness the power of Artificial Intelligence and scalable Cloud Infrastructure to gain a competitive edge in your industry.',
  'hero-badge-2': 'Future-Ready Technology',
  'cta-primary-2': 'Explore AI Services',
  'cta-secondary-2': 'Our Cloud Expertise',

  // General Content
  'section-services-title': 'Our Expertise',
  'section-services-desc': 'End-to-end capabilities from design to deployment.',
  'section-why-title': 'Why Techwally?',
  'section-why-desc': 'We are more than just a dev shop. We are your strategic technology partner.',

  // Service Cards
  'service-card-1-title': 'App Development',
  'service-card-1-desc': 'Native iOS & Android mobile applications engineered for peak performance, offline capabilities, and a seamless, intuitive user experience across all devices.',
  'service-card-1-button': 'View More',
  'service-card-2-title': 'AI & Machine Learning',
  'service-card-2-desc': 'Leverage the power of predictive analytics, custom NLP models, and intelligent process automation to unlock hidden value in your enterprise data.',
  'service-card-2-button': 'View More',
  'service-card-3-title': 'Cloud Infrastructure',
  'service-card-3-desc': 'Resilient, scalable AWS, Azure, and Google Cloud architectures designed for high availability, zero downtime, and banking-grade security compliance.',
  'service-card-3-button': 'View More',
  'service-card-4-title': 'Cybersecurity',
  'service-card-4-desc': 'Comprehensive enterprise-grade security audits, real-time threat monitoring, penetration testing, and ISO/GDPR compliance readiness frameworks.',
  'service-card-4-button': 'View More',
  'service-card-5-title': 'Custom Software',
  'service-card-5-desc': 'Tailor-made software solutions architected from the ground up to address your specific operational bottlenecks and unique business challenges.',
  'service-card-5-button': 'View More',
  'service-card-6-title': 'IT Staffing',
  'service-card-6-desc': 'Scale your delivery capacity instantly with pre-vetted senior engineers, available for staff augmentation or dedicated teams.',
  'service-card-6-button': 'View More',
  'service-card-7-title': 'Digital Strategy',
  'service-card-7-desc': 'Holistic digital transformation roadmaps that modernize legacy systems, optimize workflows, and position your technology stack for future growth.',
  'service-card-7-button': 'View More',
  'service-card-8-title': 'Data Engineering & ETL',
  'service-card-8-desc': 'Building robust, scalable data pipelines and warehousing solutions to transform raw data into a reliable source of truth for your analytics.',
  'service-card-8-button': 'View More',
  
  // Industry Cards
  'industry-card-1-title': 'Healthcare',
  'industry-card-1-desc': 'HIPAA-compliant telemedicine platforms, EHR integration, and AI-driven diagnostic tools that improve patient outcomes and streamline hospital operations.',
  'industry-card-1-button': 'View More',
  'industry-card-2-title': 'FinTech',
  'industry-card-2-desc': 'Secure high-frequency trading platforms, blockchain-based payment gateways, and fraud detection systems for next-generation financial services.',
  'industry-card-2-button': 'View More',
  'industry-card-3-title': 'eCommerce',
  'industry-card-3-desc': 'Scalable headless commerce architectures, personalized recommendation engines, and omnichannel retail solutions that drive higher conversion rates.',
  'industry-card-3-button': 'View More',
  'industry-card-4-desc': 'Real-time fleet tracking, predictive supply chain analytics, and automated warehouse management systems to optimize global distribution networks.',
  'industry-card-4-button': 'View More',
  'industry-card-5-title': 'Education',
  'industry-card-5-desc': 'Interactive LMS platforms, virtual classrooms, and student analytics dashboards that enable personalized learning experiences at scale.',
  'industry-card-5-button': 'View More',
  'industry-card-6-title': 'Real Estate',
  'industry-card-6-desc': 'Property management SaaS, virtual tour applications, and smart building IoT integrations for the modern real estate market.',
  'industry-card-6-button': 'View More',
  'industry-card-7-title': 'Automotive',
  'industry-card-7-desc': 'Connected car platforms, autonomous driving data infrastructure, and digital retail solutions for the next generation of mobility.',
  'industry-card-7-button': 'View More',
  'industry-card-8-title': 'Energy & Utilities',
  'industry-card-8-desc': 'Smart grid management systems, predictive maintenance for infrastructure, and renewable energy analytics platforms.',
  'industry-card-8-button': 'View More',
  
  // Process Cards
  'process-card-1-title': 'Discovery',
  'process-card-1-desc': "We conduct deep-dive workshops to understand your specific requirements, business goals, and user needs before writing a single line of code.",
  'process-card-1-button': 'View More',
  'process-card-2-title': 'Design',
  'process-card-2-desc': "Our UX/UI experts craft intuitive wireframes and high-fidelity prototypes while our architects design scalable, secure system blueprints.",
  'process-card-2-button': 'View More',
  'process-card-3-title': 'Development',
  'process-card-3-desc': "We execute in agile sprints with bi-weekly deliverables, ensuring complete transparency and allowing for rapid feedback and iteration.",
  'process-card-3-button': 'View More',
  'process-card-4-title': 'Launch',
  'process-card-4-desc': "Seamless deployment to production environments with comprehensive monitoring, user training, and dedicated post-launch maintenance support.",
  'process-card-4-button': 'View More',

  // Testimonials
  'testimonial-1-quote': "Techwally transformed our legacy systems into a modern cloud infrastructure. The team is incredibly skilled and proactive.",
  'testimonial-1-name': "Alex Johnson",
  'testimonial-1-role': "CTO, FinEdge Global",
  'testimonial-1-avatar': "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
  'testimonial-2-quote': "The UX/UI design they delivered for our patient portal increased engagement by 200%. Simply outstanding work.",
  'testimonial-2-name': "Sarah Williams",
  'testimonial-2-role': "VP Product, HealthPlus",
  'testimonial-2-avatar': "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
  'testimonial-3-quote': "Their expertise in Generative AI helped us launch our core product months ahead of schedule. A true strategic partner.",
  'testimonial-3-name': "Michael Chen",
  'testimonial-3-role': "Founder, NexusAI",
  'testimonial-3-avatar': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",

  // CTA Section
  'cta-section-title': 'Ready To Transform Your Business? Book a Free Consultation',
  'cta-section-desc': 'Leave your email below to start a new project journey with us. Let\'s shape the future of your business together.',
  'cta-section-button': 'Stay in the Loop',

  // Strategic Advisory Page Content
  'advisory-hero-title': 'Navigate Complexity with Strategic Vision.',
  'advisory-hero-desc': 'Unlock your organization\'s full potential. Our strategic advisory services provide the clarity, direction, and expert guidance needed to thrive in a dynamic global landscape.',
  'advisory-hero-cta1': 'Book a Consultation',
  'advisory-hero-cta2': 'Why Techwally?',

  'advisory-challenge-title': 'The Complexities You Face',
  'advisory-challenge-p1': 'In today\'s fast-paced business environment, leaders grapple with relentless digital transformation, evolving customer expectations, and competitive pressures. Without a clear, data-driven strategy, even the most innovative ideas can falter.',
  'advisory-challenge-p2': 'Techwally\'s Strategic Advisory services are designed to cut through this complexity. We partner with you to identify core challenges, uncover hidden opportunities, and craft bespoke strategies that align technology with your overarching business objectives.',

  'advisory-approach-title': 'Our Data-Driven Advisory Approach',
  'advisory-approach-desc': 'A systematic methodology for delivering clear, actionable, and sustainable strategic recommendations.',
  'advisory-pillar-1-title': 'Insight & Discovery',
  'advisory-pillar-1-desc': 'Deep-dive analysis into market trends, competitive landscapes, and internal capabilities to uncover critical insights.',
  'advisory-pillar-2-title': 'Strategy Formulation',
  'advisory-pillar-2-desc': 'Collaborative development of tailored strategies and roadmaps, aligning technological initiatives with business goals.',
  'advisory-pillar-3-title': 'Implementation Roadmap',
  'advisory-pillar-3-desc': 'Detailed plans for execution, including resource allocation, technology adoption, and performance metrics.',
  'advisory-pillar-4-title': 'Continuous Optimization',
  'advisory-pillar-4-desc': 'Ongoing monitoring, evaluation, and adjustment of strategies to ensure sustained growth and adaptability.',

  'advisory-areas-title': 'Key Advisory Areas',
  'advisory-areas-desc': 'Expert guidance across critical domains to steer your business towards innovation and efficiency.',
  'advisory-area-1-title': 'Digital Transformation',
  'advisory-area-1-desc': 'Guiding your journey from legacy systems to a future-ready, digitally integrated enterprise.',
  'advisory-area-2-title': 'Innovation Strategy',
  'advisory-area-2-desc': 'Fostering a culture of innovation and identifying new technological opportunities for market leadership.',
  'advisory-area-3-title': 'M&A Tech Due Diligence',
  'advisory-area-3-desc': 'Assessing technological assets and risks in mergers & acquisitions for informed decision-making.',
  'advisory-area-4-title': 'Operational Agility',
  'advisory-area-4-desc': 'Enhancing business processes and workflows to improve efficiency and responsiveness.',
  'advisory-area-5-title': 'Cost Optimization', // Added this new content key
  'advisory-area-5-desc': 'Identifying opportunities to reduce operational expenditures without compromising quality or performance.',
  'advisory-area-6-title': 'Market Entry & Expansion',
  'advisory-area-6-desc': 'Developing strategies for successful entry into new markets or expansion of existing footprints, leveraging technology.',

  'advisory-why-us-title': 'Why Partner with Techwally for Strategic Advisory?',
  'advisory-why-us-desc': 'Our commitment to delivering unparalleled value and truly transformative outcomes sets us apart.',

  'advisory-impact-title': 'Driving Tangible Business Outcomes.',
  'advisory-impact-desc': 'Our advisory engagements consistently lead to significant improvements in efficiency, innovation, and market positioning. We measure our success by your success.',
  'advisory-impact-metric-1': '25% Average Increase in Operational Efficiency',
  'advisory-impact-metric-2': '30% Reduction in Time-to-Market for New Products',
  'advisory-impact-metric-3': 'Increased Market Share Through Strategic Innovation',

  'advisory-final-cta-title': 'Ready to Define Your Future?',
  'advisory-final-cta-desc': 'Let\'s craft a robust strategy that transforms your vision into reality. Schedule a call with our experts.',
  'advisory-final-cta-button': 'Schedule Strategy Session',
};

const commonHighlights = [
    "Be a leader of industrial decarbonisation, backed by a Global FTSE100 company",
    "Join a trusted Australian manufacturer with over 50 years of heritage",
    "Become part of a Global FTSE100 company that is enabling the push to net zero"
];

const loremDescription = "We are seeking a highly motivated and skilled individual to join our team. In this role, you will be responsible for designing and implementing scalable software solutions that meet the needs of our enterprise clients. You will work closely with cross-functional teams including product managers, designers, and other engineers to deliver high-quality code. The ideal candidate has a strong background in modern web technologies, a passion for problem-solving, and a commitment to engineering excellence. You will have the opportunity to work on challenging projects, learn new technologies, and contribute to the growth of our company. If you are looking for a dynamic and collaborative work environment, we would love to hear from you.";

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Engineer',
    company: 'Techwally',
    logoUrl: 'https://cdn.dribbble.com/users/10882/screenshots/15172621/media/f50b34382c76c76ac573356e52003c20.png?compress=1&resize=400x300',
    category: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    salaryMin: 120000,
    salaryMax: 160000,
    postedDate: '2 days ago',
    description: `We are seeking a Senior React Engineer to lead our frontend initiatives. You will be responsible for architecting and building high-performance web applications using the latest React ecosystem technologies. You will work closely with UX/UI designers to implement pixel-perfect interfaces and ensure a seamless user experience. 

Key responsibilities include code reviews, mentoring junior developers, and making architectural decisions that impact the long-term scalability of our products. You should have deep expertise in React, TypeScript, and state management libraries. Experience with server-side rendering (Next.js) and performance optimization is highly desirable.`,
    highlights: [
        "Lead frontend development initiatives for enterprise clients",
        "Architect scalable, high-performance web applications",
        "Work with cutting-edge React ecosystem technologies"
    ],
    isFeatured: true,
    archiveStatus: 'active',
    isRemote: true,
    headerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    title: 'AI Solutions Architect',
    company: 'Techwally',
    logoUrl: 'https://cdn.dribbble.com/users/10882/screenshots/15172621/media/f50b34382c76c76ac573356e52003c20.png?compress=1&resize=400x300',
    category: 'AI & Data',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$180k - $220k',
    salaryMin: 180000,
    salaryMax: 220000,
    postedDate: '1 week ago',
    description: `Join our cutting-edge AI division as a Solutions Architect. You will design and deploy scalable machine learning models for Fortune 500 clients. Your role involves understanding client business requirements and translating them into technical AI/ML specifications.

You will oversee the entire lifecycle of AI projects, from data collection and preprocessing to model training and deployment. Strong proficiency in Python, TensorFlow/PyTorch, and cloud platforms (AWS/GCP) is required. You will also be responsible for optimizing inference costs and ensuring data privacy and compliance.`,
    highlights: [
        "Design and deploy scalable machine learning models",
        "Work with Fortune 500 clients on strategic AI initiatives",
        "Optimize inference costs and ensure data privacy"
    ],
    isFeatured: true,
    archiveStatus: 'active',
    isRemote: false,
    headerImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    title: 'Product Designer (UI/UX)',
    company: 'Techwally',
    logoUrl: 'https://cdn.dribbble.com/users/10882/screenshots/15172621/media/f50b34382c76c76ac573356e52003c20.png?compress=1&resize=400x300',
    category: 'Design',
    location: 'Remote',
    type: 'Contract',
    salary: '$80/hr',
    salaryMin: 160000, // annualized approx
    salaryMax: 170000,
    postedDate: '3 days ago',
    description: `We are looking for a creative Product Designer to craft intuitive user experiences for complex SaaS platforms. You will lead the design process from concept to high-fidelity prototype, collaborating closely with product managers and engineers.

Your portfolio should demonstrate a strong understanding of design systems, user research, and interaction design. You will conduct usability testing and iterate on designs based on user feedback. Proficiency in Figma and prototyping tools is essential.`,
    highlights: [
        "Craft intuitive user experiences for complex SaaS platforms",
        "Lead design process from concept to high-fidelity prototype",
        "Collaborate closely with product managers and engineers"
    ],
    isFeatured: false,
    archiveStatus: 'active',
    isRemote: true,
    headerImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
  },
   {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Techwally',
    logoUrl: 'https://cdn.dribbble.com/users/10882/screenshots/15172621/media/f50b34382c76c76ac573356e52003c20.png?compress=1&resize=400x300',
    category: 'Engineering',
    location: 'New York, NY',
    type: 'Part-time',
    salary: '$90k - $110k',
    salaryMin: 90000,
    salaryMax: 110000,
    postedDate: '5 days ago',
    description: `We are seeking a DevOps Engineer to automate infrastructure and deployment pipelines. You will maintain CI/CD systems, monitor performance, and ensure the reliability of our services using Docker and Kubernetes.

Responsibilities include managing cloud infrastructure as code (Terraform), implementing security best practices, and troubleshooting production issues. You should be comfortable working in a fast-paced environment and have experience with scripting languages like Bash or Python.`,
    highlights: [
        "Automate infrastructure and deployment pipelines",
        "Maintain CI/CD systems and monitor performance",
        "Ensure reliability of services with Docker and Kubernetes"
    ],
    isFeatured: false,
    archiveStatus: 'pending',
    isRemote: false,
    headerImage: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0563?auto=format&fit=crop&q=80&w=1000',
  },
  // Adding more dummy jobs to demonstrate pagination (total 12 jobs)
  {
      id: '5',
      title: 'Full Stack Developer',
      company: 'InnovateCorp',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $150k',
      salaryMin: 130000,
      salaryMax: 150000,
      postedDate: '1 day ago',
      description: `Join a fast-paced team building next-gen web apps. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'active',
      isRemote: false
  },
  {
      id: '6',
      title: 'Data Scientist',
      company: 'DataFlow Systems',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'AI & Data',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      salaryMin: 140000,
      salaryMax: 180000,
      postedDate: '4 days ago',
      description: `Analyze large datasets to derive actionable insights. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: true,
      archiveStatus: 'active',
      isRemote: true
  },
  {
      id: '7',
      title: 'Cloud Security Specialist',
      company: 'SecureNet',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Engineering',
      location: 'London, UK',
      type: 'Contract',
      salary: '£500/day',
      salaryMin: 150000,
      salaryMax: 180000,
      postedDate: '1 week ago',
      description: `Ensure cloud infrastructure security and compliance. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'archived',
      isRemote: false
  },
  {
      id: '8',
      title: 'Marketing Manager',
      company: 'GrowthHackers',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Marketing',
      location: 'Sydney, AU',
      type: 'Full-time',
      salary: '$100k - $120k',
      salaryMin: 100000,
      salaryMax: 120000,
      postedDate: '2 weeks ago',
      description: `Lead marketing campaigns and brand strategy. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'active',
      isRemote: false
  },
  {
      id: '9',
      title: 'QA Automation Engineer',
      company: 'TestPro',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $110k',
      salaryMin: 90000,
      salaryMax: 110000,
      postedDate: '3 days ago',
      description: `Build automated test suites for web applications. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'active',
      isRemote: true
  },
  {
      id: '10',
      title: 'UX Researcher',
      company: 'UserFirst',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Design',
      location: 'Toronto, CA',
      type: 'Part-time',
      salary: '$60k - $80k',
      salaryMin: 60000,
      salaryMax: 80000,
      postedDate: '5 days ago',
      description: `Conduct user research and usability testing. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'active',
      isRemote: false
  },
  {
      id: '11',
      title: 'Backend Developer (Go)',
      company: 'ScalableOps',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $160k',
      salaryMin: 130000,
      salaryMax: 160000,
      postedDate: '6 days ago',
      description: `Build high-performance microservices in Go. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: true,
      archiveStatus: 'active',
      isRemote: true
  },
  {
      id: '12',
      title: 'Technical Writer',
      company: 'DocuTech',
      logoUrl: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30160348/1528.png',
      category: 'Product',
      location: 'Remote',
      type: 'Contract',
      salary: '$50/hr',
      salaryMin: 100000,
      salaryMax: 120000,
      postedDate: '1 week ago',
      description: `Create clear and concise technical documentation. ${loremDescription}`,
      highlights: commonHighlights,
      isFeatured: false,
      archiveStatus: 'active',
      isRemote: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Generative AI in Enterprise',
    excerpt: 'How large language models are reshaping internal workflows and customer support.',
    category: 'Artificial Intelligence',
    author: 'Sarah Chen',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    content: 'Full article content here...',
    status: 'published',
  },
  {
    id: '2',
    title: 'Migrating Legacy Monoliths to Microservices',
    excerpt: 'A strategic guide to breaking down complex systems without downtime.',
    category: 'Cloud Architecture',
    author: 'David Ross',
    date: 'Sep 28, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    content: 'Full article content here...',
    status: 'published',
  },
  {
    id: '3',
    title: 'React Server Components: A Deep Dive',
    excerpt: 'Understanding the performance benefits of RSC in modern web development.',
    category: 'Engineering',
    author: 'Mike Johnson',
    date: 'Sep 15, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    content: 'Full article content here...',
    status: 'published',
  },
];