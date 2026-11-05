import { og } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { Certificates } from "@/components/Sections";
import { certificates } from "@/data/profile";

export const metadata = {
  title: "Certificates · Hackathons, Internships & Certifications",
  description: `${certificates.length} certificates earned by Vivek Garg: 2nd position at the Internal Smart India Hackathon, HackForge 2.0 top 15, a full stack internship, Deloitte and AWS job simulations, and Google, Cisco and HackerRank certifications.`,
  alternates: { canonical: "/certificates" },
  openGraph: og("/certificates"),
};

export default function CertificatesPage() {
  return (
    <>
      <PageHeader kicker="// certificates" title="Hackathons, internships & certifications" sub={`${certificates.length} certificates. Filter by type, and click any one to see it full size.`} />
      <Certificates withTitle={false} />
    </>
  );
}
