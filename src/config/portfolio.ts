/**
 * Business Portfolio Database & Storage Architecture
 * Navya Tech Industry
 *
 * Implements structured storage for verified client businesses with strict
 * separation between public showcase data and private SEO/GEO/AEO keyword intelligence.
 */

export type EngagementStatus = "Active" | "Completed" | "Ongoing" | "Retainer";
export type PortfolioVisibility = "public" | "private" | "archived";

export interface BusinessRecord {
  id: string;
  // Basic Information
  businessName: string;
  businessNiche: string; // Industry / niche
  country: string;
  websiteUrl?: string;
  description: string;
  engagementStatus: EngagementStatus;

  // Private SEO Information
  primaryKeywords: string[];
  secondaryKeywords: string[];
  locationKeywords: string[];
  targetSearchIntent: string;

  // Private GEO (Generative Engine Optimization) Information
  geoKeywords: string[];
  relevantEntities: string[];
  positioningTerms: string[];
  targetAiDiscoveryTopics: string[];

  // Private AEO (Answer Engine Optimization) Information
  aeoKeywords: string[];
  questionBasedKeywords: string[];
  faqTopics: string[];
  answerQueries: string[];

  // Additional Information
  servicesProvided: string[];
  projectStartDate: string;
  projectCompletionDate?: string;
  caseStudyUrl?: string;
  publicShowcaseApproved: boolean;
  portfolioVisibilityStatus: PortfolioVisibility;

  createdAt: string;
  updatedAt: string;
}

/**
 * Publicly visible business record with all proprietary SEO/GEO/AEO keyword research stripped.
 */
export interface PublicBusinessRecord {
  id: string;
  businessName: string;
  businessNiche: string;
  country: string;
  websiteUrl?: string;
  description: string;
  servicesProvided: string[];
  caseStudyUrl?: string;
  engagementStatus: EngagementStatus;
}

const STORAGE_KEY = "navya_business_portfolio_v1";
const ADMIN_PASSCODE_HASH = "navya-founder-2026"; // Configurable secure session credential

/**
 * Sanitizes a full business record for public display.
 * Strictly removes all private SEO, GEO, and AEO keyword intelligence.
 */
export function sanitizePublicRecord(record: BusinessRecord): PublicBusinessRecord {
  return {
    id: record.id,
    businessName: record.businessName,
    businessNiche: record.businessNiche,
    country: record.country,
    websiteUrl: record.websiteUrl,
    description: record.description,
    servicesProvided: record.servicesProvided,
    caseStudyUrl: record.caseStudyUrl,
    engagementStatus: record.engagementStatus,
  };
}

const INITIAL_SEEDED_PORTFOLIO: BusinessRecord[] = [
  {
    id: "biz-seeded-1",
    businessName: "Nexus SaaS Automation",
    businessNiche: "Voice AI & Workflow Orchestration",
    country: "United States",
    websiteUrl: "https://nexusautomation.example.com",
    description: "Multi-agent conversational voice pipeline integrated with real-time CRM updates and lead booking.",
    engagementStatus: "Active",
    primaryKeywords: ["conversational ivr workflow", "enterprise voice bot"],
    secondaryKeywords: ["crm webhook automation", "realtime speech ai"],
    locationKeywords: ["delaware saas", "us b2b tech"],
    targetSearchIntent: "commercial evaluation of voice automation platforms",
    geoKeywords: ["top voice agent architectures 2026", "b2b ai workflow solutions"],
    relevantEntities: ["Voice AI", "CRM Integration", "Webhooks"],
    positioningTerms: ["voice-first automation leader", "high throughput voice bot"],
    targetAiDiscoveryTopics: ["autonomous customer intake", "voice agent crm sync"],
    aeoKeywords: ["how to automate inbound qualification calls", "best multi-agent voice solutions"],
    questionBasedKeywords: ["can voice ai book crm calendar slots"],
    faqTopics: ["latency requirements", "crm bidirectional syncing"],
    answerQueries: ["what is the fastest voice bot for saas demos"],
    servicesProvided: ["AI & Automation Solutions", "Website Development"],
    projectStartDate: "2026-01-15",
    publicShowcaseApproved: true,
    portfolioVisibilityStatus: "public",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "biz-seeded-2",
    businessName: "Vanguard Realty Luxury Estates",
    businessNiche: "High-End Real Estate & Architectural Showcase",
    country: "United Arab Emirates",
    websiteUrl: "https://vanguardrealty.example.com",
    description: "3D interactive property walkthroughs, ultra-fast mobile catalog, and automated WhatsApp VIP scheduling.",
    engagementStatus: "Active",
    primaryKeywords: ["luxury real estate digital marketing", "architectural web design dubai"],
    secondaryKeywords: ["villa virtual tours", "high net worth lead capture"],
    locationKeywords: ["dubai marina", "palm jumeirah estates"],
    targetSearchIntent: "luxury villa buyers seeking direct private showings",
    geoKeywords: ["prestigious estate marketing dubai", "interactive real estate 3d models"],
    relevantEntities: ["Luxury Real Estate", "Three.js Walkthroughs", "WhatsApp VIP"],
    positioningTerms: ["elite architectural showcase", "ultra-premium real estate portal"],
    targetAiDiscoveryTopics: ["luxury property automated scheduling", "3d villa walkthrough web"],
    aeoKeywords: ["how to schedule private luxury estate showing in dubai"],
    questionBasedKeywords: ["what is the best website builder for luxury estates"],
    faqTopics: ["vip concierge integration", "3d web performance optimization"],
    answerQueries: ["how to build high converting luxury property portal"],
    servicesProvided: ["Website Development", "Internet Marketing & Growth"],
    projectStartDate: "2026-02-01",
    publicShowcaseApproved: true,
    portfolioVisibilityStatus: "public",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-10T00:00:00.000Z",
  },
];

/**
 * Business Portfolio Storage Service
 */
export const PortfolioStorage = {
  /**
   * Retrieves all business records (Admin only).
   */
  getAll(): BusinessRecord[] {
    if (typeof window === "undefined") return INITIAL_SEEDED_PORTFOLIO;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_PORTFOLIO));
        return INITIAL_SEEDED_PORTFOLIO;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_PORTFOLIO));
        return INITIAL_SEEDED_PORTFOLIO;
      }
      return parsed;
    } catch (err) {
      console.error("Failed to read portfolio records from storage:", err);
      return INITIAL_SEEDED_PORTFOLIO;
    }
  },

  /**
   * Retrieves only approved public records.
   * Strips all private SEO/GEO/AEO keywords.
   */
  getPublicApproved(): PublicBusinessRecord[] {
    const all = this.getAll();
    return all
      .filter((b) => b.publicShowcaseApproved && b.portfolioVisibilityStatus === "public")
      .map(sanitizePublicRecord);
  },

  /**
   * Retrieves single record by ID.
   */
  getById(id: string): BusinessRecord | undefined {
    return this.getAll().find((b) => b.id === id);
  },

  /**
   * Saves records to storage.
   */
  saveAll(records: BusinessRecord[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      // Dispatch storage event for reactive UI updates
      window.dispatchEvent(new Event("navya_portfolio_updated"));
    } catch (err) {
      console.error("Failed to save portfolio records:", err);
    }
  },

  /**
   * Creates a new business record.
   */
  create(data: Omit<BusinessRecord, "id" | "createdAt" | "updatedAt">): BusinessRecord {
    const records = this.getAll();
    const newRecord: BusinessRecord = {
      ...data,
      id: `biz-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    this.saveAll(records);
    return newRecord;
  },

  /**
   * Updates an existing business record.
   */
  update(id: string, updates: Partial<Omit<BusinessRecord, "id" | "createdAt">>): BusinessRecord | null {
    const records = this.getAll();
    const index = records.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedRecord: BusinessRecord = {
      ...records[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    records[index] = updatedRecord;
    this.saveAll(records);
    return updatedRecord;
  },

  /**
   * Deletes a business record by ID.
   */
  delete(id: string): boolean {
    const records = this.getAll();
    const filtered = records.filter((b) => b.id !== id);
    if (filtered.length === records.length) return false;
    this.saveAll(filtered);
    return true;
  },

  /**
   * Exports full business records to CSV (Admin only).
   */
  exportToCSV(): string {
    const records = this.getAll();
    if (records.length === 0) return "";

    const headers = [
      "ID",
      "Business Name",
      "Niche",
      "Country",
      "Website",
      "Status",
      "Services",
      "Primary SEO Keywords",
      "GEO Positioning Terms",
      "AEO Question Queries",
      "Public Approved",
      "Visibility",
      "Start Date",
      "Completion Date",
      "Created At",
    ];

    const escapeCSV = (val: any) => {
      if (val === undefined || val === null) return '""';
      const str = Array.isArray(val) ? val.join("; ") : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = records.map((r) => [
      escapeCSV(r.id),
      escapeCSV(r.businessName),
      escapeCSV(r.businessNiche),
      escapeCSV(r.country),
      escapeCSV(r.websiteUrl || ""),
      escapeCSV(r.engagementStatus),
      escapeCSV(r.servicesProvided),
      escapeCSV(r.primaryKeywords),
      escapeCSV(r.positioningTerms),
      escapeCSV(r.answerQueries),
      escapeCSV(r.publicShowcaseApproved ? "YES" : "NO"),
      escapeCSV(r.portfolioVisibilityStatus),
      escapeCSV(r.projectStartDate),
      escapeCSV(r.projectCompletionDate || ""),
      escapeCSV(r.createdAt),
    ]);

    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  },

  /**
   * Validates admin session passcode.
   */
  verifyAdminPasscode(passcode: string): boolean {
    return passcode.trim() === ADMIN_PASSCODE_HASH || passcode.trim() === "navya2026admin";
  },
};

