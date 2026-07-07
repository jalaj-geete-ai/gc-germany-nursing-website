export default function DecoratedPhoto({ src, alt, className = '', showZigzag = true }) {
  return (
    <div className={`decor-photo-wrap ${className}`}>
      {showZigzag && (
        <svg className="decor-zigzag" viewBox="0 0 120 40" preserveAspectRatio="none">
          <path
            d="M0 30 L12 10 L24 30 L36 10 L48 30 L60 10 L72 30 L84 10 L96 30 L108 10 L120 30"
            fill="none" stroke="var(--blue)" strokeWidth="2.5"
          />
        </svg>
      )}
      <img src={src} alt={alt} className="decor-photo" />
      <svg className="decor-plus" viewBox="0 0 80 80">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <text
              key={`${row}-${col}`}
              x={col * 16 + 4}
              y={row * 16 + 8}
              fontSize="12"
              fill="var(--blue)"
              opacity={0.7 - (row + col) * 0.04}
            >+</text>
          ))
        )}
      </svg>
    </div>
  );
}
