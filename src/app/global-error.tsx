'use client'

// File d’erreur globale — auto-portante (html + body), dans la charte.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          background: '#0A2E3C',
          color: '#F5EDD6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100svh',
          fontFamily: 'Georgia, serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <div>
          <p style={{ fontStyle: 'italic', color: '#E8C98A', fontSize: '1.25rem' }}>
            L’océan est agité…
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>
            Une erreur est survenue
          </h1>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '1rem',
              background: 'none',
              border: 'none',
              color: '#E8C98A',
              fontSize: '0.9rem',
              textDecoration: 'underline',
              textUnderlineOffset: '5px',
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
