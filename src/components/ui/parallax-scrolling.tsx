import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerElement = parallaxRef.current?.querySelector(
      "[data-parallax-layers]"
    ) as HTMLElement | null;

    if (!triggerElement) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const layers = [
        { layer: "1", yPercent: 60 },
        { layer: "2", yPercent: 45 },
        { layer: "3", yPercent: 30 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }, parallaxRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="parallax-title" className="parallax relative" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div className="parallax__fade-top"></div>

          <div data-parallax-layers className="parallax__layers" style={{ willChange: "transform" }}>
            {/* Layer 1 (Back) */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
              loading="eager"
              decoding="async"
              width="800"
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
              style={{ willChange: "transform" }}
            />

            {/* Layer 2 (Middle Back) */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
              loading="eager"
              decoding="async"
              width="800"
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
              style={{ willChange: "transform" }}
            />

            {/* Layer 3: 3 Separate Stacked Headings */}
            <div
              data-parallax-layer="3"
              className="parallax__layer-title"
              style={{ willChange: "transform" }}
            >
              <div className="parallax__title-stack">
                <h2 className="parallax__title">NAVYA</h2>
                <h2 className="parallax__title">TECH</h2>
                <h2 className="parallax__title">INDUSTRY</h2>
              </div>
            </div>

            {/* Layer 4 (Front Foreground) */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
              loading="eager"
              decoding="async"
              width="800"
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
              style={{ willChange: "transform" }}
            />
          </div>

          <div className="parallax__fade"></div>
        </div>
      </section>

      <section className="parallax__content">
        <div className="clay-icon-well w-16 h-16 sm:w-20 sm:h-20 p-3 rounded-3xl flex items-center justify-center overflow-hidden">
          <img
            src="/logoletter.png"
            alt="Navya Tech Lettermark"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;
