import Navbar    from "@/components/Navbar";
import Hero      from "@/components/Hero";
import About     from "@/components/About";
import Stats     from "@/components/Stats";
import Experience from "@/components/Experience";
import Skills    from "@/components/Skills";
import Education from "@/components/Education";
import Company   from "@/components/Company";
import Contact   from "@/components/Contact";
import Footer    from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
