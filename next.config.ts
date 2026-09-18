import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // The about page moved from /studio to /hakkimda with the brand change.
      { source: "/studio", destination: "/hakkimda", permanent: true },
      // One canonical host. Both production aliases send visitors and crawlers
      // to maias.works so the same pages are not served under three names.
      // Matched by exact host, never `*.vercel.app`: preview deployments get
      // their own hashed hostnames and must stay reachable.
      ...["eaxea-site.vercel.app", "maias-works.vercel.app"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://maias.works/:path*",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        // script-src needs unsafe-inline: the App Router inlines its hydration
        // bootstrap, and a nonce would require middleware and force every page
        // to render dynamically. The policy still pins every fetchable origin
        // to self, which the previous three-directive version did not do.
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // React's development build needs eval() for its debugging features
            // and logs a CSP violation without it. Production never evaluates,
            // so the relaxation is confined to `next dev`.
            `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "worker-src 'self' blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    }];
  },
};

export default nextConfig;
