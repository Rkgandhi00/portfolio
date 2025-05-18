// app/api/placeholder/[width]/[height]/route.ts (Enhanced Version)
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  // Ensure params are properly awaited
  const { width: widthParam, height: heightParam } = params;
  const width = parseInt(widthParam) || 400;
  const height = parseInt(heightParam) || 300;
  
  // Get query parameters for customization
  const url = new URL(request.url);
  const style = url.searchParams.get('style') || 'gradient';
  const text = url.searchParams.get('text') || `${width} × ${height}`;
  
  // Generate random design styles
  const styles = {
    gradient: generateGradientStyle(),
    pattern: generatePatternStyle(),
    mesh: generateMeshStyle(),
    geometric: generateGeometricStyle(),
  };
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selectedStyle = styles[style] || styles.gradient;
  
  // Generate an SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${selectedStyle.background}
      
      <!-- Text Shadow for better visibility -->
      <filter id="shadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3" />
      </filter>
      
      <!-- Display Size Text -->
      <text 
        x="50%" 
        y="50%" 
        font-family="ui-sans-serif, system-ui, sans-serif" 
        font-size="${Math.max(Math.min(width, height) / 10, 16)}" 
        font-weight="bold"
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="white"
        filter="url(#shadow)"
      >
        ${text}
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

function generateGradientStyle() {
  // Generate a random gradient
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 60) + 30) % 360;
  
  const color1 = `hsl(${hue1}, 80%, 50%)`;
  const color2 = `hsl(${hue2}, 80%, 50%)`;
  
  return {
    background: `
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    `
  };
}

function generatePatternStyle() {
  // Generate a pattern background
  const bgColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 30%)`;
  const patternColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  
  return {
    background: `
      <defs>
        <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3" fill="${patternColor}" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${bgColor}" />
      <rect width="100%" height="100%" fill="url(#pattern)" />
    `
  };
}

function generateMeshStyle() {
  // Generate a mesh gradient background (simplified version)
  const hue = Math.floor(Math.random() * 360);
  const color1 = `hsl(${hue}, 80%, 50%)`;
  const color2 = `hsl(${(hue + 120) % 360}, 80%, 50%)`;
  const color3 = `hsl(${(hue + 240) % 360}, 80%, 50%)`;
  
  return {
    background: `
      <defs>
        <radialGradient id="grad1" cx="0%" cy="0%" r="100%" fx="0%" fy="0%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color1}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="grad2" cx="100%" cy="0%" r="100%" fx="100%" fy="0%">
          <stop offset="0%" stop-color="${color2}" />
          <stop offset="100%" stop-color="${color2}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="grad3" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
          <stop offset="0%" stop-color="${color3}" />
          <stop offset="100%" stop-color="${color3}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#222" />
      <rect width="100%" height="100%" fill="url(#grad1)" />
      <rect width="100%" height="100%" fill="url(#grad2)" />
      <rect width="100%" height="100%" fill="url(#grad3)" />
    `
  };
}

function generateGeometricStyle() {
  // Generate a geometric pattern
  const bgColor = `hsl(${Math.floor(Math.random() * 360)}, 60%, 20%)`;
  const lineColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  
  // Create a pattern with random lines
  let lines = '';
  for (let i = 0; i < 10; i++) {
    const x1 = Math.floor(Math.random() * 100);
    const y1 = Math.floor(Math.random() * 100);
    const x2 = Math.floor(Math.random() * 100);
    const y2 = Math.floor(Math.random() * 100);
    
    lines += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="${lineColor}" stroke-width="2" opacity="0.3" />`;
  }
  
  return {
    background: `
      <rect width="100%" height="100%" fill="${bgColor}" />
      ${lines}
    `
  };
}