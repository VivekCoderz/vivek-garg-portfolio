import Hero from "@/components/Hero";
import { StatsStrip } from "@/components/Profiles";
import { Projects, Certificates, Contact } from "@/components/Sections";
import { TechMarquee, NowBento, Milestones } from "@/components/HomeSections";
import ExploreCards from "@/components/ExploreCards";
import Terminal from "@/components/Terminal";
import { getLeetCode, getGitHub, getCodeChef, getCodeforces } from "@/lib/stats";

export const metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [lc, gh, cc, cf] = await Promise.all([getLeetCode(), getGitHub(), getCodeChef(), getCodeforces()]);
  return (
    <>
      <Hero />
      <StatsStrip lc={lc} gh={gh} cc={cc} cf={cf} />
      <TechMarquee />
      <NowBento lc={lc} />
      <Milestones />
      <ExploreCards lc={lc} cc={cc} cf={cf} />
      <Terminal lc={lc} cc={cc} gh={gh} />
      <Projects preview />
      <Certificates preview />
      <Contact />
    </>
  );
}
