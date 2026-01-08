export const site = {
  name: "Connor Colyer",
  location: "Winchester, UK",
  email: "connorcolyer@icloud.com",
  phone: "+44 07902 346502",
  tagline: "Full-stack engineer and creative technologist blending software, design and stagecraft.",
  blurb:
    "I design and build thoughtful digital experiences for ambitious teams and small businesses. My background blends software engineering, live performance technology, and a constant curiosity for how humans interact with systems.",
  ctas: {
    primary: {
      label: "Hire me",
      href: "mailto:connorcolyer@icloud.com"
    },
    secondary: {
      label: "View projects",
      href: "#work"
    }
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com"
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com"
    }
  ],
  services: {
    title: "Services for fast-moving teams",
    subtitle: "Focused offerings that keep projects lean and effective.",
    items: [
      "Landing pages that convert",
      "Small business sites (Squarespace/Next.js)",
      "Automation + integrations"
    ],
    pricingNote: "Typical builds: £300–£1,500 depending on scope."
  },
  projects: [
    {
      slug: "cortex",
      title: "Cortex",
      summary: "Experimental EEG concept exploring how brain-computer interfaces could shape adaptive experiences.",
      description:
        "Cortex is a research-facing concept that explores thought-prediction pipelines and the ethics of responsive interfaces. The focus is on systems design, signal flow, and creating explainable prototypes rather than shipping production tooling.",
      stack: ["Python", "Signal processing", "UX research"],
      status: "Concept"
    },
    {
      slug: "aconite",
      title: "Aconite",
      summary: "Rust-based orbital simulator focused on numerical integration and real-time visualization.",
      description:
        "Aconite visualizes orbital mechanics with an emphasis on accuracy and speed. It explores integrators, energy drift, and the trade-offs between precision and real-time rendering for educational simulations.",
      stack: ["Rust", "Simulation", "WebAssembly"],
      status: "Prototype"
    },
    {
      slug: "auralis",
      title: "Auralis",
      summary: "Minimal macOS dashboard concept combining system telemetry with calm UI.",
      description:
        "Auralis imagines a native macOS dashboard for creators who want at-a-glance insight without noise. It blends data visualization, typography, and motion to keep the experience warm and focused.",
      stack: ["macOS", "UI/UX", "Data viz"],
      status: "Concept"
    },
    {
      slug: "local-service-sites",
      title: "Local Service Sites",
      summary: "Conversion-focused templates for small businesses like dog walkers and personal trainers.",
      description:
        "A lightweight template system that keeps copy, imagery, and calls-to-action tuned for small, local service businesses. Designed to launch quickly while keeping brand polish.",
      stack: ["Next.js", "Design systems", "Content strategy"],
      status: "Template"
    }
  ],
  experience: [
    {
      role: "Freelance Developer",
      company: "Self Employed",
      location: "Remote",
      date: "2023 – Present",
      bullets: [
        "Design and build full-stack applications across web and native environments.",
        "Work primarily with Python, Rust, HTML/CSS/JavaScript, and modern frameworks.",
        "Explain core programming concepts to non-technical clients; break down problems into simple steps.",
        "Build experimental projects exploring real-time systems, simulation, and human-computer interaction."
      ]
    },
    {
      role: "Technical Assistant",
      company: "The Mill (VFX Studio)",
      location: "Los Angeles",
      date: "Jul 2024",
      bullets: [
        "Supported engineering teams on internal tools connecting 3D lighting data to post-production workflows.",
        "Assisted non-engineering staff by explaining technical processes and system behaviour.",
        "Worked in high-pressure production environments requiring precision and reliability."
      ]
    },
    {
      role: "Engineering Assistant",
      company: "Technicolor Group",
      location: "Los Angeles",
      date: "Aug 2024",
      bullets: [
        "Prototyped automation scripts for live-lighting metadata transfer into render pipelines.",
        "Collaborated with multidisciplinary teams across engineering and creative departments."
      ]
    },
    {
      role: "Assistant Lighting Technician",
      company: "The Picture of Dorian Gray (Theatre Royal Haymarket)",
      location: "London",
      date: "Mar 2024",
      bullets: [
        "Supported cue programming, rig focus, and live performance operations.",
        "Worked closely with senior technical staff to deliver consistent, high-quality performances."
      ]
    },
    {
      role: "Lighting Designer & Technician",
      company: "Colfe’s School",
      location: "London",
      date: "2018 – 2023",
      bullets: [
        "Trained and supervised 30+ student technicians, many with no prior technical experience.",
        "Delivered clear, calm instruction under time pressure and live show conditions.",
        "Mentored peers and successors in technical operation, problem-solving, and confidence building."
      ]
    }
  ],
  education: [
    {
      school: "University of Winchester",
      credential: "BSc (Hons) Software Engineering",
      date: "2025 – Present"
    },
    {
      school: "Prendergast 6th Form",
      credential: "A Levels: Computer Science, Mathematics, Biology",
      date: "2023 – 2025"
    },
    {
      school: "Colfe’s School",
      credential: "GCSEs: 10 subjects including Computer Science",
      date: "2012 – 2023"
    }
  ],
  skills: {
    "Programming & Software": [
      "Python",
      "JavaScript",
      "HTML/CSS",
      "React",
      "Git",
      "PostgreSQL",
      "Rust",
      "macOS"
    ],
    "Communication & Mentoring": [
      "Technical explanation",
      "Beginner support",
      "Small-group mentoring",
      "Clear spoken English"
    ],
    "Creative & Technical Tools": [
      "ETC EOS",
      "Cue Programming",
      "OBS",
      "Final Cut Pro",
      "DaVinci Resolve",
      "VS Code"
    ]
  },
  awards: [
    {
      title: "Computer Science Prize — Colfe’s School & Prendergast 6th Form",
      date: "2022, 2023, 2025"
    },
    {
      title: "Extracurricular Attainment Award — Prendergast 6th Form",
      date: "2025"
    },
    {
      title: "Technical Theatre Prize — Colfe’s School",
      date: "2021, 2022, 2023"
    },
    {
      title: "1st XI Cricket Captain — Colfe’s School",
      date: "2020 – 2022"
    },
    {
      title: "Grade 8 Drums — Colfe’s School",
      date: "2023"
    }
  ]
};

export type Project = (typeof site.projects)[number];
