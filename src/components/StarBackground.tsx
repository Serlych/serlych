import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function StarBackground() {
  const [ init, setInit ] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
    await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  return (
    <>
      {init && <Particles
        id="tsparticles"
        options={
          {
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
              opacity: {
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                },
                value: {
                  min: 0,
                  max: 1
                },
              },
              size: {
                animation: {
                  enable: true,
                  speed: 1,
                },
                value: {
                  min: 2,
                  max: 4
                },
              },
            },
          }
        } />
      }
    </>
  );
};
