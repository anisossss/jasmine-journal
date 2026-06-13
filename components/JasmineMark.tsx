export default function JasmineMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="12"
          cy="6.6"
          rx="2.5"
          ry="4.4"
          transform={`rotate(${deg} 12 12)`}
          fill="currentColor"
          opacity="0.85"
        />
      ))}
      <circle cx="12" cy="12" r="1.8" fill="var(--color-gold)" />
    </svg>
  );
}
