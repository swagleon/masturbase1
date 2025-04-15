"use client"

export default function Logo() {
  return (
    <div className="relative">
      <span className="font-bold text-2xl bg-gradient-to-b from-blue-800 to-blue-400 text-transparent bg-clip-text font-script relative">
        <span className="relative inline-flex items-center">
          {/* Stilisiertes M mit Vagina in der Mitte (20% nach unten verschoben) */}
          <svg
            width="25"
            height="25"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block transform translate-y-[20%]"
            style={{ filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" }}
          >
            {/* Basis des M */}
            <path
              d="M2 24V4C2 4 3 2 5 4C7 6 9 14 14 14C19 14 21 6 23 4C25 2 26 4 26 4V24"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
            />

            {/* Latina-inspirierte Vagina in der Mitte des M */}
            <ellipse cx="14" cy="14" rx="3.8" ry="5.2" fill="url(#latina-vagina-gradient)" />

            {/* Äußere Schamlippen - realistischer, basierend auf Latina-Anatomie */}
            <path
              d="M10.8 12C10.8 12 12.5 14.5 14 14.5C15.5 14.5 17.2 12 17.2 12"
              stroke="#be185d"
              strokeWidth="0.8"
              fill="none"
            />
            <path
              d="M10.8 16C10.8 16 12.5 13.5 14 13.5C15.5 13.5 17.2 16 17.2 16"
              stroke="#be185d"
              strokeWidth="0.8"
              fill="none"
            />

            {/* Innere Schamlippen - realistischer, basierend auf Latina-Anatomie */}
            <path d="M12 13C12 13 13.5 14.8 14 14C14.5 14.8 16 13 16 13" stroke="#9d174d" strokeWidth="0.6" fill="none">
              <animate
                attributeName="d"
                values="M12 13C12 13 13.5 14.8 14 14C14.5 14.8 16 13 16 13;M12 13.2C12 13.2 13.5 14.5 14 14C14.5 14.5 16 13.2 16 13.2;M12 13C12 13 13.5 14.8 14 14C14.5 14.8 16 13 16 13"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M12 15C12 15 13.5 13.2 14 14C14.5 13.2 16 15 16 15" stroke="#9d174d" strokeWidth="0.6" fill="none">
              <animate
                attributeName="d"
                values="M12 15C12 15 13.5 13.2 14 14C14.5 13.2 16 15 16 15;M12 14.8C12 14.8 13.5 13.5 14 14C14.5 13.5 16 14.8 16 14.8;M12 15C12 15 13.5 13.2 14 14C14.5 13.2 16 15 16 15"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Große, sichtbare Klitoris in Rosa mit Glanz */}
            <circle cx="14" cy="11.5" r="1.2" fill="url(#clitoris-gradient)">
              <animate attributeName="r" values="1.2;1.3;1.2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Glanzeffekt auf der Klitoris */}
            <circle cx="13.7" cy="11.2" r="0.4" fill="#ffffff" opacity="0.7">
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Vaginalöffnung in Gold mit Lichtstrahlen */}
            <ellipse cx="14" cy="14" rx="1.5" ry="2.5" fill="url(#vagina-opening-gradient)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </ellipse>

            {/* Lichtstrahlen */}
            <path d="M14 10.5L14 9.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M16 11L17 9.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.7s" repeatCount="indefinite" />
            </path>
            <path d="M12 11L11 9.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.3s" repeatCount="indefinite" />
            </path>
            <path d="M14 17.5L14 18.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
            </path>
            <path d="M16 17L17 18.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
            </path>
            <path d="M12 17L11 18.5" stroke="#fbbf24" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
            </path>

            {/* Feuchtigkeit - realistischer Glanz */}
            <path d="M13.5 16.5C13.5 16.5 14 17.2 14.5 16.5" stroke="#f9a8d4" strokeWidth="0.4" fill="none">
              <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
            </path>
            <path
              d="M12.5 15.8C12.5 15.8 14 16.8 15.5 15.8"
              stroke="#f9a8d4"
              strokeWidth="0.3"
              fill="none"
              opacity="0.6"
            >
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
            </path>

            {/* Gradients für realistische Darstellung */}
            <defs>
              {/* Latina-inspirierter Farbverlauf für die Vagina */}
              <linearGradient id="latina-vagina-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>

              {/* Glänzender Farbverlauf für die Klitoris */}
              <radialGradient id="clitoris-gradient" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="40%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#db2777" />
              </radialGradient>

              {/* Goldener Farbverlauf für die Vaginalöffnung */}
              <radialGradient id="vagina-opening-gradient" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
            </defs>
          </svg>
          <span
            className="bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300 text-transparent bg-clip-text transform translate-y-[10%] text-center"
            style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.8)" }}
          >
            asturBase
          </span>
        </span>
      </span>

      {/* Kurvige Unterlinie unter der Schrift */}
      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </div>
  )
}

