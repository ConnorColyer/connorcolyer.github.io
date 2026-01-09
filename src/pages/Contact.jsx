import React, { useMemo, useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "connorcolyer@icloud.com";

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Website project enquiry");
    const body = encodeURIComponent(
      `Hey Connor,\n\nBusiness:\nIndustry:\nGoal (bookings/enquiries/sales):\nPages needed:\nTimeline:\nBudget range:\n\nAnything else:\n`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="page">
      <section className="sectionTop">
        <div className="kicker">Contact</div>
        <h1 className="h1">Let’s build something that pays for itself.</h1>
        <p className="lead">Tell me what you sell, who you sell to, and what “success” means. I’ll reply with a plan + quote.</p>
      </section>

      <section className="section">
        <div className="grid2">
          <div className="card cardBig">
            <div className="h2">Quick start</div>
            <p className="muted">This opens your email app with a structured template.</p>
            <div className="row">
              <a className="btn btnPrimary" href={mailto}>Email me</a>
              <button className="btn" onClick={copy}>{copied ? "Copied" : "Copy email"}</button>
            </div>
            <div className="muted small">Email: {email}</div>
          </div>

          <div className="card cardBig">
            <div className="h2">Pricing vibe (ballpark)</div>
            <div className="bullets">
              <div>• Starter landing: £300–£500</div>
              <div>• Small business site: £600–£1,200</div>
              <div>• Integrations/automation: £1,200+</div>
            </div>
            <div className="muted small">
              Final quote depends on scope. I’ll be blunt about what you do/don’t need.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
