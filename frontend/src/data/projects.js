export const projects = [
  // Sorted newest → oldest by `date`. To update order, just change the date fields.
  {
    id: 4,
    title: "Face-Recognition Attendance System",
    description:
      "Full backend architecture for a multi-site employee attendance system with real-time face recognition. Built APIs for enrollment, recognition, and attendance in/out logic using Node.js and FastAPI, with deployment-ready Docker images.",
    date: "Dec 2025 – Feb 2026",
    placeholder: true,
    placeholderIcon: "face",
    placeholderInitials: "FA",
    tags: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    link: null, // TODO(review): add repo link if/when it's public
    demo: null,
  },
  {
    id: 2,
    title: "Social Media Memes Platform",
    description:
      "Full-stack platform with secure user authentication, posts, and comments. Designed responsive layouts with Framer Motion improving perceived UX smoothness by 20%. Engineered REST API and streamlined MongoDB schemas, reducing query latency by 10%.",
    date: "May 2025",
    placeholder: true,
    placeholderIcon: "smile",
    placeholderInitials: "MP",
    tags: ["React", "Node.js", "MongoDB", "Express", "Framer Motion"],
    link: "https://github.com/I-paul/MEMES",
    demo: null, // TODO(review): add real demo URL when available
  },
  {
    id: 1,
    title: "Secure-AI (CCTV Monitoring Platform)",
    description:
      "Multi-camera monitoring system with real-time object tracking using PyTorch + OpenCV. Features user authentication with Firebase Auth, enhanced Firestore structure, and intuitive UI for seamless camera switching with zero downtime.",
    date: "Mar 2025",
    // To use a real screenshot: remove `placeholder` and set image: "/projects/secureai.jpg"
    placeholder: true,
    placeholderIcon: "camera",
    placeholderInitials: "SA",
    tags: ["React", "Node.js", "Firebase", "Express"],
    link: "https://github.com/I-paul/GDG-Project",
    demo: null, // TODO(review): add real demo URL when available
  },
  {
    id: 3,
    title: "Newsletter",
    description:
      "Production-ready newsletter frontend with modular JSON-driven components handling 30+ daily interactions. Mobile-first responsive UI built with Tailwind, reducing stylesheet size by 80%.",
    date: null, // undated — placed last
    placeholder: true,
    placeholderIcon: "mail",
    placeholderInitials: "NL",
    tags: ["React", "Tailwind CSS"],
    link: "https://github.com/I-paul/newsletter",
    demo: null, // TODO(review): add real demo URL when available
  },
]
