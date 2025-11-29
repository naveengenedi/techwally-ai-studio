
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { AppState, ContentMap, Job, BlogPost, Application, HeroSlide, ThemeSettings, NavItem, AdminConfig, IssueReport, User, UserRole } from './types';
import { INITIAL_CONTENT, INITIAL_JOBS, INITIAL_BLOGS, INITIAL_HERO_SLIDES, INITIAL_THEME_SETTINGS, INITIAL_NAVIGATION_STRUCTURE, INITIAL_ADMIN_CONFIG, INITIAL_USERS } from './constants';

const AppContext = createContext<AppState | undefined>(undefined);

// A more standard Base32 encoding for a Uint8Array (RFC 4648)
export const base32Encode = (bytes: Uint8Array): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  // Pad with '='
  while (output.length % 8 !== 0) {
    output += '=';
  }
  return output;
};

// Utility function to generate OTPAuth URL
export const getOtpAuthUrl = (secret: string, issuer: string, accountName: string) => {
  const encodedSecret = secret; // This secret should already be Base32 encoded
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccountName = encodeURIComponent(accountName);
  return `otpauth://totp/${encodedIssuer}:${encodedAccountName}?secret=${encodedSecret}&issuer=${encodedIssuer}&digits=6&period=30`;
};

// Simple TOTP generator mock
const generateTOTP = (secret: string) => {
  // In a real app, you'd use a library like speakeasy or otpauth
  // This is a simple mock for UI demonstration, NOT cryptographically secure
  const timeFactor = Math.floor(Date.now() / 30000); // 30-second interval
  // A simplified hash, NOT cryptographically secure, just for consistent mock generation
  const secretHash = Array.from(secret).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const code = Math.floor((timeFactor + secretHash) * 123457 % 1000000)
    .toString()
    .padStart(6, '0');
  return code;
};


export const AppProvider = ({ children }: { children?: ReactNode }) => {
  // @google/genai Coding Guidelines: DO add comment above each fix.
  // Implemented stricter validation for `currentUser` loaded from `localStorage`
  // to ensure it's a fully formed `User` object, preventing `TypeError`s.
  // If `localStorage` data is invalid, it defaults to a 'Super Admin'.
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('techwally_currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Stricter validation: check for all essential properties of User
        const validRoles: UserRole[] = ['Super Admin', 'HR', 'Employee'];
        if (
          parsedUser && 
          typeof parsedUser === 'object' && 
          typeof parsedUser.id === 'string' &&
          typeof parsedUser.name === 'string' &&
          typeof parsedUser.email === 'string' &&
          typeof parsedUser.role === 'string' && 
          validRoles.includes(parsedUser.role) && 
          typeof parsedUser.twoFactorEnabled === 'boolean' &&
          // if 2FA is enabled, secret must be string, otherwise can be undefined
          (!parsedUser.twoFactorEnabled || typeof parsedUser.twoFactorSecret === 'string') 
        ) {
          console.log("AppProvider: Loaded valid currentUser from localStorage:", parsedUser);
          return parsedUser as User; 
        }
        console.warn("AppProvider: Malformed or invalid currentUser in localStorage, reverting to default Super Admin.", parsedUser);
        localStorage.removeItem('techwally_currentUser'); 
      } catch (error) {
        console.error("AppProvider: Failed to parse currentUser from localStorage, reverting to default Super Admin.", error);
        localStorage.removeItem('techwally_currentUser'); 
      }
    }
    // Always return a Super Admin if no valid user is found or parsed.
    // This ensures currentUser is never null during initial rendering for bypassed auth.
    const superAdmin = INITIAL_USERS.find(u => u.role === 'Super Admin');
    if (!superAdmin) {
      console.error("AppProvider: CRITICAL: No 'Super Admin' found in INITIAL_USERS constant. Admin dashboard might be inaccessible.");
      // Fallback: provide a minimal admin to prevent crash if constants are misconfigured
      return { id: 'dev-admin', name: 'Dev Admin', email: 'dev@techwally.com', role: 'Super Admin', twoFactorEnabled: false };
    }
    console.log("AppProvider: Initializing with default Super Admin:", superAdmin);
    return superAdmin;
  });
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [content, setContent] = useState<ContentMap>(() => {
    const saved = localStorage.getItem('techwally_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });
  
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [issueReports, setIssueReports] = useState<IssueReport[]>(() => {
    const saved = localStorage.getItem('techwally_issueReports');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('techwally_heroSlides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('techwally_themeSettings');
    return saved ? JSON.parse(saved) : INITIAL_THEME_SETTINGS;
  });

  const [navigationStructure, setNavigationStructure] = useState<NavItem[]>(() => {
    const saved = localStorage.getItem('techwally_navigation');
    return saved ? JSON.parse(saved) : INITIAL_NAVIGATION_STRUCTURE;
  });

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('techwally_adminConfig');
    // AdminConfig no longer holds 2FA secret, only site-wide settings
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_CONFIG;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('techwally_users');
    let usersData = savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;

    // Ensure all users have a 2FA secret if it's undefined
    usersData = usersData.map((user: User) => {
      // Ensure user has a role and twoFactorEnabled before generating secret
      if (user.twoFactorEnabled && !user.twoFactorSecret) {
        const newSecretBytes = crypto.getRandomValues(new Uint8Array(20));
        return { ...user, twoFactorSecret: base32Encode(newSecretBytes) };
      }
      return user;
    });
    return usersData;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'forgotPassword' | 'setup2fa' | 'verify2fa'>('login');
  const [authModalUserId, setAuthModalUserId] = useState<string | undefined>(undefined); // User ID for 2FA setup

  // Persistence Effects
  useEffect(() => { localStorage.setItem('techwally_content', JSON.stringify(content)); }, [content]);
  useEffect(() => { localStorage.setItem('techwally_heroSlides', JSON.stringify(heroSlides)); }, [heroSlides]);
  useEffect(() => { localStorage.setItem('techwally_themeSettings', JSON.stringify(themeSettings)); }, [themeSettings]);
  useEffect(() => { localStorage.setItem('techwally_navigation', JSON.stringify(navigationStructure)); }, [navigationStructure]);
  useEffect(() => { localStorage.setItem('techwally_adminConfig', JSON.stringify(adminConfig)); }, [adminConfig]);
  useEffect(() => { localStorage.setItem('techwally_issueReports', JSON.stringify(issueReports)); }, [issueReports]);
  useEffect(() => { localStorage.setItem('techwally_users', JSON.stringify(users)); }, [users]);
  // @google/genai Coding Guidelines: DO add comment above each fix.
  // Ensure currentUser is stringified safely, and removed redundant check as validation is now in useState initializer.
  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem('techwally_currentUser', JSON.stringify(currentUser)); 
    } else {
      localStorage.removeItem('techwally_currentUser');
    }
  }, [currentUser]);


  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openAuthModal = (view: 'login' | 'forgotPassword' | 'setup2fa' | 'verify2fa' = 'login', userId?: string) => {
    setInitialAuthView(view);
    setAuthModalUserId(userId);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalUserId(undefined);
  }

  const loginUser = async (email: string, password: string, twoFactorCode?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const user = users.find(u => u.email === email && u.password === password); // For demo, plaintext password check

    if (!user) {
      return { success: false, message: 'Invalid credentials.' };
    }

    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        return { success: false, requires2fa: true, message: '2FA required.', user };
      }
      // Simulate 2FA verification
      const expectedTotp = generateTOTP(user.twoFactorSecret || ''); // In real app, this would be on server
      if (twoFactorCode !== expectedTotp) {
        return { success: false, message: 'Invalid 2FA code.' };
      }
    }
    
    setCurrentUser(user);
    closeAuthModal();
    return { success: true, user };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsEditMode(false);
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const updateContent = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const addJob = (job: Job) => setJobs((prev) => [job, ...prev]);
  const updateJob = (id: string, updatedJob: Job) => {
    setJobs(prev => prev.map(job => (job.id === id ? updatedJob : job)));
  };
  const deleteJob = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id));
  const updateJobStatus = (id: string, status: Job['archiveStatus']) => {
    setJobs((prev) => prev.map(j => j.id === id ? { ...j, archiveStatus: status } : j));
  };

  const addBlog = (blog: BlogPost) => setBlogs((prev) => [blog, ...prev]);
  const updateBlog = (id: string, updatedBlog: BlogPost) => {
    setBlogs(prev => prev.map(blog => (blog.id === id ? updatedBlog : blog)));
  };
  const deleteBlog = (id: string) => setBlogs((prev) => prev.filter((b) => b.id !== id));

  const submitApplication = (app: Application) => {
    setApplications(prev => [app, ...prev]);
  };

  const submitIssueReport = (report: Omit<IssueReport, 'id' | 'date' | 'status'>) => {
    const newReport: IssueReport = {
      ...report,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New',
    };
    setIssueReports(prev => [newReport, ...prev]);
  };

  const updateIssueStatus = (id: string, status: IssueReport['status']) => {
    setIssueReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addHeroSlide = () => {
    const newId = `slide${Date.now()}`;
    const newSlide: HeroSlide = {
      id: newId,
      titleKey: `hero-title-${newId}`,
      subtitleKey: `hero-subtitle-${newId}`,
      badgeKey: `hero-badge-${newId}`,
      ctaPrimaryKey: `cta-primary-${newId}`,
      ctaSecondaryKey: `cta-secondary-${newId}`,
      ctaPrimaryLink: '/',
      ctaSecondaryLink: '/',
      backgroundType: 'color',
      backgroundColor: '#F0F7F7',
      backgroundImage: '',
      backgroundVideo: '',
      overlayColor: '#000000',
      overlayOpacity: 0.1,
      overlayGradient: 'left',
      textAlignment: 'left',
      textColor: '#FFFFFF',
      heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1332'
    };
    setHeroSlides(prev => [...prev, newSlide]);
    setContent(prev => ({
      ...prev,
      [newSlide.titleKey]: 'New Slide Title',
      [newSlide.subtitleKey]: 'This is the subtitle for the new slide.',
      [newSlide.badgeKey]: 'New Badge',
      [newSlide.ctaPrimaryKey]: 'Primary Button',
      [newSlide.ctaSecondaryKey]: 'Secondary Button'
    }));
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(slide => slide.id !== id));
  };

  const updateHeroSlide = (id: string, data: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(slide => slide.id === id ? { ...slide, ...data } : slide));
  };
  
  const reorderHeroSlides = (id: string, direction: 'up' | 'down') => {
    setHeroSlides(prev => {
        const index = prev.findIndex(slide => slide.id === id);
        if (index === -1) return prev;
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= prev.length) return prev;
        
        const newSlides = [...prev];
        const [movedSlide] = newSlides.splice(index, 1);
        newSlides.splice(newIndex, 0, movedSlide);
        
        return newSlides;
    });
  };

  const updateThemeSetting = (path: string, value: any) => {
    setThemeSettings(prev => {
      const newSettings = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let currentLevel: any = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        currentLevel = currentLevel[keys[i]];
      }
      currentLevel[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const updateAdminConfig = (path: string, value: any) => {
    setAdminConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let currentLevel: any = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        currentLevel = currentLevel[keys[i]];
      }
      currentLevel[keys[keys.length - 1]] = value;
      
      return newConfig;
    });
  };

  const updateNavigationStructure = (newStructure: NavItem[]) => {
    setNavigationStructure(newStructure);
  };

  // User Management Functions
  const addUser = (newUser: Omit<User, 'id'>) => {
    setUsers(prev => {
      const id = `user${Date.now()}`;
      let userWithSecret = { ...newUser, id };
      // If 2FA is enabled for a new user but no secret, generate one
      if (userWithSecret.twoFactorEnabled && !userWithSecret.twoFactorSecret) {
        const newSecretBytes = crypto.getRandomValues(new Uint8Array(20));
        userWithSecret.twoFactorSecret = base32Encode(newSecretBytes);
      }
      return [...prev, userWithSecret];
    });
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const updated = { ...user, ...updatedUser };
        // If 2FA enabled, but secret is missing, generate one
        if (updated.twoFactorEnabled && !updated.twoFactorSecret) {
          const newSecretBytes = crypto.getRandomValues(new Uint8Array(20));
          updated.twoFactorSecret = base32Encode(newSecretBytes);
        }
        // If 2FA disabled, clear secret
        if (!updated.twoFactorEnabled) {
          updated.twoFactorSecret = undefined;
        }
        return updated;
      }
      return user;
    }));
    // Also update currentUser if it's the logged-in user
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedUser } : null);
    }
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    // If the deleted user is the current user, log them out
    if (currentUser && currentUser.id === id) {
      logoutUser();
    }
  };


  const contextValue = useMemo(() => ({
    currentUser,
    users,
    isEditMode,
    content,
    jobs,
    blogs,
    applications,
    heroSlides,
    themeSettings,
    navigationStructure,
    adminConfig,
    issueReports,
    isSearchOpen,
    openSearch,
    closeSearch,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    loginUser,
    logoutUser,
    toggleEditMode,
    updateContent,
    addJob,
    updateJob,
    deleteJob,
    updateJobStatus,
    addBlog,
    updateBlog,
    deleteBlog,
    submitApplication,
    submitIssueReport,
    updateIssueStatus,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    reorderHeroSlides,
    updateThemeSetting,
    updateNavigationStructure,
    updateAdminConfig,
    getOtpAuthUrl,
    addUser, 
    updateUser,
    deleteUser,
  }), [
    currentUser, users, isEditMode, content, jobs, blogs, applications, heroSlides,
    themeSettings, navigationStructure, adminConfig, issueReports, isSearchOpen,
    isAuthModalOpen, openAuthModal, closeAuthModal,
    loginUser, logoutUser, toggleEditMode, updateContent, addJob, updateJob,
    deleteJob, updateJobStatus, addBlog, updateBlog, deleteBlog, submitApplication,
    submitIssueReport, updateIssueStatus, updateHeroSlide, addHeroSlide,
    deleteHeroSlide, reorderHeroSlides, updateThemeSetting, updateNavigationStructure,
    updateAdminConfig, addUser, updateUser, deleteUser
  ]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};