import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects.js";

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

export default function Work() {
  const [activeTag, setActiveTag] = useState("All");
  const [open, setOpen] = useState(null);

  const tags = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => p.stack.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => p.stack.includes(activeTag));
  }, [activeTag]);

  const selected = open ? projects.find((p) => p.id === open) : null;

  return (
    <div className="page">
      <section className="sectionTop">
        <div className="kicker">Portfolio</div>
        <h1 className="h1">Work that’s actually interesting</h1>
        <p className="lead">
          Mix of systems, simulation, UX, and “why would you do that” projects. Clean engineering, strong taste.
        </p>
      </section>

      <section className="section">
        <div className="filterRow">
          {tags.map((t) => (
            <button
              key={t}
              className={cx("chip", activeTag === t && "chipActive")}
              onClick={() => setActiveTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="cardsGrid">
          {filtered.map((p) => (
            <motion.button
              key={p.id}
              className="card cardBtn"
              onClick={() => setOpen(p.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <div className="cardTopRow">
                <div className="h3">{p.title}</div>
                <div className="pillInline">{p.year}</div>
              </div>
              <div className="muted">{p.tag}</div>
              <p className="muted">{p.desc}</p>
              <div className="pillRow">
                {p.stack.map((s) => (
                  <span key={s} className="pillInline">{s}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={() => setOpen(null)}
          >
            <motion.div
              className="modal"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="modalHeader">
                <div>
                  <div className="h2">{selected.title}</div>
                  <div className="muted">{selected.tag} • {selected.year}</div>
                </div>
                <button className="btn" onClick={() => setOpen(null)}>Close</button>
              </div>

              <div className="modalBody">
                <div className="card">
                  <div className="h3">What it is</div>
                  <p className="muted">{selected.desc}</p>
                </div>

                <div className="grid2">
                  <div className="card">
                    <div className="h3">Highlights</div>
                    <div className="bullets">
                      {selected.highlights.map((h) => <div key={h}>• {h}</div>)}
                    </div>
                  </div>
                  <div className="card">
                    <div className="h3">Links</div>
                    <div className="row">
                      {selected.links.map((l) => (
                        <a key={l.label} className="btn btnPrimary" href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      ))}
                    </div>
                    <div className="muted small">Replace # links with real URLs when ready.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
