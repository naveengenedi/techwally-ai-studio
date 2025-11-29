
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, User, Lock, Mail, ChevronLeft, QrCode, CheckCircle2, AlertCircle, RefreshCcw, Send, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context';
import { Logo } from './Logo'; 
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../types';

export const AuthModal: React.FC<{
    initialView?: 'login' | 'forgotPassword' | 'setup2fa' | 'verify2fa';
    onClose: () => void;
    userId?: string; // Optional: used for 2FA setup/verification of a specific user
}> = ({ initialView = 'login', onClose, userId }) => {
    const [currentView, setCurrentView] = useState<'login' | 'forgotPassword' | 'setup2fa' | 'verify2fa'>(initialView);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [loginError, setLoginError] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
    const [twoFactorError, setTwoFactorError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const { loginUser, currentUser, openAuthModal, closeAuthModal, getOtpAuthUrl, users, updateUser } = useApp();
    const navigate = useNavigate();

    const loggedInUserFor2FA = useMemo(() => {
        // If userId is provided (for setup), use that user. Otherwise, use current logged-in user for verification.
        if (userId) {
            return users.find(u => u.id === userId);
        }
        return currentUser;
    }, [userId, currentUser, users]);

    useEffect(() => {
        setCurrentView(initialView);
        setLoginError(''); // Clear errors on view change
        setForgotPasswordMessage('');
        setTwoFactorError('');
        setEmail('');
        setPassword('');
        setTwoFactorCode('');
    }, [initialView]);

    useEffect(() => {
        if (currentUser && currentUser.role) {
            navigate('/admin'); // Redirect to admin dashboard on successful login
            closeAuthModal();
        }
    }, [currentUser, navigate, closeAuthModal]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        const response = await loginUser(email, password, twoFactorCode);

        if (response.success) {
            // Handled by useEffect: redirect to /admin
        } else {
            if (response.requires2fa) {
                // If the user has 2FA enabled but didn't provide a code, prompt for it
                setCurrentView('verify2fa');
                setLoginError(response.message || '2FA code required.');
                // We store the user temporarily for 2FA verification context
                setEmail(response.user?.email || email); 
                setPassword(password); // Keep password to re-attempt login with 2FA
            } else {
                setLoginError(response.message || 'Login failed.');
            }
        }
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setForgotPasswordMessage('Password reset link sent to ' + email);
        // In a real app, send reset email via API
        setTimeout(() => {
            setCurrentView('login');
            setForgotPasswordMessage('');
            setEmail('');
        }, 3000);
    };

    const handle2FASetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setTwoFactorError('');

        if (!loggedInUserFor2FA || !loggedInUserFor2FA.twoFactorSecret) {
            setTwoFactorError('2FA secret not found for this user.');
            return;
        }

        // Simulate 2FA code verification
        // In a real app, this would be an API call to verify the TOTP code
        // const isValid = await verifyTotpCode(loggedInUserFor2FA.twoFactorSecret, twoFactorCode);
        const mockedIsValid = twoFactorCode === '123456'; // Simple mock

        if (mockedIsValid) {
            updateUser(loggedInUserFor2FA.id, { twoFactorEnabled: true });
            alert('2FA setup complete!');
            closeAuthModal();
            navigate('/admin');
        } else {
            setTwoFactorError('Invalid 2FA code. Please try again.');
        }
    };

    const handle2FAVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(''); // Clear previous login error

        if (!loggedInUserFor2FA || !loggedInUserFor2FA.twoFactorSecret) {
            setLoginError('2FA secret not found for verification.');
            return;
        }

        const response = await loginUser(email, password, twoFactorCode); // Re-attempt login with 2FA code

        if (response.success) {
            // Handled by useEffect: redirect to /admin
        } else {
            setLoginError(response.message || '2FA verification failed.');
            setTwoFactorError(response.message || 'Invalid 2FA code.');
        }
    };


    const inputClass = "w-full py-3 px-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all placeholder:text-gray-500 text-[15px] h-[46px]";
    const buttonClass = "w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 h-[56px] flex items-center justify-center";

    // For QR Code generation in setup2fa view
    const otpAuthUrl = useMemo(() => {
        if (loggedInUserFor2FA?.twoFactorSecret && loggedInUserFor2FA.email) {
            return getOtpAuthUrl(loggedInUserFor2FA.twoFactorSecret, "Techwally", loggedInUserFor2FA.email);
        }
        return '';
    }, [loggedInUserFor2FA, getOtpAuthUrl]);

    const qrCodeUrl = useMemo(() => {
        if (otpAuthUrl) {
            return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(otpAuthUrl)}`;
        }
        return '';
    }, [otpAuthUrl]);

    const getFormHeader = (title: string, description: string) => (
        <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
                <Logo darkText={true} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-500 max-w-sm mx-auto">{description}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8 animate-[scaleIn_0.2s_ease-out] relative flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X size={20} /></button>

                {currentView === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-6">
                        {getFormHeader(
                            "Welcome Back!",
                            "Please log in to your admin account to continue managing the site."
                        )}
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Username or Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter username or email"
                                    className={`${inputClass} pl-11`}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className={`${inputClass} pl-11 pr-11`}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                    title={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCurrentView('forgotPassword')}
                                className="text-sm text-primary hover:underline mt-3 block w-fit ml-auto"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        {loginError && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={16} />{loginError}</p>}
                        <button type="submit" className={buttonClass}>
                            <User size={20} /> Secure Login
                        </button>
                    </form>
                )}

                {currentView === 'forgotPassword' && (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        {getFormHeader(
                            "Forgot Your Password?",
                            "Enter your account email below, and we'll send you a link to reset your password."
                        )}
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className={`${inputClass} pl-11`}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {forgotPasswordMessage && <p className="text-green-500 text-sm flex items-center gap-1"><CheckCircle2 size={16} />{forgotPasswordMessage}</p>}
                        <button type="submit" className={buttonClass}>
                            <Send size={20} /> Send Reset Link
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentView('login')}
                            className="w-full text-primary hover:underline text-center text-sm mt-4 py-2"
                        >
                            <ChevronLeft size={16} className="inline mr-1" /> Back to Login
                        </button>
                    </form>
                )}

                {(currentView === 'setup2fa' || currentView === 'verify2fa') && loggedInUserFor2FA && (
                    <form onSubmit={currentView === 'setup2fa' ? handle2FASetup : handle2FAVerification} className="space-y-6">
                        {getFormHeader(
                            currentView === 'setup2fa' ? "Set Up Two-Factor Authentication" : "Verify Your Login",
                            currentView === 'setup2fa' ? 
                                `Enhance your account security. Scan the QR code with your authenticator app (e.g., Authy, Google Authenticator) for ${loggedInUserFor2FA.email}.` :
                                `Please enter the 6-digit code from your authenticator app to complete your login for ${loggedInUserFor2FA.email}.`
                        )}
                        
                        {currentView === 'setup2fa' && (
                            <div className="space-y-4">
                                <div className="flex justify-center items-center">
                                    {qrCodeUrl ? (
                                        <img src={qrCodeUrl} alt="2FA QR Code" className="w-40 h-40 border border-gray-300 rounded-lg p-2 bg-white" />
                                    ) : (
                                        <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                                            <QrCode size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center text-sm text-gray-700 break-all">
                                    <p className="mb-2">Or manually enter this key:</p>
                                    <strong className="font-mono text-primary break-all text-xl md:text-2xl mt-1 block">{loggedInUserFor2FA.twoFactorSecret || 'Loading...'}</strong>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Authenticator Code</label>
                            <div className="relative">
                                <QrCode size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    className={`${inputClass} pl-11`}
                                    value={twoFactorCode}
                                    onChange={e => setTwoFactorCode(e.target.value)}
                                    maxLength={6}
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    required
                                />
                            </div>
                        </div>
                        {twoFactorError && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={16} />{twoFactorError}</p>}
                        <button type="submit" className={buttonClass}>
                            {currentView === 'setup2fa' ? <>Verify & Enable 2FA <CheckCircle2 size={20} /></> : <>Verify Code <CheckCircle2 size={20} /></>}
                        </button>
                        {currentView === 'verify2fa' && (
                            <button
                                type="button"
                                onClick={() => { setCurrentView('login'); setTwoFactorCode(''); setPassword(''); }} // Go back to login to re-enter email/password
                                className="w-full text-primary hover:underline text-center text-sm mt-4 py-2"
                            >
                                <ChevronLeft size={16} className="inline mr-1" /> Back to Login
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};
