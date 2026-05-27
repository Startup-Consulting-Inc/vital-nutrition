/**
 * Healthy Eating Plate visualization (Harvard T.H. Chan School of Public Health pattern).
 * Pure SVG, accessible, scales with the container width.
 */
export default function HealthyPlateDiagram() {
  // Sector definitions: percent of plate, color, label, examples.
  const sectors = [
    { pct: 0.25, color: '#4a7c59', label: 'Vegetables', sub: '½ plate together with fruits — eat the rainbow' },
    { pct: 0.25, color: '#86b079', label: 'Fruits',     sub: 'Whole fruit > juice. Aim for 1.5–2 cups/day' },
    { pct: 0.25, color: '#c9a96e', label: 'Whole Grains', sub: 'Brown rice, oats, quinoa, whole-wheat pasta' },
    { pct: 0.25, color: '#d95c39', label: 'Lean Protein', sub: 'Fish, poultry, legumes, tofu, eggs' },
  ];

  const cx = 110;
  const cy = 110;
  const r = 95;
  const innerR = 38;

  // Build SVG paths for each sector using the donut formula.
  let cumulative = -Math.PI / 2; // start at the top
  const paths = sectors.map((s, i) => {
    const start = cumulative;
    const end = cumulative + s.pct * 2 * Math.PI;
    cumulative = end;

    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const x3 = cx + innerR * Math.cos(end);
    const y3 = cy + innerR * Math.sin(end);
    const x4 = cx + innerR * Math.cos(start);
    const y4 = cy + innerR * Math.sin(start);

    const largeArc = s.pct > 0.5 ? 1 : 0;
    const d = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');

    // Place label at sector midpoint at radius (r + innerR) / 2.
    const mid = (start + end) / 2;
    const labelR = (r + innerR) / 2;
    const lx = cx + labelR * Math.cos(mid);
    const ly = cy + labelR * Math.sin(mid);

    return { ...s, d, lx, ly, key: i };
  });

  return (
    <div className="p-8 rounded-2xl bg-white border border-deep/5 shadow-sm">
      <p className="text-caption text-muted-sage mb-2">The Healthy Plate Method</p>
      <h3 className="text-xl text-deep mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
        Building a Balanced Meal
      </h3>

      <div className="flex items-center justify-center mb-5">
        <svg
          viewBox="0 0 280 240"
          className="w-full max-w-[300px]"
          role="img"
          aria-label="Healthy plate diagram showing half vegetables and fruit, one quarter whole grains, one quarter lean protein, with a glass of water on the side"
        >
          {/* Plate rim */}
          <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#202a26" strokeOpacity="0.08" strokeWidth="2" />

          {/* Sectors */}
          {paths.map(p => (
            <g key={p.key}>
              <path d={p.d} fill={p.color} fillOpacity="0.85">
                <title>{p.label}: {p.sub}</title>
              </path>
              <text
                x={p.lx} y={p.ly}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9"
                fontWeight="700"
                fill="#ffffff"
                style={{ pointerEvents: 'none' }}
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Inner hub */}
          <circle cx={cx} cy={cy} r={innerR - 2} fill="#f6f5f1" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fill="#202a26" fontWeight="700" fontFamily="Playfair Display, serif">
            Healthy
          </text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="#202a26" fontWeight="700" fontFamily="Playfair Display, serif">
            Plate
          </text>

          {/* Water glass */}
          <g transform="translate(225 70)">
            <path d="M 0 0 L 30 0 L 26 80 L 4 80 Z" fill="#4a90a4" fillOpacity="0.18" stroke="#4a90a4" strokeWidth="1.5" />
            <path d="M 4 28 L 26 28 L 24 78 L 6 78 Z" fill="#4a90a4" fillOpacity="0.6" />
            <text x="15" y="100" textAnchor="middle" fontSize="9" fill="#4a90a4" fontWeight="700">Water</text>
          </g>
        </svg>
      </div>

      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 rounded-full bg-[#4a7c59] mt-1.5 flex-shrink-0" />
          <div>
            <strong className="text-deep">½ plate vegetables + fruits</strong>
            <p className="text-xs text-deep/60">Eat the rainbow. Potatoes don\'t count toward the vegetable share.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
          <div>
            <strong className="text-deep">¼ plate whole grains</strong>
            <p className="text-xs text-deep/60">Brown rice, oats, quinoa, whole-wheat pasta. Avoid refined grains.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 rounded-full bg-[#d95c39] mt-1.5 flex-shrink-0" />
          <div>
            <strong className="text-deep">¼ plate lean protein</strong>
            <p className="text-xs text-deep/60">Fish, poultry, legumes, tofu, eggs. Limit red and processed meats.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-3 h-3 rounded-full bg-[#4a90a4] mt-1.5 flex-shrink-0" />
          <div>
            <strong className="text-deep">Water on the side</strong>
            <p className="text-xs text-deep/60">Coffee or tea OK. Skip sugary drinks and limit milk/dairy to 1–2 servings/day.</p>
          </div>
        </li>
      </ul>

      <p className="text-[10px] text-deep/40 mt-4">
        Adapted from Harvard T.H. Chan School of Public Health, Healthy Eating Plate.
      </p>
    </div>
  );
}
