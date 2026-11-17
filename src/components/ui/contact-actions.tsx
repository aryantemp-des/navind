import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { FOUNDER_CONFIG, COMPANY_CONFIG } from "@/config/founder";

export const NAVYA_CONTACT = {
  founderName: FOUNDER_CONFIG.name,
  founderTitle: FOUNDER_CONFIG.designation,
  founderPhone: FOUNDER_CONFIG.phone.display,
  founderTelLink: FOUNDER_CONFIG.phone.link,
  companyPhone: COMPANY_CONFIG.phone.display,
  companyTelLink: COMPANY_CONFIG.phone.link,
  phone: COMPANY_CONFIG.phone.display,
  telLink: COMPANY_CONFIG.phone.link,
  whatsappPhone: COMPANY_CONFIG.whatsapp.display,
  whatsappUrl: COMPANY_CONFIG.whatsapp.url,
  email: COMPANY_CONFIG.email.address,
  mailtoLink: COMPANY_CONFIG.email.link,
  linkedinUrl: FOUNDER_CONFIG.linkedin.url,
  whatsappMessage: "Hi, I'd like to discuss a project with Navya Tech Industry",
};

export interface ContactActionsProps {
  className?: string;
  buttonSize?: "sm" | "md" | "lg";
  showPhoneText?: boolean;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  className = "",
  buttonSize = "md",
  showPhoneText = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm",
    lg: "px-8 py-3.5 text-sm sm:text-base",
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3.5 ${className}`}>
      {/* Direct Call Button to Founder with Premium Glow */}
      <a
        href={FOUNDER_CONFIG.phone.link}
        className={`clay-btn-secondary inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.35)] hover:shadow-[0_0_28px_rgba(239,68,68,0.75)] border border-red-500/40 hover:border-red-500/90 hover:scale-105 ${sizeClasses[buttonSize]}`}
        aria-label={`${FOUNDER_CONFIG.phone.label}: ${FOUNDER_CONFIG.phone.display}`}
      >
        <Phone className="w-4 h-4 text-red-400 shrink-0" />
        <span>{showPhoneText ? FOUNDER_CONFIG.phone.display : FOUNDER_CONFIG.phone.label}</span>
      </a>

      {/* WhatsApp Button to Founder */}
      <a
        href={FOUNDER_CONFIG.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`clay-btn-secondary inline-flex items-center gap-2 rounded-full text-emerald-300 border-emerald-500/30 font-medium uppercase tracking-wider cursor-pointer transition-all ${sizeClasses[buttonSize]}`}
        aria-label={`${FOUNDER_CONFIG.whatsapp.label}: ${FOUNDER_CONFIG.whatsapp.display}`}
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{FOUNDER_CONFIG.whatsapp.label}</span>
      </a>
    </div>
  );
};

export default ContactActions;
