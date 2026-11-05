import { og } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { Projects } from "@/components/Sections";
import { projects } from "@/data/profile";

export const metadata = {
  title: "Projects · MERN, Next.js & Full Stack Work",
  description: `${projects.length} projects by Vivek Garg, including the Dhagaro ecommerce store, CareerConnect, the PlacementConnect campus portal, a URL shortener with analytics, real-time chat and the Bubble Brain math game.`,
  alternates: { canonical: "/projects" },
  openGraph: og("/projects"),
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader kicker="// projects" title="Things I've built" sub="From my own startup's store to campus tools. Most of them are live, so try them." />
      <Projects withTitle={false} />
    </>
  );
}
