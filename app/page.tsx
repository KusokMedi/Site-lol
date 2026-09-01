import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// These components each contain their own AnimatedSection internally.
const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Projects = dynamic(() => import("@/components/Projects"));
const GitHubRepos = dynamic(() => import("@/components/GitHubRepos"));
const Contact = dynamic(() => import("@/components/Contact"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export default function Home() {
  return (
    <>
      <Navigation />
      <main role="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <GitHubRepos />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
}
