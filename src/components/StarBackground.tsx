import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export default function StarBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            particles: {
              number: {
                value: 200,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: 0.3,
                straight: false,
              },
              color: {
                value: {
                  r: theme === "dark" ? 255 : 0,
                  g: theme === "dark" ? 255 : 0,
                  b: theme === "dark" ? 255 : 0,
                },
              },
              opacity: {
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                },
                value: {
                  min: 0,
                  max: 1,
                },
              },
              size: {
                animation: {
                  enable: true,
                  speed: 1,
                },
                value: {
                  min: 2,
                  max: 4,
                },
              },
            },
          }}
        />
      )}
    </>
  );
}
