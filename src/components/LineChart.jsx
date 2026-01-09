import React, { useMemo, useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function LineChart({
  data,
  height = 240,
  xLabel = "Month",
  yLabel = "Value",
  formatY = (v) => v.toLocaleString(),
  formatX = (v) => v
}) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(640);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r?.width) setW(Math.max(280, Math.floor(r.width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const margin = { top: 16, right: 16, bottom: 34, left: 52 };
  const innerW = Math.max(10, w - margin.left - margin.right);
  const innerH = Math.max(10, height - margin.top - margin.bottom);

  const x = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .range([0, innerW]);
  }, [data, innerW]);

  const y = useMemo(() => {
    const max = d3.max(data, (d) => d.y) ?? 1;
    return d3.scaleLinear().domain([0, max * 1.12]).range([innerH, 0]);
  }, [data, innerH]);

  const linePath = useMemo(() => {
    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveCatmullRom.alpha(0.6));

    return line(data);
  }, [data, x, y]);

  const yTicks = useMemo(() => y.ticks(4), [y]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - margin.left;
    const clamped = Math.max(0, Math.min(innerW, px));
    const xVal = x.invert(clamped);

    const i = d3.bisector((d) => d.x).left(data, xVal);
    const a = data[Math.max(0, i - 1)];
    const b = data[Math.min(data.length - 1, i)];
    const pick = !a ? b : !b ? a : (xVal - a.x < b.x - xVal ? a : b);

    setHover(pick);
  };

  const onLeave = () => setHover(null);

  return (
    <div className="chartWrap" ref={wrapRef}>
      <svg width={w} height={height} className="chartSvg">
        <g transform={`translate(${margin.left},${margin.top})`}>
          {yTicks.map((t) => (
            <g key={t} transform={`translate(0, ${y(t)})`}>
              <line x1={0} x2={innerW} className="chartGrid" />
              <text x={-10} y={4} textAnchor="end" className="chartTick">
                {formatY(t)}
              </text>
            </g>
          ))}

          <text x={0} y={innerH + 28} className="chartAxisLabel">
            {xLabel}
          </text>
          <text x={-42} y={-2} className="chartAxisLabel">
            {yLabel}
          </text>

          <path d={linePath} className="chartLine" />
          <path d={linePath} className="chartLineGlow" />

          <rect
            x={0}
            y={0}
            width={innerW}
            height={innerH}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          />

          {hover && (
            <g transform={`translate(${x(hover.x)},${y(hover.y)})`}>
              <line y1={-y(hover.y)} y2={innerH - y(hover.y)} className="chartCursor" />
              <circle r={4} className="chartDot" />
              <g transform="translate(10,-10)">
                <rect width="160" height="44" rx="10" className="chartTooltip" />
                <text x="12" y="18" className="chartTooltipText">
                  {xLabel}: {formatX(hover.x)}
                </text>
                <text x="12" y="36" className="chartTooltipText">
                  {yLabel}: {formatY(hover.y)}
                </text>
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
