# NAVYA TECH INDUSTRY — MAIN INTRO / HERO IMPLEMENTATION

You are given a task to integrate an existing React component in the codebase.

This is the **complete implementation prompt**. The developer has **not previously received this prompt or component**. Treat everything in this document as the source of truth and implement the component exactly as specified below.

## Brand / Content Mapping

The original component uses the terms `HORIZON`, `COSMOS`, and `INFINITY`.

For this implementation, replace them as follows:

- `HORIZON` → `NAVYA`
- `COSMOS` → `TECH`
- `INFINITY` → `INDUSTRY`

The final landing-page content must use the following exact copy:

### NAVYA

**NAVYA** stands for Next-gen Automation, Value & Yield Architecture

We turn technology into business value and build systems that move businesses forward.

### TECH

**TECH** stands for Technology, Efficiency, Capability & High-performance.

The broader ecosystem of technology, Navya operates within to build the infrastructure, experiences, and automation businesses operate on.

### INDUSTRY

**INDUSTRY** stands for Intelligent Networks, Data, Unified Systems, Technology, Research & Yield

bringing together **automation, AI, technology, and business intelligence** to create systems that help organizations operate smarter, serve customers better, and grow sustainably.

Important:

- Keep the first words of the NAVYA and TECH definitions capitalized and bold:
  - **NAVYA**
  - **TECH**
- Keep the bold emphasis around:
  - **automation, AI, technology, and business intelligence**
- Do not add the word `SPACE` anywhere in the left-side vertical navigation.
- The left-side vertical text should be removed entirely or left visually empty. Do not replace it with another word.
- Do not use the old phrases:
  - `Where vision meets reality`
  - `we shape the future of tomorrow`
  - `Beyond the boundaries of imagination`
  - `lies the universe of possibilities`
  - `In the space between thought and creation,`
  - `we find the essence of true innovation`
- Do not use the old labels:
  - `HORIZON`
  - `COSMOS`
  - `INFINITY`
- The new copy should be treated as intentional brand messaging, not placeholder text.

---

## Technical Requirements

The codebase should support:

- shadcn project structure
- Tailwind CSS
- TypeScript

If it doesn't, provide instructions on how to setup the project via shadcn CLI, install Tailwind CSS, or configure TypeScript.

Determine the default path for components and styles.

If the default path for components is not `/components/ui`, provide instructions on why it is important to create this folder and use it for the component.

Install the required NPM dependencies:

```bash
npm install gsap three
```

If the project uses a package manager other than npm, use the equivalent command for that package manager.

---

# Component Implementation

Create the following component:

```text
/components/ui/horizon-hero-section.tsx
```

Even though the historical filename is `horizon-hero-section.tsx`, the actual UI branding must be NAVYA / TECH / INDUSTRY as specified above.

Use the following implementation as the base component and preserve its existing animation, Three.js, GSAP, scrolling, camera, parallax, bloom, nebula, star-field, and mountain behavior unless a change is explicitly required by the branding edits above.

```tsx
// horizon-hero-section.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const menuRef = useRef(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const cameraVelocity = useRef({ x: 0, y: 0, z: 0 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();

      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();

          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute(
          'color',
          new THREE.BufferAttribute(colors, 3)
        );

        geometry.setAttribute(
          'size',
          new THREE.BufferAttribute(sizes, 1)
        );

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },

          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;

            void main() {
              vColor = color;
              vec3 pos = position;

              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(
                cos(angle),
                -sin(angle),
                sin(angle),
                cos(angle)
              );

              pos.xy = rot * pos.xy;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,

          fragmentShader: `
            varying vec3 vColor;

            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));

              if (dist > 0.5) discard;

              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);

              gl_FragColor = vec4(vColor, opacity);
            }
          `,

          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);

        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.PlaneGeometry(
        8000,
        4000,
        100,
        100
      );

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },

        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;

          void main() {
            vUv = uv;

            vec3 pos = position;

            float elevation =
              sin(pos.x * 0.01 + time) *
              cos(pos.y * 0.01 + time) *
              20.0;

            pos.z += elevation;
            vElevation = elevation;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(pos, 1.0);
          }
        `,

        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;

          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixFactor =
              sin(vUv.x * 10.0 + time) *
              cos(vUv.y * 10.0 + time);

            vec3 color =
              mix(
                color1,
                color2,
                mixFactor * 0.5 + 0.5
              );

            float alpha =
              opacity *
              (1.0 - length(vUv - 0.5) * 2.0);

            alpha *= 1.0 + vElevation * 0.01;

            gl_FragColor = vec4(color, alpha);
          }
        `,

        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);

      nebula.position.z = -1050;
      nebula.rotation.x = 0;

      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;

      const layers = [
        {
          distance: -50,
          height: 60,
          color: 0x1a1a2e,
          opacity: 1
        },
        {
          distance: -100,
          height: 80,
          color: 0x16213e,
          opacity: 0.8
        },
        {
          distance: -150,
          height: 100,
          color: 0x0f3460,
          opacity: 0.6
        },
        {
          distance: -200,
          height: 120,
          color: 0x0a4668,
          opacity: 0.4
        }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;

          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100;

          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);

        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(
          geometry,
          material
        );

        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;

        mountain.userData = {
          baseZ: layer.distance,
          index
        };

        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.SphereGeometry(
        600,
        32,
        32
      );

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },

        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal =
              normalize(normalMatrix * normal);

            vPosition = position;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
          }
        `,

        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;

          uniform float time;

          void main() {
            float intensity =
              pow(
                0.7 -
                dot(
                  vNormal,
                  vec3(0.0, 0.0, 1.0)
                ),
                2.0
              );

            vec3 atmosphere =
              vec3(0.3, 0.6, 1.0) *
              intensity;

            float pulse =
              sin(time * 2.0) * 0.1 +
              0.9;

            atmosphere *= pulse;

            gl_FragColor =
              vec4(
                atmosphere,
                intensity * 0.25
              );
          }
        `,

        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(
        geometry,
        material
      );

      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;

      refs.animationId =
        requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value =
            time;
        }
      });

      // Update nebula
      if (
        refs.nebula &&
        refs.nebula.material.uniforms
      ) {
        refs.nebula.material.uniforms.time.value =
          time * 0.5;
      }

      // Smooth camera movement with easing
      if (
        refs.camera &&
        refs.targetCameraX !== undefined
      ) {
        const smoothingFactor = 0.05;

        smoothCameraPos.current.x +=
          (
            refs.targetCameraX -
            smoothCameraPos.current.x
          ) *
          smoothingFactor;

        smoothCameraPos.current.y +=
          (
            refs.targetCameraY -
            smoothCameraPos.current.y
          ) *
          smoothingFactor;

        smoothCameraPos.current.z +=
          (
            refs.targetCameraZ -
            smoothCameraPos.current.z
          ) *
          smoothingFactor;

        // Add subtle floating motion
        const floatX =
          Math.sin(time * 0.1) * 2;

        const floatY =
          Math.cos(time * 0.15) * 1;

        // Apply final position
        refs.camera.position.x =
          smoothCameraPos.current.x +
          floatX;

        refs.camera.position.y =
          smoothCameraPos.current.y +
          floatY;

        refs.camera.position.z =
          smoothCameraPos.current.z;

        refs.camera.lookAt(
          0,
          10,
          -600
        );
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor =
          1 + i * 0.5;

        mountain.position.x =
          Math.sin(time * 0.1) *
          2 *
          parallaxFactor;

        mountain.position.y =
          50 +
          (
            Math.cos(time * 0.15) *
            1 *
            parallaxFactor
          );
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } =
        threeRefs;

      if (
        refs.camera &&
        refs.renderer &&
        refs.composer
      ) {
        refs.camera.aspect =
          window.innerWidth /
          window.innerHeight;

        refs.camera.updateProjectionMatrix();

        refs.renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

        refs.composer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    // Cleanup
    return () => {
      const { current: refs } =
        threeRefs;

      if (refs.animationId) {
        cancelAnimationFrame(
          refs.animationId
        );
      }

      window.removeEventListener(
        'resize',
        handleResize
      );

      // Dispose Three.js resources
      refs.stars.forEach(
        (starField) => {
          starField.geometry.dispose();
          starField.material.dispose();
        }
      );

      refs.mountains.forEach(
        (mountain) => {
          mountain.geometry.dispose();
          mountain.material.dispose();
        }
      );

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } =
      threeRefs;

    const locations = [];

    refs.mountains.forEach(
      (mountain, i) => {
        locations[i] =
          mountain.position.z;
      }
    );

    refs.locations =
      locations;
  };

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;

    // Set initial states to prevent flash
    gsap.set(
      [
        menuRef.current,
        titleRef.current,
        subtitleRef.current,
        scrollProgressRef.current
      ],
      {
        visibility: 'visible'
      }
    );

    const tl = gsap.timeline();

    // Animate menu
    if (menuRef.current) {
      tl.from(
        menuRef.current,
        {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Animate title with split text
    if (titleRef.current) {
      const titleChars =
        titleRef.current.querySelectorAll(
          '.title-char'
        );

      tl.from(
        titleChars,
        {
          y: 200,
          opacity: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "power4.out"
        },
        "-=0.5"
      );
    }

    // Animate subtitle lines
    if (subtitleRef.current) {
      const subtitleLines =
        subtitleRef.current.querySelectorAll(
          '.subtitle-line'
        );

      tl.from(
        subtitleLines,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.8"
      );
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY;

      const windowHeight =
        window.innerHeight;

      const documentHeight =
        document.documentElement
          .scrollHeight;

      const maxScroll =
        documentHeight -
        windowHeight;

      const progress =
        Math.min(
          scrollY / maxScroll,
          1
        );

      setScrollProgress(
        progress
      );

      const newSection =
        Math.floor(
          progress *
          totalSections
        );

      setCurrentSection(
        newSection
      );

      const { current: refs } =
        threeRefs;

      // Calculate smooth progress through all sections
      const totalProgress =
        progress *
        totalSections;

      const sectionProgress =
        totalProgress % 1;

      // Define camera positions for each section
      const cameraPositions = [
        {
          x: 0,
          y: 30,
          z: 300
        }, // Section 0 - NAVYA

        {
          x: 0,
          y: 40,
          z: -50
        }, // Section 1 - TECH

        {
          x: 0,
          y: 50,
          z: -700
        } // Section 2 - INDUSTRY
      ];

      // Get current and next positions
      const currentPos =
        cameraPositions[
          newSection
        ] ||
        cameraPositions[0];

      const nextPos =
        cameraPositions[
          newSection + 1
        ] ||
        currentPos;

      // Set target positions
      refs.targetCameraX =
        currentPos.x +
        (
          nextPos.x -
          currentPos.x
        ) *
        sectionProgress;

      refs.targetCameraY =
        currentPos.y +
        (
          nextPos.y -
          currentPos.y
        ) *
        sectionProgress;

      refs.targetCameraZ =
        currentPos.z +
        (
          nextPos.z -
          currentPos.z
        ) *
        sectionProgress;

      // Smooth parallax for mountains
      refs.mountains.forEach(
        (mountain, i) => {
          const speed =
            1 + i * 0.9;

          const targetZ =
            mountain.userData.baseZ +
            scrollY *
            speed *
            0.5;

          refs.nebula.position.z =
            (
              targetZ +
              progress *
              speed *
              0.01
            ) -
            100;

          // Use the same smoothing approach
          mountain.userData.targetZ =
            targetZ;

          if (progress > 0.7) {
            mountain.position.z =
              600000;
          }

          if (progress < 0.7) {
            mountain.position.z =
              refs.locations[i];
          }
        }
      );

      refs.nebula.position.z =
        refs.mountains[3]
          .position.z;
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, [totalSections]);

  const splitTitle = (text) => {
    return text
      .split('')
      .map((char, i) => (
        <span
          key={i}
          className="title-char"
        >
          {char}
        </span>
      ));
  };

  return (
    <div
      ref={containerRef}
      className="hero-container cosmos-style"
    >
      <canvas
        ref={canvasRef}
        className="hero-canvas"
      />

      {/* Side menu */}
      <div
        ref={menuRef}
        className="side-menu"
        style={{
          visibility: 'hidden'
        }}
      >
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* The previous SPACE label has been intentionally removed. */}
      </div>

      {/* Main content */}
      <div
        className="hero-content cosmos-content"
      >
        <h1
          ref={titleRef}
          className="hero-title"
        >
          NAVYA
        </h1>

        <div
          ref={subtitleRef}
          className="hero-subtitle cosmos-subtitle"
        >
          <p className="subtitle-line">
            <strong>NAVYA</strong> stands for Next-gen Automation, Value & Yield Architecture
          </p>

          <p className="subtitle-line">
            We turn technology into business value and build systems that move businesses forward.
          </p>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div
        ref={scrollProgressRef}
        className="scroll-progress"
        style={{
          visibility: 'hidden'
        }}
      >
        <div className="scroll-text">
          SCROLL
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width:
                `${scrollProgress * 100}%`
            }}
          />
        </div>

        <div className="section-counter">
          {
            String(
              currentSection
            ).padStart(2, '0')
          }
          {' / '}
          {
            String(
              totalSections
            ).padStart(2, '0')
          }
        </div>
      </div>

      {/* Additional sections for scrolling */}
      <div className="scroll-sections">
        {[...Array(2)].map(
          (_, i) => {
            const titles = {
              0: 'NAVYA',
              1: 'TECH',
              2: 'INDUSTRY'
            };

            const subtitles = {
              0: {
                line1:
                  'NAVYA stands for Next-gen Automation, Value & Yield Architecture',
                line2:
                  'We turn technology into business value and build systems that move businesses forward.'
              },

              1: {
                line1:
                  'TECH stands for Technology, Efficiency, Capability & High-performance.',
                line2:
                  'The broader ecosystem of technology, Navya operates within to build the infrastructure, experiences, and automation businesses operate on.'
              },

              2: {
                line1:
                  'INDUSTRY stands for Intelligent Networks, Data, Unified Systems, Technology, Research & Yield',
                line2:
                  'bringing together automation, AI, technology, and business intelligence to create systems that help organizations operate smarter, serve customers better, and grow sustainably.'
              }
            };

            return (
              <section
                key={i}
                className="content-section"
              >
                <h1
                  ref={titleRef}
                  className="hero-title"
                >
                  {
                    titles[i + 1] ||
                    'DEFAULT'
                  }
                </h1>

                <div
                  ref={subtitleRef}
                  className="hero-subtitle cosmos-subtitle"
                >
                  <p className="subtitle-line">
                    {
                      subtitles[
                        i + 1
                      ]?.line1
                    }
                  </p>

                  <p className="subtitle-line">
                    {
                      subtitles[
                        i + 1
                      ]?.line2
                    }
                  </p>
                </div>
              </section>
            );
          }
        )}
      </div>
    </div>
  );
};
```

---

# Demo Component

Create or update the demo component:

```tsx
// demo.tsx

import { Component } from "@/components/ui/horizon-hero-section";

const DemoOne = () => {
  return <Component />;
};

export { DemoOne };
```

---

# Required Content Mapping

The implementation must follow this exact three-stage narrative:

## Section 01 — NAVYA

Title:

```text
NAVYA
```

First line:

```text
NAVYA stands for Next-gen Automation, Value & Yield Architecture
```

Second line:

```text
We turn technology into business value and build systems that move businesses forward.
```

The word `NAVYA` in the first line must be visually emphasized/bold.

---

## Section 02 — TECH

Title:

```text
TECH
```

First line:

```text
TECH stands for Technology, Efficiency, Capability & High-performance.
```

Second line:

```text
The broader ecosystem of technology, Navya operates within to build the infrastructure, experiences, and automation businesses operate on.
```

The word `TECH` in the first line must be visually emphasized/bold.

---

## Section 03 — INDUSTRY

Title:

```text
INDUSTRY
```

First line:

```text
INDUSTRY stands for Intelligent Networks, Data, Unified Systems, Technology, Research & Yield
```

Second line:

```text
bringing together automation, AI, technology, and business intelligence to create systems that help organizations operate smarter, serve customers better, and grow sustainably.
```

The following phrase must be visually emphasized/bold:

```text
automation, AI, technology, and business intelligence
```

---

# Important Implementation Notes

1. Do not rename the component from `Component`.
2. Do not remove the Three.js visual system.
3. Do not remove the GSAP animations.
4. Do not remove the scrolling camera transitions.
5. Do not remove the star field.
6. Do not remove the nebula.
7. Do not remove the atmosphere.
8. Do not remove the mountain/parallax layers.
9. Do not remove the bloom post-processing.
10. Do not replace the visual system with static CSS.
11. Do not replace the component with a generic hero section.
12. Do not introduce unrelated UI.
13. Do not use stock imagery.
14. Do not download or copy an external website.
15. Do not copy an existing landing page from another source.
16. Keep the implementation self-contained in the existing project.
17. Preserve the existing visual behavior unless a change is required to correctly implement the NAVYA / TECH / INDUSTRY content.
18. The existing cosmic visual language may remain because it is part of the supplied component.
19. The branding/content itself must no longer refer to HORIZON, COSMOS, INFINITY, or SPACE.
20. The left-side hamburger/menu icon may remain, but the vertical `SPACE` label must be removed.
21. Do not replace `SPACE` with `NAVYA`, `TECH`, `INDUSTRY`, or any other vertical label.
22. Make sure all text remains readable against the animated background.
23. Ensure the component is responsive on desktop, tablet, and mobile.
24. Avoid text overflow on smaller screens.
25. Preserve the intended typography hierarchy.
26. Do not introduce unnecessary gradients, glassmorphism, excessive cards, excessive rounded containers, or generic AI-generated SaaS UI patterns.
27. The hero should feel like a serious technology/business company rather than an AI template.
28. Keep the visual presentation premium, restrained, and intentional.

---

# Important Technical Correction

The original supplied component contains a two-section rendering loop while the content model contains three sections.

The intended navigation/content model is:

```text
01 / 03    NAVYA
02 / 03    TECH
03 / 03    INDUSTRY
```

Therefore, when implementing the component, ensure the scroll section count and section rendering correctly represent **three content sections**.

Do not preserve an obvious off-by-one bug merely because it exists in the supplied component.

The three camera positions should correspond to:

```text
Section 0 → NAVYA
Section 1 → TECH
Section 2 → INDUSTRY
```

The scroll counter should therefore represent:

```text
01 / 03
02 / 03
03 / 03
```

The scroll interaction should smoothly transition through all three sections.

---

# Required Dependencies

Install:

```bash
npm install gsap three
```

If TypeScript type packages are required by the project configuration, install the appropriate types as needed.

---

# Final Verification

Before considering the implementation complete, verify:

- [ ] The application compiles successfully.
- [ ] TypeScript does not have unresolved errors introduced by this component.
- [ ] Three.js loads correctly.
- [ ] GSAP loads correctly.
- [ ] ScrollTrigger is registered.
- [ ] The Three.js canvas renders correctly.
- [ ] The star field renders.
- [ ] The nebula renders.
- [ ] The atmosphere renders.
- [ ] The mountain layers render.
- [ ] Bloom post-processing works.
- [ ] Camera movement responds smoothly to scrolling.
- [ ] Three content sections exist.
- [ ] The first section is `NAVYA`.
- [ ] The second section is `TECH`.
- [ ] The third section is `INDUSTRY`.
- [ ] The scroll indicator reflects three sections.
- [ ] The `SPACE` label is completely removed.
- [ ] `HORIZON` does not appear in the visible UI.
- [ ] `COSMOS` does not appear in the visible UI.
- [ ] `INFINITY` does not appear in the visible UI.
- [ ] The old copy does not appear anywhere in the rendered UI.
- [ ] NAVYA copy is exact.
- [ ] TECH copy is exact.
- [ ] INDUSTRY copy is exact.
- [ ] The required bold emphasis is preserved.
- [ ] The layout is responsive.
- [ ] There are no console-breaking runtime errors.
- [ ] There are no unnecessary external assets.
- [ ] No external website or template has been copied.

---

# Expected Brand Narrative

The final experience should communicate this progression:

```text
NAVYA
↓
Next-gen Automation, Value & Yield Architecture
↓
Technology becomes business value

TECH
↓
Technology, Efficiency, Capability & High-performance
↓
The ecosystem and infrastructure enabling modern businesses

INDUSTRY
↓
Intelligent Networks, Data, Unified Systems, Technology, Research & Yield
↓
Automation + AI + Technology + Business Intelligence
↓
Smarter operations, better customer experiences, sustainable growth
```

The visual experience should make the three sections feel like a single continuous story rather than three unrelated slides.

Do not add explanatory commentary to the user. Implement the component in the codebase and ensure it runs correctly.