"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ShinyText from "./ShinyText";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <ShinyText text="Privacy Policy" speed={2} color="#ffffff" shineColor="#a1a1aa" />
                  <ShinyText text="Data Protection Commitment" speed={2} color="#ffffff" shineColor="#a1a1aa" />
                </h2>
                <div style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.85)", fontSize: "1.1rem" }}>
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>Navya Tech Industry</strong>
                  <em>Last Updated: April 2026</em>
                </div>
              </div>

              <div style={{ lineHeight: 1.8, fontSize: "1.05rem" }}>
                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>1. Introduction</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Navya Tech Industry (“we”, “our”, or “us”) is committed to protecting your privacy and ensuring transparency in how your personal data is handled.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  This Privacy Policy explains how we collect, use, store, and safeguard your information when you access our website or use our services.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  By using our services, you agree to the practices described in this policy.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>2. Information We Collect</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We may collect and process the following types of information:
                </p>

                <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 8px rgba(108,99,255,0.3)", marginBottom: "0.6rem", marginTop: "1.2rem" }}>a. Personal Information</h4>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Business name and details</li>
                </ul>

                <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 8px rgba(108,99,255,0.3)", marginBottom: "0.6rem", marginTop: "1.2rem" }}>b. Project Information</h4>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Website requirements</li>
                  <li>Design references</li>
                  <li>Content, images, and materials provided by the client</li>
                </ul>

                <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 8px rgba(108,99,255,0.3)", marginBottom: "0.6rem", marginTop: "1.2rem" }}>c. Communication Data</h4>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>WhatsApp conversations</li>
                  <li>Emails and call records</li>
                  <li>Feedback and inquiries</li>
                </ul>

                <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 8px rgba(108,99,255,0.3)", marginBottom: "0.6rem", marginTop: "1.2rem" }}>d. Technical Data (if applicable)</h4>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>IP address</li>
                  <li>Browser type and device information</li>
                  <li>Basic usage data for website performance improvement</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>3. How We Collect Information</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We collect information through:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Direct communication (WhatsApp, calls, email)</li>
                  <li>Website forms or contact actions</li>
                  <li>Client submissions during project execution</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>4. Purpose of Data Collection</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Your information is used for:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Understanding your business and project requirements</li>
                  <li>Delivering website development services</li>
                  <li>Communicating updates, revisions, and approvals</li>
                  <li>Providing customer support</li>
                  <li>Improving our services and user experience</li>
                  <li>Maintaining internal records</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We only collect and use data that is necessary for delivering our services effectively.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>5. Legal Basis for Processing</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We process your data based on:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Your consent</li>
                  <li>Contractual necessity (to deliver agreed services)</li>
                  <li>Legitimate business interests</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>6. Data Sharing & Disclosure</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We do <strong>not sell, rent, or trade</strong> your personal information.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Your data may be shared only in the following situations:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>With trusted third-party providers (e.g., hosting, domain services, tools) strictly for service delivery</li>
                  <li>When required by law, legal process, or government authorities</li>
                  <li>To protect our legal rights and business interests</li>
                </ul>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>7. Third-Party Services</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Our services may involve third-party tools such as:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Hosting providers</li>
                  <li>Domain registrars</li>
                  <li>Communication platforms (e.g., WhatsApp)</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  These services operate under their own privacy policies. Navya Tech Industry is not responsible for their data handling practices.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>8. Data Security</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We implement reasonable technical and organizational measures to protect your data from:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Unauthorized access</li>
                  <li>Data breaches</li>
                  <li>Loss or misuse</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  However, no digital system can guarantee 100% security.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>9. Data Retention</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We retain your data only for as long as necessary to:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Complete your project</li>
                  <li>Provide ongoing support</li>
                  <li>Fulfill legal or operational obligations</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  After this period, data may be securely deleted or archived.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>10. Client Responsibility for Content</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Clients are responsible for ensuring that any content, images, or data they provide:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Do not violate any laws</li>
                  <li>Do not infringe on third-party rights</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Navya Tech Industry is not liable for issues arising from client-provided materials.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>11. Your Rights</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  You have the right to:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal obligations)</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Requests can be made via contact details below.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>12. Cookies & Tracking (If Applicable)</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Our website may use basic cookies or tracking tools to:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "2rem", marginBottom: "1.5rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>Improve performance</li>
                  <li>Analyze usage</li>
                  <li>Enhance user experience</li>
                </ul>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  You can control or disable cookies through your browser settings.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>13. International Data Handling</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  If you access our services from outside India, your data may be processed in India where our operations are based.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>14. Changes to This Privacy Policy</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  We may update this Privacy Policy from time to time.<br />
                  Any significant changes will be communicated through appropriate channels.
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  Continued use of our services implies acceptance of the updated policy.
                </p>

                <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)", margin: "2.5rem 0" }} />

                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#ffffff", textShadow: "0 0 10px rgba(108,99,255,0.4)", marginBottom: "0.8rem", marginTop: "1.5rem" }}>15. Contact</h3>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
                  For any privacy-related queries or requests, please contact:
                </p>
                <p style={{ marginBottom: "1.2rem", color: "rgba(255,255,255,0.85)" }}>
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
                    I Acknowledge that
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
