import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, Coffee, Music, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Sparkles, Code2, Rocket, Trophy, ArrowUp } from "lucide-react";
import portrait from "@/assets/ronak-portrait.jpg";
import { Reveal } from "./reveal";

const ROLES = ["Frontend Engineer", "Full Stack Student", "Hackathon Enthusiast", "Modern Web Developer", "Problem Solver"];

function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % ROLES.length); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <span className="caret text-mint">{text}</span>;
}

function MagneticButton({ children, href, primary, download }: { children: React.ReactNode; href: string; primary?: boolean; download?: boolean }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      href={href}
      download={download}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium magnetic-btn ${primary ? "bg-primary text-primary-foreground" : "glass"}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}

export function Hero() {
  const mx = useMotionValue(0.5); const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [8, -8]);
  const ry = useTransform(mx, [0, 1], [-8, 8]);
  return (
    <section id="home" className="aurora-bg grain relative min-h-dvh overflow-hidden pt-28 pb-16 md:pt-36"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="relative">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className="relative inline-flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-mint" /></span>
                Available for internships · 2026
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] uppercase">
                Hi, I'm<br />
                <span className="text-gradient">Ronak Samal.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                I'm a <Typer />
                <br />crafting modern, interactive web experiences from New Delhi — usually with coffee <Coffee className="inline h-4 w-4 text-coral" /> and lo-fi <Music className="inline h-4 w-4 text-mint" /> in the background.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="#projects" primary>View Projects</MagneticButton>
                <MagneticButton href="#contact">Contact Me</MagneticButton>
                <MagneticButton href="/resume.pdf" download>Download Resume</MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>// Since 2025</span>
                <span className="h-px w-10 bg-border" />
                <span>KR Mangalam University</span>
                <span className="h-px w-10 bg-border" />
                <span className="text-mint">B.Tech · '29</span>
              </div>
            </Reveal>
          </div>

          <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-coral/40 via-magenta/30 to-mint/30 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <img src={portrait} alt="Portrait of Ronak Samal" width={1024} height={1280} className="h-[520px] w-full rounded-[1.6rem] object-cover" />
              <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] ring-1 ring-inset ring-white/20" />
              <div className="absolute left-6 top-6 rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-widest">(N°01) Ronak.tsx</div>
              <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
                <span className="animate-pulse-ring h-2 w-2 rounded-full bg-white" /> Building
              </div>
            </div>
            {/* Floating chips */}
            <motion.div className="glass absolute -left-6 top-24 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-mono animate-float" style={{ animationDelay: "0.2s" }}>
              <Code2 className="h-4 w-4 text-coral" /> React · TS
            </motion.div>
            <motion.div className="glass absolute -right-4 top-48 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-mono animate-float" style={{ animationDelay: "1s" }}>
              <Sparkles className="h-4 w-4 text-mint" /> Tailwind
            </motion.div>
            <motion.div className="glass absolute -left-2 bottom-16 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-mono animate-float" style={{ animationDelay: "1.6s" }}>
              <Rocket className="h-4 w-4 text-magenta" /> Hackathons · 10+
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-border/50 py-6">
        <div className="marquee-track flex gap-16 whitespace-nowrap font-display text-4xl uppercase">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-16">
              {["Frontend", "React", "TypeScript", "Design Systems", "Hackathons", "Motion", "Tailwind", "UI Engineering"].map((w) => (
                <span key={w} className="flex items-center gap-16">
                  <span className="text-gradient">{w}</span>
                  <span className="h-3 w-3 rotate-45 bg-mint" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-full transition-all ${scrolled ? "glass" : ""}`}>
      <nav className="flex items-center justify-between px-4 py-2.5 md:px-6">
        <a href="#home" className="flex items-center gap-2 font-display text-lg uppercase">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-mono text-xs">RS</span>
          <span className="hidden sm:inline">Ronak Samal</span>
        </a>
        <div className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest md:flex">
          {[["Work","#projects"],["About","#about"],["Skills","#skills"],["Hacks","#experience"],["Contact","#contact"]].map(([l,h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleLazy />
          <a href="#contact" className="hidden magnetic-btn items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-mono uppercase tracking-widest text-primary-foreground md:inline-flex">Let's talk <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </nav>
    </header>
  );
}

import { ThemeToggle as ThemeToggleLazy } from "./theme-toggle";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°02) About</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">
                A curious<br /><span className="text-gradient">builder.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p className="text-2xl leading-snug md:text-3xl">
                I'm a B.Tech student at <span className="text-mint">KR Mangalam University</span>, currently mastering full stack engineering with a heavy tilt toward <span className="text-coral">frontend</span>. I like turning fuzzy ideas into fast, tactile interfaces — and I sharpen my craft at hackathons.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Focus", v: "Frontend Engineering · UI Systems" },
                { k: "Fuel", v: "Coffee, lo-fi, deep focus sessions" },
                { k: "Mode", v: "Ship fast, iterate faster" },
                { k: "Now", v: "Learning Next.js, motion, design ops" },
              ].map((c) => (
                <Reveal key={c.k} delay={0.05}>
                  <div className="glass rounded-2xl p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.k}</div>
                    <div className="mt-2 text-base">{c.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILLS = {
  Frontend: [
    { n: "React", v: 88 }, { n: "JavaScript", v: 90 }, { n: "HTML5", v: 95 },
    { n: "CSS3", v: 92 }, { n: "Tailwind CSS", v: 90 }, { n: "Responsive UI", v: 88 },
  ],
  Tools: [
    { n: "Git", v: 85 }, { n: "GitHub", v: 90 }, { n: "VS Code", v: 95 },
    { n: "Figma", v: 78 }, { n: "Postman", v: 75 }, { n: "npm", v: 88 },
  ],
};

function Ring({ v, label }: { v: number; label: string }) {
  const c = 2 * Math.PI * 34;
  return (
    <div className="glass group relative flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_var(--coral)]">
      <div className="relative h-20 w-20 shrink-0">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeOpacity="0.1" strokeWidth="6" fill="none" />
          <circle cx="40" cy="40" r="34" stroke="url(#g)" strokeWidth="6" fill="none" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (v / 100) * c} className="transition-all duration-1000" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="oklch(0.72 0.22 32)" /><stop offset="1" stopColor="oklch(0.86 0.18 155)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center font-mono text-sm">{v}</div>
      </div>
      <div>
        <div className="text-base font-medium">{label}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Proficiency</div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°03) Toolbox</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">Stack &<br /><span className="text-gradient">Tools.</span></h2>
            </div>
            <p className="max-w-md text-muted-foreground">A focused kit for modern frontend work — deep on React and CSS, comfortable with tooling that ships.</p>
          </div>
        </Reveal>
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group} className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-coral">{group}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => <Reveal key={s.n} delay={i * 0.04}><Ring v={s.v} label={s.n} /></Reveal>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const HACK_TRAITS = [
  { t: "Rapid prototyping", d: "48-hour sprints from idea to demo." },
  { t: "Team collaboration", d: "Sync fast, pair harder, ship together." },
  { t: "Problem solving", d: "Ambiguous briefs, tight loops, clear outcomes." },
  { t: "Presentation skills", d: "Turning code into a story the judges feel." },
  { t: "Innovation mindset", d: "Chasing the interesting angle, not the safe one." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°04) Arena</span>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">Hackathon<br /><span className="text-gradient">reps.</span></h2>
            <div className="mt-8 glass rounded-3xl p-6">
              <div className="font-display text-7xl text-gradient leading-none">10+</div>
              <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Hackathons attended</div>
              <p className="mt-4 text-sm text-muted-foreground">Where I sharpen instincts, pressure-test ideas, and turn caffeine into working prototypes.</p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {HACK_TRAITS.map((h, i) => (
              <Reveal key={h.t} delay={i * 0.05}>
                <div className="group glass relative h-full rounded-3xl p-6 transition hover:-translate-y-1">
                  <Trophy className="h-6 w-6 text-coral" />
                  <div className="mt-4 text-xl font-medium">{h.t}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{h.d}</div>
                  <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { n: "VDOM Visualiser", d: "A visualization tool demonstrating how the Virtual DOM works and how updates are efficiently rendered.", stack: ["React", "TypeScript", "Canvas"], gh: "https://github.com/AGreatDev-coder/vdom-visualiser", tag: "Learning tool", num: "01" },
  { n: "Personal AI Tracker", d: "AI-powered productivity tracker for monitoring daily consistency, goals, and personal growth.", stack: ["React", "AI", "Tailwind"], gh: "https://github.com/AGreatDev-coder/personal-ai-tracker", tag: "Productivity", num: "02" },
  { n: "AirAware", d: "An application focused on air quality awareness with a clean UI and user-friendly data visualization.", stack: ["React", "Charts", "API"], gh: "https://github.com/AGreatDev-coder/airaware", tag: "Data · Environment", num: "03" },
  { n: "Crime Vista", d: "A smart urban safety platform that visualizes crime-related information with an interactive interface.", stack: ["React", "Maps", "Data Viz"], gh: "https://github.com/AGreatDev-coder/Crime-Vista", tag: "Civic tech", num: "04" },
];

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  return (
    <motion.article
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      className="group glass relative overflow-hidden rounded-3xl p-8 transition-shadow hover:shadow-[0_30px_80px_-20px_var(--coral)]"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-coral/30 via-magenta/20 to-transparent blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mint">{p.tag}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">(N°{p.num})</span>
      </div>
      <h3 className="mt-6 font-display text-4xl uppercase leading-none md:text-5xl">{p.n}</h3>
      <p className="mt-4 max-w-lg text-muted-foreground">{p.d}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => <span key={s} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s}</span>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={p.gh} target="_blank" rel="noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          <Github className="h-4 w-4" /> Source
        </a>
        <a href={p.gh} target="_blank" rel="noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium">
          Live demo <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      {/* index watermark */}
      <div aria-hidden className="pointer-events-none absolute -bottom-8 right-4 font-display text-[9rem] leading-none text-white/[0.03]">{p.num}</div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°05) Selected Work</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl">Featured<br /><span className="text-gradient">projects.</span></h2>
            </div>
            <a href="https://github.com/AGreatDev-coder" target="_blank" rel="noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm">All repos <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p, i) => <Reveal key={p.n} delay={i * 0.05}><ProjectCard p={p} i={i} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function GitHubSection() {
  const user = "AGreatDev-coder";
  const cards = [
    `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true&bg_color=00000000&title_color=f97316&icon_color=86efac&text_color=e2e8f0&ring_color=f97316`,
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true&bg_color=00000000&title_color=f97316&text_color=e2e8f0`,
    `https://streak-stats.demolab.com?user=${user}&hide_border=true&background=00000000&ring=F97316&fire=F97316&currStreakLabel=86EFAC&sideLabels=e2e8f0&stroke=F97316&dates=94a3b8&currStreakNum=e2e8f0&sideNums=e2e8f0`,
  ];
  return (
    <section id="github" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°06) Live from GitHub</span>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">Coding<br /><span className="text-gradient">footprint.</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="glass grid h-full min-h-[220px] place-items-center overflow-hidden rounded-3xl p-4">
                <img src={src} alt={`GitHub stats for ${user}`} loading="lazy" className="h-auto w-full" />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="glass mt-6 overflow-hidden rounded-3xl p-4">
            <img src={`https://ghchart.rshah.org/f97316/${user}`} alt="GitHub contribution graph" loading="lazy" className="w-full" />
          </div>
        </Reveal>
        <div className="mt-6 text-center">
          <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            <Github className="h-4 w-4" /> @{user}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const items = [
    { y: "2025 — 2029", t: "B.Tech · Computer Science", p: "KR Mangalam University", d: "Focused on frontend engineering, systems thinking, and shipping real products alongside coursework." },
    { y: "2023 — 2025", t: "Senior Secondary", p: "CBSE · Science", d: "Where the obsession with computers and building things started." },
  ];
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°07) Timeline</span>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">Education &<br /><span className="text-gradient">growth.</span></h2>
        </Reveal>
        <div className="relative mt-14 pl-8 md:pl-0">
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-coral via-magenta to-mint md:left-1/2" />
          {items.map((it, i) => (
            <Reveal key={it.y} delay={i * 0.08}>
              <div className={`relative mb-10 grid gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                <span className="absolute left-[6px] top-2 h-3 w-3 rounded-full bg-coral ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />
                <div className={`glass rounded-3xl p-6 ${i % 2 ? "md:col-start-2 md:ml-6" : "md:mr-6"}`}>
                  <div className="font-mono text-xs uppercase tracking-widest text-mint">{it.y}</div>
                  <div className="mt-2 font-display text-2xl uppercase">{it.t}</div>
                  <div className="text-sm text-coral">{it.p}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1500);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <div ref={ref} className="font-display text-6xl md:text-7xl text-gradient leading-none">{n}{suffix}</div>;
}

export function Achievements() {
  const stats = [
    { n: 10, s: "+", l: "Hackathons participated" },
    { n: 15, s: "+", l: "Personal projects shipped" },
    { n: 365, s: "", l: "Days learning · yearly" },
    { n: 100, s: "%", l: "Curiosity, always on" },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass grain rounded-[2.5rem] p-10 md:p-16">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°08) Numbers</span>
            <h2 className="mt-4 font-display text-4xl uppercase md:text-5xl">Milestones so far.</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.05}>
                <div>
                  <Counter to={s.n} suffix={s.s} />
                  <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState<string | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const msg = String(fd.get("msg") || "").trim();
    if (name.length < 2 || name.length > 80) return setErr("Please enter your name (2–80 chars).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return setErr("Enter a valid email.");
    if (msg.length < 10 || msg.length > 1000) return setErr("Message should be 10–1000 characters.");
    setErr(null); setState("sending");
    setTimeout(() => setState("sent"), 900);
  };
  return (
    <section id="contact" className="aurora-bg relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-widest text-mint">(N°09) Contact</span>
              <h2 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-7xl">Let's build<br /><span className="text-gradient">something.</span></h2>
              <p className="mt-6 max-w-md text-muted-foreground">Open to internships, freelance gigs, hackathon teams, or just a good conversation about frontend and coffee.</p>
            </Reveal>
            <div className="mt-10 grid gap-3">
              {[
                { i: Mail, l: "ronaksamal9@gmail.com", h: "mailto:ronaksamal9@gmail.com" },
                { i: Phone, l: "+91 93117 51991", h: "tel:+919311751991" },
                { i: MapPin, l: "New Delhi, India", h: "#" },
                { i: Github, l: "@AGreatDev-coder", h: "https://github.com/AGreatDev-coder" },
                { i: Linkedin, l: "in/ronak-samal", h: "https://www.linkedin.com/in/ronak-samal/" },
              ].map(({ i: Icon, l, h }) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="glass group flex items-center justify-between rounded-2xl p-4 transition hover:-translate-y-0.5">
                  <span className="flex items-center gap-3"><Icon className="h-4 w-4 text-coral" /><span>{l}</span></span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass grid gap-4 rounded-3xl p-8">
              {state === "sent" ? (
                <div className="grid place-items-center gap-4 py-16 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-mint text-background"><Sparkles className="h-8 w-8" /></div>
                  <h3 className="font-display text-3xl uppercase">Message sent</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">I'll get back to you soon. In the meantime, brew a coffee.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Name</label>
                    <input name="name" required maxLength={80} className="rounded-xl border border-border bg-background/40 px-4 py-3 outline-none focus:border-coral" placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
                    <input name="email" type="email" required maxLength={200} className="rounded-xl border border-border bg-background/40 px-4 py-3 outline-none focus:border-coral" placeholder="you@domain.com" />
                  </div>
                  <div className="grid gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea name="msg" rows={5} required maxLength={1000} className="resize-none rounded-xl border border-border bg-background/40 px-4 py-3 outline-none focus:border-coral" placeholder="Tell me about your project or idea..." />
                  </div>
                  {err && <div className="text-sm text-destructive">{err}</div>}
                  <button disabled={state === "sending"} className="magnetic-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-60">
                    {state === "sending" ? "Sending..." : "Send message"} <ArrowUpRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">© 2026 Ronak Samal · Made with ❤️ and lots of ☕</div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/AGreatDev-coder" target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid h-10 w-10 place-items-center rounded-full magnetic-btn"><Github className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/ronak-samal/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-10 w-10 place-items-center rounded-full magnetic-btn"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_40px_-10px_var(--coral)] transition ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}

// missing ref import fix
import { useRef } from "react";
