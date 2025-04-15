"use client"

export default function MiniLogo() {
  return (
    <div className="flex items-center">
      <span className="font-bold text-2xl bg-gradient-to-b from-blue-800 to-blue-400 text-transparent bg-clip-text font-script border-[1px] border-blue-800 px-2 py-1 rounded relative">
        <span className="relative inline-flex items-center">
          {/* Verschnörkeltes M ohne Vagina */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
            style={{ filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" }}
          >
            {/* Verschnörkeltes M */}
            <path
              d="M2 24V4C2 4 3 2 5 4C7 6 9 14 14 14C19 14 21 6 23 4C25 2 26 4 26 4V24"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
            />
            {/* Verschnörkelungen */}
            <path d="M2 4C1 2 3 1 4 3M26 4C27 2 25 1 24 3" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M14 14C12 16 12 18 14 20M14 14C16 16 16 18 14 20" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          </svg>
          <span
            className="bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300 text-transparent bg-clip-text transform translate-y-[10%] text-center"
            style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.8)" }}
          >
            asturBase
          </span>
        </span>
      </span>
      {/* Blauer leuchtender Hintergrund-Effekt */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-300/20 blur-lg"></div>
    </div>
  )
}

