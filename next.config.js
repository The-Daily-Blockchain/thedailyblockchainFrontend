/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },

  async headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload",
              },
              {
                key: "Content-Security-Policy",
                value:
                  "default-src *; img-src * https: data:; script-src * 'unsafe-inline'; style-src * 'unsafe-inline'; object-src 'none'; connect-src * https://*.facebook.com https://*.fbcdn.net;",
              },
              {
                key: "X-Frame-Options",
                value: "DENY",
              },
              {
                key: "X-Content-Type-Options",
                value: "nosniff",
              },
              {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
              },
              {
                key: "Permissions-Policy",
                value: "geolocation=(self), microphone=(self), camera=(self)",
              },
            ],
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
