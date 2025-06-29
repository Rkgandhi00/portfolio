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
  
  // Use global theme instead of local state
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isDarkTheme = theme === 'dark';
  
  // Rushabh's data
  const name = "Rushabh";
  const roles = [
    "Full Stack Developer",
    "Data Engineer", 
    "AI/ML Enthusiast",
    "Cloud Developer",
    "DevOps Engineer"
  ];

  // Enhanced Lorenz attractor objects
  const particleSystemsRef = useRef<LorenzSystem[]>([]);
  
  // Mandelbrot objects (for light theme)
  const mandelbrotPlaneRef = useRef<THREE.Mesh | null>(null);
  const zoomRef = useRef(1);
  const centerRef = useRef({ x: -0.5, y: 0 });

  // Role cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Lorenz attractor with Runge-Kutta 4th order integration
  const lorenzParams = {
    sigma: 10.0,
    rho: 28.0,
    beta: 8.0/3.0,
    dt: 0.001,
    scale: 1.0,
    targetScale: 1.5
  };

  // Runge-Kutta 4th order integration for Lorenz system
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

  // Enhanced particle system creation with mobile optimization
  const createEnhancedLorenzSystem = useCallback((startPos: { x: number, y: number, z: number }, baseHue: number, id: number): LorenzSystem => {
    const maxPoints = isMobile ? 4000 : 8000; // Reduce particles on mobile
    const positions = new Float32Array(maxPoints * 3);
    const colors = new Float32Array(maxPoints * 3);
    const alphas = new Float32Array(maxPoints);
    const sizes = new Float32Array(maxPoints);
    
    let currentPos = { ...startPos };
    
    // Pre-compute the entire attractor path
    for (let settle = 0; settle < 1000; settle++) {
      currentPos = lorenzRK4(currentPos.x, currentPos.y, currentPos.z);
    }
    
    for (let i = 0; i < maxPoints; i++) {
      for (let step = 0; step < 2; step++) {
        currentPos = lorenzRK4(currentPos.x, currentPos.y, currentPos.z);
      }
      
      positions[i * 3] = currentPos.x * lorenzParams.scale;
      positions[i * 3 + 1] = currentPos.y * lorenzParams.scale;
      positions[i * 3 + 2] = currentPos.z * lorenzParams.scale;
      
      // Refined color scheme - more subtle and sophisticated
      const t = i / maxPoints;
      const hue = (baseHue + t * 0.15 + Math.sin(t * Math.PI * 2) * 0.03) % 1;
      const saturation = 0.7 + Math.sin(t * Math.PI * 1.5) * 0.2;
      const lightness = 0.4 + Math.sin(t * Math.PI * 3) * 0.15;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // More refined fade for better background balance
      alphas[i] = Math.pow(1 - t, 1.5) * 0.6; // Further reduced opacity
      sizes[i] = 2.0 * (1 - Math.pow(t, 0.4)); // Slightly smaller particles
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Refined shader material with better balance
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
          
          // Subtle pulsing effect
          float pulse = 1.0 + 0.15 * sin(uTime * 1.5 + position.x * 0.05);
          gl_PointSize = size * pulse * (180.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Softer, more refined particles
          float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
          intensity = pow(intensity, 2.0);
          
          // Reduced glow for better content visibility
          float glow = exp(-dist * 6.0) * 0.2;
          intensity += glow;
          
          gl_FragColor = vec4(vColor, vAlpha * intensity * 0.5);
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

  // Enhanced Mandelbrot fragment shader
  const mandelbrotFragmentShader = `
    uniform float uTime;
    uniform float uZoom;
    uniform vec2 uCenter;
    uniform vec2 uResolution;
    
    vec3 getSolarColor(float iterations, float maxIter) {
      if (iterations >= maxIter - 0.5) {
        return vec3(0.08, 0.04, 0.02);
      }
      
      float t = iterations / maxIter;
      
      vec3 darkRed = vec3(0.4, 0.12, 0.06); // FIXED: Darker base colors
      vec3 orange = vec3(0.8, 0.4, 0.1);
      vec3 yellow = vec3(0.9, 0.7, 0.2);
      vec3 lightYellow = vec3(0.95, 0.85, 0.6);
      vec3 paleBlue = vec3(0.7, 0.8, 0.9);
      
      float flare = sin(t * 6.0 + uTime * 1.2) * 0.15 + 0.85;
      
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
      float glow = exp(-dist * 2.5) * 0.08;
      color += vec3(0.15, 0.08, 0.03) * glow;
      
      gl_FragColor = vec4(color * 0.7, 1.0); // FIXED: Darker output for better text contrast
    }
  `;

  // Enhanced starfield with better balance
  const createEnhancedStarField = useCallback(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    const starColors: number[] = [];
    const starSizes: number[] = [];
    
    const starCount = isMobile ? 1000 : 2000; // Reduce stars on mobile
    
    for (let i = 0; i < starCount; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
      
      const color = new THREE.Color();
      if (isDarkTheme) {
        color.setHSL(Math.random() * 0.08 + 0.65, 0.4, Math.random() * 0.3 + 0.4);
      } else {
        color.setHSL(0.08 + Math.random() * 0.08, 0.6, 0.3 + Math.random() * 0.2);
      }
      starColors.push(color.r, color.g, color.b);
      starSizes.push(Math.random() * 1.5 + 0.8);
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
          
          float twinkle = 1.0 + 0.3 * sin(uTime * 2.5 + position.x * 0.008);
          gl_PointSize = size * twinkle * (120.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          float intensity = 1.0 - (dist * 2.0);
          intensity = pow(intensity, 1.8);
          gl_FragColor = vec4(vColor, 0.4 * intensity);
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

  // Handle interactions
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

    // Clear previous scene
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkTheme ? 0x000510 : 0xf2e8d5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(isDarkTheme ? 45 : 0, isDarkTheme ? 10 : 0, isDarkTheme ? 35 : 15);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: "low-power" // Use low-power mode on mobile
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
      // ENHANCED DARK THEME - LORENZ ATTRACTOR
      scene.fog = new THREE.Fog(0x000010, 50, 140);

      // Create fewer Lorenz attractors on mobile
      const startingPositions = isMobile ? [
        { x: 0.1, y: 0.0, z: 0.0 },
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: -0.1, y: 0.1, z: 0.0 }
      ] : [
        { x: 0.1, y: 0.0, z: 0.0 },
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: -0.1, y: 0.1, z: 0.0 },
        { x: 0.0, y: 0.1, z: -0.1 },
        { x: 0.05, y: -0.05, z: 0.05 }
      ];
      
      const hues = [0.65, 0.15, 0.85, 0.35, 0.05];
      const attractorSystems: LorenzSystem[] = [];
      
      startingPositions.forEach((pos, index) => {
        const system = createEnhancedLorenzSystem(pos, hues[index], index);
        attractorSystems.push(system);
        scene.add(system.points);
      });
      
      particleSystemsRef.current = attractorSystems;

      // Refined grid
      const gridHelper = new THREE.GridHelper(25, 50, 0x0066cc, 0x003366);
      gridHelper.position.y = -15;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.08; // Reduced opacity
      scene.add(gridHelper);

      // Refined lighting
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.2);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x0088ff, 1.0, 70);
      pointLight1.position.set(12, 12, 12);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xff0088, 0.6, 50);
      pointLight2.position.set(-12, 8, -12);
      scene.add(pointLight2);

    } else {
      // LIGHT THEME - MANDELBROT
      const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
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

      // Refined solar particles
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions: number[] = [];
      const particleColors: number[] = [];
      
      const particleCount = isMobile ? 400 : 800; // Reduce particles on mobile
      
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 45 + 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        
        particlePositions.push(
          Math.cos(theta) * Math.sin(phi) * radius,
          Math.sin(theta) * Math.sin(phi) * radius,
          Math.cos(phi) * radius
        );
        
        const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.08, 0.7, 0.45);
        particleColors.push(color.r, color.g, color.b);
      }
      
      particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 2.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.4 // Reduced opacity
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
    }

    // Add refined starfield
    const stars = createEnhancedStarField();
    scene.add(stars);

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleZoom);

    // Resize handler
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

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (currentTime - lastTime < frameTime) return;
      lastTime = currentTime;
      
      timeRef.current += isMobile ? 0.004 : 0.008; // Slower animation on mobile

      if (isDarkTheme) {
        // ENHANCED LORENZ ANIMATIONS
        const scaleProgress = Math.min(timeRef.current / 10, 1);
        const easeOutCubic = 1 - Math.pow(1 - scaleProgress, 3);
        scaleRef.current = lorenzParams.scale + (lorenzParams.targetScale - lorenzParams.scale) * easeOutCubic;
        
        particleSystemsRef.current.forEach((system, systemIndex) => {
          system.material.uniforms.uTime.value = timeRef.current + system.phase;
          
          const modRho = lorenzParams.rho + Math.sin(timeRef.current * 0.1 + systemIndex) * 0.4;
          const modSigma = lorenzParams.sigma + Math.cos(timeRef.current * 0.12 + systemIndex) * 0.15;
          
          const steps = isMobile ? 2 : 4; // Fewer computation steps on mobile
          for (let i = 0; i < steps; i++) {
            system.currentPos = lorenzRK4(
              system.currentPos.x, 
              system.currentPos.y, 
              system.currentPos.z,
              { ...lorenzParams, rho: modRho, sigma: modSigma }
            );
          }
          
          const { positions, colors } = system;
          const index = system.index % system.maxPoints;
          
          positions[index * 3] = system.currentPos.x * scaleRef.current;
          positions[index * 3 + 1] = system.currentPos.y * scaleRef.current;
          positions[index * 3 + 2] = system.currentPos.z * scaleRef.current;
          
          const t = (timeRef.current + systemIndex) * 0.08;
          const hue = (system.baseHue + t + Math.sin(t * 1.8) * 0.08) % 1;
          const color = new THREE.Color().setHSL(hue, 0.75, 0.55);
          colors[index * 3] = color.r;
          colors[index * 3 + 1] = color.g;
          colors[index * 3 + 2] = color.b;
          
          // Update less frequently on mobile
          if (!isMobile || system.index % 2 === 0) {
            system.points.geometry.attributes.position.needsUpdate = true;
            system.points.geometry.attributes.color.needsUpdate = true;
          }
          
          system.index++;
        });

        // Refined camera orbit
        const orbitRadius = 52;
        const orbitSpeed = isMobile ? 0.02 : 0.04; // Slower on mobile
        const baseHeight = 8;
        const heightVariation = 6;
        
        camera.position.x = orbitRadius * Math.cos(timeRef.current * orbitSpeed);
        camera.position.z = orbitRadius * Math.sin(timeRef.current * orbitSpeed);
        camera.position.y = baseHeight + Math.sin(timeRef.current * orbitSpeed * 0.4) * heightVariation;
        
        camera.lookAt(0, 0, 0);

      } else {
        // MANDELBROT ANIMATIONS
        if (mandelbrotPlaneRef.current && mandelbrotPlaneRef.current.material) {
          const material = mandelbrotPlaneRef.current.material as THREE.ShaderMaterial;
          material.uniforms.uTime.value = timeRef.current;
        }

        const cameraSpeed = isMobile ? 0.04 : 0.08;
        camera.position.x = Math.sin(timeRef.current * cameraSpeed) * 1.5;
        camera.position.y = Math.cos(timeRef.current * cameraSpeed * 0.75) * 0.8;
        camera.lookAt(0, 0, 0);
      }

      // Update star field
      const starMaterial = stars.material as THREE.ShaderMaterial;
      if (starMaterial.uniforms) {
        starMaterial.uniforms.uTime.value = timeRef.current;
      }
      stars.rotation.y += isMobile ? 0.00005 : 0.0001; // Slower rotation on mobile

      renderer.render(scene, camera);
    };

    animate(0);
    
    setTimeout(() => setIsLoading(false), 800); // Reduced loading time

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleZoom);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isDarkTheme, mounted, createEnhancedLorenzSystem, createEnhancedStarField, handleMouseMove, handleZoom, lorenzRK4, isMobile]);

  // Enhanced theme configuration
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
    return null; // Prevent hydration mismatch
  }

  return (
    <div className={`portfolio-container ${currentThemeConfig.bgClass}`}>
      {/* Loading screen with refined styling */}
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

      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Overlay content with improved structure */}
      <div className="overlay-content">
        {/* Header - Enhanced with fixed logo positioning */}
        <header className="header">
          <nav className="nav-container">
            <div className={`logo ${currentThemeConfig.textPrimary}`}>
              <span className={currentThemeConfig.textAccent}>{name}</span>
              <span className={currentThemeConfig.textWhite}>Portfolio</span>
            </div>
            {/* Remove the old theme toggle since navbar handles it */}
          </nav>
        </header>

        {/* Main content - Completely redesigned layout */}
        <main className="main-content">
          <div className="content-wrapper">
            
            {/* Enhanced backdrop with better transparency */}
            <div className={`content-backdrop ${currentThemeConfig.cardBg}`}>
              
              {/* Hero section with refined typography */}
              <div className="hero-section">
                <div className="title-section">
                  <h1 className={`main-title ${currentThemeConfig.textPrimary}`}>
                    Hi, I&apos;m{' '}
                    <span className={`name-gradient ${isDarkTheme ? 'name-gradient-dark' : 'name-gradient-light'}`}>
                      {name}
                    </span>
                  </h1>
                  
                  {/* Dynamic role with smooth transitions */}
                  <div className="role-container">
                    <h2 className={`role-text ${currentThemeConfig.textSecondary}`}>
                      {roles[currentRoleIndex]}
                    </h2>
                  </div>
                </div>
                
                {/* Enhanced description */}
                <p className={`description ${currentThemeConfig.textSecondary}`}>
                  Follower of <b>P</b>assion, <b>P</b>atience, and <b>P</b>erseverance. Building scalable systems that solve real-world problems.
                </p>
                
                {/* Refined CTA buttons */}
                <div className="button-container">
                  <button className={`button-base button-primary ${currentThemeConfig.buttonPrimary}`}>
                    <Link href="/about">About Me</Link>
                  </button>
                  <button className={`button-base button-secondary ${currentThemeConfig.buttonSecondary}`}>
                    <Link href="/projects">View Projects</Link>
                  </button>
                </div>
                
                {/* Subtle stats or highlights */}
                <div className="stats-container">
                  <div className="stat-item">
                    <div className={`stat-number ${currentThemeConfig.textAccent}`}>5+</div>
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
            
            {/* Scroll indicator */}
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