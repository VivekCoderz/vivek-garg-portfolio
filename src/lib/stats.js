import { cacheLife } from "next/cache";
import { usernames } from "@/data/profile";

// Used if LeetCode / GitHub can't be reached, so the page never breaks.
const LC_FALLBACK = {
  solved: 645, easy: 443, medium: 188, hard: 14,
  totals: { all: 4101, easy: 975, medium: 2139, hard: 987 },
  ranking: 123470, rating: 1427, contests: 14, topPercent: 71.69,
  streak: 0, activeDays: 100, calendar: {}, live: false,
};

const nowSec = () => Math.floor(Date.now() / 1000);

export async function getLeetCode() {
  "use cache";
  cacheLife("hours"); // refresh stats about once an hour
  const query = `query($u:String!){
    allQuestionsCount{difficulty count}
    matchedUser(username:$u){
      profile{ranking}
      submitStatsGlobal{acSubmissionNum{difficulty count}}
      userCalendar{streak totalActiveDays submissionCalendar}
    }
    userContestRanking(username:$u){rating attendedContestsCount topPercentage}
  }`;
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query, variables: { u: usernames.leetcode } }),
    });
    const { data } = await res.json();
    const ac = Object.fromEntries(data.matchedUser.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty, d.count]));
    const tot = Object.fromEntries(data.allQuestionsCount.map((d) => [d.difficulty, d.count]));
    const cal = data.matchedUser.userCalendar;
    const contest = data.userContestRanking;
    return {
      solved: ac.All, easy: ac.Easy, medium: ac.Medium, hard: ac.Hard,
      totals: { all: tot.All, easy: tot.Easy, medium: tot.Medium, hard: tot.Hard },
      ranking: data.matchedUser.profile.ranking,
      rating: contest ? Math.round(contest.rating) : null,
      contests: contest?.attendedContestsCount ?? 0,
      topPercent: contest?.topPercentage ?? null,
      streak: cal.streak, activeDays: cal.totalActiveDays,
      calendar: JSON.parse(cal.submissionCalendar || "{}"),
      live: true,
      asOf: nowSec(),
    };
  } catch {
    return { ...LC_FALLBACK, asOf: nowSec() };
  }
}

export async function getGitHub() {
  "use cache";
  cacheLife("hours");
  const u = usernames.github;
  try {
    const opts = { headers: { Accept: "application/vnd.github+json" } };
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${u}`, opts).then((r) => r.json()),
      fetch(`https://api.github.com/users/${u}/repos?per_page=100&sort=pushed`, opts).then((r) => r.json()),
    ]);
    if (!Array.isArray(repos)) throw new Error("rate limited");
    const own = repos.filter((r) => !r.fork);
    const langCount = {};
    own.forEach((r) => r.language && (langCount[r.language] = (langCount[r.language] || 0) + 1));
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
    return {
      repos: user.public_repos,
      followers: user.followers,
      stars: own.reduce((s, r) => s + r.stargazers_count, 0),
      since: new Date(user.created_at).getFullYear(),
      languages,
      recent: own.slice(0, 4).map((r) => ({ name: r.name, url: r.html_url, lang: r.language, pushed: r.pushed_at })),
      live: true,
    };
  } catch {
    return { repos: 32, followers: 3, stars: 5, since: 2025, languages: [{ name: "JavaScript", count: 18 }], recent: [], live: false };
  }
}

// CodeChef has no public API, so we read the numbers from the public profile page.
// If the page layout changes, these fallback numbers are shown instead.
const CC_FALLBACK = { solved: 337, rating: 878, highest: 892, contests: 3, division: "Div 4", provisional: true, live: false };

export async function getCodeChef() {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://www.codechef.com/users/${usernames.codechef}`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio stats)" },
    });
    const html = await res.text();
    const num = (re) => {
      const m = html.match(re);
      return m ? Number(m[1]) : null;
    };
    const solved = num(/Total Problems Solved:\s*(\d+)/);
    const rating = num(/class="rating-number"[^>]*>\s*(\d+)/);
    if (solved == null || rating == null) throw new Error("layout changed");
    return {
      solved,
      rating,
      highest: num(/Highest Rating\s*(\d+)/) ?? rating,
      contests: num(/No\. of Contests Participated:\s*(\d+)/) ?? 0,
      division: html.match(/\((Div \d)\)/)?.[1] ?? null,
      provisional: /Provisional Rating/.test(html),
      live: true,
    };
  } catch {
    return CC_FALLBACK;
  }
}

// Codeforces has an official public API.
export async function getCodeforces() {
  "use cache";
  cacheLife("hours");
  const h = usernames.codeforces;
  const get = (path) =>
    fetch(`https://codeforces.com/api/${path}`).then((r) => r.json()).then((d) => {
      if (d.status !== "OK") throw new Error(d.comment);
      return d.result;
    });
  try {
    const [[info], subs, contests] = await Promise.all([
      get(`user.info?handles=${h}`),
      get(`user.status?handle=${h}`),
      get(`user.rating?handle=${h}`),
    ]);
    const solved = new Set(
      subs.filter((s) => s.verdict === "OK").map((s) => `${s.problem.contestId}-${s.problem.index}`)
    ).size;
    return {
      rating: info.rating ?? null,
      maxRating: info.maxRating ?? null,
      rank: info.rank ?? null,
      solved,
      contests: contests.length,
      live: true,
    };
  } catch {
    return { rating: null, maxRating: null, rank: null, solved: 0, contests: 0, live: false };
  }
}
