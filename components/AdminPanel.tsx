

import React, { useState } from 'react';
import { useApp } from '../context';
import { HeroSlide, NavItem } from '../types';
import { Settings, X, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Video, Palette, ChevronsLeft, ChevronsRight, UploadCloud, LayoutTemplate, Brush, Menu as MenuIcon, CaseSensitive, ChevronDown, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, Type, Footprints, Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';
// @google/genai Coding Guidelines: DO add comment above each fix.
// Import fileToBase64 from the new utility file
import { fileToBase64 } from '../utils/fileUtils';


// Main Admin Panel Component
export const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[60] bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center animate-[scaleIn_0.2s_ease-out]"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 z-[60] w-full sm:w-96 bg-white border-l border-gray-200 shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out]">
      <div className="p-4 flex justify-between items-center border-b bg-gray-50">
        <div className="flex items-center gap-2">
            <Settings size={18} className="text-primary"/>
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"><X size={20} /></button>
      </div>

      <div className="border-b">
        <div className="flex p-1 bg-gray-100 overflow-x-auto no-scrollbar">
            <TabButton id="hero" activeTab={activeTab} setActiveTab={setActiveTab} icon={LayoutTemplate}>Hero</TabButton>
            <TabButton id="navigation" activeTab={activeTab} setActiveTab={setActiveTab} icon={MenuIcon}>Nav</TabButton>
            <TabButton id="theme" activeTab={activeTab} setActiveTab={setActiveTab} icon={Brush}>Theme</TabButton>
            <TabButton id="footer" activeTab={activeTab} setActiveTab={setActiveTab} icon={Footprints}>Footer</TabButton>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scroll">
        {activeTab === 'hero' && <HeroEditor />}
        {activeTab === 'navigation' && <NavigationEditor />}
        {activeTab === 'theme' && <ThemeEditor />}
        {activeTab === 'footer' && <FooterEditor />}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ id, activeTab, setActiveTab, icon: Icon, children }: any) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`flex-1 min-w-[80px] flex items-center justify-center gap-2 text-sm font-bold p-2 rounded-md transition-colors whitespace-nowrap ${activeTab === id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
    >
        <Icon size={16} />
        {children}
    </button>
);


// Hero Editor Component
const HeroEditor = () => {
    const { heroSlides, addHeroSlide, deleteHeroSlide, updateHeroSlide, reorderHeroSlides } = useApp();
    const [activeSlideId, setActiveSlideId] = useState<string | null>(heroSlides[0]?.id || null);
    const [openAccordion, setOpenAccordion] = useState<string | null>('content');
    const activeSlide = heroSlides.find(s => s.id === activeSlideId);

    const handleFileChange = async (id: string, field: keyof HeroSlide, file: File | null) => {
        if (!file) {
             updateHeroSlide(id, { [field]: '' } as Partial<HeroSlide>);
             return;
        };
        const base64 = await fileToBase64(file);
        updateHeroSlide(id, { [field]: base64 } as Partial<HeroSlide>);
    };

    return (
        <div>
            {/* SLIDE LIST */}
            <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase">Slides</h3>
                    <button onClick={addHeroSlide} className="text-xs font-bold text-primary hover:underline flex items-center gap-1"><Plus size={14}/> Add Slide</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scroll pr-1">
                    {heroSlides.map((slide, index) => (
                        <div 
                            key={slide.id} 
                            onClick={() => setActiveSlideId(slide.id)}
                            className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer border-2 ${activeSlideId === slide.id ? 'bg-primary-light border-primary' : 'bg-gray-50 border-transparent hover:border-gray-300'}`}
                        >
                           <img src={slide.heroImage || "https://placehold.co/100x60"} alt="slide" className="w-12 h-8 object-cover rounded"/>
                           <div className="flex-1 text-sm font-bold truncate">{slide.id}</div>
                           <div className="flex items-center">
                               <button onClick={(e) => { e.stopPropagation(); reorderHeroSlides(slide.id, 'up'); }} disabled={index === 0} className="p-1 disabled:opacity-30"><ArrowUp size={16}/></button>
                               <button onClick={(e) => { e.stopPropagation(); reorderHeroSlides(slide.id, 'down'); }} disabled={index === heroSlides.length - 1} className="p-1 disabled:opacity-30"><ArrowDown size={16}/></button>
                               <button onClick={(e) => { e.stopPropagation(); deleteHeroSlide(slide.id); }} disabled={heroSlides.length <= 1} className="p-1 text-red-500 disabled:opacity-30"><Trash2 size={16}/></button>
                           </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SLIDE EDITOR */}
            <div className="divide-y">
                {activeSlide ? (
                    <>
                        <Accordion title="Content Config" id="content" open={openAccordion} setOpen={setOpenAccordion}>
                            <div className="space-y-4 pt-2">
                                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    Edit titles and text directly on the page. Use this section for links and layout.
                                </p>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Primary Button Link</label>
                                    <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                                        <div className="p-2 border-r bg-gray-100 text-gray-500"><LinkIcon size={14}/></div>
                                        <input type="text" value={activeSlide.ctaPrimaryLink || ''} onChange={e => updateHeroSlide(activeSlide.id, { ctaPrimaryLink: e.target.value })} className="w-full p-2 text-sm bg-transparent outline-none"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Secondary Button Link</label>
                                    <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                                        <div className="p-2 border-r bg-gray-100 text-gray-500"><LinkIcon size={14}/></div>
                                        <input type="text" value={activeSlide.ctaSecondaryLink || ''} onChange={e => updateHeroSlide(activeSlide.id, { ctaSecondaryLink: e.target.value })} className="w-full p-2 text-sm bg-transparent outline-none"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1">Text Alignment</label>
                                    <div className="flex bg-gray-100 p-1 rounded-lg">
                                        {['left', 'center', 'right'].map((align) => (
                                            <button 
                                                key={align} 
                                                onClick={() => updateHeroSlide(activeSlide.id, { textAlignment: align as any })}
                                                className={`flex-1 p-2 rounded flex justify-center ${activeSlide.textAlignment === align ? 'bg-white shadow text-primary' : 'text-gray-400'}`}
                                            >
                                                {align === 'left' && <AlignLeft size={16}/>}
                                                {align === 'center' && <AlignCenter size={16}/>}
                                                {align === 'right' && <AlignRight size={16}/>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Accordion>

                        <Accordion title="Background Media" id="background" open={openAccordion} setOpen={setOpenAccordion}>
                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-3 gap-2">
                                    {(['color', 'image', 'video'] as const).map(type => (
                                        <button key={type} onClick={() => updateHeroSlide(activeSlide.id, { backgroundType: type })} className={`px-2 py-2 text-xs font-bold rounded-lg border-2 flex flex-col items-center justify-center gap-1 ${activeSlide.backgroundType === type ? 'bg-primary-light border-primary text-primary' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-500'}`}>
                                            {type === 'color' && <Palette size={16}/>} {type === 'image' && <ImageIcon size={16}/>} {type === 'video' && <Video size={16}/>}
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                {activeSlide.backgroundType === 'color' && <ColorInput label="Background Color" value={activeSlide.backgroundColor} onChange={(v) => updateHeroSlide(activeSlide.id, { backgroundColor: v })} />}
                                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                                {/* Replaced `FileUpload` with the newly defined local component. */}
                                <FileUpload onChange={(file) => handleFileChange(activeSlide.id, 'backgroundImage', file)} currentSrc={activeSlide.backgroundImage} />
                                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                                {/* Replaced `FileUpload` with the newly defined local component. */}
                                <FileUpload onChange={(file) => handleFileChange(activeSlide.id, 'backgroundVideo', file)} currentSrc={activeSlide.backgroundVideo} accept="video/*" />
                            </div>
                        </Accordion>

                        <Accordion title="Visual Style" id="style" open={openAccordion} setOpen={setOpenAccordion}>
                            <div className="space-y-4 pt-2">
                                <ColorInput label="Text Color" value={activeSlide.textColor || '#ffffff'} onChange={(v) => updateHeroSlide(activeSlide.id, { textColor: v })} />
                                <ColorInput label="Overlay Color" value={activeSlide.overlayColor} onChange={(v) => updateHeroSlide(activeSlide.id, { overlayColor: v })} />
                                
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-xs font-bold text-gray-500">Overlay Opacity</label>
                                        <span className="text-xs text-gray-500">{Math.round(activeSlide.overlayOpacity * 100)}%</span>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.05" value={activeSlide.overlayOpacity} onChange={(e) => updateHeroSlide(activeSlide.id, { overlayOpacity: parseFloat(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-2">Gradient Type</label>
                                    <select 
                                        value={activeSlide.overlayGradient || 'none'}
                                        onChange={(e) => updateHeroSlide(activeSlide.id, { overlayGradient: e.target.value as any })}
                                        className="w-full p-2 bg-gray-50 border rounded-lg text-sm"
                                    >
                                        <option value="none">Flat Color</option>
                                        <option value="left">Left Gradient (Text Left)</option>
                                        <option value="right">Right Gradient (Text Right)</option>
                                        <option value="bottom">Bottom Gradient</option>
                                        <option value="radial">Radial Gradient</option>
                                    </select>
                                </div>
                            </div>
                        </Accordion>

                        <Accordion title="Foreground Image" id="foreground" open={openAccordion} setOpen={setOpenAccordion}>
                            <div className="pt-2">
                                <p className="text-xs text-gray-500 mb-3">Optional side image that appears next to text (hidden on center alignment).</p>
                                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                                {/* Replaced `FileUpload` with the newly defined local component. */}
                                <FileUpload onChange={(file) => handleFileChange(activeSlide.id, 'heroImage', file)} currentSrc={activeSlide.heroImage} />
                            </div>
                        </Accordion>
                    </>
                ) : (
                    <p className="text-sm text-gray-500 text-center py-10">Select a slide to edit.</p>
                )}
            </div>
        </div>
    );
};

// Navigation Editor Component
const NavigationEditor = () => {
    const { navigationStructure, updateNavigationStructure } = useApp();

    const handleUpdate = (path: (string | number)[], value: any) => {
        const newStructure = JSON.parse(JSON.stringify(navigationStructure));
        let current: any = newStructure;
        for(let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        updateNavigationStructure(newStructure);
    };

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Main Navigation Items</h3>
            {navigationStructure.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                    <input type="text" value={item.label} onChange={(e) => handleUpdate([index, 'label'], e.target.value)} className="w-full p-1 border-b mb-2 font-bold bg-transparent" />
                    <input type="text" placeholder="Href (e.g., /about)" value={item.href || ''} onChange={(e) => handleUpdate([index, 'href'], e.target.value)} className="w-full p-1 border-b text-sm bg-transparent" />
                    
                    {item.children?.map((category, catIndex) => (
                        <div key={catIndex} className="mt-3 pt-3 border-t">
                            <input type="text" value={category.title} onChange={(e) => handleUpdate([index, 'children', catIndex, 'title'], e.target.value)} className="w-full p-1 mb-2 font-bold text-xs uppercase text-gray-500 bg-transparent"/>
                            <div className="space-y-2 pl-2">
                                {category.items.map((subItem, subIndex) => (
                                    <div key={subIndex} className="bg-white p-2 rounded border">
                                        <input type="text" value={subItem.label} onChange={(e) => handleUpdate([index, 'children', catIndex, 'items', subIndex, 'label'], e.target.value)} className="w-full p-1 border-b text-sm font-semibold"/>
                                        <input type="text" value={subItem.href} onChange={(e) => handleUpdate([index, 'children', catIndex, 'items', subIndex, 'href'], e.target.value)} className="w-full p-1 border-b text-xs"/>
                                        <textarea value={subItem.description} onChange={(e) => handleUpdate([index, 'children', catIndex, 'items', subIndex, 'description'], e.target.value)} className="w-full p-1 text-xs mt-1" rows={2}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// Theme Editor Component
const ThemeEditor = () => {
    const { themeSettings, updateThemeSetting } = useApp();
    const { colors, buttons, layout, cards } = themeSettings;
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const handleButtonChange = (variant: 'primary' | 'secondary', prop: string, value: string) => {
        updateThemeSetting(`buttons.${variant}.${prop}`, value);
    };
    
    const handleCardChange = (variant: string, prop: string, value: string) => {
        updateThemeSetting(`cards.${variant}.${prop}`, value);
    };

    return (
        <div className="divide-y">
            <Accordion title="Global Colors" id="colors" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-2 pt-2">
                    <ColorInput label="Primary" value={colors.primary} onChange={(v) => updateThemeSetting('colors.primary', v)} />
                    <ColorInput label="Secondary" value={colors.secondary} onChange={(v) => updateThemeSetting('colors.secondary', v)} />
                    <ColorInput label="Accent" value={colors.accent} onChange={(v) => updateThemeSetting('colors.accent', v)} />
                </div>
            </Accordion>
            <Accordion title="Button Styles" id="buttons" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-4 pt-2">
                    <ButtonEditor variant="primary" style={buttons.primary} onChange={handleButtonChange} />
                    <ButtonEditor variant="secondary" style={buttons.secondary} onChange={handleButtonChange} />
                </div>
            </Accordion>
             <Accordion title="Layout" id="layout" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-4 pt-2">
                    <div>
                        <label className="text-sm font-bold block mb-1">Hero Height</label>
                        <input type="text" value={layout.heroHeight} onChange={e => updateThemeSetting('layout.heroHeight', e.target.value)} className="w-full p-2 border rounded-lg" placeholder="e.g., 700px or 100vh"/>
                    </div>
                    <div>
                        <label className="text-sm font-bold block">Hero Text Width ({layout.heroTextContainerWidth}/12)</label>
                        <input type="range" min="3" max="9" value={layout.heroTextContainerWidth} onChange={e => updateThemeSetting('layout.heroTextContainerWidth', parseInt(e.target.value))} className="w-full"/>
                    </div>
                    <div>
                        <label className="text-sm font-bold block">Hero Image Width ({layout.heroImageContainerWidth}/12)</label>
                        <input type="range" min="3" max="9" value={layout.heroImageContainerWidth} onChange={e => updateThemeSetting('layout.heroImageContainerWidth', parseInt(e.target.value))} className="w-full"/>
                    </div>
                </div>
            </Accordion>
             <Accordion title="Card Styles" id="cards" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-4 pt-2">
                    <CardEditor title="Services Cards" variant="services" styles={cards.services} onChange={handleCardChange} />
                    <CardEditor title="Industries Cards" variant="industries" styles={cards.industries} onChange={handleCardChange} />
                    <CardEditor title="Process Cards" variant="process" styles={cards.process} onChange={handleCardChange} />
                    <CardEditor title="Testimonials Cards" variant="testimonials" styles={cards.testimonials} onChange={handleCardChange} />
                </div>
            </Accordion>
        </div>
    );
};

// Footer Editor Component
const FooterEditor = () => {
    const { themeSettings, updateThemeSetting } = useApp();
    const { footer } = themeSettings;
    const [openAccordion, setOpenAccordion] = useState<string | null>('colors');
    const [newLinkPlatform, setNewLinkPlatform] = useState('linkedin');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    const handleFooterChange = (prop: string, value: any) => {
        updateThemeSetting(`footer.${prop}`, value);
    };

    const addSocialLink = () => {
        const newLink = {
            id: Date.now().toString(),
            platform: newLinkPlatform,
            url: newLinkUrl
        };
        handleFooterChange('socialLinks', [...footer.socialLinks, newLink]);
        setNewLinkUrl('');
    };

    const removeSocialLink = (id: string) => {
        handleFooterChange('socialLinks', footer.socialLinks.filter(l => l.id !== id));
    };

    const handleColumnLinkChange = (colId: string, linkIdx: number, field: string, value: string) => {
        const newColumns = [...footer.columns];
        const col = newColumns.find(c => c.id === colId);
        if (col) {
            col.links[linkIdx] = { ...col.links[linkIdx], [field]: value };
            handleFooterChange('columns', newColumns);
        }
    };

    const handleColumnTitleChange = (colId: string, value: string) => {
        const newColumns = [...footer.columns];
        const col = newColumns.find(c => c.id === colId);
        if (col) {
            col.title = value;
            handleFooterChange('columns', newColumns);
        }
    };

    return (
        <div className="divide-y">
            <Accordion title="Footer Colors" id="colors" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-2 pt-2">
                    <ColorInput label="Background" value={footer.backgroundColor} onChange={(v) => handleFooterChange('backgroundColor', v)} />
                    <ColorInput label="Text" value={footer.textColor} onChange={(v) => handleFooterChange('textColor', v)} />
                    <ColorInput label="Headings" value={footer.headingColor} onChange={(v) => handleFooterChange('headingColor', v)} />
                    <ColorInput label="Links" value={footer.linkColor} onChange={(v) => handleFooterChange('linkColor', v)} />
                    <ColorInput label="Border" value={footer.bottomBorderColor} onChange={(v) => handleFooterChange('bottomBorderColor', v)} />
                </div>
            </Accordion>

            <Accordion title="Social Icons" id="social" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-4 pt-2">
                    {/* Style Config */}
                    <div className="bg-gray-50 p-3 rounded-lg border space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500">Icon Style</label>
                        <div className="grid grid-cols-2 gap-2"> {/* Made responsive */}
                            <div>
                                <label className="text-xs">Size</label>
                                <input type="number" value={footer.socialIconStyle.size} onChange={e => handleFooterChange('socialIconStyle.size', parseInt(e.target.value))} className="w-full p-1 border rounded text-sm"/>
                            </div>
                            <div>
                                <label className="text-xs">Radius</label>
                                <select value={footer.socialIconStyle.borderRadius} onChange={e => handleFooterChange('socialIconStyle.borderRadius', e.target.value)} className="w-full p-1 border rounded text-sm bg-white">
                                    <option value="rounded-none">Square</option>
                                    <option value="rounded-md">Rounded</option>
                                    <option value="rounded-full">Circle</option>
                                </select>
                            </div>
                        </div>
                        <ColorInput label="Icon BG" value={footer.socialIconStyle.backgroundColor} onChange={(v) => handleFooterChange('socialIconStyle.backgroundColor', v)} />
                        <ColorInput label="Icon Color" value={footer.socialIconStyle.color} onChange={(v) => handleFooterChange('socialIconStyle.color', v)} />
                        <ColorInput label="Hover BG" value={footer.socialIconStyle.hoverBackgroundColor} onChange={(v) => handleFooterChange('socialIconStyle.hoverBackgroundColor', v)} />
                        <ColorInput label="Hover Color" value={footer.socialIconStyle.hoverColor} onChange={(v) => handleFooterChange('socialIconStyle.hoverColor', v)} />
                    </div>

                    {/* Links List */}
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-500">Manage Links</label>
                         {footer.socialLinks.map(link => (
                             <div key={link.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
                                 <span className="capitalize text-xs font-bold w-20">{link.platform}</span>
                                 <div className="flex-1 text-xs truncate text-gray-500">{link.url}</div>
                                 <button onClick={() => removeSocialLink(link.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={14}/></button>
                             </div>
                         ))}
                    </div>

                    {/* Add New Link */}
                    <div className="flex flex-col md:flex-row gap-2 items-end"> {/* Made responsive */}
                        <div className="flex-1 w-full">
                            <label className="text-xs">Platform</label>
                            <select value={newLinkPlatform} onChange={e => setNewLinkPlatform(e.target.value)} className="w-full p-1.5 border rounded text-sm bg-white">
                                <option value="linkedin">LinkedIn</option>
                                <option value="twitter">Twitter (X)</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                                <option value="github">GitHub</option>
                            </select>
                        </div>
                        <div className="flex-[2] w-full">
                            <label className="text-xs">URL</label>
                            <input type="text" value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} placeholder="https://..." className="w-full p-1.5 border rounded text-sm"/>
                        </div>
                        <button onClick={addSocialLink} disabled={!newLinkUrl} className="p-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50 w-full md:w-auto"> {/* Made responsive */}
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </Accordion>

            <Accordion title="Columns & Links" id="columns" open={openAccordion} setOpen={setOpenAccordion}>
                <div className="space-y-4 pt-2">
                    {footer.columns.map((col) => (
                        <div key={col.id} className="bg-gray-50 p-3 rounded-lg border">
                            <input 
                                type="text" 
                                value={col.title} 
                                onChange={(e) => handleColumnTitleChange(col.id, e.target.value)} 
                                className="w-full font-bold bg-transparent border-b border-gray-300 focus:border-primary outline-none mb-3 pb-1"
                            />
                            <div className="space-y-2 pl-2">
                                {col.links.map((link, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-2"> {/* Made responsive */}
                                        <input 
                                            type="text" 
                                            value={link.label} 
                                            onChange={(e) => handleColumnLinkChange(col.id, idx, 'label', e.target.value)} 
                                            className="flex-1 p-1 text-xs border rounded"
                                        />
                                        <input 
                                            type="text" 
                                            value={link.url} 
                                            onChange={(e) => handleColumnLinkChange(col.id, idx, 'url', e.target.value)} 
                                            className="flex-1 p-1 text-xs border rounded text-gray-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="text-xs text-gray-500 text-center italic p-2">
                        Use the theme settings to add/remove columns (advanced)
                    </div>
                </div>
            </Accordion>
        </div>
    );
};

const Accordion = ({ title, id, open, setOpen, children }: any) => (
    <div>
        <button onClick={() => setOpen(open === id ? null : id)} className="w-full text-left p-4 font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50">
           {title}
           <ChevronDown className={`transition-transform duration-200 ${open === id ? 'rotate-180' : ''}`} size={18} />
        </button>
        <div className={`px-4 transition-all duration-300 ease-in-out overflow-hidden ${open === id ? 'max-h-[500px] overflow-y-auto pb-4 custom-scroll' : 'max-h-0'}`}>
            {children}
        </div>
    </div>
);

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void}) => (
    <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 p-0.5 border rounded cursor-pointer shrink-0"/>
        <label className="text-xs font-bold w-20 shrink-0 text-gray-500">{label}</label>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full p-1.5 border-b text-sm"/>
    </div>
);

const ButtonEditor = ({ variant, style, onChange }: any) => (
    <div className="bg-gray-50 p-3 rounded-lg border">
        <h4 className="font-bold capitalize mb-2">{variant} Button</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2"> {/* Made responsive */}
            <div>
                <label className="text-xs">BG Color</label>
                <input type="color" value={style.backgroundColor} onChange={e => onChange(variant, 'backgroundColor', e.target.value)} className="w-full h-8 p-0.5 border rounded cursor-pointer"/>
            </div>
             <div>
                <label className="text-xs">Text Color</label>
                <input type="color" value={style.textColor} onChange={e => onChange(variant, 'textColor', e.target.value)} className="w-full h-8 p-0.5 border rounded cursor-pointer"/>
            </div>
             <div>
                <label className="text-xs">Hover BG</label>
                <input type="color" value={style.hoverBackgroundColor} onChange={e => onChange(variant, 'hoverBackgroundColor', e.target.value)} className="w-full h-8 p-0.5 border rounded cursor-pointer"/>
            </div>
            <div>
                <label className="text-xs">Border Radius</label>
                <input type="text" value={style.borderRadius} onChange={e => onChange(variant, 'borderRadius', e.target.value)} className="w-full p-1 text-xs border rounded"/>
            </div>
        </div>
    </div>
);

const CardEditor = ({ title, variant, styles, onChange }: any) => (
    <div className="bg-gray-50 p-3 rounded-lg border">
        <h4 className="font-bold capitalize mb-2">{title}</h4>
        <div className="space-y-2">
            <ColorInput label="BG Color" value={styles.backgroundColor} onChange={v => onChange(variant, 'backgroundColor', v)} />
            <ColorInput label="Hover BG" value={styles.hoverBackgroundColor} onChange={v => onChange(variant, 'hoverBackgroundColor', v)} />
            <ColorInput label="Icon BG" value={styles.iconContainerBackgroundColor} onChange={v => onChange(variant, 'iconContainerBackgroundColor', v)} />
            <ColorInput label="Icon Color" value={styles.iconColor} onChange={v => onChange(variant, 'iconColor', v)} />
            <ColorInput label="Title Color" value={styles.titleColor} onChange={v => onChange(variant, 'titleColor', v)} />
            <ColorInput label="Desc Color" value={styles.descriptionColor} onChange={v => onChange(variant, 'descriptionColor', v)} />
            <div className="flex items-center gap-2 pt-2">
                 <label className="text-sm font-bold w-20 shrink-0">Padding</label>
                 <input type="text" value={styles.padding} onChange={e => onChange(variant, 'padding', e.target.value)} className="w-full p-1 border-b text-sm"/>
            </div>
            <div className="flex items-center gap-2">
                 <label className="text-sm font-bold w-20 shrink-0">Radius</label>
                 <input type="text" value={styles.borderRadius} onChange={e => onChange(variant, 'borderRadius', e.target.value)} className="w-full p-1 border-b text-sm"/>
            </div>
        </div>
    </div>
);

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