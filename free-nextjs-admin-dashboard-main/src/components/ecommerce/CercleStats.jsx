import React from "react";

const stats = [
  { label: "Faible", percent: 55, color: "#bbf7d0" },   // vert clair
  { label: "Moyenne", percent: 30, color: "#34d399" },  // vert moyen
  { label: "Élevée", percent: 15, color: "#059669" },   // vert foncé
];

// Utilitaire pour générer les arcs du pie chart
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
    "L", cx, cy,
    "Z"
  ].join(" ");
}

function polarToCartesian(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function CercleStats() {
  const size = 140;
  const radius = 60;
  const cx = size / 2;
  const cy = size / 2;

  // Calcule les angles de chaque part
  let acc = 0;
  const segments = stats.map((s) => {
    const startAngle = (acc / 100) * 360;
    acc += s.percent;
    const endAngle = (acc / 100) * 360;
    return { ...s, startAngle, endAngle };
  });

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow border border-green-100 py-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <path
            key={seg.label}
            d={describeArc(cx, cy, radius, seg.startAngle, seg.endAngle)}
            fill={seg.color}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
        {/* Cercle blanc au centre pour l'effet "donut" */}
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.55}
          fill="#fff"
        />
        {/* Texte central */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dy="0.3em"
          fontSize="1.1em"
          fill="#059669"
          fontWeight="bold"
        >
          Incidents
        </text>
      </svg>
      <div className="flex gap-4 mt-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: s.color }}></span>
            <span className="text-sm text-green-700">{s.label} ({s.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}