interface SchoolAndTeacherInterface{
  addProf: string,
  schoolName: string
}

export default function SchoolAddTeacherIllustration( {addProf, schoolName }: SchoolAndTeacherInterface ) {
  return (
    <svg
      viewBox="0 0 600 300"
      width="100%"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      class="select-none"
    >
      <style>{`
        /* ===== ARM WAVE ===== */
        .arm {
          transform-origin: 315px 168px;
          animation: wave 2s ease-in-out infinite;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-18deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        /* ===== BUTTON PULSE ===== */
        .pulse-ring {
          animation: pulse 1.8s ease-out infinite;
          transform-origin: center;
        }

        @keyframes pulse {
          0% {
            r: 24;
            opacity: 0.8;
          }
          100% {
            r: 36;
            opacity: 0;
          }
        }
      `}</style>

      {/* ===== SCHOOL ===== */}
      {/* School label */}
      <rect x="50" y="120" width="180" height="120" rx="8" fill="#fae26aff" />
      <polygon points="40,120 140,50 240,120" fill="#c52929ff" />
      <text
        x="140"
        y="145"
        text-anchor="middle"
        font-size="16"
        font-weight="600"
        fill="#42351eff"
      >
        {schoolName}
      </text>
      <rect x="120" y="170" width="40" height="70" rx="4" fill="#9b6e4aff" />
      <rect x="80" y="150" width="30" height="30" rx="4" fill="#71abf1ff" />
      <rect x="170" y="150" width="30" height="30" rx="4" fill="#71abf1ff" />

      {/* ===== PROFESSOR ===== */}
      {/* Head */}
      <circle cx="320" cy="140" r="18" fill="#fde68a" />

      {/* Glasses */}
      <circle cx="314" cy="140" r="5" stroke="#374151" stroke-width="2" fill="none" />
      <circle cx="326" cy="140" r="5" stroke="#374151" stroke-width="2" fill="none" />
      <line x1="319" y1="140" x2="321" y2="140" stroke="#374151" stroke-width="2" />

      {/* Body */}
      <rect x="305" y="160" width="30" height="50" rx="6" fill="#60a5fa" />

      {/* Left arm (static) */}
      <rect
        x="285"
        y="170"
        width="20"
        height="8"
        rx="4"
        fill="#fde68a"
      />

      {/* Right arm (animated, corrected position) */}
      <rect
        x="335"
        y="168"
        width="24"
        height="8"
        rx="4"
        fill="#fde68a"
        class="arm"
      />

      {/* Legs */}
      <rect x="307" y="210" width="8" height="30" rx="4" fill="#374151" />
      <rect x="325" y="210" width="8" height="30" rx="4" fill="#374151" />

      {/* ===== ADD BUTTON ===== */}
      <g
        style="cursor: pointer"
        aria-label="Add Prof"
        onClick={() => console.log("Adicionar professor")}
      >
        <title>{addProf}</title>
        {/* Pulse ring */}
        <circle
          cx="420"
          cy="170"
          r="24"
          fill="none"
          stroke="#22c55e"
          stroke-width="3"
          class="pulse-ring"
        />

        {/* Main button */}
        <circle cx="420" cy="170" r="22" fill="#22c55e" />

        {/* Plus icon */}
        <line
          x1="420"
          y1="158"
          x2="420"
          y2="182"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="408"
          y1="170"
          x2="432"
          y2="170"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>
    </svg>
  )
}
