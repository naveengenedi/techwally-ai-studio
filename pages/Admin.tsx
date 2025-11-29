import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Settings as SettingsIcon, Plus, Trash2, Eye, LogOut, Users, Power, FileIcon, Phone, Search, Edit3, Save, X, Type, Image as ImageIcon, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, Video, Palette, ChevronsLeft, ChevronsRight, UploadCloud, LayoutTemplate, Brush, Menu as MenuIcon, CaseSensitive, ChevronDown, Footprints, Linkedin, Twitter, Facebook, Instagram, Youtube, Github, Globe, User as UserIcon, Bell, Shield, Camera, Lock, Mail, Flag, QrCode, RotateCcw, EyeOff, UserPlus, Bold, Italic, List, RefreshCcw, MoreVertical, CheckCircle2, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Job, BlogPost, IssueReport, User, UserRole, AdminNavItem } from '../types';
import { Logo } from '../components/Logo';
import { base32Encode, getOtpAuthUrl } from '../context';
import { fileToBase64 } from '../utils/fileUtils';

const Overview = () => {
    const { applications, jobs, blogs, issueReports } = useApp();
    const data = [
      { name: 'Mon', visits: 4000, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Tue', visits: 3000, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Wed', visits: 2000, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Thu', visits: 2780, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Fri', visits: 1890, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Sat', visits: 2390, applications: Math.floor(Math.random() * 50) + 10 },
      { name: 'Sun', visits: 3490, applications: Math.floor(Math.random() * 50) + 10 },
    ];
    
    // Total numbers
    const totalApplications = applications.length;
    const totalActiveJobs = jobs.filter(j => j.archiveStatus === 'active').length;
    const totalPublishedBlogs = blogs.filter(b => b.status === 'published').length;
    const totalNewIssues = issueReports.filter(i => i.status === 'New').length;

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Modified outer div to be a flex column and fill height. This is the non-scrolling container for fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 shrink-0 sticky top-0 z-20 bg-gray-50 -mx-4 px-4 md:mx-0 md:px-0 pt-4 md:pt-0 pb-4 border-b border-gray-100">Dashboard Overview</h1> {/* Added shrink-0 and sticky header */}

            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0"> {/* Added flex-1 overflow-y-auto custom-scroll */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Applications</p>
                            <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
                        </div>
                        <FileText size={48} className="text-primary-light" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                            <p className="text-3xl font-bold text-gray-900">{totalActiveJobs}</p>
                        </div>
                        <Briefcase size={48} className="text-green-400/30" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Published Blogs</p>
                            <p className="text-3xl font-bold text-gray-900">{totalPublishedBlogs}</p>
                        </div>
                        <FileIcon size={48} className="text-orange-400/30" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">New Issue Reports</p>
                            <p className="text-3xl font-bold text-gray-900">{totalNewIssues}</p>
                        </div>
                        <Flag size={48} className="text-red-400/30" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="visits" fill="#007C7E" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="applications" fill="#004849" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Jobs Management Component (simplified for brevity, assuming existing structure)
const JobsManagement = () => {
    const { jobs, addJob, updateJob, deleteJob } = useApp();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'archived' | 'reposted'>('all');

    const jobsWithDefaultLogo = useMemo(() => jobs.map(job => ({
        ...job,
        logoUrl: job.logoUrl || 'https://cdn.dribbble.com/users/10882/screenshots/15172621/media/f50b34382c76c76ac573356e52003c20.png?compress=1&resize=400x300'
    })), [jobs]);

    const filteredJobs = useMemo(() => {
        if (filterStatus === 'all') return jobsWithDefaultLogo;
        return jobsWithDefaultLogo.filter(job => job.archiveStatus === filterStatus);
    }, [jobsWithDefaultLogo, filterStatus]);

    const handleEdit = (job: Job) => {
        setSelectedJob(job);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            deleteJob(id);
        }
    };

    const handleFormSubmit = (jobData: Job) => {
        if (selectedJob) {
            updateJob(jobData.id, jobData);
        } else {
            addJob({ ...jobData, id: Date.now().toString(), postedDate: 'Just now', archiveStatus: 'active' });
        }
        setIsFormOpen(false);
        setSelectedJob(null);
    };

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {isFormOpen && (
                <JobForm
                    job={selectedJob}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}

            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title and button) and status filters are fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Job Openings</h1>
                    <button onClick={() => { setSelectedJob(null); setIsFormOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm whitespace-nowrap">
                        <Plus size={18} /> Add New Job
                    </button>
                </div>

                {/* Status Filters */}
                <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
                    {['all', 'active', 'pending', 'archived', 'reposted'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                                filterStatus === status ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)} ({jobs.filter(job => status === 'all' ? true : job.archiveStatus === status).length})
                        </button>
                    ))}
                </div>
            </div>

            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (table). */}
            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-[850px] divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made table header sticky within its scrollable container */}
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredJobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                job.archiveStatus === 'active' ? 'bg-green-100 text-green-800' :
                                                job.archiveStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                job.archiveStatus === 'reposted' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {job.archiveStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(job)} className="text-primary hover:text-primary-dark mr-3"><Edit3 size={18}/></button>
                                            <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// JobForm component
const JobForm: React.FC<{ job: Job | null; onClose: () => void; onSubmit: (job: Job) => void }> = ({ job, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Job>(job || {
        id: '', title: '', company: '', logoUrl: '', category: '', location: '', type: 'Full-time', salary: '',
        postedDate: '', description: '', isFeatured: false, archiveStatus: 'active', workType: '', isRemote: false,
        salaryMin: undefined, salaryMax: undefined, highlights: [], headerImage: undefined, customLinks: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = async (file: File | null, field: 'logoUrl' | 'headerImage') => {
        if (!file) {
            setFormData(prev => ({ ...prev, [field]: '' })); // Use empty string for cleared image
            return;
        }
        const base64 = await fileToBase64(file);
        setFormData(prev => ({ ...prev, [field]: base64 }));
    };

    const handleAddLink = () => {
        setFormData(prev => ({
            ...prev,
            customLinks: [...(prev.customLinks || []), { label: '', url: '' }]
        }));
    };

    const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
        setFormData(prev => {
            const newLinks = [...(prev.customLinks || [])];
            newLinks[index] = { ...newLinks[index], [field]: value };
            return { ...prev, customLinks: newLinks };
        });
    };

    const handleRemoveLink = (index: number) => {
        setFormData(prev => ({
            ...prev,
            customLinks: (prev.customLinks || []).filter((_, i) => i !== index)
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full md:max-w-2xl flex flex-col max-h-[90vh] animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">{job ? 'Edit Job' : 'Add New Job'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900"><X size={20}/></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 custom-scroll space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Senior React Engineer" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Techwally" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Engineering" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Remote, New York, NY" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salary (Display)</label>
                            <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="$120k - $160k" className={inputClass} />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="isRemote" checked={formData.isRemote} onChange={handleChange} id="isRemote" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                            <label htmlFor="isRemote" className="text-sm font-medium text-gray-700">Remote Position</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} id="isFeatured" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Job</label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" rows={5} className={`${inputClass} resize-y`}></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
                        <textarea
                            name="highlights"
                            value={formData.highlights?.join('\n') || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value.split('\n').filter(h => h.trim() !== '') }))}
                            placeholder="Highlight 1&#10;Highlight 2"
                            rows={3}
                            className={`${inputClass} resize-y`}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                            {/* Replaced direct FileUpload usage with local component for consistency. */}
                            <FileUpload 
                                onChange={(file) => handleFileChange(file, 'logoUrl')} 
                                currentSrc={formData.logoUrl} 
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Header Image (Banner)</label>
                            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                            {/* Replaced direct FileUpload usage with local component for consistency. */}
                            <FileUpload 
                                onChange={(file) => handleFileChange(file, 'headerImage')} 
                                currentSrc={formData.headerImage} 
                                accept="image/*"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-2 mt-4">Custom Links</h3>
                        {formData.customLinks?.map((link, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-2 mb-2 items-center">
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                                    placeholder="Link Label (e.g., Apply on LinkedIn)"
                                    className={`${inputClass} flex-1`}
                                />
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                    placeholder="URL (e.g., https://linkedin.com/job/123)"
                                    className={`${inputClass} flex-1`}
                                />
                                <button type="button" onClick={() => handleRemoveLink(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddLink} className="mt-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-gray-200">
                            <Plus size={16}/> Add Custom Link
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Archive Status</label>
                        <select name="archiveStatus" value={formData.archiveStatus} onChange={handleChange} className={inputClass}>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="archived">Archived</option>
                            <option value="reposted">Reposted</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                        <Save size={18}/> Save Job
                    </button>
                </form>
            </div>
        </div>
    );
};

// Blogs Management Component
const BlogsManagement = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useApp();
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleEdit = (blog: BlogPost) => {
        setSelectedBlog(blog);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            deleteBlog(id);
        }
    };

    const handleFormSubmit = (blogData: BlogPost) => {
        if (selectedBlog) {
            updateBlog(blogData.id, blogData);
        } else {
            addBlog({ ...blogData, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] });
        }
        setIsFormOpen(false);
        setSelectedBlog(null);
    };

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {isFormOpen && (
                <BlogForm
                    blog={selectedBlog}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title and button) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Blog Posts</h1>
                    <button onClick={() => { setSelectedBlog(null); setIsFormOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm whitespace-nowrap">
                        <Plus size={18} /> Add New Post
                    </button>
                </div>
            </div>

            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (table). */}
            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-[850px] divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made table header sticky within its scrollable container */}
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {blogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{blog.author}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{blog.category}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(blog.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(blog)} className="text-primary hover:text-primary-dark mr-3"><Edit3 size={18}/></button>
                                            <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// BlogForm component
const BlogForm: React.FC<{ blog: BlogPost | null; onClose: () => void; onSubmit: (blog: BlogPost) => void }> = ({ blog, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<BlogPost>(blog || {
        id: '', title: '', excerpt: '', category: '', author: '', date: '', imageUrl: '', content: '', status: 'draft'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (file: File | null) => {
        if (!file) {
            setFormData(prev => ({ ...prev, imageUrl: '' })); // Use empty string for cleared image
            return;
        }
        const base64 = await fileToBase64(file);
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full md:max-w-2xl flex flex-col max-h-[90vh] animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">{blog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900"><X size={20}/></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 custom-scroll space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Post Title" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Technology, AI, Marketing" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Short summary of the blog post" rows={3} className={`${inputClass} resize-y`}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Full article content here..." rows={10} className={`${inputClass} resize-y`}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                        {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                        {/* Replaced direct FileUpload usage with local component for consistency. */}
                        <FileUpload 
                            onChange={(file) => handleFileChange(file)} 
                            currentSrc={formData.imageUrl} 
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                        <Save size={18}/> Save Post
                    </button>
                </form>
            </div>
        </div>
    );
};

// Applications Management Component
const ApplicationsManagement = () => {
    const { applications } = useApp();

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Job Applications</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (table). */}
            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-[850px] divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made table header sticky within its scrollable container */}
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.jobTitle}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{app.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{app.email}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{app.phone || 'N/A'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Users Management Component
const UsersManagement = () => {
    const { users, addUser, updateUser, deleteUser, openAuthModal } = useApp();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    const handleFormSubmit = (userData: User) => {
        if (selectedUser) {
            updateUser(userData.id, userData);
        } else {
            addUser(userData); // Assuming addUser can handle the partial User
        }
        setIsFormOpen(false);
        setSelectedUser(null);
    };

    const handleToggle2FA = (user: User) => {
        if (user.twoFactorEnabled) {
            if (window.confirm("Are you sure you want to disable 2FA for this user?")) {
                updateUser(user.id, { twoFactorEnabled: false, twoFactorSecret: undefined });
            }
        } else {
            openAuthModal('setup2fa', user.id);
        }
    };

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {isFormOpen && (
                <UserForm
                    user={selectedUser}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title and button) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
                    <button onClick={() => { setSelectedUser(null); setIsFormOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm whitespace-nowrap">
                        <UserPlus size={18} /> Add New User
                    </button>
                </div>
            </div>

            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (table). */}
            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-[800px] divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made table header sticky within its scrollable container */}
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleToggle2FA(user)}
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(user)} className="text-primary hover:text-primary-dark mr-3"><Edit3 size={18}/></button>
                                            <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// UserForm component
const UserForm: React.FC<{ user: User | null; onClose: () => void; onSubmit: (user: User) => void }> = ({ user, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<User>(user || {
        id: '', name: '', email: '', role: 'Employee', password: '', twoFactorEnabled: false, twoFactorSecret: undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full md:max-w-lg flex flex-col max-h-[90vh] animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">{user ? 'Edit User' : 'Add New User'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900"><X size={20}/></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 custom-scroll space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" className={inputClass} required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Set new password (optional)" className={inputClass}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className={inputClass}>
                                <option value="Employee">Employee</option>
                                <option value="HR">HR</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="twoFactorEnabled" checked={formData.twoFactorEnabled} onChange={handleChange} id="2fa-enabled" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                        <label htmlFor="2fa-enabled" className="ml-2 block text-sm font-medium text-gray-700">Two-Factor Authentication Enabled</label>
                    </div>
                    {formData.twoFactorEnabled && formData.twoFactorSecret && (
                        <div className="space-y-3 bg-gray-100 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-700">Scan QR Code or enter manual key to setup 2FA for this user.</p>
                            <div className="flex justify-center">
                                <img src={getOtpAuthUrl(formData.twoFactorSecret, "Techwally", formData.email)} alt="2FA QR Code" className="w-32 h-32 border border-gray-300 rounded-lg p-1 bg-white"/>
                            </div>
                            <p className="text-center text-xs font-mono text-gray-700 break-all">
                                <strong className="text-base md:text-lg block">{formData.twoFactorSecret}</strong>
                            </p>
                        </div>
                    )}
                    <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                        <Save size={18}/> Save User
                    </button>
                </form>
            </div>
        </div>
    );
};


// IssueReports Component
const IssueReports = () => {
    const { issueReports, updateIssueStatus } = useApp();

    const handleStatusChange = (id: string, status: IssueReport['status']) => {
        updateIssueStatus(id, status);
    };

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Issue Reports</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (table). */}
            <div className="flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-[950px] divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Made table header sticky within its scrollable container */}
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {issueReports.map((report) => (
                                    <tr key={report.id}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.page}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">{report.description}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{report.name || 'Anonymous'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{report.email || report.phone || 'N/A'}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <select
                                                value={report.status}
                                                onChange={(e) => handleStatusChange(report.id, e.target.value as IssueReport['status'])}
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    report.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                    report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                <option value="New">New</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// SiteSettings Component
const SiteSettings = () => {
    const { adminConfig, updateAdminConfig } = useApp();
    const [formData, setFormData] = useState(adminConfig.general);

    useEffect(() => {
        setFormData(adminConfig.general);
    }, [adminConfig.general]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateAdminConfig('general', formData);
        alert('General settings saved!');
    };

    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Site Settings</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (form). */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <input type="text" name="language" value={formData.language} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} className={inputClass}/>
                </div>
                <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                    <Save size={18}/> Save Settings
                </button>
            </div>
        </div>
    );
};


// ProfileSettings Component
const ProfileSettings = () => {
    const { currentUser, updateUser } = useApp();
    const [formData, setFormData] = useState(currentUser || {
        id: '', name: '', email: '', role: 'Employee', password: '', twoFactorEnabled: false
    });

    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser);
        }
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (currentUser) {
            updateUser(currentUser.id, formData);
            alert('Profile settings saved!');
        }
    };

    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column to contain fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (form). */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input type="text" name="role" value={formData.role} readOnly className={`${inputClass} bg-gray-100 cursor-not-allowed`}/>
                </div>
                <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                    <Save size={18}/> Save Settings
                </button>
            </div>
        </div>
    );
};

// NotificationsSettings Component
const NotificationsSettings = () => {
    const { adminConfig, updateAdminConfig } = useApp();
    const [formData, setFormData] = useState(adminConfig.notifications);

    useEffect(() => {
        setFormData(adminConfig.notifications);
    }, [adminConfig.notifications]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSave = () => {
        updateAdminConfig('notifications', formData);
        alert('Notification settings saved!');
    };

    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column and fill height. This is the non-scrolling container for fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notification Settings</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (form). */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex items-center">
                    <input type="checkbox" name="jobApplications" checked={formData.jobApplications} onChange={handleChange} className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <label htmlFor="jobApplications" className="ml-2 block text-sm font-medium text-gray-700">Job Applications</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" name="contactInquiries" checked={formData.contactInquiries} onChange={handleChange} className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <label htmlFor="contactInquiries" className="ml-2 block text-sm font-medium text-gray-700">Contact Inquiries</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" name="marketingEmails" checked={formData.marketingEmails} onChange={handleChange} className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <label htmlFor="marketingEmails" className="ml-2 block text-sm font-medium text-gray-700">Marketing Emails</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" name="securityAlerts" checked={formData.securityAlerts} onChange={handleChange} className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                    <label htmlFor="securityAlerts" className="ml-2 block text-sm font-medium text-gray-700">Security Alerts</label>
                </div>
                <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                    <Save size={18}/> Save Settings
                </button>
            </div>
        </div>
    );
};

// TwoFactorAuthSettings Component
const TwoFactorAuthSettings = () => {
    const { currentUser, updateUser, openAuthModal, getOtpAuthUrl } = useApp(); // Include getOtpAuthUrl
    const [qrCodeData, setQrCodeData] = useState('');
    const [setupMessage, setSetupMessage] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');

    useEffect(() => {
        if (currentUser && currentUser.twoFactorSecret) { // No need to check !currentUser.twoFactorEnabled here
            const otpAuthUrl = getOtpAuthUrl(currentUser.twoFactorSecret, "Techwally", currentUser.email);
            setQrCodeData(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(otpAuthUrl)}`);
        } else {
            setQrCodeData('');
        }
    }, [currentUser, getOtpAuthUrl]);

    const handleEnable2FA = () => {
        if (currentUser) {
            // If user doesn't have a secret yet, generate one for them
            if (!currentUser.twoFactorSecret) {
                const newSecretBytes = crypto.getRandomValues(new Uint8Array(20));
                const newSecret = base32Encode(newSecretBytes);
                updateUser(currentUser.id, { twoFactorSecret: newSecret, twoFactorEnabled: false }); // Set enabled to false, will verify in modal
                // Now that secret is updated, useEffect will generate QR. Open modal after a tiny delay.
                setTimeout(() => openAuthModal('setup2fa', currentUser.id), 100);
            } else {
                openAuthModal('setup2fa', currentUser.id);
            }
        }
    };

    const handleDisable2FA = () => {
        if (currentUser && window.confirm("Are you sure you want to disable Two-Factor Authentication?")) {
            updateUser(currentUser.id, { twoFactorEnabled: false, twoFactorSecret: undefined });
            setSetupMessage('Two-Factor Authentication has been disabled.');
            setTwoFactorCode('');
            setQrCodeData('');
        }
    };

    const handleVerifyAndEnable = async () => {
        if (!currentUser || !currentUser.twoFactorSecret) {
            setSetupMessage('Error: 2FA secret missing.');
            return;
        }
        // In a real app, this would be an API call to verify the TOTP code
        // const isValid = await verifyTotpCode(currentUser.twoFactorSecret, twoFactorCode);
        const mockedIsValid = twoFactorCode === '123456'; // Simple mock for UI demo

        if (mockedIsValid) {
            updateUser(currentUser.id, { twoFactorEnabled: true });
            setSetupMessage('Two-Factor Authentication has been enabled successfully!');
            setTwoFactorCode('');
        } else {
            setSetupMessage('Invalid 2FA code. Please try again.');
        }
    };


    const inputClass = "w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none text-gray-900";


    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Outer div is now a flex column and fill height. This is the non-scrolling container for fixed header and scrollable content.
        <div className="flex flex-col h-full p-4 md:p-8">
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Header section (title) is fixed. */}
            <div className="pb-4 md:pb-6 bg-gray-50 sticky top-0 z-20 -mx-4 px-4 md:mx-0 md:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Two-Factor Authentication</h1>
            </div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* This div now contains the actual scrollable content (form). */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 flex-1 overflow-y-auto custom-scroll -mx-4 px-4 md:mx-0 md:px-0">
                {currentUser?.twoFactorEnabled ? (
                    <div>
                        <p className="text-green-600 font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={20}/> 2FA is currently ENABLED</p>
                        <p className="text-gray-600 mb-4">Your account is protected with Two-Factor Authentication.</p>
                        <button onClick={handleDisable2FA} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-red-700 h-11">
                            <Power size={18}/> Disable 2FA
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-red-600 font-bold mb-4 flex items-center gap-2"><AlertCircle size={20}/> 2FA is currently DISABLED</p>
                        <p className="text-gray-600 mb-4">Enable Two-Factor Authentication for enhanced account security.</p>
                        {setupMessage && <p className="text-blue-500 font-medium mb-4">{setupMessage}</p>}
                        
                        {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                        {/* Corrected JSX syntax for nested conditional rendering. The `div className="space-y-4"` now correctly wraps all elements of its true branch, resolving the `SyntaxError: Unexpected token ';'` */}
                        {currentUser?.twoFactorSecret && qrCodeData ? (
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <img src={qrCodeData} alt="2FA QR Code" className="w-40 h-40 border border-gray-300 rounded-lg p-2 bg-white" />
                                </div>
                                <div className="text-center text-sm text-gray-700 break-all">
                                    <p className="mb-2">Or manually enter this key:</p>
                                    <strong className="font-mono text-primary break-all text-xl md:text-2xl mt-1 block">{currentUser.twoFactorSecret || 'Loading...'}</strong>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit code</label>
                                    <input type="text" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)} maxLength={6} className={inputClass}/>
                                </div>
                                <button onClick={handleVerifyAndEnable} className="bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                                    <CheckCircle2 size={18}/> Verify & Enable 2FA
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleEnable2FA} className="bg-primary text-white px-4 py-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-sm h-11">
                                <Shield size={18}/> Enable 2FA
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


// Admin Header Component (Mobile Only)
const AdminHeader: React.FC<{
    title: string;
    onOpenSidebar: () => void;
    currentUser: User | null;
    logoutUser: () => void;
}> = ({ title, onOpenSidebar, currentUser, logoutUser }) => {
    return (
        // @google/genai Coding Guidelines: DO add comment above each fix.
        // Changed `sticky` to `fixed` and increased z-index to ensure the header stays visible on top.
        <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 fixed top-0 w-full z-40 lg:hidden">
            <button
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
                onClick={onOpenSidebar}
                aria-label="Open sidebar"
            >
                <MenuIcon size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
                {title}
            </h1>
            {/* User/Logout or placeholder for mobile header */}
            <div className="flex items-center gap-2">
                {currentUser && (
                    <span className="text-xs font-medium text-gray-500 hidden sm:block">{currentUser.name}</span>
                )}
                <button onClick={logoutUser} className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Logout">
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
};


// AdminDashboard Component
export const AdminDashboard = () => {
    const { currentUser, logoutUser, openAuthModal } = useApp();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

    // Redirect if not logged in or not authorized
    useEffect(() => {
        // If currentUser becomes null (e.g., after logout), redirect to home
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    // Define admin navigation items with role-based access
    // @google/genai Coding Guidelines: DO add comment above each fix.
    // Explicitly typing adminNavItems with AdminNavItem[] to ensure `roles` property is always present and an array.
    const adminNavItems: AdminNavItem[] = useMemo(() => [
        { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard, roles: ['Super Admin', 'HR', 'Employee'] },
        { id: 'jobs', name: 'Job Listings', icon: Briefcase, roles: ['Super Admin', 'HR'] },
        { id: 'applications', name: 'Applications', icon: FileText, roles: ['Super Admin', 'HR'] },
        { id: 'blogs', name: 'Blog Management', icon: FileIcon, roles: ['Super Admin', 'HR'] },
        { id: 'users', name: 'User Accounts', icon: Users, roles: ['Super Admin'] },
        { id: 'issues', name: 'Issue Reports', icon: Flag, roles: ['Super Admin', 'HR'] },
        { id: 'siteSettings', name: 'Site Settings', icon: Globe, roles: ['Super Admin'] },
        { id: 'profileSettings', name: 'Profile Settings', icon: UserIcon, roles: ['Super Admin', 'HR', 'Employee'] },
        { id: 'notifications', name: 'Notifications', icon: Bell, roles: ['Super Admin', 'HR', 'Employee'] },
        { id: 'twoFactorAuth', name: '2FA Setup', icon: Lock, roles: ['Super Admin', 'HR', 'Employee'] },
    ], []);

    const filteredNavItems = useMemo(() => {
        // Defensive check for currentUser and its role
        if (!currentUser || !currentUser.role) return [];
        return adminNavItems.filter(item => {
            // Ensure item.roles is an array before calling .includes
            if (!('roles' in item) || !Array.isArray(item.roles)) {
                console.warn(`Admin nav item ${item.name} is missing or has invalid 'roles' property.`);
                return false;
            }
            return item.roles.includes(currentUser.role);
        });
    }, [adminNavItems, currentUser]);

    // If currentUser is null (e.g., after logout, before redirect)
    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading user data or access denied. Redirecting...</p>
                </div>
            </div>
        );
    }

    // Determine current section title for mobile header
    const currentSectionTitle = filteredNavItems.find(item => item.id === activeSection)?.name || 'Admin Dashboard';

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-white p-4 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:sticky lg:top-0 lg:h-screen`}
            >
                <div className="mb-8 flex items-center justify-between lg:justify-start">
                    <Link to="/" className="block">
                        <Logo darkText={false} />
                    </Link>
                    <button
                        className="lg:hidden p-2 rounded-full hover:bg-gray-700 text-gray-300"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <nav className="flex-1 space-y-2 custom-scroll overflow-y-auto">
                    {filteredNavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                setIsSidebarOpen(false); // Close sidebar on item click for mobile
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-left transition-colors ${
                                activeSection === item.id ? 'bg-primary text-white' : 'hover:bg-gray-700 text-gray-300'
                            }`}
                        >
                            <item.icon size={20} /> {item.name}
                        </button>
                    ))}
                </nav>

                <div className="mt-8 pt-4 border-t border-gray-700 shrink-0">
                    <button onClick={logoutUser} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-left text-red-400 hover:bg-red-900/50 transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header for Main Content */}
                <AdminHeader title={currentSectionTitle} onOpenSidebar={() => setIsSidebarOpen(true)} currentUser={currentUser} logoutUser={logoutUser} />

                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Main content area now has pt-[72px] to offset fixed mobile header. */}
                {/* It's the primary vertical scroll container, allowing its children (manager components) to have sticky internal headers. */}
                <main className="flex-1 pt-[72px] lg:pt-0 overflow-y-auto custom-scroll">
                    {activeSection === 'overview' && <Overview />}
                    {activeSection === 'jobs' && <JobsManagement />}
                    {activeSection === 'applications' && <ApplicationsManagement />}
                    {activeSection === 'blogs' && <BlogsManagement />}
                    {activeSection === 'users' && <UsersManagement />}
                    {activeSection === 'issues' && <IssueReports />}
                    {activeSection === 'siteSettings' && <SiteSettings />}
                    {activeSection === 'profileSettings' && <ProfileSettings />}
                    {activeSection === 'notifications' && <NotificationsSettings />}
                    {activeSection === 'twoFactorAuth' && <TwoFactorAuthSettings />}
                </main>
            </div>
        </div>
    );
};

// @google/genai Coding Guidelines: DO add comment above each fix.
// New FileUpload component for AdminPanel to handle file selection and display.
const FileUpload = ({ onChange, currentSrc, accept = 'image/*' }: {
    onChange: (file: File | null) => void;
    currentSrc?: string;
    accept?: string;
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = ''; // Clear the file input
        }
    };

    const isVideo = accept.includes('video');

    return (
        <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors bg-gray-50 relative group"
            onClick={() => inputRef.current?.click()}
        >
            <input 
                type="file" 
                accept={accept} 
                ref={inputRef} 
                className="hidden" 
                onChange={e => e.target.files && onChange(e.target.files[0])} 
            />
            {currentSrc ? (
                <>
                    {isVideo ? (
                        <video src={currentSrc} controls className="w-12 h-12 rounded-md object-contain bg-white border border-gray-200 p-0.5" />
                    ) : (
                        <img src={currentSrc} alt="Preview" className="w-12 h-12 rounded-md object-contain bg-white border border-gray-200 p-0.5"/>
                    )}
                    <div className="flex-1 text-sm font-medium text-gray-800 truncate">
                        {/* Display a truncated version of the URL, if it's a very long base64 string */}
                        {currentSrc.length > 50 && currentSrc.startsWith('data:') ? `...${currentSrc.substring(currentSrc.length - 40)}` : currentSrc}
                    </div>
                    <button 
                        type="button"
                        onClick={handleClear} 
                        className="p-1 rounded-full text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Clear media"
                    >
                        <X size={16}/>
                    </button>
                </>
            ) : (
                <>
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                        {isVideo ? <Video size={20} /> : <ImageIcon size={20} />}
                    </div>
                    <div className="flex-1 text-sm text-gray-500">
                        <span className="font-bold text-primary">Click to upload</span> {isVideo ? 'video' : 'image'}.
                    </div>
                </>
            )}
        </div>
    );
};