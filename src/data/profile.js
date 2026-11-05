// ─────────────────────────────────────────────────────────────
//  Saari details yahin se badlo. Baaki code ko chhune ki zarurat nahi.
//  LeetCode + GitHub ke numbers apne aap live aate hain (har 1 ghante).
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Vivek Garg",
  initials: "VG",
  roles: ["MERN Stack Developer", "DSA in C++", "Founder @ Dhagaro", "Exploring AI / ML"],
  tagline:
    "3rd year B.Tech CSE student at Geeta University, Panipat. I build full-stack products with React, Next.js and Node, solve DSA problems every week, and run my own ecommerce startup.",
  location: "Panipat, Haryana, India",
  email: "vivekgarg.code@gmail.com",
  phone: "+91 93068 10726",
  photo: "/vivek-garg.jpg", // main hero photo (blazer wali)
  photo2: "/vivek.jpg", // chhoti floating photo (college wali)
  resumeUrl: "/Vivek_Garg_Resume.pdf",
  openTo: "Open to SDE internships",
};

export const usernames = {
  github: "VivekCoderz",
  leetcode: "Vivek_Garg2005",
  codechef: "vivek_codes_19",
  codeforces: "VivekGarg2005",
};

export const socials = [
  { name: "LinkedIn", handle: "in/-vivek-garg", url: "https://www.linkedin.com/in/-vivek-garg/" },
  { name: "GitHub", handle: "VivekCoderz", url: "https://github.com/VivekCoderz" },
  { name: "LeetCode", handle: "Vivek_Garg2005", url: "https://leetcode.com/u/Vivek_Garg2005/" },
  { name: "CodeChef", handle: "vivek_codes_19", url: "https://www.codechef.com/users/vivek_codes_19" },
  { name: "Codeforces", handle: "VivekGarg2005", url: "https://codeforces.com/profile/VivekGarg2005" },
];

export const cgpa = "8.45"; // credit-weighted, Sem 1–4

// From the official Statements of Grades. Add a new semester block when results come,
// and update `cgpa` (credit-weighted average of all SGPAs).
const sub = (name, grade, credits) => ({ name, grade, credits });

export const academics = {
  cgpa: 8.45,
  semesters: [
    {
      sem: "Sem 1", exam: "Dec 2024", sgpa: 8.36, credits: 22,
      subjects: [
        sub("Engineering Mathematics", "A", 4),
        sub("Engineering Physics", "B+", 3),
        sub("Problem Solving using C", "A+", 2),
        sub("Digital Logics Engineering", "B+", 2),
        sub("Front End Development-I", "A", 2),
        sub("Environmental Studies", "B+", 1),
        sub("Engineering Physics Lab", "B+", 1),
        sub("Front End Development-I Lab", "B+", 2),
        sub("Problem Solving with C Lab", "B", 3),
        sub("Soft Skills-I", "B+", 1),
        sub("General Proficiency-I", "A", 1),
      ],
    },
    {
      sem: "Sem 2", exam: "May 2025", sgpa: 8.21, credits: 24,
      subjects: [
        sub("Object Oriented Programming using C++", "A", 2),
        sub("Discrete Structures", "A+", 3),
        sub("Software Engineering", "B", 3),
        sub("Front End Development-II", "A", 2),
        sub("Human Values & Professional Ethics", "B+", 1),
        sub("OOP using C++ Lab", "A", 2),
        sub("Front End Development-II Lab", "B+", 2),
        sub("Soft Skills-II", "B+", 1),
        sub("Aptitude and Reasoning-I", "A", 2),
        sub("General Proficiency-II", "B+", 1),
        sub("Kabaddi", "C+", 3),
        sub("Essence of Entrepreneurship", "B+", 2),
      ],
    },
    {
      sem: "Sem 3", exam: "Dec 2025", sgpa: 8.04, credits: 25,
      subjects: [
        sub("Data Structure and Algorithm", "A+", 2),
        sub("Data Structure and Algorithm Lab", "A", 2),
        sub("Computer Organization and Architecture", "A", 3),
        sub("Operating System", "B+", 3),
        sub("Operating System Lab", "B", 1),
        sub("Design Thinking", "B+", 2),
        sub("Internship-I", "B", 3),
        sub("Aptitude & Reasoning-II", "B+", 2),
        sub("General Proficiency-III", "A", 1),
        sub("Soft Skills-III", "C+", 1),
        sub("Badminton", "B", 3),
        sub("Integrated Family Business", "B+", 2),
      ],
    },
    {
      sem: "Sem 4", exam: "May 2026", sgpa: 9.21, credits: 24,
      subjects: [
        sub("Advanced Data Structure and Algorithm", "A+", 3),
        sub("Advanced DSA Lab", "A+", 2),
        sub("Full Stack Development-I", "A+", 2),
        sub("Full Stack Development-I Lab", "A+", 2),
        sub("Computer Networks", "A", 3),
        sub("Computer Networks Lab", "B+", 1),
        sub("Advance Excel & Power BI", "A", 3),
        sub("Critical Thinking and Decision Making", "B+", 2),
        sub("Aptitude and Reasoning-III", "A", 2),
        sub("Economy Based Family Business", "A", 2),
        sub("General Proficiency-IV", "A+", 1),
        sub("Soft Skills-IV", "B", 1),
      ],
    },
  ],
};
academics.latest = academics.semesters[academics.semesters.length - 1];

export const timeline = [
  {
    type: "work",
    title: "Founder",
    org: "Dhagaro (dhagaro.vercel.app)",
    period: "2026 – Present",
    place: "Panipat",
    points: [
      "Started a home-textile ecommerce brand that sells products from Panipat factories straight to customers, with no stock held.",
      "Built the full store myself: React + Vite frontend, Node/Express + MongoDB backend, Razorpay payments and COD shipping.",
      "Run sourcing, a reseller network and social media with a small team of friends.",
    ],
  },
  {
    type: "work",
    title: "Advanced Full Stack Development Intern",
    org: "Geeta University × Geeta Technical Hub",
    period: "Jun 2026 – Jul 2026",
    place: "Panipat",
    points: [
      "Summer internship on advanced full stack development (React, Node.js, MongoDB).",
      "Completed all the prescribed training requirements and received a certificate of completion.",
    ],
  },
  {
    type: "work",
    title: "Student Intern",
    org: "Geeta University",
    period: "Jun 2025 – Aug 2025",
    place: "Panipat",
    points: [
      "Coding-focused internship on logical thinking and algorithm design.",
      "Solved algorithmic problems to strengthen core DSA fundamentals.",
    ],
  },
  {
    type: "work",
    title: "Programming Intern (DSA Advanced)",
    org: "Coding Blocks",
    period: "Feb 2025 – Mar 2025",
    place: "Remote",
    points: [
      "Worked through advanced data structures and algorithms in C++.",
      "Practised arrays, strings, recursion and more on LeetCode.",
    ],
  },
  {
    type: "edu",
    title: "B.Tech, Computer Science & Engineering",
    org: "Geeta University",
    period: "2024 – 2028",
    place: "Panipat",
    points: ["CGPA 8.45 across four semesters, with a best SGPA of 9.21 in Semester 4.", "A+ in Advanced DSA, Data Structures & Algorithms, Full Stack Development and Problem Solving using C.", "Core subjects: DSA, OOP, DBMS, OS, Computer Networks."],
  },
  {
    type: "edu",
    title: "Class XII",
    org: "Govt. Senior Secondary School",
    period: "2023 – 2024",
    place: "Krishanpura, Panipat",
    points: ["Scored 78%."],
  },
];

export const skills = [
  { group: "Languages", items: ["C++", "C", "JavaScript", "SQL"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS", "Bootstrap", "jQuery"] },
  { group: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.io", "Redis", "REST APIs", "JWT"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "Vercel", "Cloudinary", "Razorpay"] },
];

export const projects = [
  {
    title: "Dhagaro",
    blurb: "My own ecommerce store for Panipat home textiles, with COD, Razorpay, a reseller system and a Google Shopping feed.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Razorpay"],
    live: "https://dhagaro.vercel.app",
    code: "https://github.com/VivekCoderz/ApnaBazarr",
    accent: "from-amber-400 to-rose-500",
    featured: true,
  },
  {
    title: "CareerConnect",
    blurb: "Career platform that matches students to jobs, internships and courses, with an ATS resume analyzer, a resume builder and skill-gap tracking.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "AI"],
    live: "https://www.codeformode.in",
    code: "https://github.com/VivekCoderz/CareerConnect",
    accent: "from-sky-400 to-indigo-500",
    featured: true,
  },
  {
    title: "PlacementConnect",
    blurb: "Campus placement portal for Geeta University that moves recruitment off Excel sheets, with student and recruiter panels and an in-app resume builder.",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://placementconnect.vercel.app/",
    code: "https://github.com/VivekCoderz/Placement-Connect",
    accent: "from-blue-500 to-amber-400",
  },
  {
    title: "Comets URL Shortener",
    blurb: "Short links with custom QR codes, one-click sharing and click analytics. Built as a team project.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Redis", "Zod"],
    code: "https://github.com/VivekCoderz/Comets-URL-Shortener-with-Analytics-",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "NexaChat",
    blurb: "Real-time chat web app.",
    tech: ["React", "Node.js", "Socket.io"],
    live: "https://nexachat-virid.vercel.app",
    code: "https://github.com/VivekCoderz/Chat-web-Application",
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    title: "Bubble Brain",
    blurb: "Mental-math game: pop falling + − × ÷ bubbles before they land. Levels speed up, scores save automatically, and there's a weekly/monthly leaderboard with JWT auth.",
    tech: ["React", "Framer Motion", "Express", "MongoDB", "JWT"],
    code: "https://github.com/VivekCoderz/Math-Game-Brain-trainer",
    accent: "from-pink-500 to-orange-400",
  },
  {
    title: "Daily Budget Tracker",
    blurb: "Track daily income and expenses in the browser.",
    tech: ["JavaScript", "HTML", "CSS"],
    live: "https://daily-budget-tracker-one.vercel.app",
    code: "https://github.com/VivekCoderz/Daily-Budget-Tracking-Application",
    accent: "from-lime-400 to-emerald-500",
  },
];

// Certificates: image files live in public/certificates/. `highlight: true` shows a badge.
// Categories: Hackathon, Internship, Industry, Certification, Leadership
export const certificates = [
  { title: "2nd Position, Internal Smart India Hackathon 2025", issuer: "Geeta University · Team Visioneers", date: "Sep 2025", category: "Hackathon", img: "sih-2025-2nd-position", highlight: true },
  { title: "Team Leader, Internal Smart India Hackathon 2026", issuer: "Geeta University", date: "Oct 2026", category: "Hackathon", img: "sih-2026-team-leader", highlight: true },
  { title: "Top 15 Teams, HackForge 2.0 Hackathon", issuer: "Geeta Technical Hub · Team Infinity Iterators", date: "Apr 2026", category: "Hackathon", img: "hackforge-2-top-15", highlight: true },
  { title: "Advanced Full Stack Development Internship", issuer: "Geeta University × Geeta Technical Hub", date: "Jun – Jul 2026", category: "Internship", img: "full-stack-internship-2026", highlight: true },
  { title: "Data Structures & Algorithms using C++ (Certificate of Excellence)", issuer: "Geeta University × Coding Blocks", date: "2025", category: "Internship", img: "dsa-cpp-coding-blocks" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte · Forage", date: "May 2026", category: "Industry", img: "deloitte-data-analytics", highlight: true },
  { title: "Solutions Architecture Job Simulation", issuer: "AWS · Forage", date: "Jan 2026", category: "Industry", img: "aws-solutions-architecture", highlight: true },
  { title: "Gemini Certified Student", issuer: "Google for Education", date: "2025", category: "Certification", img: "google-gemini-certified" },
  { title: "SQL (Basic) Skill Certification", issuer: "HackerRank", date: "Mar 2026", category: "Certification", img: "hackerrank-sql", verify: "https://www.hackerrank.com/certificates/4738789f1009" },
  { title: "Java (Basic) Skill Certification", issuer: "HackerRank", date: "Oct 2026", category: "Certification", img: "hackerrank-java", verify: "https://www.hackerrank.com/certificates/f37272eb5706" },
  { title: "Networking Basics", issuer: "Cisco Networking Academy", date: "Mar 2026", category: "Certification", img: "cisco-networking-basics" },
  { title: "Data Analytics Essentials", issuer: "Cisco Networking Academy", date: "May 2026", category: "Certification", img: "cisco-data-analytics" },
  { title: "JavaScript Course (Certificate of Excellence)", issuer: "Scaler Topics", date: "Mar 2026", category: "Certification", img: "scaler-javascript" },
  { title: "Full Stack Developer Course", issuer: "Simplilearn SkillUp", date: "Oct 2026", category: "Certification", img: "simplilearn-full-stack" },
  { title: "Maltego for Cybersecurity Investigations", issuer: "Maltego Technologies", date: "Dec 2024", category: "Certification", img: "maltego-cybersecurity" },
  { title: "Maltego for Cybercrime Investigations", issuer: "Maltego Technologies", date: "Dec 2024", category: "Certification", img: "maltego-cybercrime" },
  { title: "Coordinator (Roadies), Sangrila 2K26 Cultural Fest", issuer: "Geeta University", date: "Mar 2026", category: "Leadership", img: "sangrila-2k26-coordinator" },
  { title: "Participant, Yugantran 2.0 Tech Fest", issuer: "Geeta University · School of CSE", date: "2026", category: "Leadership", img: "yugantran-2-tech-fest" },
];
