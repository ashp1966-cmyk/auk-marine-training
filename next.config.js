/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — no one can embed this site in an iframe
          { key: "X-Frame-Options", value: "DENY" },
          // Force HTTPS for 1 year (HSTS)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy — don't leak full URL to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js requires 'unsafe-inline' for styles in production (no nonces yet)
              "style-src 'self' 'unsafe-inline'",
              // Scripts: self + Next.js inline chunks + PayFast sandbox JS
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' sandbox.payfast.co.za www.payfast.co.za",
              // Images from self, Vercel Blob CDN, data URIs (for inline course thumbnails)
              "img-src 'self' data: *.public.blob.vercel-storage.com",
              // Fonts from self
              "font-src 'self'",
              // Forms can submit to PayFast live and sandbox
              "form-action 'self' https://www.payfast.co.za https://sandbox.payfast.co.za",
              // Connections: self + our own API routes + YouTube embeds
              "connect-src 'self'",
              // Frames for YouTube course videos
              "frame-src www.youtube.com youtube.com",
              // No plugins
              "object-src 'none'",
              // Base URI locked to self
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

