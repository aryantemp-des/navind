import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Download,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2
} from "lucide-react";
import {
  BusinessRecord,
  EngagementStatus,
  PortfolioVisibility,
  PortfolioStorage
} from "@/config/portfolio";

export interface PortfolioAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioAdminModal: React.FC<PortfolioAdminModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("navya_admin_session") === "authenticated";
  });
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Data State
  const [records, setRecords] = useState<BusinessRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal Views
  const [editingRecord, setEditingRecord] = useState<BusinessRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<BusinessRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<BusinessRecord | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Form Fields State
  const initialFormState: Omit<BusinessRecord, "id" | "createdAt" | "updatedAt"> = {
    businessName: "",
    businessNiche: "",
    country: "India",
    websiteUrl: "",
    description: "",
    engagementStatus: "Active",
    primaryKeywords: [],
    secondaryKeywords: [],
    locationKeywords: [],
    targetSearchIntent: "Commercial",
    geoKeywords: [],
    relevantEntities: [],
    positioningTerms: [],
    targetAiDiscoveryTopics: [],
    aeoKeywords: [],
    questionBasedKeywords: [],
    faqTopics: [],
    answerQueries: [],
    servicesProvided: ["Website Development"],
    projectStartDate: new Date().toISOString().split("T")[0],
    projectCompletionDate: "",
    caseStudyUrl: "",
    publicShowcaseApproved: false,
    portfolioVisibilityStatus: "private",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Helper to load records
  const loadRecords = () => {
    const data = PortfolioStorage.getAll();
    setRecords(data);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadRecords();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (PortfolioStorage.verifyAdminPasscode(passcodeInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem("navya_admin_session", "authenticated");
      setAuthError("");
      loadRecords();
    } else {
      setAuthError("Invalid administrator passcode. Access restricted.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("navya_admin_session");
    setPasscodeInput("");
  };

  // CSV Export
  const handleExportCSV = () => {
    const csvContent = PortfolioStorage.exportToCSV();
    if (!csvContent) {
      alert("No records to export.");
      return;
    }
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `navya_business_portfolio_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Form Management
  const openAddForm = () => {
    setFormData(initialFormState);
    setFormErrors({});
    setIsAddingNew(true);
    setEditingRecord(null);
  };

  const openEditForm = (record: BusinessRecord) => {
    setFormData({
      businessName: record.businessName,
      businessNiche: record.businessNiche,
      country: record.country,
      websiteUrl: record.websiteUrl || "",
      description: record.description,
      engagementStatus: record.engagementStatus,
      primaryKeywords: record.primaryKeywords,
      secondaryKeywords: record.secondaryKeywords,
      locationKeywords: record.locationKeywords,
      targetSearchIntent: record.targetSearchIntent,
      geoKeywords: record.geoKeywords,
      relevantEntities: record.relevantEntities,
      positioningTerms: record.positioningTerms,
      targetAiDiscoveryTopics: record.targetAiDiscoveryTopics,
      aeoKeywords: record.aeoKeywords,
      questionBasedKeywords: record.questionBasedKeywords,
      faqTopics: record.faqTopics,
      answerQueries: record.answerQueries,
      servicesProvided: record.servicesProvided,
      projectStartDate: record.projectStartDate,
      projectCompletionDate: record.projectCompletionDate || "",
      caseStudyUrl: record.caseStudyUrl || "",
      publicShowcaseApproved: record.publicShowcaseApproved,
      portfolioVisibilityStatus: record.portfolioVisibilityStatus,
    });
    setFormErrors({});
    setEditingRecord(record);
    setIsAddingNew(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) errs.businessName = "Business name is required.";
    if (!formData.businessNiche.trim()) errs.businessNiche = "Industry/niche is required.";
    if (!formData.country.trim()) errs.country = "Country is required.";
    if (!formData.description.trim()) errs.description = "Business description is required.";

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (editingRecord) {
      PortfolioStorage.update(editingRecord.id, formData);
      setFeedbackMessage(`Updated ${formData.businessName} successfully.`);
    } else {
      PortfolioStorage.create(formData);
      setFeedbackMessage(`Added ${formData.businessName} to portfolio database.`);
    }

    setTimeout(() => setFeedbackMessage(null), 3000);
    setIsAddingNew(false);
    setEditingRecord(null);
    loadRecords();
  };

  const handleDeleteRecord = () => {
    if (!recordToDelete) return;
    PortfolioStorage.delete(recordToDelete.id);
    setFeedbackMessage(`Deleted ${recordToDelete.businessName}.`);
    setTimeout(() => setFeedbackMessage(null), 3000);
    setRecordToDelete(null);
    loadRecords();
  };

  // Filtering Logic
  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      r.businessName.toLowerCase().includes(q) ||
      r.businessNiche.toLowerCase().includes(q) ||
      r.country.toLowerCase().includes(q) ||
      r.primaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
      r.geoKeywords.some((k) => k.toLowerCase().includes(q)) ||
      r.aeoKeywords.some((k) => k.toLowerCase().includes(q));

    const matchesIndustry = selectedIndustry === "All" || r.businessNiche === selectedIndustry;
    const matchesCountry = selectedCountry === "All" || r.country === selectedCountry;
    const matchesStatus = selectedStatus === "All" || r.engagementStatus === selectedStatus;

    return matchesQuery && matchesIndustry && matchesCountry && matchesStatus;
  });

  const uniqueIndustries = Array.from(new Set(records.map((r) => r.businessNiche))).filter(Boolean);
  const uniqueCountries = Array.from(new Set(records.map((r) => r.country))).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading tracking-tight flex items-center gap-2">
                Business Portfolio Management
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-300">
                  ADMIN SECURE
                </span>
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                Proprietary client database &amp; SEO / GEO / AEO keyword intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors"
                title="Lock session"
              >
                Lock Session
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-200 flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 1: PASSCODE GATE (WHEN UNAUTHENTICATED)                    */}
        {/* ============================================================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md">
              <h4 className="text-xl font-bold text-white font-heading">
                Administrator Authentication Required
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                The business portfolio management system stores proprietary client records, target search intent, and generative engine optimization keywords. Please enter your administrator passcode.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
              <div className="relative">
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter administrator passcode..."
                  className="w-full px-4 py-3 text-sm text-white bg-black/80 border border-white/15 rounded-xl focus:outline-none focus:border-red-500/80 font-mono transition-colors text-center"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-red-400 font-mono" role="alert">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="clay-btn-primary w-full py-3 px-6 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                Authenticate &amp; Open Database
              </button>
            </form>

            <div className="pt-2 text-[11px] font-mono text-zinc-500">
              Session is encrypted locally. Zero private keywords exposed to unauthorized visitors.
            </div>
          </div>
        ) : isAddingNew ? (
          /* ============================================================== */
          /* CASE 2: ADD / EDIT FORM VIEW                                   */
          /* ============================================================== */
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  {editingRecord ? `Edit Record: ${editingRecord.businessName}` : "Add New Business Record"}
                </h4>
                <p className="text-xs text-zinc-400 font-mono">
                  Configure business parameters, proprietary SEO/GEO/AEO keywords, and visibility
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingRecord(null);
                }}
                className="text-xs font-mono text-zinc-400 hover:text-white"
              >
                ← Back to List
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-6">
              {/* SECTION A: BASIC INFORMATION */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold uppercase text-red-400 block">
                  01. Basic Business Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Business Name *</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Apex Legal Advisory"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500"
                    />
                    {formErrors.businessName && <p className="text-[10px] text-red-400">{formErrors.businessName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Industry / Niche *</label>
                    <input
                      type="text"
                      value={formData.businessNiche}
                      onChange={(e) => setFormData({ ...formData, businessNiche: e.target.value })}
                      placeholder="e.g. Professional Services / Legal"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500"
                    />
                    {formErrors.businessNiche && <p className="text-[10px] text-red-400">{formErrors.businessNiche}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Country *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. India, United States, UK"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Website URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Engagement Status</label>
                    <select
                      value={formData.engagementStatus}
                      onChange={(e) => setFormData({ ...formData, engagementStatus: e.target.value as EngagementStatus })}
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Retainer">Retainer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-300">Verified Business Description *</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short description of client business model and core offerings..."
                    className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                  />
                  {formErrors.description && <p className="text-[10px] text-red-400">{formErrors.description}</p>}
                </div>
              </div>

              {/* SECTION B: PROPRIETARY SEO INFORMATION */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 block">
                  02. SEO Intelligence (Private)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Primary SEO Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.primaryKeywords.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. corporate law firm, litigation counsel"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Secondary SEO Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.secondaryKeywords.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondaryKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. dispute resolution, contract negotiation"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Location Keywords</label>
                    <input
                      type="text"
                      value={formData.locationKeywords.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          locationKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. Delhi NCR, Mumbai, London"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Target Search Intent</label>
                    <input
                      type="text"
                      value={formData.targetSearchIntent}
                      onChange={(e) => setFormData({ ...formData, targetSearchIntent: e.target.value })}
                      placeholder="e.g. High-intent commercial consultation"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: GEO (GENERATIVE ENGINE OPTIMIZATION) */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold uppercase text-sky-400 block">
                  03. GEO Strategy (Generative AI Discovery)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">GEO Keywords &amp; Entities</label>
                    <input
                      type="text"
                      value={formData.geoKeywords.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          geoKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. top rated litigation attorney India"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Positioning Terms</label>
                    <input
                      type="text"
                      value={formData.positioningTerms.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          positioningTerms: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. leading tier-1 legal practice"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION D: AEO (ANSWER ENGINE OPTIMIZATION) */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 block">
                  04. AEO Strategy (Answer Engine &amp; FAQ Queries)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Question-Based Queries</label>
                    <input
                      type="text"
                      value={formData.questionBasedKeywords.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          questionBasedKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. how to choose corporate dispute counsel"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">FAQ Topics</label>
                    <input
                      type="text"
                      value={formData.faqTopics.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          faqTopics: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. retainer fees, timeline, court jurisdiction"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION E: SERVICES & VISIBILITY */}
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono font-bold uppercase text-zinc-300 block">
                  05. Navya Tech Services &amp; Showcase Permissions
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Services Delivered (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.servicesProvided.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          servicesProvided: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. Website Development, SEO, GEO"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-300">Case Study URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.caseStudyUrl}
                      onChange={(e) => setFormData({ ...formData, caseStudyUrl: e.target.value })}
                      placeholder="https://navyatech.co.in/blog/case-study"
                      className="w-full px-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.publicShowcaseApproved}
                      onChange={(e) => setFormData({ ...formData, publicShowcaseApproved: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-black/60 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-xs font-mono text-white">Client Approved for Public Showcase</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-zinc-400">Visibility:</label>
                    <select
                      value={formData.portfolioVisibilityStatus}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolioVisibilityStatus: e.target.value as PortfolioVisibility })
                      }
                      className="px-2.5 py-1 text-xs text-white bg-black/60 border border-white/10 rounded-lg"
                    >
                      <option value="public">Public Showcase</option>
                      <option value="private">Private (Admin Only)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingRecord(null);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-primary px-7 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  {editingRecord ? "Save Changes" : "Create Business Record"}
                </button>
              </div>
            </form>
          </div>
        ) : viewingRecord ? (
          /* ============================================================== */
          /* CASE 3: COMPLETE RECORD INSPECTION VIEW                        */
          /* ============================================================== */
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase font-bold">
                  {viewingRecord.engagementStatus} • {viewingRecord.country}
                </span>
                <h4 className="text-2xl font-black text-white font-heading">
                  {viewingRecord.businessName}
                </h4>
                <p className="text-xs text-zinc-400 font-mono">{viewingRecord.businessNiche}</p>
              </div>
              <button
                onClick={() => setViewingRecord(null)}
                className="text-xs font-mono text-zinc-400 hover:text-white"
              >
                ← Back to List
              </button>
            </div>

            <div className="space-y-4 text-xs font-light text-zinc-300">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-zinc-400 block uppercase font-bold">Description</span>
                <p>{viewingRecord.description}</p>
                {viewingRecord.websiteUrl && (
                  <a
                    href={viewingRecord.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline pt-1 block font-mono"
                  >
                    {viewingRecord.websiteUrl}
                  </a>
                )}
              </div>

              {/* Private SEO Data */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="font-mono text-amber-300 block uppercase font-bold">
                  Proprietary SEO Keywords (Confidential)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {viewingRecord.primaryKeywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/40 text-[11px] text-amber-200">
                      {k}
                    </span>
                  ))}
                  {viewingRecord.primaryKeywords.length === 0 && <span className="text-zinc-500">None recorded</span>}
                </div>
              </div>

              {/* Private GEO Data */}
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 space-y-2">
                <span className="font-mono text-sky-300 block uppercase font-bold">
                  GEO AI Discovery Topics (Confidential)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {viewingRecord.geoKeywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-sky-950/60 border border-sky-500/40 text-[11px] text-sky-200">
                      {k}
                    </span>
                  ))}
                  {viewingRecord.geoKeywords.length === 0 && <span className="text-zinc-500">None recorded</span>}
                </div>
              </div>

              {/* Private AEO Data */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="font-mono text-emerald-300 block uppercase font-bold">
                  AEO Answer Engine Queries (Confidential)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {viewingRecord.questionBasedKeywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-200">
                      {k}
                    </span>
                  ))}
                  {viewingRecord.questionBasedKeywords.length === 0 && <span className="text-zinc-500">None recorded</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-zinc-500">
                Created: {new Date(viewingRecord.createdAt).toLocaleDateString()} • Public Showcase:{" "}
                <strong className={viewingRecord.publicShowcaseApproved ? "text-emerald-400" : "text-zinc-400"}>
                  {viewingRecord.publicShowcaseApproved ? "APPROVED" : "PRIVATE"}
                </strong>
              </span>
              <button
                onClick={() => {
                  setViewingRecord(null);
                  openEditForm(viewingRecord);
                }}
                className="clay-btn-secondary px-5 py-2 rounded-full text-xs font-mono text-white"
              >
                Edit Record
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* CASE 4: MAIN DASHBOARD & TABLE LIST VIEW                       */
          /* ============================================================== */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Toolbar: Search, Filters & Actions */}
            <div className="p-4 sm:p-5 bg-white/[0.01] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Search input */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, country, or SEO/GEO/AEO keyword..."
                  className="w-full pl-9 pr-3 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 font-mono"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2.5 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl font-mono focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Retainer">Retainer</option>
                </select>

                {uniqueIndustries.length > 0 && (
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="px-2.5 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl font-mono focus:outline-none"
                  >
                    <option value="All">All Industries</option>
                    {uniqueIndustries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                )}

                {uniqueCountries.length > 0 && (
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-2.5 py-2 text-xs text-white bg-black/60 border border-white/10 rounded-xl font-mono focus:outline-none"
                  >
                    <option value="All">All Countries</option>
                    {uniqueCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={handleExportCSV}
                  className="clay-btn-secondary px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5"
                  title="Export records to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={openAddForm}
                  className="clay-btn-primary px-4 py-2 rounded-xl text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Business</span>
                </button>
              </div>
            </div>

            {/* List / Table Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredRecords.length === 0 ? (
                <div className="p-12 text-center space-y-3 border border-dashed border-white/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {records.length === 0 ? "No Business Records Stored Yet" : "No Matching Businesses Found"}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                    {records.length === 0
                      ? "Create your first business record to track supported companies, project scope, and confidential SEO/GEO/AEO keyword research."
                      : "Try adjusting your search query or filters."}
                  </p>
                  {records.length === 0 && (
                    <button
                      onClick={openAddForm}
                      className="clay-btn-primary px-5 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-flex items-center gap-1.5 mt-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add First Client Business</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white font-heading">{record.businessName}</h5>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              record.publicShowcaseApproved
                                ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                                : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                            }`}
                          >
                            {record.publicShowcaseApproved ? "PUBLIC SHOWCASE" : "PRIVATE"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light">
                          {record.businessNiche} • <strong className="text-zinc-300">{record.country}</strong> • Status:{" "}
                          <span className="text-red-400 font-mono">{record.engagementStatus}</span>
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-zinc-500">
                          <span>SEO: {record.primaryKeywords.length} keywords</span>
                          <span>•</span>
                          <span>GEO: {record.geoKeywords.length} topics</span>
                          <span>•</span>
                          <span>AEO: {record.questionBasedKeywords.length} queries</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => setViewingRecord(record)}
                          className="p-2 rounded-xl text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Full Profile & Keywords"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditForm(record)}
                          className="p-2 rounded-xl text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                          title="Edit Record"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setRecordToDelete(record)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-red-400 bg-white/5 hover:bg-red-950/30 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 shrink-0">
              <span>Total Businesses: {records.length} | Displaying: {filteredRecords.length}</span>
              <span>Authorized Administrator Session Active</span>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION DIALOG */}
        {recordToDelete && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-950 border border-red-500/50 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h4 className="text-base font-bold text-white font-heading">Confirm Record Deletion</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Are you sure you want to permanently delete{" "}
                <strong className="text-white">{recordToDelete.businessName}</strong>? All associated confidential SEO,
                GEO, and AEO keyword data will be removed.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setRecordToDelete(null)}
                  className="px-4 py-2 rounded-full text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRecord}
                  className="px-5 py-2 rounded-full text-xs font-mono font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PortfolioAdminModal;
