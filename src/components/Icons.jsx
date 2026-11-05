import { ChefHat } from "lucide-react";
// Brand icons (lucide no longer ships brand logos).
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export const GitHubIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

export const LinkedInIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const LeetCodeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.21l-2.8 3a5.5 5.5 0 0 0-1.03 1.47 5.2 5.2 0 0 0-.48 2.15 5.4 5.4 0 0 0 .44 2.17c.23.52.56 1 .96 1.42l4.32 4.37a5.6 5.6 0 0 0 7.66.15l2.6-2.39a1.37 1.37 0 0 0-1.86-2.02l-2.6 2.4a2.87 2.87 0 0 1-3.86-.08l-4.31-4.37a2.66 2.66 0 0 1-.76-1.97c.01-.62.24-1.2.66-1.65l2.8-3 5.37-5.75A1.37 1.37 0 0 0 13.48 0Zm-2.87 12.03a1.37 1.37 0 1 0 0 2.75h9.67a1.37 1.37 0 1 0 0-2.75h-9.67Z" />
  </svg>
);

export const CodeChefIcon = ({ width = 18, ...p }) => <ChefHat size={width} {...p} aria-hidden />;

export const CodeforcesIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="1.5" y="9" width="5" height="12" rx="1.2" fill="#facc15" />
    <rect x="9.5" y="3" width="5" height="18" rx="1.2" fill="#3b82f6" />
    <rect x="17.5" y="12" width="5" height="9" rx="1.2" fill="#ef4444" />
  </svg>
);

export const iconFor = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, LeetCode: LeetCodeIcon, CodeChef: CodeChefIcon, Codeforces: CodeforcesIcon };
