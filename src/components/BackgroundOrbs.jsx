export default function BackgroundOrbs() {
  return (
    <div aria-hidden="true" style={{ zIndex: 0, pointerEvents: 'none' }}>
      {/* Top-left brand orb */}
      <div
        className="orb orb-brand"
        style={{
          width: '520px', height: '520px',
          top: '-180px', left: '-180px',
          opacity: 0.28,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      {/* Top-right violet orb */}
      <div
        className="orb orb-violet"
        style={{
          width: '420px', height: '420px',
          top: '-100px', right: '-120px',
          opacity: 0.22,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      {/* Bottom-center cyan accent */}
      <div
        className="orb orb-cyan"
        style={{
          width: '340px', height: '340px',
          bottom: '-80px', left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.12,
          animation: 'float 12s ease-in-out infinite',
        }}
      />
    </div>
  )
}
