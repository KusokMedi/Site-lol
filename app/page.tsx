import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export default function Home() {
  return (
    <>
      <Navigation />
      <main role="main">
        <Hero />
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Services /></AnimatedSection>
        <AnimatedSection><Projects /></AnimatedSection>
        <AnimatedSection><Contact /></AnimatedSection>
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
}