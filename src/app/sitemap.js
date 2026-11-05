import { siteUrl } from "@/lib/site";

export default function sitemap() {
  return ["", "/about", "/coding-profiles", "/projects", "/certificates"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/coding-profiles" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
