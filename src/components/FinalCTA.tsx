"use client";

import { motion, Variants } from "framer-motion";
import MagicRings from "@/components/MagicRings";
import RotatingText from "@/components/RotatingText";
import ShinyText from "@/components/ShinyText";

export default function FinalCTA() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="contact" style={{ 
      height: "125vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center",
      padding: "25vh 5% 0 5%",
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, #000000 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <MagicRings
          color="#fc42ff"
          colorTwo="#42fcff"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={5}
          baseRadius={0.5}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        style={{ maxWidth: "800px", width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div style={{ padding: "clamp(1rem, 5vw, 4rem)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          <h2 className="glow-text" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <ShinyText text="Ready to Build Something" speed={2} color="#ffffff" shineColor="#a1a1aa" />
            <span style={{ display: "inline-flex", width: "100%", maxWidth: "260px", justifyContent: "center" }}>
              <RotatingText
                texts={['Powerful?', 'Strong?', 'Unbeatable?', 'Dominant?']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
                staggerFrom={"last"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "3rem", maxWidth: "500px", margin: "0 auto 3rem" }}>
            Let&apos;s turn your vision into a digital masterpiece. Partner with NTI to lead your industry.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+919355412903" style={{ textDecoration: "none" }}>
              <button className="primary-btn flex-center btn-gradient-border" style={{ gap: "0.5rem", padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
                Book Call
              </button>
            </a>
            <a href="https://wa.me/919355412903?text=Hi%2C%20I%20visited%20your%20website%20and%20I%E2%80%99m%20interested%20in%20your%20services.%20I%E2%80%99m%20looking%20to%20build%20a%20website%20and%20would%20like%20to%20know%20more%20about%20pricing%20and%20process." target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="secondary-btn flex-center" style={{ gap: "0.5rem", padding: "1rem 2.5rem", fontSize: "1.1rem", borderColor: "#25D366", color: "#25D366" }}>
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
