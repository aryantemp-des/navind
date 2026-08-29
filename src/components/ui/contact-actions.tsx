import React from "react";
import { Phone, MessageSquare } from "lucide-react";

export const NAVYA_CONTACT = {
  phone: "+919355412903",
  telLink: "tel:+919355412903",
  email: "hello@navyatech.co.in",
  whatsappMessage: "Hi we would like to know more about services",
  whatsappUrl: `https://wa.me/919355412903?text=${encodeURIComponent("Hi we would like to know more about services")}`,
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
      {/* Direct Call Button with Premium Glow */}
      <a
        href={NAVYA_CONTACT.telLink}
        className={`clay-btn-secondary inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.35)] hover:shadow-[0_0_28px_rgba(239,68,68,0.75)] border border-red-500/40 hover:border-red-500/90 hover:scale-105 ${sizeClasses[buttonSize]}`}
        aria-label={`Call Navya Tech Industry at ${NAVYA_CONTACT.phone}`}
      >
        <Phone className="w-4 h-4 text-red-400 shrink-0" />
        <span>{showPhoneText ? NAVYA_CONTACT.phone : "Call Now!"}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={NAVYA_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`clay-btn-secondary inline-flex items-center gap-2 rounded-full text-emerald-300 border-emerald-500/30 font-medium uppercase tracking-wider cursor-pointer transition-all ${sizeClasses[buttonSize]}`}
        aria-label="Contact Navya Tech Industry on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>WhatsApp Now</span>
      </a>
    </div>
  );
};

export default ContactActions;
