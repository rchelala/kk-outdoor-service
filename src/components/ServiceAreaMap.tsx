export function ServiceAreaMap() {
  const cx = 310
  const cy = 230
  const gridStep = 22
  const bg = '#dfeae5'
  const gridColor = 'rgba(31,77,59,0.09)'
  const roadColor = '#b8cac3'
  const labelProps = {
    fill: '#8fa89f',
    fontSize: '10',
    fontWeight: '600',
    letterSpacing: '1.5',
    fontFamily: 'Inter, system-ui, sans-serif',
    textAnchor: 'middle' as const,
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <svg
        viewBox="0 0 620 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        role="img"
        aria-label="Stylized map showing ~1.5 mile service radius centered on 23rd Ave and Southern Ave in South Phoenix"
      >
        {/* Background */}
        <rect width="620" height="460" fill={bg} />

        {/* Grid */}
        {Array.from({ length: Math.ceil(460 / gridStep) + 1 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * gridStep} x2="620" y2={i * gridStep}
            stroke={gridColor} strokeWidth="1" />
        ))}
        {Array.from({ length: Math.ceil(620 / gridStep) + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * gridStep} y1="0" x2={i * gridStep} y2="460"
            stroke={gridColor} strokeWidth="1" />
        ))}

        {/* Roads */}
        <line x1="246" y1="-5" x2="230" y2="465" stroke={roadColor} strokeWidth="8" />
        <line x1="370" y1="-5" x2="393" y2="465" stroke={roadColor} strokeWidth="8" />
        <line x1="-5" y1="175" x2="625" y2="292" stroke={roadColor} strokeWidth="8" />
        <line x1="125" y1="-5" x2="622" y2="352" stroke={roadColor} strokeWidth="8" />
        <line x1="-5" y1="52" x2="510" y2="465" stroke={roadColor} strokeWidth="8" />

        {/* Outer dashed service radius circle */}
        <circle cx={cx} cy={cy} r="168"
          fill="rgba(31,77,59,0.07)"
          stroke="#1f4d3b" strokeWidth="2.5" strokeDasharray="11 7" />

        {/* Inner circle */}
        <circle cx={cx} cy={cy} r="92" fill="rgba(31,77,59,0.10)" />

        {/* Center pin */}
        <circle cx={cx} cy={cy} r="15" fill="rgba(31,77,59,0.18)" />
        <circle cx={cx} cy={cy} r="8" fill="#1f4d3b" />
        <circle cx={cx} cy={cy} r="3" fill="white" />

        {/* Street labels */}
        <text {...labelProps} x="90" y="155">19TH AVE</text>
        <text {...labelProps} x="518" y="188">CENTRAL</text>
        <text {...labelProps} x="65" y="325">SOUTHERN AVE</text>
        <text {...labelProps} x="516" y="378">BASELINE</text>

        {/* Center intersection label */}
        <text
          x={cx + 20} y={cy + 7}
          fill="#1f4d3b" fontSize="11" fontWeight="700" letterSpacing="1.2"
          fontFamily="Inter, system-ui, sans-serif"
        >
          23RD & SOUTHERN
        </text>

        {/* Badge */}
        <rect x="16" y="406" width="204" height="38" rx="19" fill="white" fillOpacity="0.95" />
        {/* Pin icon */}
        <circle cx="40" cy="421" r="5.5" fill="none" stroke="#1f4d3b" strokeWidth="1.5" />
        <path d="M 36.5 424.5 L 40 433 L 43.5 424.5" fill="#1f4d3b" />
        <circle cx="40" cy="421" r="2" fill="#1f4d3b" />
        <text x="56" y="430"
          fill="#1f4d3b" fontSize="11.5" fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif">
          ~1.5 mi service radius
        </text>
      </svg>
    </div>
  )
}
