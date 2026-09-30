import { cn } from "@/lib/utils";

/**
 * The illustration that sits under the auth screens' headline — the reference site ships a
 * bitmap here (550x580), this draws the same idea from the design's own parts instead: a
 * course card (cover, chips, title, creator, level chip and the overlapping learner
 * stack), a floating progress card, and the lime disc / white ring ornaments the design
 * scatters across its brand surfaces.
 *
 * Every colour and size below is a design value: cover 341x195 at radius 12, chips on
 * `#f6f6f6`, level chip 97x32 on `#f5f5f6`, learner badge lime with `26+`, progress card
 * 232x138 with a 8px track filled 56%.
 *
 * SVG so it scales with the panel it sits in (260px on a phone up to 420px on desktop)
 * without any of the type reflowing, and `aria-hidden` because it repeats the headline.
 */
export function AuthArtwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 550 580"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full select-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="auth-artwork-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        </pattern>
        <filter
          id="auth-artwork-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="20"
            stdDeviation="26"
            floodColor="#040819"
            floodOpacity="0.30"
          />
        </filter>
        <filter
          id="auth-artwork-shadow-sm"
          x="-40%"
          y="-40%"
          width="180%"
          height="200%"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="16"
            floodColor="#040819"
            floodOpacity="0.26"
          />
        </filter>
      </defs>

      {/* Ornaments behind the cards */}
      <circle cx="486" cy="66" r="46" fill="#d4fb20" />
      <circle
        cx="66"
        cy="30"
        r="26"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="4"
      />
      <rect
        x="24"
        y="520"
        width="56"
        height="56"
        rx="18"
        fill="#d4fb20"
        fillOpacity="0.9"
      />

      {/* Course card */}
      <g filter="url(#auth-artwork-shadow)">
        <rect x="36" y="56" width="384" height="456" rx="28" fill="#ffffff" />
      </g>

      {/* Cover: the design's 341x195 ratio, on the brand ground with its grid */}
      <g>
        <rect
          x="56"
          y="76"
          width="344"
          height="196"
          rx="12"
          fill="#003be2"
        />
        <rect
          x="56"
          y="76"
          width="344"
          height="196"
          rx="12"
          fill="url(#auth-artwork-grid)"
        />
        <circle cx="330" cy="132" r="46" fill="#d4fb20" fillOpacity="0.92" />
        <circle
          cx="108"
          cy="238"
          r="26"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="4"
        />
        <circle cx="228" cy="174" r="34" fill="#d4fb20" />
        <path d="M220 159 L249 174 L220 189 Z" fill="#040819" />
      </g>

      {/* Chips */}
      <g>
        <rect x="56" y="292" width="76" height="28" rx="14" fill="#f6f6f6" />
        <text
          x="94"
          y="311"
          textAnchor="middle"
          className="font-body"
          fontSize="12"
          fontWeight="500"
          fill="#4b4c53"
        >
          Design
        </text>

        <rect x="140" y="292" width="112" height="28" rx="14" fill="#f6f6f6" />
        <text
          x="196"
          y="311"
          textAnchor="middle"
          className="font-body"
          fontSize="12"
          fontWeight="500"
          fill="#4b4c53"
        >
          Development
        </text>
      </g>

      {/* Title */}
      <text
        x="56"
        y="356"
        className="font-display"
        fontSize="20"
        fontWeight="600"
        fill="#000000"
      >
        Complete Web Design
      </text>
      <text
        x="56"
        y="380"
        className="font-display"
        fontSize="20"
        fontWeight="600"
        fill="#000000"
      >
        Bootcamp
      </text>

      <text x="56" y="406" className="font-body" fontSize="12" fill="#4f4f4f">
        by Olivia Spark
      </text>

      {/* Level chip + learner stack */}
      <g>
        <rect x="56" y="424" width="97" height="32" rx="16" fill="#f5f5f6" />
        <text
          x="104"
          y="445"
          textAnchor="middle"
          className="font-body"
          fontSize="12"
          fontWeight="500"
          fill="#242528"
        >
          Beginner
        </text>

        <g stroke="#ffffff" strokeWidth="2" fill="#ced0d3">
          <circle cx="181" cy="440" r="16" />
          <circle cx="205" cy="440" r="16" />
          <circle cx="229" cy="440" r="16" />
          <circle cx="253" cy="440" r="16" />
        </g>
        <circle cx="277" cy="440" r="16" fill="#d4fb20" stroke="#ffffff" strokeWidth="2" />
        <text
          x="277"
          y="444"
          textAnchor="middle"
          className="font-body"
          fontSize="11"
          fontWeight="700"
          fill="#242528"
        >
          26+
        </text>
      </g>

      {/* Price + rating */}
      <text
        x="56"
        y="492"
        className="font-display"
        fontSize="16"
        fontWeight="600"
        fill="#040819"
      >
        $49.00
      </text>
      <path
        d="M356 481 L359.5 488.5 L367.5 489.5 L361.5 495 L363.2 503 L356 499 L348.8 503 L350.5 495 L344.5 489.5 L352.5 488.5 Z"
        fill="#d4fb20"
      />
      <text
        x="378"
        y="497"
        textAnchor="start"
        className="font-body"
        fontSize="13"
        fontWeight="700"
        fill="#242528"
      >
        4.8
      </text>

      {/* Progress card */}
      <g filter="url(#auth-artwork-shadow-sm)">
        <rect x="300" y="444" width="230" height="136" rx="16" fill="#ffffff" />
      </g>
      <text
        x="316"
        y="474"
        className="font-body"
        fontSize="14"
        fill="#4b4c53"
      >
        Course progress
      </text>
      <text
        x="316"
        y="528"
        className="font-display"
        fontSize="48"
        fontWeight="600"
        fill="#040819"
      >
        55%
      </text>
      <rect x="316" y="544" width="198" height="8" rx="4" fill="#f5f5f6" />
      <rect x="316" y="544" width="111" height="8" rx="4" fill="#d4fb20" />
    </svg>
  );
}
