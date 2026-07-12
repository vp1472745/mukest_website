import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import {
  Camera, LayoutDashboard, Sliders, Image as ImageIcon, Heart, Users,
  ClipboardList, MessageSquare, BookOpen, Mail, Globe, Settings, LogOut,
  Plus, Edit2, Trash2, Check, X, Search, ChevronRight, Eye, ShieldAlert,
  ArrowUpDown, Loader2, Play
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('hero');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  // Form fields
  const [formFields, setFormFields] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null); // Used for About page banner
  const [mediaPreview, setMediaPreview] = useState('');
  const [mediaPreview2, setMediaPreview2] = useState('');

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const tabs = [
    { id: 'hero', name: 'Hero Sliders', icon: Sliders },
    { id: 'category', name: 'Categories', icon: Heart },
    { id: 'gallery', name: 'Featured Gallery', icon: ImageIcon },
    { id: 'service', name: 'Services Offered', icon: ClipboardList },
    { id: 'standard', name: 'Studio Standards', icon: Users },
    { id: 'process', name: 'Process Section', icon: BookOpen },
    { id: 'testimonial', name: 'Testimonials', icon: MessageSquare },
    { id: 'about', name: 'About Content', icon: LayoutDashboard },
    { id: 'contact', name: 'Contact Details', icon: Mail },
    { id: 'seo', name: 'SEO Settings', icon: Globe },
    { id: 'settings', name: 'Admin Profile', icon: Settings }
  ];

  useEffect(() => {
    const token = localStorage.getItem('lenscraft_admin_token');
    if (!token) {
      toast.warning('Access denied. Please login first.');
      navigate('/admin/login');
      return;
    }
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchUserData = async () => {
    try {
      const res = await api.auth.getProfile();
      setUserData(res.data.data);
    } catch (err) {
      console.error(err);
      handleLogout();
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const fetchData = async () => {
    setLoading(true);
    setSearchQuery('');
    setSortField('');
    try {
      if (['about', 'contact', 'seo'].includes(activeTab)) {
        let res;
        if (activeTab === 'seo') {
          res = await api.section.getAll('seo');
          setItems(res.data.data);
        } else {
          res = await api.singleSection.get(activeTab);
          setSingleData(res.data.data || {});
          // Populate form fields directly for single-document pages
          setFormFields(res.data.data || {});
        }
      } else {
        const res = await api.section.getAll(activeTab);
        setItems(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Error loading data for ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  // Toggle active states directly
  const handleToggleStatus = async (item) => {
    try {
      const updatedFields = { active: !item.active };
      await api.section.update(activeTab, item._id, updatedFields);
      toast.success(`${item.title || 'Item'} status toggled successfully`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle status');
    }
  };

  // Open forms modals
  const handleOpenFormModal = (item = null) => {
    setSelectedFile(null);
    setSelectedFile2(null);
    setMediaPreview('');
    setMediaPreview2('');
    
    if (item) {
      setEditingItem(item);
      setFormFields(item);
      if (item.mediaUrl || item.imageUrl) {
        setMediaPreview(item.mediaUrl || item.imageUrl);
      }
      if (item.bannerUrl) {
        setMediaPreview2(item.bannerUrl);
      }
    } else {
      setEditingItem(null);
      // Initialize default fields
      const defaults = { active: true };
      if (activeTab === 'hero') defaults.resourceType = 'image';
      if (activeTab === 'testimonial') defaults.rating = 5;
      setFormFields(defaults);
    }
    setIsFormModalOpen(true);
  };

  // File selection previews
  const handleFileChange = (e, index = 1) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (index === 1) {
        setSelectedFile(file);
        setMediaPreview(reader.result);
        if (activeTab === 'hero') {
          setFormFields(prev => ({
            ...prev,
            resourceType: file.type.startsWith('video/') ? 'video' : 'image'
          }));
        }
      } else {
        setSelectedFile2(file);
        setMediaPreview2(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isMultipart = ['hero', 'category', 'gallery', 'service', 'process', 'testimonial', 'about'].includes(activeTab);
      let payload;

      if (isMultipart) {
        payload = new FormData();
        Object.keys(formFields).forEach(key => {
          if (key !== 'mediaUrl' && key !== 'imageUrl' && key !== 'bannerUrl' && key !== 'images') {
            payload.append(key, formFields[key]);
          }
        });

        // Add files
        if (selectedFile) {
          payload.append(activeTab === 'gallery' ? 'files' : 'file', selectedFile);
        }
        if (selectedFile2 && activeTab === 'about') {
          payload.append('banner', selectedFile2);
        }
      } else {
        payload = formFields;
      }

      if (['about', 'contact'].includes(activeTab)) {
        await api.singleSection.update(activeTab, payload, isMultipart);
        toast.success(`${activeTab.toUpperCase()} content updated successfully`);
      } else if (activeTab === 'settings') {
        await api.auth.updateProfile(formFields);
        toast.success('Admin Profile updated successfully');
        fetchUserData();
      } else {
        if (editingItem) {
          await api.section.update(activeTab, editingItem._id, payload, isMultipart);
          toast.success(`${editingItem.title || 'Item'} updated successfully`);
        } else {
          await api.section.create(activeTab, payload, isMultipart);
          toast.success('Record created successfully');
        }
      }

      setIsFormModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const handleOpenDeleteModal = (item) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deletingItem) return;
    setLoading(true);
    try {
      await api.section.delete(activeTab, deletingItem._id);
      toast.success(`${deletingItem.title || 'Record'} deleted successfully`);
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete record');
    } finally {
      setLoading(false);
    }
  };

  // Sort handlers
  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // Filter query listings
  const getFilteredItems = () => {
    let list = [...items];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    }

    if (sortField) {
      list.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row antialiased font-sans select-none">
      
      {/* 1. Sidebar Nav */}
      <aside className="w-full md:w-64 bg-[#141414] border-r border-white/5 flex flex-col justify-between shrink-0">
        <div>
          {/* Dashboard Logo */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <Camera className="w-5.5 h-5.5 text-accent" />
            <span className="font-display font-semibold tracking-wide text-lg">
              LENSCRAFT <span className="text-accent text-[10px] uppercase font-sans tracking-widest block font-light">CMS Panel</span>
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsFormModalOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-accent/15 text-accent border-l-2 border-accent'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[10px] uppercase tracking-wider text-white/40">Mock Mode</span>
            <span className="px-2 py-0.5 text-[10px] bg-accent/20 text-accent font-semibold">
              {import.meta.env.VITE_API_USE_MOCK === 'true' ? 'ACTIVE' : 'OFFLINE'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/40 hover:bg-red-950/80 text-red-400 border border-red-900/40 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header Bar */}
        <header className="h-16 border-b border-white/5 bg-[#141414] px-6 md:px-8 flex items-center justify-between">
          <h1 className="font-display text-xl md:text-2xl font-light tracking-wide capitalize">
            Manage {tabs.find(t => t.id === activeTab)?.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/80 font-semibold">{userData?.email || 'Admin Portal'}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">System Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent font-semibold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          )}

          {!loading && (
            <>
              {/* Single edit layouts (About & Contact / Settings profile) */}
              {['about', 'contact', 'settings'].includes(activeTab) ? (
                <div className="bg-[#141414] border border-white/5 p-6 md:p-8 max-w-2xl">
                  <h3 className="font-display text-lg tracking-wide mb-6 text-accent">Edit {activeTab.toUpperCase()} Data</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    {/* About edit fields */}
                    {activeTab === 'about' && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Main Image</label>
                            <div className="relative border border-white/10 p-3 flex flex-col items-center bg-[#0a0a0a]">
                              {mediaPreview && <img src={mediaPreview} className="w-full h-32 object-cover mb-3" />}
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                              >
                                Upload Photo
                              </button>
                              <input ref={fileInputRef} type="file" onChange={(e) => handleFileChange(e, 1)} className="hidden" accept="image/*" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Header Banner</label>
                            <div className="relative border border-white/10 p-3 flex flex-col items-center bg-[#0a0a0a]">
                              {mediaPreview2 && <img src={mediaPreview2} className="w-full h-32 object-cover mb-3" />}
                              <button
                                type="button"
                                onClick={() => fileInputRef2.current?.click()}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                              >
                                Upload Banner
                              </button>
                              <input ref={fileInputRef2} type="file" onChange={(e) => handleFileChange(e, 2)} className="hidden" accept="image/*" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-white/50">Title</label>
                          <input
                            type="text"
                            value={formFields.title || ''}
                            onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-white/50">Subtitle</label>
                          <input
                            type="text"
                            value={formFields.subtitle || ''}
                            onChange={(e) => setFormFields({ ...formFields, subtitle: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs uppercase tracking-wider text-white/50">Paragraph Description</label>
                          <textarea
                            value={formFields.paragraph || ''}
                            onChange={(e) => setFormFields({ ...formFields, paragraph: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent min-h-[140px]"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Contact edit fields */}
                    {activeTab === 'contact' && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">Studio Address</label>
                            <input
                              type="text"
                              value={formFields.address || ''}
                              onChange={(e) => setFormFields({ ...formFields, address: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">Email</label>
                              <input
                                type="email"
                                value={formFields.email || ''}
                                onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">Phone Number</label>
                              <input
                                type="text"
                                value={formFields.phone || ''}
                                onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">Google Map Link</label>
                            <input
                              type="text"
                              value={formFields.googleMap || ''}
                              onChange={(e) => setFormFields({ ...formFields, googleMap: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                            />
                          </div>
                          <h4 className="text-xs uppercase tracking-wider text-accent border-b border-white/5 pb-2 mt-6">Social Platform Links</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-wider text-white/40">Facebook</label>
                              <input
                                type="text"
                                value={formFields.facebook || ''}
                                onChange={(e) => setFormFields({ ...formFields, facebook: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-wider text-white/40">Instagram</label>
                              <input
                                type="text"
                                value={formFields.instagram || ''}
                                onChange={(e) => setFormFields({ ...formFields, instagram: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-wider text-white/40">Twitter</label>
                              <input
                                type="text"
                                value={formFields.twitter || ''}
                                onChange={(e) => setFormFields({ ...formFields, twitter: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-wider text-white/40">Youtube</label>
                              <input
                                type="text"
                                value={formFields.youtube || ''}
                                onChange={(e) => setFormFields({ ...formFields, youtube: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Admin Settings profile edit fields */}
                    {activeTab === 'settings' && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">Login Email</label>
                            <input
                              type="email"
                              value={formFields.email || ''}
                              onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">New Password (leave blank to keep current)</label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              value={formFields.password || ''}
                              onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="px-6 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              ) : (
                
                /* List & CRUD Panel Layouts */
                <div className="space-y-6">
                  {/* Filters Header */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#141414] border border-white/5 p-4">
                    <div className="relative w-full sm:w-72">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <button
                      onClick={() => handleOpenFormModal(null)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Record</span>
                    </button>
                  </div>

                  {/* Listings Table / Grid */}
                  <div className="bg-[#141414] border border-white/5 overflow-hidden">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/5 uppercase tracking-wider text-white/60 font-semibold">
                          <th className="p-4 text-[10px] w-20">Media</th>
                          <th onClick={() => handleSort('title')} className="p-4 text-[10px] cursor-pointer hover:text-white">
                            Title <ArrowUpDown className="w-3 h-3 inline" />
                          </th>
                          {activeTab === 'gallery' && (
                            <th onClick={() => handleSort('category')} className="p-4 text-[10px] cursor-pointer hover:text-white w-32">
                              Category <ArrowUpDown className="w-3 h-3 inline" />
                            </th>
                          )}
                          {(activeTab === 'hero' || activeTab === 'category' || activeTab === 'service' || activeTab === 'standard' || activeTab === 'process' || activeTab === 'testimonial') && (
                            <th onClick={() => handleSort(activeTab === 'hero' ? 'sliderOrder' : activeTab === 'process' ? 'stepNumber' : 'displayOrder')} className="p-4 text-[10px] cursor-pointer hover:text-white w-24">
                              Order <ArrowUpDown className="w-3 h-3 inline" />
                            </th>
                          )}
                          <th className="p-4 text-[10px] w-24">Active</th>
                          <th className="p-4 text-[10px] w-28 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredItems().map((item) => (
                          <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-150">
                            <td className="p-4">
                              {item.mediaUrl || item.imageUrl ? (
                                item.resourceType === 'video' ? (
                                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center text-accent">
                                    <Play className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <img src={item.mediaUrl || item.imageUrl} className="w-12 h-12 object-cover border border-white/10" />
                                )
                              ) : (
                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                                  N/A
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-semibold text-white/80">
                              <div>
                                <p className="text-sm font-medium">{item.title || item.name || item.page}</p>
                                {item.subtitle && <p className="text-[10px] text-white/30">{item.subtitle}</p>}
                              </div>
                            </td>
                            {activeTab === 'gallery' && <td className="p-4 text-white/40">{item.category}</td>}
                            {(activeTab === 'hero' || activeTab === 'category' || activeTab === 'service' || activeTab === 'standard' || activeTab === 'process' || activeTab === 'testimonial') && (
                              <td className="p-4 font-mono text-white/40">
                                {item.sliderOrder ?? item.stepNumber ?? item.displayOrder ?? 0}
                              </td>
                            )}
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleStatus(item)}
                                className={`px-2 py-0.5 text-[10px] font-semibold cursor-pointer uppercase tracking-wider rounded-full ${
                                  item.active
                                    ? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-400'
                                    : 'bg-zinc-800 border border-zinc-700 text-zinc-500'
                                }`}
                              >
                                {item.active ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleOpenFormModal(item)}
                                className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white transition-colors duration-150 cursor-pointer inline-flex"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenDeleteModal(item)}
                                className="p-1.5 hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors duration-150 cursor-pointer inline-flex"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {getFilteredItems().length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-white/30">
                              No items found matching the queries.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* 3. CRUD Add/Edit Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#141414] border border-white/10 shadow-2xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-xl font-light tracking-wide text-accent border-b border-white/5 pb-2">
              {editingItem ? 'Edit Section Record' : 'Add New Record'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              {/* Media upload field (Image or Video) */}
              {['hero', 'category', 'gallery', 'service', 'process', 'testimonial'].includes(activeTab) && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50">Media Resource (Image / Video)</label>
                  <div className="border border-white/15 p-4 bg-[#0a0a0a] flex flex-col items-center justify-center relative">
                    {mediaPreview ? (
                      formFields.resourceType === 'video' ? (
                        <video src={mediaPreview} controls className="w-full max-h-40 object-cover mb-3" />
                      ) : (
                        <img src={mediaPreview} className="w-full max-h-40 object-cover mb-3" />
                      )
                    ) : (
                      <div className="py-6 text-center text-white/35 text-xs">No media uploaded. Select a file.</div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                    >
                      Select File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => handleFileChange(e, 1)}
                      className="hidden"
                      accept={activeTab === 'hero' || activeTab === 'process' ? 'image/*,video/*' : 'image/*'}
                    />
                  </div>
                </div>
              )}

              {/* Slider specifics */}
              {activeTab === 'hero' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">ResourceType</label>
                    <select
                      value={formFields.resourceType || 'image'}
                      onChange={(e) => setFormFields({ ...formFields, resourceType: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">Background Overlay Opacity</label>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      max="1"
                      value={formFields.backgroundOverlay ?? 0.65}
                      onChange={(e) => setFormFields({ ...formFields, backgroundOverlay: Number(e.target.value) })}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Title / Name */}
              {activeTab !== 'seo' && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === 'testimonial' ? 'Client Name' : 'Title'}
                  </label>
                  <input
                    type="text"
                    value={formFields.title || formFields.name || ''}
                    onChange={(e) => setFormFields({ 
                      ...formFields, 
                      [activeTab === 'testimonial' ? 'name' : 'title']: e.target.value 
                    })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                    required
                  />
                </div>
              )}

              {/* Subtitle / Step tags */}
              {['hero', 'category', 'gallery', 'service', 'process'].includes(activeTab) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === 'hero' ? 'Category Tagging List' : 'Subtitle'}
                  </label>
                  <input
                    type="text"
                    value={formFields.subtitle || formFields.paragraph || ''}
                    onChange={(e) => setFormFields({ 
                      ...formFields, 
                      [activeTab === 'hero' ? 'paragraph' : 'subtitle']: e.target.value 
                    })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              {/* Slider description text / Testimonial rating details */}
              {activeTab === 'hero' && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">Subtitle Italic Note</label>
                  <input
                    type="text"
                    value={formFields.subtitle || ''}
                    onChange={(e) => setFormFields({ ...formFields, subtitle: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              )}

              {/* Button settings (Hero Slider) */}
              {activeTab === 'hero' && (
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">Primary Button Text</label>
                    <input type="text" value={formFields.primaryButtonText || ''} onChange={(e) => setFormFields({ ...formFields, primaryButtonText: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">Primary Button Link</label>
                    <input type="text" value={formFields.primaryButtonLink || ''} onChange={(e) => setFormFields({ ...formFields, primaryButtonLink: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">Secondary Button Text</label>
                    <input type="text" value={formFields.secondaryButtonText || ''} onChange={(e) => setFormFields({ ...formFields, secondaryButtonText: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">Secondary Button Link</label>
                    <input type="text" value={formFields.secondaryButtonLink || ''} onChange={(e) => setFormFields({ ...formFields, secondaryButtonLink: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                </div>
              )}

              {/* Categories selection (Gallery item) */}
              {activeTab === 'gallery' && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">Select Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Weddings, Pre-Weddings"
                    value={formFields.category || ''}
                    onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                    required
                  />
                </div>
              )}

              {/* Gallery Location and Date */}
              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Date</label>
                    <input type="text" placeholder="Dec 12, 2025" value={formFields.date || ''} onChange={(e) => setFormFields({ ...formFields, date: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Location</label>
                    <input type="text" placeholder="Jodhpur" value={formFields.location || ''} onChange={(e) => setFormFields({ ...formFields, location: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none" />
                  </div>
                </div>
              )}

              {/* Icons setup (Category, Service, Standard) */}
              {['category', 'service', 'standard'].includes(activeTab) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">Lucide Icon Class/Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Heart, Camera, Sliders, Users"
                    value={formFields.icon || ''}
                    onChange={(e) => setFormFields({ ...formFields, icon: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              )}

              {/* Order fields / Step fields */}
              {(activeTab === 'hero' || activeTab === 'category' || activeTab === 'service' || activeTab === 'standard' || activeTab === 'process' || activeTab === 'testimonial') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      {activeTab === 'process' ? 'Step Number' : 'Display Order'}
                    </label>
                    <input
                      type="number"
                      value={formFields.sliderOrder ?? formFields.stepNumber ?? formFields.displayOrder ?? 0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (activeTab === 'hero') setFormFields({ ...formFields, sliderOrder: val });
                        else if (activeTab === 'process') setFormFields({ ...formFields, stepNumber: val });
                        else setFormFields({ ...formFields, displayOrder: val });
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="form-active"
                      checked={formFields.active ?? true}
                      onChange={(e) => setFormFields({ ...formFields, active: e.target.checked })}
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label htmlFor="form-active" className="text-xs uppercase tracking-wider text-white/60">Active Status</label>
                  </div>
                </div>
              )}

              {/* Testimonial rating details */}
              {activeTab === 'testimonial' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Rating (1 to 5 Stars)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formFields.rating ?? 5}
                      onChange={(e) => setFormFields({ ...formFields, rating: Number(e.target.value) })}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Description texts / Paragraph inputs */}
              {['category', 'gallery', 'service', 'standard', 'process', 'testimonial'].includes(activeTab) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === 'testimonial' ? 'Client Review' : 'Paragraph Description'}
                  </label>
                  <textarea
                    value={formFields.paragraph || formFields.description || formFields.review || ''}
                    onChange={(e) => setFormFields({ 
                      ...formFields, 
                      [activeTab === 'testimonial' ? 'review' : activeTab === 'standard' || activeTab === 'category' ? 'description' : 'paragraph']: e.target.value 
                    })}
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none min-h-[100px]"
                    required
                  />
                </div>
              )}

              {/* Gallery Featured Toggle */}
              {activeTab === 'gallery' && (
                <div className="flex items-center gap-6 pt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="form-active"
                      checked={formFields.active ?? true}
                      onChange={(e) => setFormFields({ ...formFields, active: e.target.checked })}
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label htmlFor="form-active" className="text-xs uppercase tracking-wider text-white/60">Active</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="form-featured"
                      checked={formFields.featured ?? false}
                      onChange={(e) => setFormFields({ ...formFields, featured: e.target.checked })}
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label htmlFor="form-featured" className="text-xs uppercase tracking-wider text-white/60">Featured</label>
                  </div>
                </div>
              )}

              {/* SEO Page Metadata Fields */}
              {activeTab === 'seo' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Meta Title</label>
                    <input type="text" value={formFields.metaTitle || ''} onChange={(e) => setFormFields({ ...formFields, metaTitle: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Meta Description</label>
                    <textarea value={formFields.metaDescription || ''} onChange={(e) => setFormFields({ ...formFields, metaDescription: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none min-h-[80px]" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">Keywords (Comma-separated)</label>
                    <input type="text" placeholder="wedding photography, luxury event planner" value={formFields.keywords || ''} onChange={(e) => setFormFields({ ...formFields, keywords: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none" />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Submit Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-sm bg-[#141414] border border-white/10 shadow-2xl p-6 text-center space-y-6">
            <div className="w-12 h-12 bg-red-950/40 text-red-400 border border-red-900/40 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide text-white">Delete Record?</h3>
              <p className="text-white/40 text-xs mt-2 leading-relaxed">
                Are you absolutely sure you want to remove <strong className="text-white">{deletingItem?.title || deletingItem?.name || 'this item'}</strong>? This operation is permanent.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                className="flex-1 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
