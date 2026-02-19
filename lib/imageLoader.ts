/**
 * Custom Image Loader for Next.js
 *
 * This loader bypasses Vercel's Image Optimization for external images
 * from camp.honorofkings.com to avoid hitting the transformation limit.
 *
 * External images are served directly from their CDN without optimization,
 * while local images can still be optimized if needed.
 */

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the image is from Honor of Kings CDN, return it directly without optimization
  // Append width parameter to satisfy Next.js requirement (CDN will ignore it)
  if (src.startsWith("https://camp.honorofkings.com")) {
    return `${src}?w=${width}`;
  }

  // For local images, append width parameter for Next.js compatibility
  // Note: With custom loader, images are served as-is without actual optimization
  return `${src}?w=${width}&q=${quality || 75}`;
}
