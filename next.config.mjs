// En-têtes de sécurité — appliqués en production (Vercel / `next start`).
// En développement, le client de dev de Next.js (React Refresh, devtools)
// nécessite des restrictions CSP plus larges ; les en-têtes sont donc
// désactivés en local pour ne pas casser le serveur de développement.
// Les en-têtes sont actifs sur tout environnement de production.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "frame-ancestors 'none'",
    ].join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig = {
  reactStrictMode: true,
  // Désactive l'en-tête X-Powered-By.
  poweredByHeader: false,
  headers: async () =>
    process.env.NODE_ENV === 'production'
      ? [{ source: '/(.*)', headers: securityHeaders }]
      : [],
}

export default nextConfig
