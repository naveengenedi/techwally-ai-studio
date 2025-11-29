import React, { useState } from 'react';
import { Editable } from './Editable';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../context';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';

export const Footer = () => {
  const { adminConfig, themeSettings } = useApp();
  const { footer } = themeSettings;
  const { socialLinks, socialIconStyle, columns } = footer;

  const getSocialIcon = (platform: string) => {
      switch(platform) {
          case 'linkedin': return <Linkedin size={socialIconStyle.size} />;
          case 'twitter': return <Twitter size={socialIconStyle.size} />;
          case 'facebook': return <Facebook size={socialIconStyle.size} />;
          case 'instagram': return <Instagram size={socialIconStyle.size} />;
          case 'youtube': return <Youtube size={socialIconStyle.size} />;
          case 'github': return <Github size={socialIconStyle.size} />;
          default: return null;
      }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: footer.backgroundColor, color: footer.textColor }} className="pt-[75px] pb-0 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-10">
                <div className="col-span-1 md:col-span-1">
                    <Logo darkText={false} />
                    <p className="text-base leading-relaxed my-6">
                        <Editable id="footer-about" defaultText="Techwally is a global software engineering firm specializing in AI, Cloud, and Custom Development." />
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        {socialLinks.map((link) => {
                            const [isHovered, setIsHovered] = useState(false);
                            return (
                                <a 
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    style={{
                                        backgroundColor: isHovered ? socialIconStyle.hoverBackgroundColor : socialIconStyle.backgroundColor,
                                        color: isHovered ? socialIconStyle.hoverColor : socialIconStyle.color,
                                        borderRadius: socialIconStyle.borderRadius === 'rounded-full' ? '50%' : '8px',
                                        width: `${socialIconStyle.size + 16}px`,
                                        height: `${socialIconStyle.size + 16}px`,
                                    }}
                                    className="flex items-center justify-center transition-colors duration-300"
                                >
                                    {getSocialIcon(link.platform)}
                                </a>
                            );
                        })}
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {columns.map((col) => (
                        <div key={col.id}>
                            <h4 style={{ color: footer.headingColor }} className="font-bold mb-4 md:mb-6 text-lg">{col.title}</h4>
                            <ul className="space-y-2 md:space-y-3 text-base">
                                {col.links.map((link, idx) => (
                                    <li key={idx}>
                                        {link.url.startsWith('http') || link.url.startsWith('mailto') || link.url.startsWith('tel') ? (
                                            <a href={link.url} style={{ color: footer.linkColor }} className="hover:text-white transition-colors">{link.label}</a>
                                        ) : (
                                            <Link to={link.url} style={{ color: footer.linkColor }} className="hover:text-white transition-colors">{link.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div style={{ borderColor: footer.bottomBorderColor }} className="border-t w-full mt-10">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-center opacity-70">
                © {currentYear} {adminConfig.general.siteName}. All rights reserved.
            </div>
        </div>
    </footer>
  );
};