import Head from "next/head";

import TechnicalExpertise from '~/layout/TechnicalExpertise';
import Hero from '~/layout/Hero';
import AboutMe from '~/layout/AboutMe';
import Experience from '~/layout/Experience';
import Header from '~/layout/Header';
import Education from '~/layout/Education';
import Footer from '~/layout/Footer';
import Particles from '~/components/StarBackground';
import Closer from '~/layout/Closer';

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Isaac Chavoya</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-2xl text-black">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
      <Particles/>
      <Header/>
      <Hero/>
      <AboutMe/>
      <Experience/>
      <TechnicalExpertise />
      <Education/>
      <Closer/>
      <Footer/>
    </>
  );
}
