
import React from 'react';
import { useApp } from '../context';
import { Calendar, User } from 'lucide-react';

export const Blog = () => {
  const { blogs } = useApp();
  const publishedBlogs = blogs.filter(b => b.status === 'published');

  return (
    <div className="pb-[75px] min-h-screen pt-[112px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[75px]">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-8 md:mb-12 border-b border-gray-100 pb-6 md:pb-8">Latest Insights</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {publishedBlogs.map((post) => (
            <article key={post.id} className="flex flex-col group cursor-pointer">
              <div className="h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                 <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-500 font-medium mb-2 md:mb-3 uppercase tracking-wider">
                <span className="text-primary">{post.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1"><Calendar size={12} /> {post.date}</div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 line-clamp-3 mb-3 md:mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-900 font-medium mt-auto">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={14} />
                </div>
                {post.author}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};