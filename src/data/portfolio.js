// ============================================================
// SINGLE SOURCE OF TRUTH — all portfolio content lives here.
// Update this file; components never hardcode their own data.
// ============================================================

export const OWNER = {
  name: "Samuel Akande",
  firstName: "Samuel",
  title: "Frontend Developer",
  location: "Lagos, Nigeria",
  email: "samuelakande.dev@gmail.com",
  phone: "+234 814 993 4261",
  github: "https://github.com/jackwine0",
  linkedin: "#",   // update when live
  twitter: "#",    // update when live
  resumeUrl: "/Samuel_Akande_CV.pdf",
  availability: "Open to frontend & full-stack roles",
};

export const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

// Stats shown in the About section — kept factual, not inflated
export const STATS = [
  { value: "3+",  label: "Years building for the web" },
  { value: "8",   label: "Shipped projects"            },
  { value: "1",   label: "Stack: React, end to end"     },
];

export const CURRENT_SKILLS = [
  { id: "react", name: "React"      },
  { id: "js",    name: "JavaScript" },
  { id: "vite",  name: "Vite"       },
  { id: "html",  name: "HTML5"      },
  { id: "css",   name: "CSS3"       },
  { id: "sass",  name: "SCSS"       },
];

export const LEARNING_SKILLS = [
  { id: "node",    name: "Node.js"  },
  { id: "express", name: "Express"  },
  { id: "mongo",   name: "MongoDB"  },
];

// Project list — short, plain descriptions. No marketing language.
export const PROJECTS = [
  {
    id: "registry",
    index: "01",
    title: "The Registry",
    year: "2024",
    description: "An intelligence-dashboard concept with agent records and data visualisation.",
    tech: ["React", "Vite", "API Integration"],
    liveLink: "https://registry-khaki.vercel.app/",
    codeLink: "https://github.com/jackwine0/Registry",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "sleektv",
    index: "02",
    title: "SleekTV",
    year: "2024",
    description: "A streaming-platform clone with watchlists and live TMDB data.",
    tech: ["React", "Firebase", "TMDB API"],
    liveLink: "https://sleek-tv.vercel.app/login",
    codeLink: "https://github.com/jackwine0/Sleek-TV",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "staffsync",
    index: "03",
    title: "StaffSync",
    year: "2024",
    description: "Employee scheduling and performance tracking, with QR check-in.",
    tech: ["React", "QR Scanner", "Node.js"],
    liveLink: "https://staff-sync-iota.vercel.app/",
    codeLink: "https://github.com/jackwine0/StaffSync",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "medlink",
    index: "04",
    title: "MedLink",
    year: "2023",
    description: "Appointment booking and queue management for clinics.",
    tech: ["React Native", "Node.js", "MongoDB"],
    liveLink: "https://medlink-beta.vercel.app/",
    codeLink: "https://github.com/jackwine0/Medlink",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "silverbank",
    index: "05",
    title: "SilverBank",
    year: "2024",
    description: "A budgeting and expense-tracking dashboard for personal finance.",
    tech: ["React", "Node.js", "MongoDB"],
    liveLink: "#",
    codeLink: "#",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=70",
  },
  {
    id: "acaciaxone",
    index: "06",
    title: "Acacia Xone",
    year: "2024",
    description: "A reading platform for web novels, built for an active writing community.",
    tech: ["Next.js", "MongoDB", "Stripe"],
    liveLink: "#",
    codeLink: "#",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&auto=format&fit=crop&q=70",
  },
];
