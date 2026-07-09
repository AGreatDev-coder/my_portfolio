import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/cursor";
import { Nav, Hero, About, Skills, Experience, Projects, GitHubSection, Education, Achievements, Contact, Footer } from "@/components/portfolio/sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="relative">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubSection />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
