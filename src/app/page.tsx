"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, LayoutGrid, MonitorSmartphone, Rocket, Zap, MousePointer2, Search } from "lucide-react";
import Link from "next/link";
import SplineBackground from "@/components/SplineBackground";
import CanvasSequence from "@/components/CanvasSequence";
import RotatingText from "@/components/RotatingText";
import FinalCTA from "@/components/FinalCTA";
import GradientText from "@/components/GradientText";

import ScrollBelowSplineButton from "@/components/ScrollBelowSplineButton";
import { SCROLL_AT_FIRST_FRAME_TRANSITION } from "@/lib/heroScroll";
import ShapeBlur from "@/components/ShapeBlur";
import CircularGallery from "@/components/CircularGallery";
import ShinyText from "@/components/ShinyText";
import Stepper, { Step } from "@/components/Stepper";
import TermsModal from "@/components/TermsModal";
import PrivacyModal from "@/components/PrivacyModal";
import { useState } from "react";

export default function Home() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const { scrollYProgress } = useScroll();

  const canvasZIndex = -3;
  const splineZIndex = -2;

  return (
    <main style={{ position: "relative" }}>
      <motion.div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: canvasZIndex }}>
        <CanvasSequence />
      </motion.div>

      <motion.div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: splineZIndex }}>
        <SplineBackground />
      </motion.div>

      {/* Hero Section (0 - 15%) */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "calc(80px + 15cm) 5% 5rem 5%",
        position: "relative"
      }}>

        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 99999,
            pointerEvents: "auto",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <ScrollBelowSplineButton />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ maxWidth: "800px", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <motion.h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <ShinyText text="Build " speed={2} color="#ffffff" shineColor="#a1a1aa" />
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF", "#13f8fb"]}
              animationSpeed={2.5}
              showBorder={false}
              className="inline-flex"
            >
              Premium Websites
            </GradientText>
            <ShinyText text=" That Convert & Scale" speed={2} color="#ffffff" shineColor="#a1a1aa" />
          </motion.h1>
          <motion.p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--text-muted)",
              marginBottom: "3rem",
              maxWidth: "600px",
              lineHeight: 1.6
            }}
          >
            We craft modern, high-performance digital experiences. Transform your brand with award-winning design and cutting-edge technology.
          </motion.p>
          <motion.div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="#contact" passHref style={{ textDecoration: "none" }}>
              <button className="primary-btn flex-center btn-gradient-border" style={{ gap: "0.5rem" }}>
                Get Started <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="#work" passHref style={{ textDecoration: "none" }}>
              <button className="secondary-btn">
                View Work
              </button>
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* Brand Experience Section (15 - 40%) */}
      <section
        id="process"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          gap: "4rem",
          flexWrap: "wrap",
          position: "relative"
        }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          style={{ maxWidth: "600px", zIndex: 10 }}
        >
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, marginBottom: "1.5rem", lineHeight: 1.1 }}>
            <ShinyText text="Next-Gen " speed={2} color="#ffffff" shineColor="#a1a1aa" /><br />
            <span className="text-gradient">Web Experiences</span>
            <div style={{ display: "block", marginTop: "0.5rem" }}>
              <div style={{ width: "100%", maxWidth: "350px", display: "inline-flex", justifyContent: "flex-start" }}>
                <RotatingText
                  texts={['Explore', 'Check', 'Publish', 'Dominate', 'in 24 Hours']}
                  mainClassName="overflow-hidden justify-start"
                  style={{ backgroundColor: "transparent", color: "var(--secondary)", display: "inline-flex", fontSize: "0.6em", whiteSpace: "nowrap" }}
                  staggerFrom={"last"}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </div>
            </div>
          </h2>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            We don&apos;t just build websites; we design immersive digital products that feel alive.
            By blending aesthetic brilliance with seamless functionality, we ensure every interaction leaves a lasting impression.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          style={{ flex: 1, display: "flex", justifyContent: "flex-end", zIndex: 10 }}
        >
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2>Want to grow your business?</h2>
            </Step>
            <Step>
              <h2>Step 2</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '15px', marginTop: '1em' }} src="/nti.jpg" alt="NTI Office" />
              <p style={{ marginTop: '1em' }}>Book an appointment</p>
            </Step>
            <Step>
              <h2>Get your invoice</h2>
              <p style={{ marginTop: '1em' }}>Go through the procedure of billing</p>
            </Step>
            <Step>
              <h2>In not more than 24 hours</h2>
              <p style={{ marginTop: '1em' }}>Watch your business grow with Next-Gen Web Experiences only with Navya Tech Industry</p>
            </Step>
          </Stepper>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          padding: "20vh 5% 60px 5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textAlign: "center", marginBottom: "clamp(3rem, 10vh, 6rem)", display: "flex", justifyContent: "center", gap: "0.5rem" }}
        >
          <ShinyText text="Our" speed={2} color="#ffffff" shineColor="#a1a1aa" /><span style={{ color: "var(--primary)" }}>Expertise</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          {[
            { title: "Website Development", icon: <MonitorSmartphone size={32} />, desc: "High-performance websites built with Next.js and modern stacks." },
            { title: "3D Web Design", icon: <LayoutGrid size={32} />, desc: "Immersive Spline scenes and WebGL experiences that captivate." },
            { title: "UI/UX Design", icon: <Zap size={32} />, desc: "Intuitive, premium user interfaces designed for conversion." },
            { title: "Optimization", icon: <Rocket size={32} />, desc: "Lightning fast digital products optimized for global scale." },
            { title: "Web Animations & Interactions", icon: <MousePointer2 size={32} />, desc: "Smooth animations and interactions that enhance engagement and elevate user experience." },
            { title: "Search Optimization & Digital Presence", icon: <Search size={32} />, desc: "Improve visibility, rankings, and build a strong scalable online presence." }
          ].map((service, i) => (
            <motion.div key={i} variants={fadeInUp} className="glass-card" style={{ display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', borderRadius: 'inherit' }}>
                <ShapeBlur
                  variation={0}
                  pixelRatioProp={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
                  shapeSize={1}
                  roundness={0.15}
                  borderSize={0.02}
                  circleSize={0.25}
                  circleEdge={1}
                />
              </div>
              <div style={{ zIndex: 1, position: "relative", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ color: "var(--primary)" }}>{service.icon}</div>
                <h3 style={{ fontSize: "1.5rem" }}><ShinyText text={service.title} speed={2} color="#ffffff" shineColor="#a1a1aa" /></h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section
        id="work"
        style={{
          padding: "100px 5% 10rem 5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          style={{ maxWidth: "600px", margin: "0 auto 4rem auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
            <ShinyText text="Featured " speed={2} color="#ffffff" shineColor="#a1a1aa" /><span style={{ color: "var(--secondary)" }}>Work</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Where visionary design meets flawless execution.</p>
        </motion.div>

        <div style={{ height: 'clamp(350px, 60vh, 600px)', position: 'relative', width: '100%' }}>
          <CircularGallery
            items={[
              { image: '/cards/card1.png' },
              { image: '/cards/card2.png' },
              { image: '/cards/card3.png' },
              { image: '/cards/card4.png' },
              { image: '/cards/card5.png' },
              { image: '/cards/card6.png' },
              { image: '/cards/card7.png' },
              { image: '/cards/card8.png' },
              { image: '/cards/card9.png' },
              { image: '/cards/card10.png' },
              { image: '/cards/card11.png' },
              { image: '/cards/card12.png' },
              { image: '/cards/card13.png' }
            ]}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </section>



      <FinalCTA />

      {/* Footer */}
      <footer style={{ 
        padding: "0 5% 2rem 5%", 
        backgroundColor: "#000000",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Gradient Line Separator */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: "linear-gradient(90deg, rgba(82,39,255,0) 0%, rgba(108,99,255,0.8) 50%, rgba(0,229,255,0) 100%)"
        }} />
        
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          paddingTop: "2rem"
        }}>
          <div style={{ fontSize: "0.9rem" }}>
            <ShinyText text="© 2026 Navya Tech Industry, All rights reserved" speed={2} color="#ffffff" shineColor="#a1a1aa" />
          </div>
          <div style={{ display: "flex", gap: "2rem", fontSize: "0.9rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setIsTermsOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", textDecoration: "none" }}>
              <ShinyText text="Terms & Conditions" speed={2} color="#ffffff" shineColor="#a1a1aa" />
            </button>
            <button onClick={() => setIsPrivacyOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", textDecoration: "none" }}>
              <ShinyText text="Privacy Policy" speed={2} color="#ffffff" shineColor="#a1a1aa" />
            </button>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </main>
  );
}
