"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import PillNav from "./PillNav";


export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        zIndex: 100,
        background: isScrolled ? "rgba(10, 10, 15, 0.7)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.png" 
            alt="NTI Logo" 
            style={{ 
              height: "clamp(50px, 7vw, 65px)", 
              width: "clamp(50px, 7vw, 65px)", 
              aspectRatio: "1 / 1", 
              objectFit: "contain" 
            }} 
          />
        </div>
      </Link>

        <PillNav
          logo={null}
          items={[
            { label: 'Services', href: '#services' },
            { label: 'Work', href: '#work' },
            { label: 'Get in Touch', href: 'tel:+919355412903' }
          ]}
          ease="power2.easeOut"
          baseColor="#6C63FF"
          pillColor="transparent"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          initialLoadAnimation={false}
        />
    </motion.nav>
  );
}
