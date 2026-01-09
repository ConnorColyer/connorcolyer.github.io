import React from "react";

export default function Process() {
  const steps = [
    { n: "01", t: "Discovery", d: "Goals, audience, constraints, competitors. 15 minutes. No waffle." },
    { n: "02", t: "Direction", d: "Wire + copy structure + vibe. You approve a plan, not a guess." },
    { n: "03", t: "Build", d: "Fast iteration, mobile-first, performance-first, analytics hooks." },
    { n: "04", t: "Proof", d: "We add measurable points: speed, funnel clarity, calls-to-action, tracking." },
    { n: "05", t: "Launch", d: "Deploy + handover + optional maintenance. You own it." }
  ];

  return (
    <div className="page">
      <section className="sectionTop">
        <div className="kicker">Process</div>
        <h1 className="h1">Ship fast. Don’t ship nonsense.</h1>
        <p className="lead">Simple pipeline. Two revision rounds. Clean handover. Everyone stays sane.</p>
      </section>

      <section className="section">
        <div className="timeline">
          {steps.map((s) => (
            <div key={s.n} className="storyStep">
              <div className="stepNum">{s.n}</div>
              <div>
                <div className="h3">{s.t}</div>
                <p className="muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid2">
          <div className="card">
            <div className="h3">Deliverables you actually get</div>
            <div className="bullets">
              <div>• Live preview link</div>
              <div>• Source repo (so you’re not locked in)</div>
              <div>• Basic analytics + events</div>
              <div>• Performance & accessibility pass</div>
            </div>
          </div>
          <div className="card">
            <div className="h3">What I won’t do</div>
            <div className="bullets">
              <div>• Sell you “AI SEO hacks”</div>
              <div>• Ship a slow page with big images and excuses</div>
              <div>• Ghost. Ever.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
