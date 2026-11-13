/** 
 * Green Sound's original vector production desk.
 *
 * An abstract illustration of sound engineering, NOT a photograph of
 * company-owned equipment or a real measurement. Zero dependencies, bytes of
 * audio, microphone access, or external assets. It never handles clicks.
 * Motion, where permitted, is purely decorative CSS from home-production-v85.
 */
const levels = [8, 19, 11, 23, 15, 21, 9, 17, 26, 13] as const;
const faderPositions = [26, 37, 21, 30, 47, 36, 26, 39, 21, 31] as const;
const channelIds = Array.from({ length: 10 }, (_, index) => index);

export function ProductionDeckArt() {
  return (
    <div className="gs-production-deck-v85" aria-hidden="true">
      <svg viewBox="0 0 900 490" focusable="false" role="presentation">
        <defs>
          <linearGradient id="gs-v85-metal" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#283b36" />
            <stop offset=".45" stopColor="#0b1719" />
            <stop offset="1" stopColor="#030a0d" />
          </linearGradient>
          <linearGradient id="gs-v85-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#203b36" />
            <stop offset=".42" stopColor="#06110f" />
            <stop offset="1" stopColor="#04100d" />
          </linearGradient>
          <linearGradient id="gs-v85-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1a5b48" />
            <stop offset=".5" stopColor="#b9ff92" />
            <stop offset="1" stopColor="#234e3e" />
          </linearGradient>
          <linearGradient id="gs-v85-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#123928" />
            <stop offset=".5" stopColor="#05150e" />
            <stop offset="1" stopColor="#102d29" />
          </linearGradient>
          <filter id="gs-v85-shadow" x="-30%" y="-50%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>
        <ellipse cx="474" cy="416" rx="390" ry="44" fill="#06130c" opacity=".8" filter="url(#gs-v85-shadow)" />
        <path d="M74 169 L697 106 L844 329 L217 455 Z" fill="#040d0d" stroke="#32644e" strokeWidth="5" />
        <path d="M82 152 L699 94 L836 316 L214 436 Z" fill="url(#gs-v85-metal)" stroke="#769f91" strokeWidth="1.5" />
        <path d="M94 159 L688 106 L813 307 L225 419 Z" fill="url(#gs-v85-glass)" stroke="#18392f" strokeWidth="2" />
        <path d="M215 436 L836 316 L843 346 L221 468 Z" fill="#050d0c" stroke="#2a5548" strokeWidth="1" />
        <path d="M220 466 L844 346" stroke="url(#gs-v85-edge)" strokeWidth="5" strokeLinecap="round" opacity=".95" />
        <path d="M219 437 L835 318" stroke="#c6ffc2" strokeWidth="2" opacity=".65" />
        <path d="M105 162 L698 107" stroke="#b9ff90" opacity=".5" strokeWidth="2" />
        <g transform="translate(151 169) skewY(-5)">
          <rect x="0" y="0" width="517" height="59" rx="3" fill="#0b1a19" stroke="#356052" strokeWidth="1" />
          <rect x="8" y="8" width="500" height="40" rx="2" fill="url(#gs-v85-screen)" />
          <g stroke="#73ffa0" strokeWidth="2" opacity=".8">
            <path d="M13 29 l22 0 7 -9 8 18 9 -23 8 21 8 -7 22 0 8 5 10 -13 10 9 24 0" />
            <path d="M175 29 l20 0 9 -8 9 16 9 -26 9 21 9 -10 13 6 35 1 9 -8 10 15 9 -8 18 0" />
          </g>
          <g fill="#aef889" opacity=".8">
            {Array.from({length: 15}, (_,i) => <rect key={i} x={365+i*9} y={33-(i%5)*5} width="4" height={9+(i%5)*5} rx="1"/>)}
          </g>
          <text x="12" y="57" fontSize="6.2" fill="#9aca9c" letterSpacing="2.1">GS / LIVE CONTROL / SIGNAL CHAIN</text>
        </g>
        <g transform="translate(135 239) skewY(-5)">
          {channelIds.map((ix) => (
            <g key={ix} transform={`translate(${ix * 57} 0)`}>
              <path d="M1 0 V146" stroke="#5e8175" strokeWidth="1" opacity=".5" />
              <rect x="7" y="6" width="43" height="14" rx="2" fill="#142d23" stroke="#395f4b" strokeWidth="1" />
              <g>
                {Array.from({length: 5}, (_,n) => <rect key={n}
                  x={11+n*7} y={17-((levels[ix] ?? 0)%5)-n*2} width="3" height={3+(n*2)} 
                  fill={n===4 ? "#f8d18a" : "#a7ff90"} opacity=".9" />)}
              </g>
              <circle cx="27" cy="34" r="7" fill="#1a332e" stroke="#a1d4b0" strokeWidth="2" />
              <path d="M26 29 V34" stroke="#d9f4ce" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="27" cy="57" r="7" fill="#112722" stroke="#6b9882" strokeWidth="2" />
              <path d="M27 52 V57" stroke="#b4e4c7" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="22.5" y="75" width="8" height="55" rx="3" fill="#030c0b" stroke="#395c4a" />
              <path d="M26.5 79 V125" stroke="#8ab58f" strokeWidth="1.25" opacity=".65" />
              <rect x="17" y={76 + (faderPositions[ix] ?? 30)} width="19" height="11" rx="2"
                fill="#a0ada7" stroke="#e7f1dd" strokeWidth="1" />
              <path d={`M19 ${80 + (faderPositions[ix] ?? 30)} H34`} stroke="#4c5b5a" strokeWidth="1.5" />
              <text x="26" y="146" fill="#a9d4b0" fontSize="8" textAnchor="middle" fontWeight="700">
                {String(ix+1).padStart(2,"0")}
              </text>
            </g>
          ))}
        </g>
        <path d="M150 373 L704 320" stroke="#9df5b2" strokeDasharray="4 8" opacity=".4" />
        <path d="M164 397 L725 339" stroke="#4e9372" strokeWidth="2" opacity=".5" />
        <g transform="translate(752 235) rotate(-7)">
          <circle cx="0" cy="0" r="38" fill="#091b17" stroke="#97d7aa" strokeWidth="3" />
          <circle cx="0" cy="0" r="29" fill="#0e2923" stroke="#315945" strokeWidth="5" />
          <circle cx="0" cy="0" r="15" fill="#173c31" stroke="#9ff998" strokeWidth="2" />
          <path d="M0 -23 V-33 M23 0 H33 M0 23 V33 M-23 0 H-33" stroke="#aaff97" strokeWidth="3" />
          <circle cx="0" cy="0" r="4" fill="#b9ff91" />
        </g>
        <g transform="translate(705 344) rotate(-8)">
          <rect x="0" y="0" width="97" height="36" rx="3" fill="#0c1d1b" stroke="#598b74" />
          <text x="10" y="14" fill="#c4ffc4" fontSize="9" fontWeight="800" letterSpacing="1.5">GREEN SOUND</text>
          <text x="10" y="26" fill="#84c9a1" fontSize="7" letterSpacing="2.3">PRODUCTION</text>
        </g>
        <g fill="#bdf992" opacity=".92">
          <circle cx="182" cy="439" r="3" />
          <circle cx="190" cy="438" r="2" opacity=".6" />
          <circle cx="205" cy="435" r="2" opacity=".6" />
        </g>
      </svg>
    </div>
  );
}
