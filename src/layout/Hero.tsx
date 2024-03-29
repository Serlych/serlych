import Section from '~/components/Section';

export default function Hero() {
  return (
    <Section className="flex-col pt-72 pb-20 gap-14">
      <h1 className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-9xl font-mono">Hello, World!</h1>
      <p className="text-left text-4xl">My name is Isaac Chavoya,<br />welcome to my website 😄</p>
      <div>
        <button className="text-indigo-400 text-2xl backdrop-blur-sm bg-white bg-opacity-15 border border-violet-100 border-opacity-30 rounded-l-lg rounded-r-none">Contact me</button>
        <button className="text-violet-400 text-2xl backdrop-blur-sm bg-white bg-opacity-15 border border-violet-100 border-opacity-30 rounded-r-lg rounded-l-none">Download CV</button>
      </div>
    </Section>
  )
}
