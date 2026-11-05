import { og } from "@/lib/site";
import { PageHeader } from "@/components/ui";
import { Journey, Academics, Skills } from "@/components/Sections";

export const metadata = {
  title: "About · Experience, Education & Skills",
  description:
    "Vivek Garg's journey: founder of Dhagaro, full stack internships at Geeta University and Coding Blocks, B.Tech CSE with a CGPA of 8.45, and the MERN + C++ skill set.",
  alternates: { canonical: "/about" },
  openGraph: og("/about"),
};

export default function AboutPage() {
  return (
    <>
      <PageHeader kicker="// about" title="Experience, grades & skills" sub="Where I've worked, what I've studied and the tools I build with." />
      <Journey />
      <Academics />
      <Skills />
    </>
  );
}
