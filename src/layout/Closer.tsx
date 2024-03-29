import Image from 'next/image';
import Section from '~/components/Section';

import gatell from '~/assets/gatell.jpeg';

export default function Closer() {
  return (
    <Section>
      <div className="flex flex-col gap-5 justify-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">Let's build something great together!</h2>
        <h3 className="text-3xl">Thank you for reading through,<br/>here's a picture of my cat on a pair programming session 😸</h3>
      </div>
      <Image src={gatell} alt="My cat picture" width={426} height={320} className="drop-shadow-xl rounded-lg border border-violet-100"/>
    </Section>
  )
}
