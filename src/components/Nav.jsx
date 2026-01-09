import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(
    () => [
      { to: "/", label: "Studio" },
      { to: "/work", label: "Work" },
      { to: "/process", label: "Process" },
      { to: "/contact", label: "Contact" }
    ],
    []
  );

  return (
    <header className={cx("nav", scrolled && "navScrolled")}>
      <div className="navInner">
        <NavLink className="brand" to="/">
          <span className="brandMark" aria-hidden />
          <span className="brandText">
            Connor <span className="muted">Colyer</span>
          </span>
        </NavLink>

        <nav className="navLinks">
          {links.map((l) => (
            <NavLink
              key={l.to}
              className={({ isActive }) => cx("navLink", isActive && "navLinkActive")}
              to={l.to}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navCTA">
          <a className="btn btnPrimary" href="#/contact">
            Get a quote
          </a>
        </div>
      </div>
      <div className="navHairline" />
    </header>
  );
}
