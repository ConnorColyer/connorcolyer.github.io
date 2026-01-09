import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LineChart from "../components/LineChart.jsx";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function money(n) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
}

function useStickyProgress(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  return scrollYProgress;
}

export default function Home() {
  const storyRef = useRef(null);
  const progress = useStickyProgress(storyRef);

  const headlineY = useTransform(progress, [0, 0.4], [0, -10]);
  const headlineO = useTransform(progress, [0, 0.25], [1, 0.92]);

  const stage = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4]);

  const base = { traffic: 1800, conv: 0.018, aov: 55, leadClose: 0.35 };
  const uplift = [
    { label: "Baseline", traffic: 1.0, conv: 1.0, aov: 1.0 },
    { label: "Fast + clear CTA", traffic: 1.08, conv: 1.25, aov: 1.03 },
    { label: "Better trust + proof", traffic: 1.12, conv: 1.45, aov: 1.06 },
    { label: "SEO structure", traffic: 1.25, conv: 1.52, aov: 1.08 },
    { label: "Automation + followup", traffic: 1.28, conv: 1.62, aov: 1.10 }
  ];

  const chartData = useMemo(() => {
    const s = stage.get ? stage.get() : 0;
    const idx = clamp(Math.round(s), 0, 4);
    const u = uplift[idx];

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const before = months.map((m) => {
      const season = 1 + 0.08 * Math.sin((m / 12) * Math.PI * 2);
      const leads = base.traffic * season * base.conv;
      const sales = leads * base.leadClose;
      const revenue = sales * base.aov;
      return { x: m, y: Math.round(revenue) };
    });

    const after = months.map((m) => {
      const season = 1 + 0.08 * Math.sin((m / 12) * Math.PI * 2);
      const traffic = base.traffic * u.traffic * season;
      const leads = traffic * (base.conv * u.conv);
      const sales = leads * base.leadClose;
      const revenue = sales * (base.aov * u.aov);
      return { x: m, y: Math.round(revenue) };
    });

    return { before, after, label: uplift[idx].label };
  }, [stage]);

  const deltaMonthly = useMemo(() => {
    const b = chartData.before.reduce((s, d) => s + d.y, 0) / chartData.before.length;
    const a = chartData.after.reduce((s, d) => s + d.y, 0) / chartData.after.length;
    return Math.round(a - b);
  }, [chartData]);

  return (
    <div className="page">
      <section className="hero">
        <motion.div style={{ y: headlineY, opacity: headlineO }} className="heroInner">
          <div className="pill">Websites that convert • Automation that saves time • Built fast, built right</div>
          <h1 className="h1">
            A website shouldn’t be a brochure.
            <br />
            It should be a <span className="grad">sales machine</span>.
          </h1>
          <p className="lead">
            I build high-performance sites for small businesses — but I also build the proof.
            Scroll the story, poke the chart, and watch the numbers move.
          </p>

          <div className="heroBtns">
            <a className="btn btnPrimary" href="#/contact">Get a quote</a>
            <a className="btn" href="#/work">See work</a>
          </div>

          <div className="heroStats">
            <div className="stat">
              <div className="statNum">Fast</div>
              <div className="statLabel">Performance-first builds</div>
            </div>
            <div className="stat">
              <div className="statNum">Clear</div>
              <div className="statLabel">Copy + UX that funnels</div>
            </div>
            <div className="stat">
              <div className="statNum">Measurable</div>
              <div className="statLabel">Analytics + outcomes</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section" ref={storyRef}>
        <div className="grid2 stickyGrid">
          <div className="stickyPanel">
            <div className="card cardBig">
              <div className="cardHeader">
                <div>
                  <div className="kicker">Interactive demo</div>
                  <div className="h2">“What changes when a site is actually good?”</div>
                  <div className="muted">
                    Current stage: <span className="pillInline">{chartData.label}</span>
                  </div>
                </div>
                <div className="delta">
                  <div className="deltaTop">Avg monthly uplift</div>
                  <div className="deltaNum">{money(deltaMonthly)}</div>
                </div>
              </div>

              <div className="chartBlock">
                <div className="chartLegend">
                  <span className="dot dotA" /> Before
                  <span className="dot dotB" /> After
                </div>

                <div className="chartRow">
                  <div className="chartCol">
                    <div className="muted small">Before</div>
                    <LineChart
                      data={chartData.before}
                      yLabel="Revenue"
                      xLabel="Month"
                      formatY={(v) => money(v)}
                      formatX={(m) => `M${m}`}
                      height={220}
                    />
                  </div>
                  <div className="chartCol">
                    <div className="muted small">After</div>
                    <LineChart
                      data={chartData.after}
                      yLabel="Revenue"
                      xLabel="Month"
                      formatY={(v) => money(v)}
                      formatX={(m) => `M${m}`}
                      height={220}
                    />
                  </div>
                </div>

                <div className="muted small">
                  This is a demo model (not a client claim). Replace with real case studies once you have them.
                </div>
              </div>
            </div>
          </div>

          <div className="storyPanel">
            <div className="storyStep">
              <div className="stepNum">01</div>
              <div>
                <div className="h3">Speed isn’t “nice to have”. It’s conversion.</div>
                <p className="muted">
                  If your site loads like it’s pulling itself through wet cement, people bounce. We build performance-first.
                </p>
              </div>
            </div>

            <div className="storyStep">
              <div className="stepNum">02</div>
              <div>
                <div className="h3">A clear CTA beats “pretty” every day.</div>
                <p className="muted">
                  Your visitor should never wonder what to do next. We design funnels, not pages.
                </p>
              </div>
            </div>

            <div className="storyStep">
              <div className="stepNum">03</div>
              <div>
                <div className="h3">Trust elements = money.</div>
                <p className="muted">
                  Proof, testimonials, guarantees, social signals — not cringe, just effective.
                </p>
              </div>
            </div>

            <div className="storyStep">
              <div className="stepNum">04</div>
              <div>
                <div className="h3">SEO structure (the boring multiplier).</div>
                <p className="muted">
                  Semantic structure, metadata, clean routing, fast assets. Google likes tidy.
                </p>
              </div>
            </div>

            <div className="storyStep">
              <div className="stepNum">05</div>
              <div>
                <div className="h3">Automation closes the loop.</div>
                <p className="muted">
                  Forms → email + Sheets + follow-ups. The site should do work while you sleep.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="h3">This is what you’re selling.</div>
              <p className="muted">
                Not “a website”. A system that turns attention into enquiries into revenue — visibly.
              </p>
              <div className="row">
                <a className="btn btnPrimary" href="#/work">See proof</a>
                <a className="btn" href="#/contact">Get pricing</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid2">
          <div className="card">
            <div className="kicker">Offer</div>
            <div className="h2">Small business sites (done properly)</div>
            <p className="muted">
              3–6 pages, clean copy, strong CTA, analytics ready, and performance + accessibility pass.
            </p>
            <div className="bullets">
              <div>• Mobile-first layouts</div>
              <div>• SEO foundations</div>
              <div>• Booking/enquiry flows</div>
              <div>• Optional automations</div>
            </div>
          </div>

          <div className="card">
            <div className="kicker">Stack</div>
            <div className="h2">Modern, maintainable, fast</div>
            <p className="muted">
              React + motion + D3 for interactive proof. Or static/low-maintenance builds if that’s the right call.
            </p>
            <div className="pillRow">
              <span className="pillInline">React</span>
              <span className="pillInline">D3</span>
              <span className="pillInline">Framer Motion</span>
              <span className="pillInline">GitHub Pages</span>
              <span className="pillInline">Performance</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
