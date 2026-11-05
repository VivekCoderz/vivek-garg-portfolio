import { og } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import Profiles from "@/components/Profiles";
import { getLeetCode, getGitHub, getCodeChef, getCodeforces } from "@/lib/stats";

export async function generateMetadata() {
  const [lc, cc] = await Promise.all([getLeetCode(), getCodeChef()]);
  return {
    title: "Coding Profiles · LeetCode, CodeChef, Codeforces & GitHub",
    description: `Live coding stats for Vivek Garg: ${lc.solved}+ LeetCode problems solved (${lc.easy} easy, ${lc.medium} medium, ${lc.hard} hard), a LeetCode contest rating of ${lc.rating ?? "–"}, ${cc.solved} CodeChef problems, plus GitHub repositories and top languages.`,
    alternates: { canonical: "/coding-profiles" },
    openGraph: og("/coding-profiles"),
  };
}

export default async function CodingPage() {
  const [lc, gh, cc, cf] = await Promise.all([getLeetCode(), getGitHub(), getCodeChef(), getCodeforces()]);
  return (
    <>
      <PageHeader kicker="// coding profiles" title="The numbers, live" sub="Pulled straight from LeetCode, CodeChef, Codeforces and GitHub and refreshed every hour." />
      <Profiles lc={lc} gh={gh} cc={cc} cf={cf} withTitle={false} />
    </>
  );
}
