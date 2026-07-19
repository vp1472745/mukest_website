import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/common/ConfirmationModal";
import {
  Camera,
  LayoutDashboard,
  Sliders,
  Database,
  Image as ImageIcon,
  Heart,
  Users,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Mail,
  Globe,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  ChevronRight,
  Eye,
  ShieldAlert,
  ArrowUpDown,
  Loader2,
  Play,
  Menu,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [seedModalOpen, setSeedModalOpen] = useState(false);

  // Form fields
  const [formFields, setFormFields] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaPreview2, setMediaPreview2] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const tabs = [
    { id: "hero", name: "Hero Sliders", icon: Sliders },
    { id: "category", name: "Categories", icon: Heart },
    { id: "gallery", name: "Featured Gallery", icon: ImageIcon },
    { id: "film", name: "Cinematic Films", icon: Play },
    { id: "service", name: "Services Offered", icon: ClipboardList },
    { id: "standard", name: "Studio Standards", icon: Users },
    { id: "process", name: "Process Section", icon: BookOpen },
    // { id: 'testimonial', name: 'Testimonials', icon: MessageSquare },
    // { id: 'about', name: 'About Content', icon: LayoutDashboard },
    { id: "contact", name: "Contact Details", icon: Mail },
    // { id: 'seo', name: 'SEO Settings', icon: Globe },
    // { id: 'settings', name: 'Admin Profile', icon: Settings }
  ];

  useEffect(() => {
    const token = localStorage.getItem("lenscraft_admin_token");
    if (!token) {
      toast.warning("Access denied. Please login first.");
      navigate("/admin/login");
      return;
    }
    fetchUserData();
    fetchCategories();
  }, [navigate]);

  useEffect(() => {
    fetchData();
    setSelectedIds([]);
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

  const fetchCategories = async () => {
    try {
      const res = await api.section.getAll("category");
      setCategoriesList(res.data.data || []);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleSeedDatabase = async () => {
    setSeedModalOpen(false);
    setLoading(true);
    try {
      const res = await api.db.seed();
      toast.success(res.data.message || "Database seeded/reset successfully!");
      fetchData();
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Seeding failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setSearchQuery("");
    setSortField("");
    try {
      if (["about", "contact", "seo"].includes(activeTab)) {
        let res;
        if (activeTab === "seo") {
          res = await api.section.getAll("seo");
          setItems(res.data.data);
        } else {
          res = await api.singleSection.get(activeTab);
          setSingleData(res.data.data || {});
          setFormFields(res.data.data || {});
        }
      } else {
        const targetSection = activeTab === "film" ? "gallery" : activeTab;
        const res = await api.section.getAll(targetSection);
        let data = res.data.data || [];
        if (activeTab === "film") {
          data = data.filter(item => item.category === "Film" || item.videoUrl);
        }
        setItems(data);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Error loading data for ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      const updatedFields = { active: !item.active };
      const targetSection = activeTab === "film" ? "gallery" : activeTab;
      await api.section.update(targetSection, item._id, updatedFields);
      toast.success(`${item.title || "Item"} status toggled successfully`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle status");
    }
  };

const parseDateToInputFormat = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return dateStr;
};

  const handleOpenFormModal = (item = null) => {
    setSelectedFile(null);
    setSelectedFile2(null);
    setMediaPreview("");
    setMediaPreview2("");
    setSelectedFiles([]);
    setMediaPreviews([]);

    if (item) {
      setEditingItem(item);
      const fieldsCopy = { ...item };
      if ((activeTab === "gallery" || activeTab === "film") && fieldsCopy.date) {
        fieldsCopy.date = parseDateToInputFormat(fieldsCopy.date);
      }
      setFormFields(fieldsCopy);
      if (item.mediaUrl || item.imageUrl) {
        setMediaPreview(item.mediaUrl || item.imageUrl);
      }
      if (item.bannerUrl) {
        setMediaPreview2(item.bannerUrl);
      }
      if ((activeTab === "gallery" || activeTab === "film") && item.images) {
        setMediaPreviews(
          item.images.map((img) => ({ url: img.secure_url, type: "image" })),
        );
      }
    } else {
      setEditingItem(null);
      const defaults = { active: true };
      if (activeTab === "hero") defaults.resourceType = "image";
      if (activeTab === "testimonial") defaults.rating = 5;
      if (activeTab === "film") defaults.category = "Film";
      setFormFields(defaults);
    }
    setIsFormModalOpen(true);
  };

  const handleFileChange = (e, index = 1) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (index === 1) {
      setSelectedFiles(files);
      setSelectedFile(files[0]);

      const previewPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              url: reader.result,
              type: file.type.startsWith("video/") ? "video" : "image",
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previewPromises).then((previews) => {
        setMediaPreviews(previews);
        if (previews.length > 0) {
          setMediaPreview(previews[0].url);
          if (activeTab === "hero") {
            setFormFields((prev) => ({
              ...prev,
              resourceType: previews[0].type,
            }));
          }
        }
      });
    } else {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile2(file);
        setMediaPreview2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isMultipart = [
        "hero",
        "category",
        "gallery",
        "film",
        "service",
        "process",
        "testimonial",
        "about",
      ].includes(activeTab);
      let payload;

      if (isMultipart) {
        payload = new FormData();
        Object.keys(formFields).forEach((key) => {
          if (
            key !== "mediaUrl" &&
            key !== "imageUrl" &&
            key !== "bannerUrl" &&
            key !== "images"
          ) {
            payload.append(key, formFields[key]);
          }
        });

        if (selectedFiles && selectedFiles.length > 0) {
          selectedFiles.forEach((file) => {
            payload.append((activeTab === "gallery" || activeTab === "film") ? "files" : "file", file);
          });
        } else if (selectedFile) {
          payload.append(
            (activeTab === "gallery" || activeTab === "film") ? "files" : "file",
            selectedFile,
          );
        }

        if (selectedFile2 && activeTab === "about") {
          payload.append("banner", selectedFile2);
        }

        if (activeTab === "film") {
          payload.set("category", "Film");
        }
      } else {
        payload = { ...formFields };
        if (activeTab === "film") {
          payload.category = "Film";
        }
      }

      if (["about", "contact"].includes(activeTab)) {
        await api.singleSection.update(activeTab, payload, isMultipart);
        toast.success(
          `${activeTab.toUpperCase()} content updated successfully`,
        );
      } else if (activeTab === "settings") {
        await api.auth.updateProfile(formFields);
        toast.success("Admin Profile updated successfully");
        fetchUserData();
      } else {
        const targetSection = activeTab === "film" ? "gallery" : activeTab;
        if (editingItem) {
          await api.section.update(
            targetSection,
            editingItem._id,
            payload,
            isMultipart,
          );
          toast.success(`${editingItem.title || "Item"} updated successfully`);
        } else {
          await api.section.create(targetSection, payload, isMultipart);
          toast.success("Record created successfully");
        }
      }

      setIsFormModalOpen(false);
      fetchData();
      if (activeTab === "category") {
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Operation failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (item) => {
    setDeletingItem(item);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deletingItem) return;
    setLoading(true);
    try {
      const targetSection = activeTab === "film" ? "gallery" : activeTab;
      await api.section.delete(targetSection, deletingItem._id);
      toast.success(`${deletingItem.title || "Record"} deleted successfully`);
      setIsDeleteModalOpen(false);
      fetchData();
      if (activeTab === "category") {
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    setLoading(true);
    try {
      const targetSection = activeTab === "film" ? "gallery" : activeTab;
      await Promise.all(
        selectedIds.map((id) => api.section.delete(targetSection, id))
      );
      toast.success("Selected records deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedIds([]);
      fetchData();
      if (activeTab === "category") {
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete selected records");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const getFilteredItems = () => {
    let list = [...items];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.category && item.category.toLowerCase().includes(q)),
      );
    }

    if (sortField) {
      list.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  };

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex antialiased font-sans select-none overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-[#141414] border-r border-white/5 
                    flex flex-col shrink-0 transition-transform duration-300 
                    md:static md:translate-x-0
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
      >
        {/* Sidebar Logo — top */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Camera className="w-5.5 h-5.5 text-accent" />
            <span className="font-display font-semibold tracking-wide text-lg">
              LENSCRAFT{" "}
              <span className="text-accent text-[10px] uppercase font-sans tracking-widest block font-light">
                CMS Panel
              </span>
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-white/5 text-white/50 hover:text-white rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation — scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsFormModalOpen(false);
                  setIsSidebarOpen(false);
                }}
                className={`
                                    w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold 
                                    transition-all duration-200 cursor-pointer
                                    ${
                                      activeTab === tab.id
                                        ? "bg-accent/15 text-accent border-l-2 border-accent"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                    }
                                `}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer — pinned to bottom */}
        <div className="shrink-0 p-4 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Mock Mode
            </span>
            <span className="px-2 py-0.5 text-[10px] bg-accent/20 text-accent font-semibold">
              {import.meta.env.VITE_API_USE_MOCK === "true"
                ? "ACTIVE"
                : "OFFLINE"}
            </span>
          </div>
          <button
            onClick={() => setSeedModalOpen(true)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-900/40 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{loading ? "Seeding..." : "Seed Database"}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/40 hover:bg-red-950/80 text-red-400 border border-red-900/40 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* ===== MOBILE BACKDROP ===== */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* ——— STICKY HEADER ——— */}
        <header className="sticky top-0 z-10 h-16 border-b border-white/5 bg-[#141414] px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-white/70 hover:text-white hover:bg-white/5 rounded md:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display text-lg md:text-2xl font-light tracking-wide capitalize truncate max-w-[180px] sm:max-w-none">
              Manage {tabs.find((t) => t.id === activeTab)?.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/80 font-semibold">
                {userData?.email || "Admin Portal"}
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                System Administrator
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent font-semibold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* ——— SCROLLABLE CONTENT ——— */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl w-full mx-auto">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              </div>
            )}

            {!loading && (
              <>
                {/* ===== SINGLE-EDIT PAGES: about / contact / settings ===== */}
                {["about", "contact", "settings"].includes(activeTab) ? (
                  <div className="bg-[#141414] border border-white/5 p-6 md:p-8 max-w-2xl">
                    <h3 className="font-display text-lg tracking-wide mb-6 text-accent">
                      Edit {activeTab.toUpperCase()} Data
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* ABOUT */}
                      {activeTab === "about" && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                                Main Image
                              </label>
                              <div className="relative border border-white/10 p-3 flex flex-col items-center bg-[#0a0a0a]">
                                {mediaPreview && (
                                  <img
                                    src={mediaPreview}
                                    className="w-full h-32 object-cover mb-3"
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                                >
                                  Upload Photo
                                </button>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 1)}
                                  className="hidden"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                                Header Banner
                              </label>
                              <div className="relative border border-white/10 p-3 flex flex-col items-center bg-[#0a0a0a]">
                                {mediaPreview2 && (
                                  <img
                                    src={mediaPreview2}
                                    className="w-full h-32 object-cover mb-3"
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => fileInputRef2.current?.click()}
                                  className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                                >
                                  Upload Banner
                                </button>
                                <input
                                  ref={fileInputRef2}
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 2)}
                                  className="hidden"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">
                              Title
                            </label>
                            <input
                              type="text"
                              value={formFields.title || ""}
                              onChange={(e) =>
                                setFormFields({
                                  ...formFields,
                                  title: e.target.value,
                                })
                              }
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              value={formFields.subtitle || ""}
                              onChange={(e) =>
                                setFormFields({
                                  ...formFields,
                                  subtitle: e.target.value,
                                })
                              }
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wider text-white/50">
                              Paragraph Description
                            </label>
                            <textarea
                              value={formFields.paragraph || ""}
                              onChange={(e) =>
                                setFormFields({
                                  ...formFields,
                                  paragraph: e.target.value,
                                })
                              }
                              className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent min-h-[140px]"
                              required
                            />
                          </div>
                        </>
                      )}

                      {/* CONTACT */}
                      {activeTab === "contact" && (
                        <>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">
                                Studio Address
                              </label>
                              <input
                                type="text"
                                value={formFields.address || ""}
                                onChange={(e) =>
                                  setFormFields({
                                    ...formFields,
                                    address: e.target.value,
                                  })
                                }
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-wider text-white/50">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  value={formFields.email || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      email: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-wider text-white/50">
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  value={formFields.phone || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      phone: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">
                                Google Map Link
                              </label>
                              <input
                                type="text"
                                value={formFields.googleMap || ""}
                                onChange={(e) =>
                                  setFormFields({
                                    ...formFields,
                                    googleMap: e.target.value,
                                  })
                                }
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                              />
                            </div>
                            <h4 className="text-xs uppercase tracking-wider text-accent border-b border-white/5 pb-2 mt-6">
                              Social Platform Links
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-wider text-white/40">
                                  Facebook
                                </label>
                                <input
                                  type="text"
                                  value={formFields.facebook || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      facebook: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-wider text-white/40">
                                  Instagram
                                </label>
                                <input
                                  type="text"
                                  value={formFields.instagram || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      instagram: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-wider text-white/40">
                                  Twitter
                                </label>
                                <input
                                  type="text"
                                  value={formFields.twitter || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      twitter: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-wider text-white/40">
                                  Youtube
                                </label>
                                <input
                                  type="text"
                                  value={formFields.youtube || ""}
                                  onChange={(e) =>
                                    setFormFields({
                                      ...formFields,
                                      youtube: e.target.value,
                                    })
                                  }
                                  className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* SETTINGS (Admin Profile) */}
                      {activeTab === "settings" && (
                        <>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">
                                Login Email
                              </label>
                              <input
                                type="email"
                                value={formFields.email || ""}
                                onChange={(e) =>
                                  setFormFields({
                                    ...formFields,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs uppercase tracking-wider text-white/50">
                                New Password (leave blank to keep current)
                              </label>
                              <input
                                type="password"
                                placeholder="••••••••"
                                value={formFields.password || ""}
                                onChange={(e) =>
                                  setFormFields({
                                    ...formFields,
                                    password: e.target.value,
                                  })
                                }
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
                  /* ===== LIST & CRUD PANEL ===== */
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
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        {selectedIds.length > 0 && (
                          <button
                            onClick={() => {
                              setIsBulkDeleting(true);
                              setIsDeleteModalOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-650 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Selected ({selectedIds.length})</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenFormModal(null)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Record</span>
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="bg-[#141414] border border-white/5 overflow-x-auto">
                      <table className="w-full min-w-[700px] border-collapse text-left text-xs">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/5 uppercase tracking-wider text-white/60 font-semibold">
                            <th className="p-4 text-[10px] w-12 text-center">
                              <input
                                type="checkbox"
                                checked={
                                  getFilteredItems().length > 0 &&
                                  selectedIds.length === getFilteredItems().length
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedIds(getFilteredItems().map((item) => item._id));
                                  } else {
                                    setSelectedIds([]);
                                  }
                                }}
                                className="cursor-pointer"
                              />
                            </th>
                            <th className="p-4 text-[10px] w-20">Media</th>
                            <th
                              onClick={() => handleSort("title")}
                              className="p-4 text-[10px] cursor-pointer hover:text-white"
                            >
                              Title <ArrowUpDown className="w-3 h-3 inline" />
                            </th>
                            {(activeTab === "gallery" || activeTab === "film") && (
                              <th
                                onClick={() => handleSort("category")}
                                className="p-4 text-[10px] cursor-pointer hover:text-white w-32"
                              >
                                Category{" "}
                                <ArrowUpDown className="w-3 h-3 inline" />
                              </th>
                            )}
                            {(activeTab === "hero" ||
                              activeTab === "category" ||
                              activeTab === "service" ||
                              activeTab === "standard" ||
                              activeTab === "process" ||
                              activeTab === "testimonial") && (
                              <th
                                onClick={() =>
                                  handleSort(
                                    activeTab === "hero"
                                      ? "sliderOrder"
                                      : activeTab === "process"
                                        ? "stepNumber"
                                        : "displayOrder",
                                  )
                                }
                                className="p-4 text-[10px] cursor-pointer hover:text-white w-24"
                              >
                                Order <ArrowUpDown className="w-3 h-3 inline" />
                              </th>
                            )}
                            <th className="p-4 text-[10px] w-24">Active</th>
                            <th className="p-4 text-[10px] w-28 text-right">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredItems().map((item) => (
                            <tr
                              key={item._id}
                              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-150"
                            >
                              <td className="p-4 text-center w-12">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item._id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedIds((prev) => [...prev, item._id]);
                                    } else {
                                      setSelectedIds((prev) => prev.filter((id) => id !== item._id));
                                    }
                                  }}
                                  className="cursor-pointer"
                                />
                              </td>
                              <td className="p-4">
                                {item.mediaUrl || item.imageUrl ? (
                                  item.resourceType === "video" ? (
                                    <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center text-accent">
                                      <Play className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <div className="relative w-12 h-12">
                                      <img
                                        src={item.mediaUrl || item.imageUrl}
                                        className="w-full h-full object-cover border border-white/10"
                                      />
                                      {(activeTab === "gallery" || activeTab === "film") &&
                                        item.images &&
                                        item.images.length > 1 && (
                                          <span className="absolute -bottom-1 -right-1 bg-accent text-white text-[8px] font-bold px-1 rounded-sm shadow-sm scale-90">
                                            +{item.images.length - 1}
                                          </span>
                                        )}
                                    </div>
                                  )
                                ) : (
                                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                                    N/A
                                  </div>
                                )}
                              </td>
                              <td className="p-4 font-semibold text-white/80">
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.title || item.name || item.page}
                                  </p>
                                  {item.subtitle && (
                                    <p className="text-[10px] text-white/30">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                              </td>
                              {(activeTab === "gallery" || activeTab === "film") && (
                                <td className="p-4 text-white/40">
                                  {item.category}
                                </td>
                              )}
                              {(activeTab === "hero" ||
                                activeTab === "category" ||
                                activeTab === "service" ||
                                activeTab === "standard" ||
                                activeTab === "process" ||
                                activeTab === "testimonial") && (
                                <td className="p-4 font-mono text-white/40">
                                  {item.sliderOrder ??
                                    item.stepNumber ??
                                    item.displayOrder ??
                                    0}
                                </td>
                              )}
                              <td className="p-4">
                                <button
                                  onClick={() => handleToggleStatus(item)}
                                  className={`px-2 py-0.5 text-[10px] font-semibold cursor-pointer uppercase tracking-wider rounded-full ${
                                    item.active
                                      ? "bg-emerald-950/40 border border-emerald-900/40 text-emerald-400"
                                      : "bg-zinc-800 border border-zinc-700 text-zinc-500"
                                  }`}
                                >
                                  {item.active ? "Active" : "Inactive"}
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
                              <td
                                colSpan={6}
                                className="p-8 text-center text-white/30"
                              >
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
        </div>
      </main>

      {/* ===== FORM MODAL ===== */}
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
              {editingItem ? "Edit Section Record" : "Add New Record"}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              {/* Media upload */}
              {[
                "hero",
                "category",
                "gallery",
                "service",
                "process",
                "testimonial",
              ].includes(activeTab) && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    Media Resource (Image / Video)
                  </label>
                  <div className="border border-white/15 p-4 bg-[#0a0a0a] flex flex-col items-center justify-center relative">
                    {mediaPreviews && mediaPreviews.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 w-full mb-3 max-h-60 overflow-y-auto p-1">
                        {mediaPreviews.map((p, i) => (
                          <div
                            key={i}
                            className="relative border border-white/10 aspect-video bg-black overflow-hidden group"
                          >
                            {p.type === "video" ? (
                              <video
                                src={p.url}
                                className="w-full h-full object-cover"
                                muted
                              />
                            ) : (
                              <img
                                src={p.url}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[9px] text-white uppercase font-bold tracking-wider">
                                {p.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : mediaPreview ? (
                      formFields.resourceType === "video" ? (
                        <video
                          src={mediaPreview}
                          controls
                          className="w-full max-h-40 object-cover mb-3"
                        />
                      ) : (
                        <img
                          src={mediaPreview}
                          className="w-full max-h-40 object-cover mb-3"
                        />
                      )
                    ) : (
                      <div className="py-6 text-center text-white/35 text-xs">
                        No media uploaded. Select a file.
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer uppercase tracking-wider"
                    >
                      Select File
                      {(!editingItem || (activeTab === "gallery" || activeTab === "film")) && "s"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => handleFileChange(e, 1)}
                      className="hidden"
                      accept="image/*,video/*"
                      multiple={(activeTab === "gallery" || activeTab === "film") || !editingItem}
                    />
                  </div>
                </div>
              )}

              {/* Hero specifics */}
              {activeTab === "hero" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      ResourceType
                    </label>
                    <select
                      value={formFields.resourceType || "image"}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          resourceType: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      Background Overlay Opacity
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      max="1"
                      value={formFields.backgroundOverlay ?? 0.65}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          backgroundOverlay: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Title / Name */}
              {activeTab !== "seo" && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === "testimonial" ? "Client Name" : "Title"}
                  </label>
                  <input
                    type="text"
                    value={formFields.title || formFields.name || ""}
                    onChange={(e) =>
                      setFormFields({
                        ...formFields,
                        [activeTab === "testimonial" ? "name" : "title"]:
                          e.target.value,
                      })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                    required
                  />
                </div>
              )}

              {/* Subtitle / paragraph */}
              {["hero", "category", "gallery", "service", "process"].includes(
                activeTab,
              ) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === "hero"
                      ? "Category Tagging List"
                      : "Subtitle"}
                  </label>
                  <input
                    type="text"
                    value={formFields.subtitle || formFields.paragraph || ""}
                    onChange={(e) =>
                      setFormFields({
                        ...formFields,
                        [activeTab === "hero" ? "paragraph" : "subtitle"]:
                          e.target.value,
                      })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              {activeTab === "hero" && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    Subtitle Italic Note
                  </label>
                  <input
                    type="text"
                    value={formFields.subtitle || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, subtitle: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              )}

              {/* Hero buttons */}
              {activeTab === "hero" && (
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={formFields.primaryButtonText || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          primaryButtonText: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      Primary Button Link
                    </label>
                    <input
                      type="text"
                      value={formFields.primaryButtonLink || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          primaryButtonLink: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={formFields.secondaryButtonText || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          secondaryButtonText: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-white/50">
                      Secondary Button Link
                    </label>
                    <input
                      type="text"
                      value={formFields.secondaryButtonLink || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          secondaryButtonLink: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Gallery category */}
              {(activeTab === "gallery" || activeTab === "film") && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    Select Category
                  </label>
                  <select
                    value={formFields.category || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, category: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent text-white"
                    required
                  >
                    <option value="" disabled>-- Select Category --</option>
                    {categoriesList.map((cat) => (
                      <option key={cat._id} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Gallery date/location */}
              {(activeTab === "gallery" || activeTab === "film") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formFields.date || ""}
                      onChange={(e) =>
                        setFormFields({ ...formFields, date: e.target.value })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none text-white cursor-pointer"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Jodhpur"
                      value={formFields.location || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          location: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Gallery videoUrl */}
              {(activeTab === "gallery" || activeTab === "film") && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    Video URL {activeTab === "film" ? "(Required, YouTube Embed or Direct Link)" : "(Optional, YouTube Embed or Direct Link)"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://www.youtube.com/embed/YdVEuM6dE9M"
                    value={formFields.videoUrl || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, videoUrl: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                    required={activeTab === "film"}
                  />
                </div>
              )}

              {/* Icon fields */}
              {["category", "service", "standard"].includes(activeTab) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    Lucide Icon Class/Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heart, Camera, Sliders, Users"
                    value={formFields.icon || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, icon: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              )}

              {/* Order fields */}
              {(activeTab === "hero" ||
                activeTab === "category" ||
                activeTab === "service" ||
                activeTab === "standard" ||
                activeTab === "process" ||
                activeTab === "testimonial") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      {activeTab === "process"
                        ? "Step Number"
                        : "Display Order"}
                    </label>
                    <input
                      type="number"
                      value={
                        formFields.sliderOrder ??
                        formFields.stepNumber ??
                        formFields.displayOrder ??
                        0
                      }
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (activeTab === "hero")
                          setFormFields({ ...formFields, sliderOrder: val });
                        else if (activeTab === "process")
                          setFormFields({ ...formFields, stepNumber: val });
                        else
                          setFormFields({ ...formFields, displayOrder: val });
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="form-active"
                      checked={formFields.active ?? true}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          active: e.target.checked,
                        })
                      }
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label
                      htmlFor="form-active"
                      className="text-xs uppercase tracking-wider text-white/60"
                    >
                      Active Status
                    </label>
                  </div>
                </div>
              )}

              {/* Testimonial rating */}
              {activeTab === "testimonial" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Rating (1 to 5 Stars)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formFields.rating ?? 5}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          rating: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Description / Review */}
              {[
                "category",
                "gallery",
                "service",
                "standard",
                "process",
                "testimonial",
              ].includes(activeTab) && (
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-white/50">
                    {activeTab === "testimonial"
                      ? "Client Review"
                      : "Paragraph Description"}
                  </label>
                  <textarea
                    value={
                      formFields.paragraph ||
                      formFields.description ||
                      formFields.review ||
                      ""
                    }
                    onChange={(e) =>
                      setFormFields({
                        ...formFields,
                        [activeTab === "testimonial"
                          ? "review"
                          : activeTab === "standard" || activeTab === "category"
                            ? "description"
                            : "paragraph"]: e.target.value,
                      })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 text-sm focus:outline-none min-h-[100px]"
                    required
                  />
                </div>
              )}

              {/* Gallery featured toggle */}
              {(activeTab === "gallery" || activeTab === "film") && (
                <div className="flex items-center gap-6 pt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="form-active"
                      checked={formFields.active ?? true}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          active: e.target.checked,
                        })
                      }
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label
                      htmlFor="form-active"
                      className="text-xs uppercase tracking-wider text-white/60"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="form-featured"
                      checked={formFields.featured ?? false}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          featured: e.target.checked,
                        })
                      }
                      className="w-4 h-4 bg-[#0a0a0a] border border-white/10 accent-accent"
                    />
                    <label
                      htmlFor="form-featured"
                      className="text-xs uppercase tracking-wider text-white/60"
                    >
                      Featured
                    </label>
                  </div>
                </div>
              )}

              {/* SEO */}
              {activeTab === "seo" && (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formFields.metaTitle || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          metaTitle: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Meta Description
                    </label>
                    <textarea
                      value={formFields.metaDescription || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          metaDescription: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none min-h-[80px]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider text-white/50">
                      Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="wedding photography, luxury event planner"
                      value={formFields.keywords || ""}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          keywords: e.target.value,
                        })
                      }
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Submit Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION ===== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-sm bg-[#141414] border border-white/10 shadow-2xl p-6 text-center space-y-6">
            <div className="w-12 h-12 bg-red-950/40 text-red-400 border border-red-900/40 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-wide text-white">
                {isBulkDeleting ? "Delete Selected Records?" : "Delete Record?"}
              </h3>
              <p className="text-white/40 text-xs mt-2 leading-relaxed">
                {isBulkDeleting ? (
                  <>
                    Are you absolutely sure you want to remove the{" "}
                    <strong className="text-white">{selectedIds.length} selected records</strong>?
                  </>
                ) : (
                  <>
                    Are you absolutely sure you want to remove{" "}
                    <strong className="text-white">
                      {deletingItem?.title || deletingItem?.name || "this item"}
                    </strong>
                    ?
                  </>
                )}
                {" "}This operation is permanent.
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
                onClick={isBulkDeleting ? handleBulkDelete : handleDeleteSubmit}
                className="flex-1 py-2.5 bg-red-900 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SEED CONFIRMATION ===== */}
      <ConfirmationModal
        isOpen={seedModalOpen}
        title="Seed Database?"
        message="This will reset your database and restore all default records. Any existing changes will be lost permanently."
        confirmText="Seed Database"
        cancelText="Cancel"
        confirmColor="bg-emerald-600 hover:bg-emerald-700"
        loading={loading}
        onCancel={() => setSeedModalOpen(false)}
        onConfirm={handleSeedDatabase}
      />
    </div>
  );
}
