import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LocaleHandler from "@/components/LocaleHandler";

// Each of these contains its own AnimatedSection internally.
const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

/** Single-page site body, shared by "/" and every "/{lang}/" route. */
export default function Home() {
  return (
    <>
      <LocaleHandler />
      <Navigation />
      <main role="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
}
