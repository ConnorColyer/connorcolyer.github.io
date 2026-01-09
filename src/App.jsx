import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "./components/Nav.jsx";
import FluidBackground from "./components/FluidBackground.jsx";

import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Process from "./pages/Process.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div className="app">
      <FluidBackground />
      <Nav />
      <motion.main
        className="main"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>

      <footer className="footer">
        <div className="footerInner">
          <div className="muted">© {new Date().getFullYear()} Connor Colyer</div>
          <div className="muted">Built like a product • Deployed on GitHub Pages • Fast by default</div>
        </div>
      </footer>
    </div>
  );
}
