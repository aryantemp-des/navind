"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ShinyText from "./ShinyText";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.setProperty("overflow", "", "important");
    }
    return () => {
      document.body.style.setProperty("overflow", "", "important");
    };
  }, [isOpen]);

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setHasScrolledToBottom(false), 0);
      // Timeout allows layout to render before checking height
      setTimeout(() => {
        if (scrollRef.current) {
          const { scrollHeight, clientHeight } = scrollRef.current;
          if (scrollHeight <= clientHeight + 10) {
            setHasScrolledToBottom(true);
          }
        }
      }, 100);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "clamp(0.5rem, 3vw, 2rem)"
          }}
        >
          {/* Main Modal Backdrop to dismiss if clicking outside */}
          <div
            style={{ position: "absolute", inset: 0, cursor: "pointer" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "85vh",
              background: "linear-gradient(145deg, rgba(82, 39, 255, 0.15) 0%, rgba(177, 158, 239, 0.05) 50%, rgba(255, 159, 252, 0.15) 100%)",
              backgroundColor: "rgba(10, 10, 15, 0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(82,39,255,0.15)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 4vw, 3rem)",
                paddingBottom: "120px",
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem"
              }}>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <h2 style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  textShadow: "0 0 20px rgba(255, 159, 252, 0.4), 0 0 40px rgba(82, 39, 255, 0.3)",
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <ShinyText text="Terms & Conditions" speed={2} color="#ffffff" shineColor="#a1a1aa" />
                </h2>
                <div style={{ marginTop: "1rem", color: "rgba(255,255,255,0.85)", fontSize: "1.1rem" }}>
                  <strong>Navya Tech Industry</strong><br />
                  <em>Last Updated: April 2026</em>
                </div>
              </div>

              <div style={{ lineHeight: 1.8, fontSize: "1.05rem" }}>
                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>1. Introduction</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Welcome to Navya Tech Industry. By accessing our services, you agree to comply with and be bound by the following terms and conditions. These terms govern all website development services provided by Navya Tech Industry.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>2. Services</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Navya Tech Industry provides professional website development services, including:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Business websites</li>
                  <li>Landing pages</li>
                  <li>Portfolio websites</li>
                  <li>Premium interactive (3D) websites</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  All services are focused on delivering modern, high-performance, and conversion-driven websites.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>3. Project Initiation</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>A project will commence only after <strong>50% advance payment</strong> is received.</li>
                  <li>The client must provide all required content, references, and instructions before or during the project.</li>
                  <li>Delays in providing content may impact delivery timelines.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>4. Pricing & Payment</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>All pricing is presented as an <strong>investment</strong>, unless stated otherwise.</li>
                  <li>The remaining <strong>50% payment must be completed prior to final delivery</strong>.</li>
                  <li>Payments made are <strong>non-refundable once the project has commenced</strong>.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>5. Delivery Timeline</h3>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>24-Hour Delivery Commitment</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Navya Tech Industry operates on a performance-driven system built for speed and efficiency.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Our objective is to deliver every project — regardless of size — within <strong>24 hours</strong>, making rapid execution a defining feature of our service.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  In certain cases, additional time may be required due to extended scope, revisions, or delays in client communication. However, our priority remains to deliver projects at the earliest possible timeline without compromising quality.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  This commitment to speed is a key differentiator of Navya Tech Industry.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>6. Revisions</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Up to <strong>3 revisions</strong> are included to ensure alignment with client expectations.</li>
                  <li>Additional revisions or major scope changes may incur extra charges and may extend the delivery timeline.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>7. Client Responsibilities</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>The client agrees to:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Provide accurate and complete information</li>
                  <li>Respond promptly to communication</li>
                  <li>Approve designs and content in a timely manner</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>8. Intellectual Property</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Full ownership of the website will be transferred to the client upon complete payment.</li>
                  <li>Navya Tech Industry reserves the right to showcase the project in its portfolio unless explicitly declined by the client.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>9. Third-Party Services</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Services such as domain registration, hosting, or integrations may involve third-party providers and may be included as complimentary based on the selected package.</li>
                  <li>Navya Tech Industry is not liable for issues arising from third-party platforms or services.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>10. Performance & Results Disclaimer</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>While websites are designed for performance and conversions, specific business results (such as sales or leads) are not guaranteed.</li>
                  <li>Results depend on multiple external factors including marketing strategy, audience, and business operations.</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>11. Limitation of Liability</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>Navya Tech Industry shall not be liable for:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Any indirect or consequential losses</li>
                  <li>Business interruptions</li>
                  <li>Data loss due to external factors</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>12. Termination</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>Navya Tech Industry reserves the right to terminate a project if:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Terms are violated</li>
                  <li>Payments are not completed</li>
                  <li>Communication becomes non-cooperative</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>13. Modifications</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We reserve the right to update these terms at any time. Clients will be informed of any significant changes. Continued use of our services implies acceptance of the updated terms.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>14. Contact</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  For any queries, please contact:<br />
                  <strong>Navya Tech Industry</strong><br />
                  📞 +91 9355412903
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                  <div style={{ 
                    fontWeight: 800, 
                    fontSize: "1.6rem", 
                    color: "#ffffff", 
                    textShadow: "0 0 20px rgba(255,159,252,0.6)", 
                    marginBottom: "0.5rem" 
                  }}>
                    Navya Tech Industry
                  </div>
                  <div style={{ 
                    fontStyle: "italic", 
                    fontWeight: 500, 
                    fontSize: "1.1rem", 
                    color: "rgba(255,255,255,0.85)", 
                    textShadow: "0 0 15px rgba(255,159,252,0.3)" 
                  }}>
                    Elevating brands with high-converting, next-gen digital experiences.
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Footer with Button */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "140px",
              background: "linear-gradient(to top, rgba(10,10,15,0.95) 20%, rgba(10,10,15,0.7) 60%, rgba(10,10,15,0) 100%)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "0 2.5rem 2.5rem 0",
              pointerEvents: "none" // Let clicks pass through gradient background
            }}>
              <AnimatePresence>
                {hasScrolledToBottom && (
                  <motion.button
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    style={{
                      pointerEvents: "auto", // Re-enable clicks for the button
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      color: "#ffffff",
                      padding: "1rem 2.5rem",
                      borderRadius: "40px",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.25)",
                      letterSpacing: "0.02em"
                    }}
                  >
                    I Agree to the Terms
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
