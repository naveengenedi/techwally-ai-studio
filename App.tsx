import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Careers } from './pages/Careers';
import { Blog } from './pages/Blog';
// @google/genai Coding Guidelines: DO add comment above each fix.
// Imported AdminDashboard from './pages/Admin' to resolve the 'Module has no exported member' error.
import { AdminDashboard } from './pages/Admin';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { WhyTechwally } from './pages/WhyTechwally';
import { AdminPanel } from './components/AdminPanel';
import { SearchModal } from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';
import { HelpCenter } from './pages/HelpCenter';
import { ApplicationProcess } from './pages/help-center/ApplicationProcess';
import { ManagingProfile } from './pages/help-center/ManagingProfile';
import { TechnicalSupport } from './pages/help-center/TechnicalSupport';
import { PrivacySecurity } from './pages/help-center/PrivacySecurity';
import { InterviewPreparation } from './pages/help-center/InterviewPreparation';
import { OfferOnboarding } from './pages/help-center/OfferOnboarding';
import { WorkLifeBalance } from './pages/help-center/WorkLifeBalance';
import { CompensationBenefits } from './pages/help-center/CompensationBenefits';
// @google/genai Coding Guidelines: DO add comment above each fix.
// Imported `UserRole` from `types.ts` to resolve the `Cannot find name 'UserRole'` error.
import { User, UserRole } from './types'; // Import User and UserRole types
// @google/genai Coding Guidelines: DO add comment above each fix.
// Imported `AuthModal` from `components/AuthModal` to resolve the `Cannot find name 'AuthModal'` error.
import { AuthModal } from './components/AuthModal';
// @google/genai Coding Guidelines: DO add comment above each fix.
// Imported the new StrategicAdvisory component.
// Adjusted StrategicAdvisory to a default import as a diagnostic for persistent SyntaxError.
import StrategicAdvisory from './pages/StrategicAdvisory';

const AdminBar = () => {
    const { currentUser, isEditMode, toggleEditMode, logoutUser } = useApp();
    if (!currentUser || currentUser.role !== 'Super Admin') return null; // Only Super Admin sees AdminBar

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            <div className="bg-secondary text-white p-4 rounded-2xl shadow-2xl border border-gray-700 animate-[slideUp_0.3s_ease-out]">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">Admin Controls</div>
                <div className="flex gap-2">
                    <button onClick={toggleEditMode} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isEditMode ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        {isEditMode ? 'Editing ON' : 'Editing OFF'}
                    </button>
                    <button onClick={logoutUser} className="px-4 py-2 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
    const { currentUser, isEditMode, isSearchOpen, isAuthModalOpen, initialAuthView, closeAuthModal, authModalUserId } = useApp();
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/admin');

    if (isDashboard) return <>{children}</>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {/* Render footer only if not on /help-center or any of its sub-pages */}
            {!location.pathname.startsWith('/help-center') && <Footer />}
            {currentUser?.role === 'Super Admin' && <AdminBar />} {/* Only Super Admin sees AdminBar */}
            {currentUser?.role === 'Super Admin' && isEditMode && <AdminPanel />} {/* Only Super Admin uses AdminPanel */}
            {isSearchOpen && <SearchModal />}
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* AuthModal is now conditionally rendered based on isAuthModalOpen state from useApp context. */}
            {isAuthModalOpen && <AuthModal initialView={initialAuthView} onClose={closeAuthModal} userId={authModalUserId} />}
        </div>
    );
};

// @google/genai Coding Guidelines: DO add comment above each fix.
// ProtectedRoute is no longer used for /admin, but kept for potential future use on other protected routes.
// It includes robust checks for currentUser and role.
// Explicitly typed with React.FC to address potential type inference issues.
const ProtectedRoute: React.FC<{ children?: React.ReactNode, allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
    const { currentUser, openAuthModal } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Robust check for currentUser and currentUser.role before proceeding with authorization.
        if (!currentUser || !currentUser.role) {
            // Only open auth modal if not already open and not trying to access admin (which is now direct)
            if (!location.pathname.startsWith('/admin')) { 
                openAuthModal('login'); 
            }
            navigate('/'); // Always redirect to home if not authorized/logged in
        } else if (!allowedRoles.includes(currentUser.role)) {
            // If logged in but not authorized, redirect to home
            // @google/genai Coding Guidelines: DO add comment above each fix.
            // Removed extraneous 'S' character causing a syntax error.
            
            navigate('/');
            alert('You do not have permission to access this page.');
        }
    }, [currentUser, allowedRoles, navigate, openAuthModal, location.pathname]);


    if (!currentUser || !currentUser.role || !allowedRoles.includes(currentUser.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You must be logged in with an authorized role to view this page.</p>
                </div>
            </div>
        );
    }
    return <>{children}</ProtectedRoute>;
};

// @google/genai Coding Guidelines: DO add comment above each fix.
// AdminGuard component is removed as loading logic is now within AdminDashboard itself.
// This route now directly renders AdminDashboard.

const ThemedApp = ({ children }: { children?: React.ReactNode }) => {
    const { themeSettings, adminConfig } = useApp();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', themeSettings.colors.primary);
        root.style.setProperty('--color-secondary', themeSettings.colors.secondary);
        root.style.setProperty('--color-accent', themeSettings.colors.accent);
        
        // Update document title dynamically
        document.title = `${adminConfig.general.siteName} | Enterprise Software Solutions`;
    }, [themeSettings, adminConfig]);

    return <>{children}</>;
};

const AppContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isInitialMount = useRef(true); // @google/genai Coding Guidelines: DO add comment above each fix.
    // Added a useRef to track if the component is being mounted for the first time, to prevent redirect loops.

    // @google/genai Coding Guidelines: DO add comment above each fix.
    // Removed the overly aggressive useEffect that was redirecting all non-home, non-admin, and non-help-center routes to the home page.
    // This allows all defined routes to be accessed directly and on refresh.
    /*
    useEffect(() => {
        if (location.pathname !== '/' && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/help-center')) {
            navigate('/');
        }
    }, [location.pathname, navigate]);
    */

    // @google/genai Coding Guidelines: DO add comment above each fix.
    // Added a small component to immediately redirect to the home page.
    const RedirectToHome = () => {
        useEffect(() => {
            navigate('/', { replace: true });
        }, [navigate]);
        return null; // This component doesn't render anything, just redirects
    };

    // @google/genai Coding Guidelines: DO add comment above each fix.
    // Implemented a useEffect with a useRef to redirect from the '/help-center' path to the home page '/' only on initial load or refresh.
    // This addresses the user's request to prevent the help page from being the default landing page after a refresh, while allowing normal in-app navigation to it.
    useEffect(() => {
        // Only execute this logic on the very first mount after routing has settled.
        if (isInitialMount.current) {
            isInitialMount.current = false; // Mark as not initial mount after this run

            // If the current hash path is '/help-center' on initial load,
            // redirect to the home page.
            if (location.pathname === '/help-center') {
                navigate('/', { replace: true });
            }
        }
    }, [location.pathname, navigate]); // location.pathname dependency to ensure it runs after hash is processed.


    return (
        <div key={location.pathname} className="animate-[fadeIn_0.5s_ease-out]">
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/careers" element={<Layout><Careers /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/company" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/why-techwally" element={<Layout><WhyTechwally /></Layout>} />
                <Route path="/help-center" element={<Layout><HelpCenter /></Layout>} />
                <Route path="/help-center/application-process" element={<Layout><ApplicationProcess /></Layout>} />
                <Route path="/help-center/managing-profile" element={<Layout><ManagingProfile /></Layout>} />
                <Route path="/help-center/technical-support" element={<Layout><TechnicalSupport /></Layout>} />
                <Route path="/help-center/privacy-security" element={<Layout><PrivacySecurity /></Layout>} />
                <Route path="/help-center/interview-preparation" element={<Layout><InterviewPreparation /></Layout>} />
                <Route path="/help-center/offer-onboarding" element={<Layout><OfferOnboarding /></Layout>} />
                <Route path="/help-center/work-life-balance" element={<Layout><WorkLifeBalance /></Layout>} />
                <Route path="/help-center/compensation-benefits" element={<Layout><CompensationBenefits /></Layout>} />
                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Added a route for the new Strategic Advisory page. */}
                <Route path="/services/advisory" element={<Layout><StrategicAdvisory /></Layout>} />
                {/* Catch-all for services/industries links */}
                <Route path="/services/*" element={<Layout><div className="pt-20"><div className="text-center py-20"><h1 className="text-4xl font-bold">Service Page</h1><p>Dynamic Content Placeholder</p></div></div></Layout>} />
                <Route path="/industries/*" element={<Layout><div className="pt-20"><div className="text-center py-20"><h1 className="text-4xl font-bold">Industry Page</h1><p>Dynamic Content Placeholder</p></div></div></Layout>} />
                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Admin route now directly renders AdminDashboard. Loading handled within AdminDashboard. */}
                <Route path="/admin" element={<AdminDashboard />} />
                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Added a catch-all route to redirect any unmatched paths to the home page, preventing unintended redirects to specific pages like /help-center on refresh of an invalid URL. */}
                <Route path="*" element={<Layout><RedirectToHome /></Layout>} />
            </Routes>
        </div>
    );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <ThemedApp>
          <AppContent />
        </ThemedApp>
      </Router>
    </AppProvider>
  );
};

export default App;