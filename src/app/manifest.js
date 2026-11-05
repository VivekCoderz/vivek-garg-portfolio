export default function manifest() {
  return {
    name: "Vivek Garg · Portfolio",
    short_name: "Vivek Garg",
    description: "Portfolio of Vivek Garg, MERN stack developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070c",
    theme_color: "#07070c",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
