export function BiologyMark({
  inverse = false,
  className = "",
}: {
  inverse?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`biology-mark${inverse ? " biology-mark-inverse" : ""} ${className}`.trim()}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="31" stroke="currentColor" strokeWidth="2.4" />
      <path d="M31 12c11 8 11 16 0 24s-11 16 0 24M41 12c-11 8-11 16 0 24s11 16 0 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M30 20h12M29 31h14M29 42h14M30 53h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 46c11-13 20-10 23 7-12 5-20 1-23-7Z" fill="var(--mark-leaf, #35b86b)" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m16 47 17 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="54" cy="23" r="5" fill="var(--ember)" />
    </svg>
  );
}

