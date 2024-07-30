import Head from "next/head";

import Header from "~/components/Header";
import Hero from "~/pages/resume/components/Hero";
import AboutMe from "~/pages/resume/components/AboutMe";
import Experience from "~/pages/resume/components/Experience";
import TechnicalExpertise from "~/pages/resume/components/TechnicalExpertise";
import Education from "~/pages/resume/components/Education";
import Closer from "~/pages/resume/components/Closer";
import Footer from "~/pages/resume/components/Footer";
import StarBackground from "~/components/StarBackground";

export default function Resume() {
  return (
    <>
      <Head>
        <title>Isaac Chavoya - Resume</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarBackground />
      <Header />
      <Hero />
      <AboutMe />
      <Experience />
      <TechnicalExpertise />
      <Education />
      <Closer />
      <Footer />
    </>
  );
}
