/**
 * Centralized Founder Authority & Profile Configuration
 * Source: Aryan Singh Founder Profile
 * Navya Tech Industry
 */

export interface FounderExpertiseCategory {
  title: string;
  skills: string[];
}

export interface FounderEducation {
  degree: string;
  specialization: string;
  cgpa: string;
}

export interface FounderAchievements {
  totalBusinesses: number;
  internationalBusinesses: number;
  indianBusinesses: number;
  initialDurationDays: number;
  growthHeadline: string;
}

export interface FounderContactConfig {
  name: string;
  designation: string;
  company: string;
  location: string;
  heading: string;
  subheading: string;
  executiveIntro: string;
  personalIntro: string;
  achievements: FounderAchievements;
  expertise: {
    digitalGrowth: FounderExpertiseCategory;
    websiteDevelopment: FounderExpertiseCategory;
    aiAutomation: FounderExpertiseCategory;
  };
  education: FounderEducation;
  linkedin: {
    url: string;
    label: string;
  };
  phone: {
    display: string;
    link: string;
    label: string;
  };
  whatsapp: {
    display: string;
    url: string;
    label: string;
  };
  email: {
    address: string;
    link: string;
    label: string;
  };
  discussProjectUrl: string;
  // Reserved for actual photograph. To replace, set to e.g. "/aryan-singh.jpg"
  photoSrc: string | null;
}

export const FOUNDER_CONFIG: FounderContactConfig = {
  name: "Aryan Singh",
  designation: "Founder | Digital Growth Strategist | AI & Automation Entrepreneur",
  company: "Navya Tech Industry",
  location: "India",
  heading: "Get in Touch with Founder Directly",
  subheading:
    "Have a project in mind or need help deciding the right solution for your business? Connect directly with our founder to discuss your requirements, explore possibilities, and get personalized guidance.",
  executiveIntro:
    "Aryan Singh is the Founder of Navya Tech Industry, building digital growth solutions and intelligent business automation systems for businesses across domestic and international markets. Combining marketing strategy, search visibility, website development, and AI-powered automation, he helps businesses strengthen their digital presence and operational capabilities.",
  personalIntro:
    "At Navya Tech Industry, we believe every business deserves technology and digital solutions that fit its actual needs. I personally welcome discussions with business owners, entrepreneurs, and decision-makers to understand their challenges and explore the right solutions.",
  achievements: {
    totalBusinesses: 18,
    internationalBusinesses: 11,
    indianBusinesses: 7,
    initialDurationDays: 43,
    growthHeadline: "18 Businesses Supported with Organic Growth in 43 Days",
  },
  expertise: {
    digitalGrowth: {
      title: "Digital Growth & Internet Marketing",
      skills: [
        "Internet marketing strategy",
        "SEO and local SEO",
        "Organic search visibility",
        "Google Business Profile optimization",
        "Lead generation strategy",
      ],
    },
    websiteDevelopment: {
      title: "Website Development",
      skills: [
        "Custom business websites",
        "Responsive website development",
        "Website performance optimization",
        "Deployment and implementation",
      ],
    },
    aiAutomation: {
      title: "AI & Business Automation",
      skills: [
        "AI agents",
        "n8n workflows",
        "WhatsApp and email automation",
        "API integrations",
        "Intelligent business workflows",
      ],
    },
  },
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    specialization: "Artificial Intelligence",
    cgpa: "8.18 / 10",
  },
  linkedin: {
    url: "https://in.linkedin.com/in/invaded-author",
    label: "Connect on LinkedIn",
  },
  phone: {
    display: "+91 74518 12065",
    link: "tel:+917451812065",
    label: "Call Founder",
  },
  whatsapp: {
    display: "+91 93554 12903",
    url: "https://wa.me/919355412903",
    label: "Chat on WhatsApp",
  },
  email: {
    address: "navyatechindustry@gmail.com",
    link: "mailto:navyatechindustry@gmail.com",
    label: "Email Founder",
  },
  discussProjectUrl: "/pricing",
  photoSrc: null,
};

export interface CompanyContactConfig {
  name: string;
  phone: {
    display: string;
    link: string;
    label: string;
  };
  whatsapp: {
    display: string;
    url: string;
    label: string;
  };
  email: {
    address: string;
    link: string;
    label: string;
  };
}

export const COMPANY_CONFIG: CompanyContactConfig = {
  name: "Navya Tech Industry",
  phone: {
    display: "+91 93554 12903",
    link: "tel:+919355412903",
    label: "Call Us",
  },
  whatsapp: {
    display: "+91 93554 12903",
    url: "https://wa.me/919355412903",
    label: "WhatsApp",
  },
  email: {
    address: "navyatechindustry@gmail.com",
    link: "mailto:navyatechindustry@gmail.com",
    label: "Email Us",
  },
};

