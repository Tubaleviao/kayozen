export default function SchoolAddTeacherIllustration() {
  return (
    <svg
      viewBox="0 0 600 300"
      width="100%"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      class="select-none"
    >
      <style>{`
        .arm {
          transform-origin: 310px 165px;
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-12deg); }
          100% { transform: rotate(0deg); }
        }

        .add-btn:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* Escola */}
      <rect x="50" y="120" width="180" height="120" rx="8" fill="#e5e7eb" />
      <polygon points="40,120 140,50 240,120" fill="#d1d5db" />
      <rect x="120" y="170" width="40" height="70" rx="4" fill="#9ca3af" />
      <rect x="80" y="150" width="30" height="30" rx="4" fill="#bfdbfe" />
      <rect x="170" y="150" width="30" height="30" rx="4" fill="#bfdbfe" />

      {/* Professor */}
      {/* Cabeça */}
      <circle cx="320" cy="140" r="18" fill="#fde68a" />

      {/* Corpo */}
      <rect x="305" y="160" width="30" height="50" rx="6" fill="#60a5fa" />

      {/* Braço esquerdo (fixo) */}
      <rect x="285" y="165" width="20" height="8" rx="4" fill="#fde68a" />

      {/* Braço direito (animado) */}
      <rect
        x="320"
        y="165"
        width="22"
        height="8"
        rx="4"
        fill="#fde68a"
        class="arm"
      />

      {/* Pernas */}
      <rect x="307" y="210" width="8" height="30" rx="4" fill="#374151" />
      <rect x="325" y="210" width="8" height="30" rx="4" fill="#374151" />

      {/* Botão + */}
      <g
        class="add-btn"
        style="cursor: pointer; transition: transform 0.2s ease;"
        onClick={() => console.log("Adicionar professor")}
      >
        <circle cx="420" cy="170" r="22" fill="#22c55e" />
        <line x1="420" y1="158" x2="420" y2="182" stroke="white" stroke-width="4" />
        <line x1="408" y1="170" x2="432" y2="170" stroke="white" stroke-width="4" />
      </g>

      {/* Texto opcional */}
      <text x="380" y="215" font-size="14" fill="#374151">
        Adicionar professor
      </text>
    </svg>
  );
}
