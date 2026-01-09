import React, { useEffect, useRef } from "react";

export default function FluidBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0.5, y = 0.5;
    let tx = 0.5, ty = 0.5;

    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      tx = e.clientX / w;
      ty = e.clientY / h;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;

      el.style.setProperty("--mx", `${x}`);
      el.style.setProperty("--my", `${y}`);

      requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    tick();

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="bg" ref={ref} aria-hidden>
      <div className="bgBlob b1" />
      <div className="bgBlob b2" />
      <div className="bgBlob b3" />
      <div className="bgGrain" />
    </div>
  );
}
