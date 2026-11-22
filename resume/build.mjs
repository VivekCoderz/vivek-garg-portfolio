// Builds public/Vivek_Garg_Resume.pdf from resume/resume.html with headless Chrome.
// Usage: node resume/build.mjs   (set CHROME=path/to/chrome if it isn't in the default place)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = pathToFileURL(resolve(here, "resume.html")).href;
const out = resolve(here, "../public/Vivek_Garg_Resume.pdf");

const candidates = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome not found. Set CHROME=/path/to/chrome");

execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, src], { stdio: "inherit" });
console.log("Wrote", out);
