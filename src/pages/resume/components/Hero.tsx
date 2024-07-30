import Section from "~/components/Section";
import Button from "~/components/Button";

export default function Hero() {
  return (
    <Section className="flex-col gap-14 pb-20 pt-72">
      <h1 className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text font-mono text-9xl text-transparent">
        Hello, World!
      </h1>
      <p className="text-left text-4xl">
        My name is Isaac Chavoya,
        <br />I am a Full Stack Software Engineer 😄
      </p>
      {/*<div>*/}
      {/*  <Button placement="left">Contact me</Button>*/}
      {/*  <Button placement="right">Download resume</Button>*/}
      {/*</div>*/}
    </Section>
  );
}
