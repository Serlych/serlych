import Panel from "~/components/Panel";
import Section from "~/components/Section";
import { resumeData } from "~/data/resume";

export default function Superpowers() {
  return (
    <Section className="flex-col gap-8 py-16">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-sm uppercase tracking-[0.45em] text-sky-300">
          Strengths
        </span>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs uppercase tracking-[0.35em] text-white/50">
          <span>Operating Mode</span>
          <span>Built For Impact</span>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-6xl font-black uppercase tracking-[0.12em] text-transparent lg:text-8xl">
            {resumeData.superpowers.title}
          </h2>
          <span className="max-w-md text-right font-mono text-sm uppercase tracking-[0.25em] text-white/60">
            Root cause. Systems. Clarity. Leverage.
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {resumeData.superpowers.items.map((item, index) => (
          <Panel key={item} className="group relative overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-sky-400/10 opacity-70 transition duration-300 group-hover:opacity-100" />
            <div className="absolute -right-6 -top-10 text-[6rem] font-black leading-none text-white/5 transition duration-300 group-hover:text-white/10">
              0{index + 1}
            </div>
            <div className="relative flex min-h-[12rem] flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <div className="h-1 w-12 bg-gradient-to-r from-sky-300 to-indigo-300" />
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/45">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/45">
                  Superpower
                </span>
                <h3 className="text-3xl font-black uppercase leading-tight tracking-[0.08em] text-white">
                  {item}
                </h3>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
