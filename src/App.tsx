import { useEffect, useState } from "react";
import {
  HashRouter, NavLink, Route, Routes, Link, useLocation,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";
import {
  ActionsIcon, AiIcon, A11yIcon, BashIcon, BoltDoodle, BookSearchIcon, BotIcon, BrainIcon,
  BugIcon, BurpIcon, CloudDoodle, CloudflareIcon, CssIcon, CurvedArrowDoodle, CppIcon, DockerIcon,
  EyeCodeIcon, FlameDoodle, FlowIcon, GitIcon, GithubIcon, GlobeIcon, HandDoodle, HeartDoodle,
  HtmlIcon, JavaIcon, JsIcon, KaliIcon, LayersIcon, LockIcon, LoopArrowDoodle, MongoIcon, MotionIcon,
  NmapIcon, SqlIcon, PaletteIcon, NextIcon, NodeIcon, PostgresIcon, PromptIcon, PythonIcon,
  RadarIcon, ReactIcon, RedisIcon, ShieldIcon, SkullDoodle, SparkIcon, SparkleDoodle, SquiggleDoodle,
  StarburstDoodle, StarDoodle, SunDoodle, SupabaseIcon, TailwindIcon, TerminalIcon, TsIcon, VercelIcon,
  ViteIcon, WiresharkIcon, ExpressIcon,
} from "./components/Icons";
import { cn } from "./lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

const TICKER = [
  "Bug Bounty", "OWASP Top 10", "Secure Code", "Recon",
  "React", "TypeScript", "AI-Assisted Workflows", "Pentesting",
];

type Tech = {
  name: string;
  color: string;
  group: string;
  level: number;
  tag: string;
  icon?: React.ReactNode;
};

const SKILL_GROUPS = [
  "Languages", "Frontend", "Backend & Data", "Infra & Deploy", "Security", "AI-Assisted",
];

const GROUP_COLOR: Record<string, string> = {
  Languages: "var(--yellow)",
  Frontend: "var(--pink)",
  "Backend & Data": "var(--mint)",
  "Infra & Deploy": "var(--blue)",
  Security: "var(--orange)",
  "AI-Assisted": "var(--purple)",
};

const TECHS: Tech[] = [
  // Languages
  { name: "JavaScript", color: "#F7DF1E", group: "Languages", level: 92, tag: "daily", icon: <JsIcon /> },
  { name: "TypeScript", color: "#3178C6", group: "Languages", level: 86, tag: "daily", icon: <TsIcon /> },
  { name: "HTML5", color: "#E34F26", group: "Languages", level: 94, tag: "daily", icon: <HtmlIcon /> },
  { name: "CSS3", color: "#1572B6", group: "Languages", level: 89, tag: "daily", icon: <CssIcon /> },
  { name: "Python", color: "#4B8BBE", group: "Languages", level: 72, tag: "scripts", icon: <PythonIcon /> },
  { name: "SQL", color: "#D4A017", group: "Languages", level: 70, tag: "class", icon: <SqlIcon /> },
  { name: "Bash", color: "#89E051", group: "Languages", level: 66, tag: "glue", icon: <BashIcon /> },
  { name: "C / C++", color: "#A8B9C9", group: "Languages", level: 58, tag: "BE core", icon: <CppIcon /> },
  { name: "Java", color: "#F89820", group: "Languages", level: 55, tag: "class", icon: <JavaIcon /> },
  // Frontend
  { name: "React", color: "#61DAFB", group: "Frontend", level: 90, tag: "daily", icon: <ReactIcon /> },
  { name: "Next.js", color: "#14120f", group: "Frontend", level: 81, tag: "prod", icon: <NextIcon /> },
  { name: "Tailwind", color: "#06B6D4", group: "Frontend", level: 87, tag: "daily", icon: <TailwindIcon /> },
  { name: "Vite", color: "#7C3AED", group: "Frontend", level: 80, tag: "daily", icon: <ViteIcon /> },
  { name: "GSAP + ScrollTrigger", color: "#F4C21E", group: "Frontend", level: 74, tag: "motion", icon: <MotionIcon /> },
  { name: "Design systems", color: "#FF6BAA", group: "Frontend", level: 78, tag: "craft", icon: <PaletteIcon /> },
  { name: "Accessibility", color: "#FF2D6F", group: "Frontend", level: 70, tag: "a11y", icon: <A11yIcon /> },
  // Backend & Data
  { name: "Node.js", color: "#5FA04E", group: "Backend & Data", level: 79, tag: "prod", icon: <NodeIcon /> },
  { name: "Express", color: "#3C873A", group: "Backend & Data", level: 74, tag: "APIs", icon: <ExpressIcon /> },
  { name: "PostgreSQL", color: "#4169E1", group: "Backend & Data", level: 71, tag: "sql", icon: <PostgresIcon /> },
  { name: "Supabase", color: "#3ECF8E", group: "Backend & Data", level: 77, tag: "baas", icon: <SupabaseIcon /> },
  { name: "MongoDB", color: "#4FA744", group: "Backend & Data", level: 62, tag: "class", icon: <MongoIcon /> },
  { name: "Redis", color: "#FF6B57", group: "Backend & Data", level: 56, tag: "caching", icon: <RedisIcon /> },
  { name: "REST + WebSockets", color: "#2563EB", group: "Backend & Data", level: 80, tag: "api", icon: <GlobeIcon /> },
  // Infra & Deploy
  { name: "Git", color: "#F05033", group: "Infra & Deploy", level: 88, tag: "daily", icon: <GitIcon /> },
  { name: "GitHub", color: "#14120f", group: "Infra & Deploy", level: 89, tag: "daily", icon: <GithubIcon /> },
  { name: "Vercel", color: "#14120f", group: "Infra & Deploy", level: 85, tag: "deploy", icon: <VercelIcon /> },
  { name: "Cloudflare", color: "#F6821F", group: "Infra & Deploy", level: 73, tag: "edge", icon: <CloudflareIcon /> },
  { name: "Docker", color: "#2496ED", group: "Infra & Deploy", level: 58, tag: "learning", icon: <DockerIcon /> },
  { name: "GitHub Actions", color: "#2088FF", group: "Infra & Deploy", level: 63, tag: "CI", icon: <ActionsIcon /> },
  { name: "Linux / CLI", color: "#FCC624", group: "Infra & Deploy", level: 78, tag: "shell", icon: <TerminalIcon /> },
  // Security
  { name: "OWASP Top 10", color: "#FF4D4D", group: "Security", level: 82, tag: "models", icon: <ShieldIcon /> },
  { name: "Bug bounty", color: "#FF5C5C", group: "Security", level: 74, tag: "hunting", icon: <BugIcon /> },
  { name: "Recon", color: "#FF2D6F", group: "Security", level: 76, tag: "assets", icon: <RadarIcon /> },
  { name: "Burp Suite", color: "#FF8A00", group: "Security", level: 68, tag: "proxy", icon: <BurpIcon /> },
  { name: "Nmap", color: "#9DD86F", group: "Security", level: 64, tag: "scans", icon: <NmapIcon /> },
  { name: "Wireshark", color: "#1E6FB8", group: "Security", level: 58, tag: "packets", icon: <WiresharkIcon /> },
  { name: "Kali Linux", color: "#55B7EE", group: "Security", level: 70, tag: "driver", icon: <KaliIcon /> },
  { name: "Secure code review", color: "#FFD166", group: "Security", level: 72, tag: "review", icon: <LockIcon /> },
  // AI-Assisted
  { name: "ChatGPT", color: "#10A37F", group: "AI-Assisted", level: 93, tag: "daily", icon: <AiIcon /> },
  { name: "Claude", color: "#D97757", group: "AI-Assisted", level: 89, tag: "pairing", icon: <SparkIcon /> },
  { name: "Cursor", color: "#14120f", group: "AI-Assisted", level: 86, tag: "editor", icon: <PromptIcon /> },
  { name: "GitHub Copilot", color: "#2088FF", group: "AI-Assisted", level: 84, tag: "tab", icon: <BotIcon /> },
  { name: "Gemini", color: "#8AB4F8", group: "AI-Assisted", level: 72, tag: "vision", icon: <LayersIcon /> },
  { name: "Prompt design", color: "#FF2D6F", group: "AI-Assisted", level: 87, tag: "prompts", icon: <BrainIcon /> },
  { name: "RAG pipelines", color: "#3ECF8E", group: "AI-Assisted", level: 66, tag: "retrieval", icon: <BookSearchIcon /> },
  { name: "Agent workflows", color: "#F4C21E", group: "AI-Assisted", level: 70, tag: "agents", icon: <FlowIcon /> },
  { name: "AI code review", color: "#FF8A00", group: "AI-Assisted", level: 80, tag: "reviews", icon: <EyeCodeIcon /> },
];

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1400&auto=format&fit=crop`;

const CARD_COLORS = ["var(--yellow)", "var(--pink)", "var(--mint)", "var(--blue)", "var(--purple)", "var(--orange)"];

const PROJECTS = [
  {
    name: "AI Dev Workspace",
    tags: ["React", "LLM", "TypeScript"],
    image: UNSPLASH("photo-1555949963-aa79dcee981c"),
    year: "2026",
    role: "Design + build",
    status: "Ongoing",
    desc: "A React + TypeScript workspace that wires LLM workflows straight into the dev loop — draft, refactor and review with streaming responses.",
    bullets: [
      "Streaming chat surface with token-by-token render and cancel-safe aborts",
      "Prompt presets stored per project, so a refactor recipe is one keystroke away",
      "Diff viewer that shows AI suggestions against the working file, never blind-applied",
    ],
  },
  {
    name: "Vuln Journal",
    tags: ["PWA", "Supabase", "Markdown"],
    image: UNSPLASH("photo-1526374965328-7f61d4dc18c5"),
    year: "2025",
    role: "Solo",
    status: "Live",
    desc: "Personal bug-bounty knowledge base: findings, severity notes and remediation patterns for every vuln class I learn.",
    bullets: [
      "Offline-first PWA — write findings on the roof, sync later",
      "Severity ladder with CVSS scratchpad per entry",
      "Full-text search across notes, tags and payload snippets",
    ],
  },
  {
    name: "Recon Dashboard",
    tags: ["Node", "CLI", "Postgres"],
    image: UNSPLASH("photo-1558494949-ef010cbdcc31"),
    year: "2025",
    role: "Solo",
    status: "Archived",
    desc: "Lightweight recon dashboard — subdomains, port states and tech fingerprinting in one monochrome interface.",
    bullets: [
      "Fans out subdomain + port probes, keeps results in one table",
      "Diff two scans to see exactly what an org shipped overnight",
      "Every raw command is printed, so nothing is a black box",
    ],
  },
  {
    name: "MiniShell",
    tags: ["C", "POSIX", "Make"],
    image: UNSPLASH("photo-1542831371-29b0f74f9713"),
    year: "2026",
    role: "Coursework, taken far",
    status: "Shipped",
    desc: "A POSIX-ish shell written for my OS lab that grew pipes, job control and redirection because the assignment did not cover them.",
    bullets: [
      "fork / exec / wait loop with proper signal handling for Ctrl-C and Ctrl-Z",
      "Pipes chained arbitrarily: `ls | grep a | wc -l` just works",
      "Builtins (cd, export, jobs, fg, bg) kept inside the process, as they must be",
    ],
  },
  {
    name: "Bounty Toolkit",
    tags: ["Python", "Bash", "YAML"],
    image: UNSPLASH("photo-1563986768609-322da13575f3"),
    year: "2025",
    role: "Solo",
    status: "Live",
    desc: "The glue scripts I actually run before hunting: scope parsing, asset pruning and a report template generator.",
    bullets: [
      "Programs in-scope hosts straight from the policy page, wildcards and all",
      "Drops out-of-scope assets before a single request is sent",
      "Writes a submission draft with PoC steps, impact and remediation stubs",
    ],
  },
  {
    name: "This Portfolio",
    tags: ["React", "Hand-rolled CSS", "GSAP"],
    image: UNSPLASH("photo-1518770660439-4636190af475"),
    year: "2026",
    role: "Design + build",
    status: "Live",
    desc: "Hand-rolled neo-brutalist design system: sticker blocks, hard shadows, doodles — zero component libraries.",
    bullets: [
      "Two CSS files, no framework — tokens, stickers and doodles drawn by hand",
      "Every reveal is GSAP + ScrollTrigger with transforms cleared so hover still works",
      "Respects prefers-reduced-motion on the ticker and the badge rings",
    ],
  },
];

const COURSEWORK = [
  "Data Structures", "Algorithms", "Operating Systems", "DBMS",
  "Computer Networks", "Computer Architecture", "OOP", "Discrete Math",
  "Theory of Computation", "Web Technologies",
];

const NOW = [
  { k: "Semester", v: "1 · BE Computer Engineering" },
  { k: "Building", v: "AI Dev Workspace — agent tasks + evals" },
  { k: "Breaking", v: "PortSwigger labs, JWT + SSRF tracks" },
  { k: "Reading", v: "Web Security Academy write-ups, one a night" },
];

gsap.registerPlugin(ScrollTrigger);

function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [enabled]);
}

function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (pathname === "/") {
        gsap.from(".hero__block", { y: 70, autoAlpha: 0, rotate: -2, stagger: 0.13, duration: 0.9, ease: "back.out(1.3)" });
        gsap.from(".hero__sticker", { scale: 0, autoAlpha: 0, stagger: 0.1, duration: 0.6, ease: "back.out(2)", delay: 0.6, clearProps: "transform" });
        gsap.from(".ticker", { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out", delay: 0.9 });
      }
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 46 },
          {
            autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          });
      });
      // Staggered tile grids: each [data-stagger] container animates its children.
      const grids = gsap.utils.toArray<HTMLElement>("[data-stagger]");
      grids.forEach((parent) => {
        const kids = Array.from(parent.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.fromTo(kids, { autoAlpha: 0, y: 30, scale: 0.94 }, {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.045, ease: "back.out(1.4)", clearProps: "transform",
          scrollTrigger: { trigger: parent, start: "top 92%", toggleActions: "play none none reverse" },
        });
      });
    });
    return () => ctx.revert();
  }, [pathname]);
}

function ScrollTop() {
  const { pathname } = useLocation();
  useSmoothScroll(true);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useReveal();
  return null;
}

/* ---------- Circular rotating text badge ---------- */
const RING_LEN = 528; // circumference of the r=84 path below, in user units

function BadgeAsterisk() {
  return (
    <g className="ring__mark" transform="translate(110,110)">
      <path d="M0,-30 L0,30 M-30,0 L30,0 M-21,-21 L21,21 M-21,21 L21,-21" />
    </g>
  );
}

/* Wobbly hand-drawn circle with initials — stands in for tools with no official mark. */
const initialsOf = (name: string) =>
  name.split(/[\s/+-]+/).filter(Boolean).slice(0, 2)
    .map((w) => w.replace(/[^A-Za-z]/g, "")[0] ?? "")
    .join("").toUpperCase();

function MonoMark({ name }: { name: string }) {
  return (
    <svg className="mono-mark" viewBox="0 0 44 44" aria-hidden="true">
      <path
        d="M22 3.4 C 32 3 39.6 10.6 40.4 20 C 41.2 30.4 32.6 40.6 22 40.6 C 11.4 40.6 3.4 31.4 3.6 21 C 3.8 11 12.4 3.8 22 3.4 Z"
        fill="none" stroke="currentColor" strokeWidth="2.2"
      />
      <text x="22" y="27.4" textAnchor="middle">{initialsOf(name)}</text>
    </svg>
  );
}

function CircleBadge({ words, center, className }: { words: string; center?: React.ReactNode; className?: string }) {
  const pid = `ringpath-${className?.replace(/[^a-zA-Z0-9_-]/g, "") || "def"}`;
  return (
    <svg className={cn("ring", className)} viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        {/* Starts at 12 o'clock so the first word reads upright at the top. */}
        <path id={pid} d="M110,110 m0,-84 a84,84 0 1,1 0,168 a84,84 0 1,1 0,-168" />
      </defs>
      <g className="ring__spin">
        <text>
          <textPath href={`#${pid}`} startOffset="0" textLength={RING_LEN} lengthAdjust="spacing">
            {words}
          </textPath>
        </text>
      </g>
      {center && <g className="ring__center">{center}</g>}
    </svg>
  );
}

/* ---------- Nav with live Kathmandu clock ---------- */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit", second: "2-digit",
      }).format(new Date()),
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="nav__clock">
      <span className="nav__clock-time">{time}</span>
      <span className="nav__clock-zone">NPT — काठमाडौं</span>
    </span>
  );
}

function Nav() {
  return (
    <header className="nav">
      <Link className="nav__logo" to="/">BN<sup>©26</sup></Link>
      <nav className="nav__links" aria-label="Primary">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === "/"}>{n.label}</NavLink>
        ))}
      </nav>
      <Clock />
    </header>
  );
}

/* ---------- Landing ---------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <p className="hero__kicker chip" data-color="var(--cyan)">developer × cybersecurity · kathmandu</p>
        <h1 className="hero__title">
          <span className="hero__block hero__block--yellow">Bishnu</span>
          <span className="hero__block hero__block--pink">Neupane</span>
        </h1>
        <p className="hero__role">
          <span className="hero__role-black">CYBERSECURITY</span>
          <SparkleDoodle className="hero__role-star" />
          <span>× AI-ASSISTED WEB DEV &amp; SOFTWARE ENGINEERING</span>
        </p>
        <div className="hero__ctas">
          <Link className="hero__btn" to="/projects">See the work →</Link>
          <Link className="hero__btn hero__btn--alt" to="/contact">Hire me</Link>
        </div>
      </div>

      <StarburstDoodle className="hero__sticker hero__sticker--burst" />
      <SunDoodle className="hero__sticker hero__sticker--sun" />
      <HeartDoodle className="hero__sticker hero__sticker--heart" />
      <BoltDoodle className="hero__sticker hero__sticker--bolt" />
      <CircleBadge words="BUILD ✳ BREAK ✳ SECURE ✳ REPEAT ✳ " center={<BadgeAsterisk />} className="hero__badge" />
      <CurvedArrowDoodle className="hero__sticker hero__sticker--arrow" />
      <p className="hero__scribble">hi!! welcome to my corner of the internet</p>

      <span className="hero__scroll">scroll for the fun stuff ↓</span>
    </section>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((t, i) => (
          <span key={i}>{t} <span className="dot">✳</span></span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="intro">
      <div className="wrap">
        <div className="intro__note" data-reveal>
          <p className="intro__note-tag sticky-note">who am i?</p>
          <p className="intro__line">
            I am a <span className="hl">developer</span> and <span className="hl hl--pink">cybersecurity enthusiast</span>{" "}
            from Kathmandu, Nepal — currently studying <span className="hl hl--mint">BE Computer Engineering</span> at{" "}
            <b>NCIT College</b>, Pokhara University. I build modern web applications with{" "}
            <b>AI-assisted workflows</b> and interfaces in <b>React, TypeScript &amp; CSS</b>, while exploring
            web security — <b>bug bounty hunting</b>, cybersecurity methodologies, and how applications break —
            so I can build more secure code.
          </p>
          <LoopArrowDoodle className="intro__arrow" />
        </div>
        <div className="intro__cta" data-reveal>
          <Link className="hero__btn" to="/projects">See the work →</Link>
          <Link className="hero__btn hero__btn--alt" to="/contact">Get in touch</Link>
        </div>
      </div>
    </section>
  );
}

function FirstGlance() {
  return (
    <section className="glance">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <h2 className="sec-head__title">at first glance <StarDoodle className="inline-doodle inline-doodle--pink" /></h2>
          <Link className="sec-head__more" to="/projects">more projects →</Link>
        </div>
        <div className="cards3" data-stagger>
          {PROJECTS.slice(0, 3).map((pr, i) => (
            <Link className="peek" to="/projects" key={pr.name} style={{ "--tile": CARD_COLORS[i] } as React.CSSProperties}>
              <span className="peek__no">{String(i + 1).padStart(2, "0")}</span>
              <span className="peek__tags">{pr.tags.map((t) => <em key={t}>{t}</em>)}</span>
              <h3 className="peek__name">{pr.name}</h3>
              <p className="peek__desc">{pr.desc}</p>
              <span className="peek__go">open →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechMarquee({ items, reverse = false }: { items: typeof TECHS; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee__track${reverse ? " marquee__track--rev" : ""}`}>
        {loop.map((t, i) => (
          <span key={`${t.name}-${i}`} className="tile tile--mini" style={{ "--tile": GROUP_COLOR[t.group] } as React.CSSProperties}>
            <span className="tile__icon" style={{ color: t.color }}>{t.icon ?? <MonoMark name={t.name} />}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TechIcons() {
  return (
    <section className="techs">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <h2 className="sec-head__title">the stack <BoltDoodle className="inline-doodle inline-doodle--yellow" /></h2>
          <Link className="sec-head__more" to="/skills">all skills →</Link>
        </div>
        <p className="sec-note">my daily toys, no labels — hover them ↓</p>
      </div>
      <div className="techs__band">
        <TechMarquee items={TECHS.slice(0, 9)} />
        <TechMarquee items={TECHS.slice(9)} reverse />
      </div>
    </section>
  );
}

/* ---------- Shared page shell ---------- */
function Page({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="page">
      <div className="wrap">
        <div className="page__head" data-reveal>
          <p className="page__crumb chip">portfolio / {title.toLowerCase()}</p>
          <h1 className="page__title">
            {title}{accent && <span className="page__title-accent"> {accent}</span>}
            <SquiggleDoodle className="page__squiggle" />
          </h1>
          <StarburstDoodle className="page__star" />
          <Link className="page__back" to="/">
            <span className="page__back-arrow" aria-hidden="true">←</span>
            Back home
          </Link>
        </div>
        <div className="page__body">{children}</div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Intro />
      <FirstGlance />
      <TechIcons />
    </>
  );
}

const FACTS = [
  { k: "Base", v: "काठमाडौं — Kathmandu, Nepal", c: "var(--yellow)" },
  { k: "Study", v: "BE Computer Engineering · NCIT College · Pokhara University", c: "var(--mint)" },
  { k: "Focus", v: "Full-stack cyber · bug bounty · secure code", c: "var(--pink)" },
  { k: "Daily stack", v: "React · TypeScript · AI-assisted workflows", c: "var(--blue)" },
];

function About() {
  return (
    <Page title="About" accent="me">
      <div className="about">
        <div className="about__board" data-stagger>
          <div className="sticker sticker--sun"><SunDoodle /></div>
          <div className="sticker sticker--heart"><HeartDoodle /><span>21 yrs</span></div>
          <div className="sticker sticker--skull"><SkullDoodle /><span>kathmandu</span></div>
          <div className="sticker sticker--bug"><BugIcon /><span>bug hunter</span></div>
          <div className="sticker sticker--cloud"><CloudDoodle /><span>edge + cloud</span></div>
          <CircleBadge words="DEVELOPER ✳ HUNTER ✳ BUILDER ✳ " center={<BadgeAsterisk />} className="about__badge" />
        </div>

        <div className="about__text">
          <h2 className="about__hi">HI!! <HandDoodle className="inline-doodle inline-doodle--pink" /></h2>
          <p className="about__lede" data-reveal>
            I am a developer and cybersecurity enthusiast from Kathmandu, Nepal —
            currently studying BE Computer Engineering at NCIT College, Pokhara University.
          </p>
          <p className="about__para" data-reveal>
            <span className="hl">Ever since</span> I shipped my first web app, I have been passionate
            about building modern interfaces with <b>AI-assisted workflows</b> and exploring how new
            technologies work. Alongside building with <b>React, TypeScript and CSS</b>, I spend time
            exploring web security.
          </p>
          <p className="about__para" data-reveal>
            <span className="hl hl--mint">I live to</span> break things — <b>bug bounty hunting</b>,
            learning cybersecurity methodologies, and understanding how web applications break, so I
            can build more secure code.
          </p>
          <ul className="about__facts" data-stagger>
            {FACTS.map((f) => (
              <li key={f.k} style={{ "--tile": f.c } as React.CSSProperties}>
                <span className="about__fact-k">{f.k}</span>
                <span className="about__fact-v">{f.v}</span>
              </li>
            ))}
          </ul>
          <div className="about__pills" data-reveal>
            <a className="chip chip--link" href="mailto:bishnuneup4ne@gmail.com">bishnuneup4ne@gmail.com</a>
            <a className="chip chip--link" href="https://github.com/bishnuneup4ne" target="_blank" rel="noreferrer">github ↗</a>
            <a className="chip chip--link" href="https://hackerone.com/bishnuneup4ne" target="_blank" rel="noreferrer">hackerone ↗</a>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ---------- Skills — icons only ---------- */
function Skills() {
  return (
    <Page title="Skills" accent="kit">
      <div className="kitstats" data-stagger>
        <div className="kitstat" style={{ "--tile": "var(--yellow)" } as React.CSSProperties}>
          <b>{TECHS.length}</b><span>tools in the kit</span>
        </div>
        <div className="kitstat" style={{ "--tile": "var(--pink)" } as React.CSSProperties}>
          <b>{SKILL_GROUPS.length}</b><span>lanes I work in</span>
        </div>
        <div className="kitstat" style={{ "--tile": "var(--mint)" } as React.CSSProperties}>
          <b>2021</b><span>when I started</span>
        </div>
        <p className="kitstats__note">
          Self-taught plus BE coursework. Every tile is one tool I actually reach for —
          hover an icon to hear its name.
        </p>
      </div>

      <Ticker />

      {SKILL_GROUPS.map((g) => {
        const items = TECHS.filter((t) => t.group === g);
        return (
          <section className="lane" key={g}>
            <h3 className="lane__title">
              <span className="lane__swatch" style={{ background: GROUP_COLOR[g] }} aria-hidden="true" />
              {g}
              <span className="lane__count">{items.length}</span>
            </h3>
            <ul className="grid" data-stagger>
              {items.map((t) => (
                <li
                  className="tile" key={t.name} title={t.name}
                  aria-label={`${t.name} — ${t.tag}`}
                  style={{ "--tile": GROUP_COLOR[g] } as React.CSSProperties}
                >
                  <span className="tile__icon" style={{ color: t.color }}>{t.icon ?? <MonoMark name={t.name} />}</span>
                  <span className="tile__name">{t.name}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="leveling" data-reveal>
        <h3 className="leveling__title">currently leveling up <FlameDoodle className="inline-doodle inline-doodle--orange" /></h3>
        <ul className="chips" data-stagger>
          {["Docker + compose", "System design", "Cloudflare Workers", "Burp extensions", "RAG evals", "WebAuthn"].map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

/* ---------- Projects — aesthetic sticker cards ---------- */
function Projects() {
  return (
    <Page title="Works" accent="i built">
      <div className="wall">
        {PROJECTS.map((pr, i) => (
          <article
            className={cn("pcard", i % 2 === 1 && "pcard--flip")} key={pr.name}
            style={{ "--tile": CARD_COLORS[i % CARD_COLORS.length] } as React.CSSProperties}
            data-reveal
          >
            <div className="pcard__shot">
              <img src={pr.image} alt={`${pr.name} cover`} loading="lazy" />
              <span className="pcard__no">{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("pcard__status", pr.status === "Ongoing" && "pcard__status--live")}>{pr.status}</span>
            </div>
            <div className="pcard__body">
              <p className="pcard__meta">{pr.year} · {pr.role}</p>
              <h3 className="pcard__name">{pr.name}</h3>
              <p className="pcard__desc">{pr.desc}</p>
              <ul className="pcard__list">
                {pr.bullets.map((b) => <li key={b}><SparkleDoodle className="pcard__tick" />{b}</li>)}
              </ul>
              <p className="pcard__tags">{pr.tags.map((t) => <em key={t}>{t}</em>)}</p>
            </div>
            <StarburstDoodle className="pcard__star" />
          </article>
        ))}
      </div>

      <section className="bench" data-reveal>
        <h2 className="bench__title">on the bench <HandDoodle className="inline-doodle inline-doodle--yellow" /></h2>
        <ol className="bench__list" data-stagger>
          {[
            { t: "Agent tasks that open their own PRs", d: "Scoped, reviewed, never merged by itself. Watching what breaks first." },
            { t: "Vuln Journal, public subset", d: "Strip the private findings and publish the write-ups that are mine to share." },
            { t: "MiniShell, taken further", d: "A tiny scripting layer on top, plus a test harness for the parser." },
          ].map((b, i) => (
            <li className="bench__row" key={b.t}>
              <span className="bench__no">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="bench__t">{b.t}</h3>
                <p className="bench__d">{b.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link className="bench__cta" to="/contact">want any of these built with you? →</Link>
      </section>
    </Page>
  );
}

const EDU = [
  {
    year: "2024",
    t: "Class 10 · SEE",
    by: "Jagannath Secondary School · Kathmandu",
    gpa: "3.73 / 4.0",
    note: "Board exam, with computer as a subject — the first time I wrote a program that other people used.",
    c: "var(--yellow)",
  },
  {
    year: "2024 – 2026",
    t: "+2 Science (NEB)",
    by: "Xavier Academy · Kathmandu",
    gpa: "3.78 / 4.0",
    note: "Physics, chemistry, math and computer. Nights were spent on side projects and my first bug-bounty reports.",
    c: "var(--pink)",
  },
  {
    year: "2026 – now",
    t: "BE Computer Engineering",
    by: "NCIT College · Pokhara University",
    gpa: "ongoing",
    note: "First semester. Core programming, discrete math and digital logic — plus labs I keep extending past the brief.",
    c: "var(--mint)",
  },
];

const ESTATS = [
  { v: "3.73", k: "SEE GPA" },
  { v: "3.78", k: "+2 NEB GPA" },
  { v: "2030", k: "expected grad" },
  { v: "10", k: "subjects I care about" },
];

const CERTS = [
  { kind: "Online", t: "TryHackMe — Pre-Security & Intro to Cyber", by: "TryHackMe", when: "2025" },
  { kind: "Online", t: "PortSwigger Web Security Academy", by: "PortSwigger", when: "2025 – now" },
  { kind: "Online", t: "OWASP Top 10 — deep-dive track", by: "OWASP", when: "2025" },
  { kind: "Offline", t: "Cybersecurity & CTF workshops", by: "Kathmandu meetups · college fests", when: "2025 – 2026" },
  { kind: "Win", t: "First valid bug-bounty submissions", by: "HackerOne", when: "2025" },
  { kind: "Win", t: "AI-assisted dev workflows in daily use", by: "Self-directed", when: "2024 – now" },
];

/* ---------- Education — ticket stubs & stamp timeline ---------- */
function Education() {
  return (
    <Page title="Schooling" accent="so far">
      <div className="estats" data-stagger>
        {ESTATS.map((s, i) => (
          <div className="estat" key={s.k} style={{ "--tile": CARD_COLORS[i] } as React.CSSProperties}>
            <b className="estat__v">{s.v}</b>
            <span className="estat__k">{s.k}</span>
          </div>
        ))}
      </div>

      <p className="sec-note">the report card trail ↓</p>
      <div className="marks">
        {EDU.map((e, i) => (
          <div className="mark" key={e.t} style={{ "--tile": e.c } as React.CSSProperties} data-reveal>
            <div className="mark__stamp">
              <span className="mark__year">{e.year}</span>
              <span className="mark__idx">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="mark__card">
              <h3 className="mark__t">{e.t}</h3>
              <p className="mark__by">{e.by}</p>
              <p className="mark__note">{e.note}</p>
              <div className="mark__perf" aria-hidden="true" />
              <span className={cn("mark__gpa", e.gpa === "ongoing" && "mark__gpa--live")}>{e.gpa}</span>
            </div>
            {i < EDU.length - 1 && <CurvedArrowDoodle className="mark__arrow" />}
          </div>
        ))}
      </div>

      <h2 className="edu-head" data-reveal>right now <SunDoodle className="inline-doodle inline-doodle--yellow" /></h2>
      <ul className="nowlist" data-stagger>
        {NOW.map((n) => (
          <li className="nowlist__row" key={n.k}>
            <span className="nowlist__k">{n.k}</span>
            <span className="nowlist__v">{n.v}</span>
          </li>
        ))}
      </ul>

      <h2 className="edu-head" data-reveal>coursework <BookSearchIcon className="inline-doodle inline-doodle--blue" /></h2>
      <ul className="chips chips--wide" data-stagger>
        {COURSEWORK.map((c) => <li key={c}>{c}</li>)}
      </ul>

      <h2 className="edu-head" data-reveal>certs &amp; wins <StarburstDoodle className="inline-doodle inline-doodle--pink" /></h2>
      <ul className="tickets" data-stagger>
        {CERTS.map((c) => (
          <li className="ticket" key={c.t}>
            <span className="ticket__stub">{c.kind}</span>
            <div className="ticket__main">
              <h3 className="ticket__t">{c.t}</h3>
              <p className="ticket__by">{c.by}</p>
              <span className="ticket__perf" aria-hidden="true" />
            </div>
            <span className="ticket__when">{c.when}</span>
          </li>
        ))}
      </ul>
    </Page>
  );
}

const SOCIALS = [
  { name: "GitHub", handle: "@bishnuneup4ne", url: "https://github.com/bishnuneup4ne", c: "var(--yellow)" },
  { name: "LinkedIn", handle: "/in/bishnuneup4ne", url: "https://linkedin.com/in/bishnuneup4ne", c: "var(--blue)" },
  { name: "HackerOne", handle: "@bishnuneup4ne", url: "https://hackerone.com/bishnuneup4ne", c: "var(--red)" },
  { name: "X", handle: "@bishnuneup4ne", url: "https://x.com/bishnuneup4ne", c: "var(--mint)" },
];

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const service = String(fd.get("service") || "");
    const message = String(fd.get("message") || "");
    const subject = encodeURIComponent(`[${service}] — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:bishnuneup4ne@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Page title="Contact" accent="me">
      <div className="ctop" data-reveal>
        <p className="sec-note">say hi <CurvedArrowDoodle className="inline-doodle inline-doodle--pink" /></p>
        <a className="ctop__big" href="mailto:bishnuneup4ne@gmail.com">
          bishnuneup4ne@gmail.com <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="cgrid">
        <form className="cbox" onSubmit={handleSubmit} data-reveal>
          <p className="cbox__head">the form ↓</p>
          <div className="crow">
            <label className="cfield">
              <span className="clabel">Name</span>
              <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
            </label>
            <label className="cfield">
              <span className="clabel">Email</span>
              <input name="email" type="email" placeholder="you@email.com" autoComplete="email" required />
            </label>
          </div>
          <label className="cfield">
            <span className="clabel">Services</span>
            <select name="service" defaultValue="Web development">
              <option>Web development</option>
              <option>Security audit</option>
              <option>Bug-bounty collab</option>
              <option>Study / mentor session</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="cfield">
            <span className="clabel">Message</span>
            <textarea name="message" rows={6} placeholder="How can I help?" required />
          </label>
          <div className="cfoot">
            <button className="cfoot__send" type="submit">Send it →</button>
            {sent && <p className="cfoot__sent">opening your mail app — thanks! ✳</p>}
          </div>
        </form>

        <div className="cside">
          <div className="cside__note" data-reveal>
            <p>
              Got an idea to build — or a program that needs auditing? Fill that form
              and it lands straight in my inbox.
            </p>
            <LoopArrowDoodle className="cside__arrow" />
          </div>
          <ul className="socials" data-stagger>
            {SOCIALS.map((s) => (
              <li key={s.name} style={{ "--tile": s.c } as React.CSSProperties}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <b>{s.name}</b> <em>{s.handle}</em> <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

/* ---------- Footer — sticker sign-off ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <CircleBadge words="BUILD ✳ BREAK ✳ SECURE ✳ REPEAT ✳ " center={<BadgeAsterisk />} className="footer__badge" />
        <p className="footer__big">LET&apos;S <span>BUILD</span> SOMETHING <span>SAFE</span></p>
        <Link className="footer__mark" to="/">BN<sup>©26</sup></Link>
        <div className="footer__pills">
          <a className="chip chip--link" href="mailto:bishnuneup4ne@gmail.com">bishnuneup4ne@gmail.com</a>
          <nav className="footer__nav" aria-label="Footer">
            {NAV.filter((n) => n.to !== "/").map((n) => <Link className="chip chip--link" key={n.to} to={n.to}>{n.label}</Link>)}
          </nav>
          <a className="chip chip--link" href="https://github.com/bishnuneup4ne" target="_blank" rel="noreferrer">github ↗</a>
        </div>
        <p className="footer__bottom">© 2026 Bishnu Neupane · 27.71°N / 85.32°E — काठमाडौं, नेपाल · built by hand, no templates</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <div className="page">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
