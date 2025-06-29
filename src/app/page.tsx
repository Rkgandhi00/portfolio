'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import './cosmic-styles.css';
import Link from 'next/link';

// Type definitions for our particle system
interface LorenzSystem {
  points: THREE.Points;
  currentPos: { x: number; y: number; z: number };
  positions: Float32Array;
  colors: Float32Array;
  alphas: Float32Array;
  material: THREE.ShaderMaterial;
  index: number;
  maxPoints: number;
  baseHue: number;
  id: number;
  phase: number;
}

export default function RefinedPortfolio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const scaleRef = useRef(1.0);
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isDarkTheme = mounted ? (resolvedTheme === 'dark') : true;
  
  const name = "Rushabh";
  const roles = [
    "Full Stack Developer",
    "Data Engineer", 
    "AI/ML Enthusiastic",
    "Cloud Developer",
    "DevOps Engineer"
  ];

  const particleSystemsRef = useRef<LorenzSystem[]>([]);
  const mandelbrotPlaneRef = useRef<THREE.Mesh | null>(null);
  const zoomRef = useRef(1);
  const centerRef = useRef({ x: -0.5, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Lorenz parameters for faster, more dynamic formations
  const lorenzParams = {
    sigma: 10.0,
    rho: 28.0,
    beta: 8.0/3.0,
    dt: 0.002, // Increased for faster formation
    scale: 1.2, // Larger initial scale
    targetScale: 2.2 // Much larger target scale for more dramatic effect
  };

  const lorenzRK4 = useCallback((x: number, y: number, z: number, params = lorenzParams) => {
    const { sigma, rho, beta, dt } = params;
    
    const dxdt = (x: number, y: number) => sigma * (y - x);
    const dydt = (x: number, y: number, z: number) => x * (rho - z) - y;
    const dzdt = (x: number, y: number, z: number) => x * y - beta * z;
    
    const k1x = dt * dxdt(x, y);
    const k1y = dt * dydt(x, y, z);
    const k1z = dt * dzdt(x, y, z);
    
    const k2x = dt * dxdt(x + k1x/2, y + k1y/2);
    const k2y = dt * dydt(x + k1x/2, y + k1y/2, z + k1z/2);
    const k2z = dt * dzdt(x + k1x/2, y + k1y/2, z + k1z/2);
    
    const k3x = dt * dxdt(x + k2x/2, y + k2y/2);
    const k3y = dt * dydt(x + k2x/2, y + k2y/2, z + k2z/2);
    const k3z = dt * dzdt(x + k2x/2, y + k2y/2, z + k2z/2);
    
    const k4x = dt * dxdt(x + k3x, y + k3y);
    const k4y = dt * dydt(x + k3x, y + k3y, z + k3z);
    const k4z = dt * dzdt(x + k3x, y + k3y, z + k3z);
    
    return {
      x: x + (k1x + 2*k2x + 2*k3x + k4x) / 6,
      y: y + (k1y + 2*k2y + 2*k3y + k4y) / 6,
      z: z + (k1z + 2*k2z + 2*k3z + k4z) / 6
    };
  }, []);

  // Enhanced particle system with faster formation and better visibility
  const createEnhancedLorenzSystem = useCallback((startPos: { x: number, y: number, z: number }, baseHue: number, id: number): LorenzSystem => {
    const maxPoints = isMobile ? 4000 : 8000; // Increased back for better visual impact
    const positions = new Float32Array(maxPoints * 3);
    const colors = new Float32Array(maxPoints * 3);
    const alphas = new Float32Array(maxPoints);
    const sizes = new Float32Array(maxPoints);
    
    let currentPos = { ...startPos };
    
    // Reduced settling time for faster formation
    for (let settle = 0; settle < 500; settle++) { // Reduced from 1000
      currentPos = lorenzRK4(currentPos.x, currentPos.y, currentPos.z);
    }
    
    for (let i = 0; i < maxPoints; i++) {
      // Increased steps for faster formation
      for (let step = 0; step < 3; step++) { // Increased from 2
        currentPos = lorenzRK4(currentPos.x, currentPos.y, currentPos.z);
      }
      
      positions[i * 3] = currentPos.x * lorenzParams.scale;
      positions[i * 3 + 1] = currentPos.y * lorenzParams.scale;
      positions[i * 3 + 2] = currentPos.z * lorenzParams.scale;
      
      // Enhanced color scheme with more vibrant colors
      const t = i / maxPoints;
      const hue = (baseHue + t * 0.25 + Math.sin(t * Math.PI * 3) * 0.08) % 1; // More color variation
      const saturation = 0.85 + Math.sin(t * Math.PI * 2) * 0.1; // Higher saturation
      const lightness = 0.65 + Math.sin(t * Math.PI * 4) * 0.2; // Brighter overall
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Maximum visibility - no fade out
      alphas[i] = Math.pow(1 - t, 0.8) * 0.95; // Even higher opacity
      sizes[i] = 3.0 * (1 - Math.pow(t, 0.25)); // Larger particles with less falloff
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Enhanced shader material with maximum visibility
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float alpha;
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        
        void main() {
          vColor = color;
          vAlpha = alpha;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // More dramatic pulsing
          float pulse = 1.0 + 0.3 * sin(uTime * 2.2 + position.x * 0.06 + position.y * 0.04);
          gl_PointSize = size * pulse * (220.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
          intensity = pow(intensity, 1.2);
          
          // Maximum glow effect
          float glow = exp(-dist * 3.0) * 0.6;
          intensity += glow;
          
          gl_FragColor = vec4(vColor, vAlpha * intensity); // Full opacity
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });
    
    const points = new THREE.Points(geometry, material);
    
    return {
      points,
      currentPos,
      positions,
      colors,
      alphas,
      material,
      index: 0,
      maxPoints,
      baseHue,
      id,
      phase: Math.random() * Math.PI * 2
    };
  }, [lorenzRK4, isMobile]);

  // Enhanced Mandelbrot with better visibility
  const mandelbrotFragmentShader = `
    uniform float uTime;
    uniform float uZoom;
    uniform vec2 uCenter;
    uniform vec2 uResolution;
    
    vec3 getSolarColor(float iterations, float maxIter) {
      if (iterations >= maxIter - 0.5) {
        return vec3(0.12, 0.06, 0.03); // Slightly brighter
      }
      
      float t = iterations / maxIter;
      
      vec3 darkRed = vec3(0.6, 0.18, 0.09); // Brighter base colors
      vec3 orange = vec3(1.0, 0.5, 0.15);
      vec3 yellow = vec3(1.1, 0.8, 0.3);
      vec3 lightYellow = vec3(1.2, 1.0, 0.7);
      vec3 paleBlue = vec3(0.8, 0.9, 1.0);
      
      float flare = sin(t * 6.0 + uTime * 1.2) * 0.2 + 0.9;
      
      if (t < 0.2) {
        return mix(darkRed, orange, t * 5.0) * flare;
      } else if (t < 0.5) {
        return mix(orange, yellow, (t - 0.2) * 3.33) * flare;
      } else if (t < 0.8) {
        return mix(yellow, lightYellow, (t - 0.5) * 3.33) * flare;
      } else {
        return mix(lightYellow, paleBlue, (t - 0.8) * 5.0) * flare;
      }
    }
    
    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
      vec2 c = uv * 2.5 / uZoom + uCenter;
      
      vec2 z = vec2(0.0);
      float iterations = 0.0;
      float maxIterations = 80.0;
      
      for (int i = 0; i < 80; i++) {
        if (length(z) > 2.0) break;
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        iterations += 1.0;
      }
      
      if (iterations < maxIterations) {
        float smoothIter = iterations + 1.0 - log2(log2(length(z)));
        iterations = smoothIter;
      }
      
      vec3 color = getSolarColor(iterations, maxIterations);
      
      float dist = length(uv);
      float glow = exp(-dist * 2.2) * 0.12;
      color += vec3(0.2, 0.1, 0.04) * glow;
      
      gl_FragColor = vec4(color * 0.85, 1.0); // Increased from 0.7 to 0.85
    }
  `;

  // Enhanced starfield with better visibility
  const createEnhancedStarField = useCallback(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    const starColors: number[] = [];
    const starSizes: number[] = [];
    
    const starCount = isMobile ? 800 : 1500;
    
    for (let i = 0; i < starCount; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
      
      const color = new THREE.Color();
      if (isDarkTheme) {
        color.setHSL(Math.random() * 0.08 + 0.65, 0.6, Math.random() * 0.4 + 0.6); // Brighter stars
      } else {
        color.setHSL(0.08 + Math.random() * 0.08, 0.7, 0.4 + Math.random() * 0.3);
      }
      starColors.push(color.r, color.g, color.b);
      starSizes.push(Math.random() * 2.0 + 1.0); // Larger stars
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
    
    const starsMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          float twinkle = 1.0 + 0.4 * sin(uTime * 3.0 + position.x * 0.01);
          gl_PointSize = size * twinkle * (150.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          float intensity = 1.0 - (dist * 2.0);
          intensity = pow(intensity, 1.5);
          gl_FragColor = vec4(vColor, 0.7 * intensity); // Increased from 0.4 to 0.7
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
      vertexColors: true
    });
    
    return new THREE.Points(starsGeometry, starsMaterial);
  }, [isDarkTheme, isMobile]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    if (!isDarkTheme && mandelbrotPlaneRef.current && mandelbrotPlaneRef.current.material) {
      const panSpeed = 0.4 / zoomRef.current;
      centerRef.current.x = -0.5 + mouseRef.current.x * panSpeed;
      centerRef.current.y = mouseRef.current.y * panSpeed;
      
      const material = mandelbrotPlaneRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uCenter.value.set(
        centerRef.current.x,
        centerRef.current.y
      );
    }
  }, [isDarkTheme]);

  const handleZoom = useCallback((event: WheelEvent) => {
    if (!isDarkTheme && mandelbrotPlaneRef.current && mandelbrotPlaneRef.current.material) {
      event.preventDefault();
      const zoomFactor = event.deltaY > 0 ? 0.92 : 1.08;
      zoomRef.current *= zoomFactor;
      
      const material = mandelbrotPlaneRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uZoom.value = zoomRef.current;
    }
  }, [isDarkTheme]);

  useEffect(() => {
    if (!mountRef.current || !mounted) return;

    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkTheme ? 0x000510 : 0xf2e8d5);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(isDarkTheme ? 50 : 0, isDarkTheme ? 12 : 0, isDarkTheme ? 40 : 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(isDarkTheme ? 0x000510 : 0xf2e8d5, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    if (isDarkTheme) {
      scene.fog = new THREE.Fog(0x000010, 60, 150);

      const startingPositions = isMobile ? [
        { x: 0.1, y: 0.0, z: 0.0 },
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: -0.1, y: 0.1, z: 0.0 }
      ] : [
        { x: 0.1, y: 0.0, z: 0.0 },
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: -0.1, y: 0.1, z: 0.0 },
        { x: 0.0, y: 0.1, z: -0.1 }
      ];
      
      const hues = [0.65, 0.15, 0.85, 0.35, 0.05];
      const attractorSystems: LorenzSystem[] = [];
      
      startingPositions.forEach((pos, index) => {
        const system = createEnhancedLorenzSystem(pos, hues[index], index);
        attractorSystems.push(system);
        scene.add(system.points);
      });
      
      particleSystemsRef.current = attractorSystems;

      const gridHelper = new THREE.GridHelper(30, 60, 0x0088ff, 0x004488);
      gridHelper.position.y = -18;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.15; // Increased opacity
      scene.add(gridHelper);

      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.3);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x0099ff, 1.2, 80);
      pointLight1.position.set(15, 15, 15);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xff0099, 0.8, 60);
      pointLight2.position.set(-15, 10, -15);
      scene.add(pointLight2);

    } else {
      const planeGeometry = new THREE.PlaneGeometry(25, 25, 1, 1);
      const planeMaterial = new THREE.ShaderMaterial({
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: mandelbrotFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uZoom: { value: zoomRef.current },
          uCenter: { value: new THREE.Vector2(centerRef.current.x, centerRef.current.y) },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        }
      });
      
      const mandelbrotPlane = new THREE.Mesh(planeGeometry, planeMaterial);
      mandelbrotPlaneRef.current = mandelbrotPlane;
      scene.add(mandelbrotPlane);

      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions: number[] = [];
      const particleColors: number[] = [];
      
      const particleCount = isMobile ? 600 : 1000;
      
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 50 + 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        
        particlePositions.push(
          Math.cos(theta) * Math.sin(phi) * radius,
          Math.sin(theta) * Math.sin(phi) * radius,
          Math.cos(phi) * radius
        );
        
        const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.08, 0.8, 0.6); // Brighter
        particleColors.push(color.r, color.g, color.b);
      }
      
      particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 2.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6 // Increased from 0.4 to 0.6
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
    }

    const stars = createEnhancedStarField();
    scene.add(stars);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleZoom);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (!isDarkTheme && mandelbrotPlaneRef.current && mandelbrotPlaneRef.current.material) {
        const material = mandelbrotPlaneRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uResolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (currentTime - lastTime < frameTime) return;
      lastTime = currentTime;
      
      timeRef.current += isMobile ? 0.008 : 0.015; // Faster animation speed

      if (isDarkTheme) {
        // Faster scale progression for quicker formation
        const scaleProgress = Math.min(timeRef.current / 6, 1); // Reduced from 8
        const easeOutCubic = 1 - Math.pow(1 - scaleProgress, 3);
        scaleRef.current = lorenzParams.scale + (lorenzParams.targetScale - lorenzParams.scale) * easeOutCubic;
        
        particleSystemsRef.current.forEach((system, systemIndex) => {
          system.material.uniforms.uTime.value = timeRef.current + system.phase;
          
          // More dynamic parameter modulation for faster, more varied formations
          const modRho = lorenzParams.rho + Math.sin(timeRef.current * 0.15 + systemIndex) * 0.8; // Increased variation
          const modSigma = lorenzParams.sigma + Math.cos(timeRef.current * 0.18 + systemIndex) * 0.3; // Faster modulation
          const modBeta = lorenzParams.beta + Math.sin(timeRef.current * 0.12 + systemIndex * 0.5) * 0.1; // Added beta modulation
          
          const steps = isMobile ? 4 : 6; // More steps for faster formation
          for (let i = 0; i < steps; i++) {
            system.currentPos = lorenzRK4(
              system.currentPos.x, 
              system.currentPos.y, 
              system.currentPos.z,
              { ...lorenzParams, rho: modRho, sigma: modSigma, beta: modBeta }
            );
          }
          
          const { positions, colors } = system;
          const index = system.index % system.maxPoints;
          
          positions[index * 3] = system.currentPos.x * scaleRef.current;
          positions[index * 3 + 1] = system.currentPos.y * scaleRef.current;
          positions[index * 3 + 2] = system.currentPos.z * scaleRef.current;
          
          // More vibrant and faster color cycling
          const t = (timeRef.current + systemIndex) * 0.12; // Faster color changes
          const hue = (system.baseHue + t + Math.sin(t * 2.5) * 0.12) % 1; // More color variation
          const color = new THREE.Color().setHSL(hue, 0.85, 0.7); // Higher saturation and lightness
          colors[index * 3] = color.r;
          colors[index * 3 + 1] = color.g;
          colors[index * 3 + 2] = color.b;
          
          // Update geometry more frequently for smoother animation
          system.points.geometry.attributes.position.needsUpdate = true;
          system.points.geometry.attributes.color.needsUpdate = true;
          
          system.index++;
        });

        const orbitRadius = 58;
        const orbitSpeed = isMobile ? 0.025 : 0.05;
        const baseHeight = 12;
        const heightVariation = 8;
        
        camera.position.x = orbitRadius * Math.cos(timeRef.current * orbitSpeed);
        camera.position.z = orbitRadius * Math.sin(timeRef.current * orbitSpeed);
        camera.position.y = baseHeight + Math.sin(timeRef.current * orbitSpeed * 0.5) * heightVariation;
        
        camera.lookAt(0, 0, 0);

      } else {
        if (mandelbrotPlaneRef.current && mandelbrotPlaneRef.current.material) {
          const material = mandelbrotPlaneRef.current.material as THREE.ShaderMaterial;
          material.uniforms.uTime.value = timeRef.current;
        }

        const cameraSpeed = isMobile ? 0.05 : 0.1;
        camera.position.x = Math.sin(timeRef.current * cameraSpeed) * 2;
        camera.position.y = Math.cos(timeRef.current * cameraSpeed * 0.8) * 1;
        camera.lookAt(0, 0, 0);
      }

      const starMaterial = stars.material as THREE.ShaderMaterial;
      if (starMaterial.uniforms) {
        starMaterial.uniforms.uTime.value = timeRef.current;
      }
      stars.rotation.y += isMobile ? 0.0001 : 0.0002;

      renderer.render(scene, camera);
    };

    animate(0);
    
    setTimeout(() => setIsLoading(false), 600);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleZoom);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isDarkTheme, mounted, createEnhancedLorenzSystem, createEnhancedStarField, handleMouseMove, handleZoom, lorenzRK4, isMobile]);

  const currentThemeConfig = isDarkTheme ? {
    bgClass: "landing-bg-dark",
    textPrimary: "text-primary-dark",
    textSecondary: "text-secondary-dark", 
    textAccent: "text-accent-dark",
    textWhite: "text-white",
    buttonPrimary: "button-primary-dark",
    buttonSecondary: "button-secondary-dark",
    cardBg: "card-bg-dark",
    loadingText: "Computing Strange Attractor...",
    loadingSubtext: "Solving differential equations with RK4 integration"
  } : {
    bgClass: "landing-bg-light", 
    textPrimary: "text-primary-light",
    textSecondary: "text-secondary-light",
    textAccent: "text-accent-light",
    textWhite: "text-white",
    buttonPrimary: "button-primary-light",
    buttonSecondary: "button-secondary-light",
    cardBg: "card-bg-light",
    loadingText: "Computing Solar Fractals...",
    loadingSubtext: "Generating infinite mathematical beauty"
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`portfolio-container ${currentThemeConfig.bgClass}`}>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-container">
            <div className="loading-spinner-wrapper">
              <div className={`loading-spinner ${isDarkTheme ? 'spinner-dark' : 'spinner-light'}`}></div>
              <div className={`loading-pulse ${isDarkTheme ? 'pulse-dark' : 'pulse-light'}`}></div>
            </div>
            <div className="loading-text-container">
              <p className={`loading-text ${currentThemeConfig.textAccent}`}>{currentThemeConfig.loadingText}</p>
              <p className={`loading-subtext ${currentThemeConfig.textSecondary}`}>{currentThemeConfig.loadingSubtext}</p>
            </div>
          </div>
        </div>
      )}

      <div ref={mountRef} className="absolute inset-0" />

      <div className="overlay-content">

        <main className="main-content">
          <div className="content-wrapper">
            
            {/* Compact floating card design */}
            <div className={`content-backdrop compact mt-20 mb-10 ${currentThemeConfig.cardBg}`}>
              
              <div className="hero-section compact">
                <div className="title-section">
                  <h1 className={`main-title ${currentThemeConfig.textPrimary}`}>
                    Hi, I&apos;m{' '}
                    <span 
                      className={`name-gradient ${isDarkTheme ? 'name-gradient-dark' : 'name-gradient-light'}`}
                      data-text={name}
                      style={{
                        // Ensure fallback color is always visible
                        color: isDarkTheme ? '#60a5fa' : '#f97316'
                      }}
                    >
                      {name}
                    </span>
                  </h1>
                  
                  <div className="role-container">
                    <h2 className={`role-text ${currentThemeConfig.textSecondary}`}>
                      {roles[currentRoleIndex]}
                    </h2>
                  </div>
                </div>
                
                <p className={`description compact ${currentThemeConfig.textSecondary}`}>
                  Follower of <b>P</b>assion, <b>P</b>atience, and <b>P</b>erseverance. Building scalable systems that solve real-world problems.
                </p>
                
                <div className="button-container compact">
                  <Link legacyBehavior href="/about" passHref>
                    <a className={`button-base button-primary compact ${currentThemeConfig.buttonPrimary}`}>
                      About Me
                    </a>
                  </Link>

                  <Link legacyBehavior href="/projects" passHref>
                    <a className={`button-base button-secondary compact ${currentThemeConfig.buttonSecondary}`}>
                      View Projects
                    </a>
                  </Link>
                </div>
                
                <div className="stats-container compact">
                  <div className="stat-item">
                    <div className={`stat-number ${currentThemeConfig.textAccent}`}>6+</div>
                    <div className={`stat-label ${currentThemeConfig.textSecondary}`}>Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className={`stat-number ${currentThemeConfig.textAccent}`}>50+</div>
                    <div className={`stat-label ${currentThemeConfig.textSecondary}`}>Projects Completed</div>
                  </div>
                  <div className="stat-item">
                    <div className={`stat-number ${currentThemeConfig.textAccent}`}>10+</div>
                    <div className={`stat-label ${currentThemeConfig.textSecondary}`}>Technologies</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-indicator">
              <span className={`scroll-text ${currentThemeConfig.textWhite}`}>Explore More</span>
              <div className="scroll-line"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}