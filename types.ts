
import React from 'react';
import { LayoutDashboard } from "lucide-react"; // Import necessary icon type if not already there


export interface IssueReport {
  id: string;
  name: string;
  email: string;
  phone?: string;
  page: string;
  description: string;
  status: 'New' | 'In Progress' | 'Resolved';
  date: string;
}

export interface HeroSlide {
  id: string;
  // Text content keys
  titleKey: string;
  subtitleKey: string;
  badgeKey: string;
  ctaPrimaryKey: string;
  ctaSecondaryKey: string;
  // Links
  ctaPrimaryLink?: string;
  ctaSecondaryLink?: string;
  // Style properties
  backgroundType: 'color' | 'image' | 'video';
  backgroundColor: string;
  backgroundImage: string; // URL or base64
  backgroundVideo: string; // URL or base64
  overlayColor: string;
  overlayOpacity: number;
  overlayGradient?: 'none' | 'left' | 'right' | 'bottom' | 'radial';
  textAlignment: 'left' | 'center' | 'right';
  textColor: string;
  heroImage: string; // URL or base64 for the image on the right (foreground)
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavCategory[];
  featured?: {
    title: string;
    description: string;
    image: string;
    href: string;
  };
}

export interface NavCategory {
  title: string;
  items: { label: string; href: string; description: string; }[];
}

// New interface for Admin Dashboard navigation items, extending NavItem
export interface AdminNavItem {
  id: string;
  name: string;
  icon: React.ElementType; // Icon component from lucide-react
  roles: UserRole[]; // Array of roles that can access this item
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  category: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string; // Display string e.g. "$120k - $150k"
  salaryMin?: number; // Numeric for filtering
  salaryMax?: number; // Numeric for filtering
  postedDate: string; // e.g., '2 days ago'
  description: string;
  highlights?: string[]; // Array of key selling points
  isFeatured: boolean;
  archiveStatus: 'active' | 'archived' | 'pending' | 'reposted';
  workType?: string; 
  isRemote?: boolean;
  headerImage?: string;
  customLinks?: { label: string; url: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  status: 'published' | 'draft';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  resume?: string; // name of the file
  appliedDate: string;
}

export interface ContentMap {
  [key: string]: string;
}

export interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
  borderRadius: string;
  paddingX: string;
  paddingY: string;
}

export interface CardStyle {
  backgroundColor: string;
  padding: string;
  borderRadius: string;
  hoverBackgroundColor: string;
  iconContainerBackgroundColor: string;
  iconColor: string;
  titleColor: string;
  descriptionColor: string;
  buttonColor?: string;
}

export interface SocialIconStyle {
  size: number;
  backgroundColor: string;
  color: string;
  hoverBackgroundColor: string;
  hoverColor: string;
  borderRadius: string; // 'rounded-full', 'rounded-lg', etc.
}

export interface FooterColumn {
  id: string;
  title: string;
  links: { label: string; url: string; }[];
}

export interface FooterConfig {
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  linkColor: string;
  bottomBorderColor: string;
  socialLinks: {
      id: string;
      platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'github';
      url: string;
  }[];
  socialIconStyle: SocialIconStyle;
  columns: FooterColumn[];
}

export interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  buttons: {
    primary: ButtonStyle;
    secondary: ButtonStyle;
  };
  layout: {
    heroHeight: string; // e.g., '700px', 'h-screen'
    heroTextContainerWidth: number; // grid col span
    heroImageContainerWidth: number; // grid col span
    contactEmail: string;
    logoHeight?: number;
  };
  cards: {
    services: CardStyle;
    industries: CardStyle;
    process: CardStyle;
    testimonials: CardStyle;
  };
  footer: FooterConfig;
  logoUrl: string;
  ctaImage?: string;
}

export type UserRole = 'Super Admin' | 'HR' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Hashed in real app, plaintext for demo
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
}

export interface AdminConfig {
  general: {
    siteName: string;
    language: string;
    timezone: string;
  };
  profile: {
    name: string;
    email: string;
    role: string;
  };
  notifications: {
    jobApplications: boolean;
    contactInquiries: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
  };
  // Removed twoFactorEnabled and twoFactorSecret from here, moved to User
}

export interface AppState {
  currentUser: User | null; // Replaced isAdmin with currentUser
  users: User[]; // New state for managing all users
  isEditMode: boolean;
  content: ContentMap;
  jobs: Job[];
  blogs: BlogPost[];
  applications: Application[];
  heroSlides: HeroSlide[];
  navigationStructure: NavItem[];
  themeSettings: ThemeSettings;
  adminConfig: AdminConfig; // AdminConfig no longer holds 2FA secret
  issueReports: IssueReport[];
  isAuthModalOpen: boolean; 
  openAuthModal: (initialView?: 'login' | 'forgotPassword' | 'setup2fa' | 'verify2fa', userId?: string) => void; // Added userId for 2FA setup
  closeAuthModal: () => void;
  loginUser: (email: string, password: string, twoFactorCode?: string) => Promise<{ success: boolean; requires2fa?: boolean; message?: string; user?: User; }>; // Updated to loginUser
  logoutUser: () => void; // Updated to logoutUser
  toggleEditMode: () => void;
  updateContent: (key: string, value: string) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, updatedJob: Job) => void;
  deleteJob: (id: string) => void;
  updateJobStatus: (id: string, status: Job['archiveStatus']) => void;
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: string, updatedBlog: BlogPost) => void;
  deleteBlog: (id: string, ) => void;
  submitApplication: (app: Application) => void;
  updateHeroSlide: (id: string, data: Partial<HeroSlide>) => void;
  addHeroSlide: () => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (id: string, direction: 'up' | 'down') => void;
  updateThemeSetting: (path: string, value: any) => void;
  updateNavigationStructure: (newStructure: NavItem[]) => void;
  updateAdminConfig: (path: string, value: any) => void;
  submitIssueReport: (report: Omit<IssueReport, 'id' | 'date' | 'status'>) => void;
  updateIssueStatus: (id: string, status: IssueReport['status']) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  getOtpAuthUrl: (secret: string, issuer: string, accountName: string) => string; 

  // New user management functions
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
}