// src/app/api/placeholder/[width]/[height]/route.js
export async function GET(request, { params }) {
  try {
    // Await params in Next.js 15.3.2+
    const resolvedParams = await params;
    const width = parseInt(resolvedParams.width) || 400;
    const height = parseInt(resolvedParams.height) || 300;

    if (width <= 0 || height <= 0 || width > 2000 || height > 2000) {
      return new Response('Invalid dimensions', { status: 400 });
    }

    // Get custom text from query parameters
    const url = new URL(request.url);
    const customText = url.searchParams.get('text') || 'Coming Soon';
    
    // Generate a simple gradient background
    const hue = Math.floor(Math.random() * 360);
    const color1 = `hsl(${hue}, 60%, 50%)`;
    const color2 = `hsl(${(hue + 60) % 360}, 60%, 40%)`;
    
    // Calculate font size
    const fontSize = Math.max(14, Math.min(width / 10, height / 6, 32));
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);
    
    // Create SVG
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg-${uniqueId})" />
  <text x="50%" y="45%" font-family="system-ui, Arial, sans-serif" font-size="${fontSize}" fill="white" text-anchor="middle" dy=".3em" font-weight="600">${customText}</text>
  <text x="${width - 10}" y="${height - 8}" font-family="system-ui, Arial, sans-serif" font-size="${Math.max(10, fontSize * 0.4)}" fill="white" text-anchor="end" opacity="0.8">${width} × ${height}</text>
</svg>`;

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });

  } catch (error) {
    console.error('Placeholder API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}