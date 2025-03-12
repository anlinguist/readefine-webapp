import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
    type Container
  } from "@tsparticles/engine";

const BackgroundParticles = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            await loadFull(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
      };
    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "transparent", // so it doesn't block your page background
                        },
                    },
                    fullScreen: {
                        enable: false, // If true, the particles fill the entire screen. 
                        // Set to 'false' to confine particles within the parent container.
                    },
                    interactivity: {
                      detect_on: "canvas",
                      events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: {
                          enable: true,
                          mode: "repulse",
                          parallax: { enable: false, force: 40, smooth: 10 }
                        },
                      },
                      modes: {
                        bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
                        grab: { distance: 400, links: { opacity: 1 } },
                        push: { quantity: 4 },
                        remove: { quantity: 2 },
                        repulse: { distance: 200, duration: 0.4 }
                      }
                    },
                    particles: {
                        number: {
                            value: 75, // number of text 'particles'
                            density: {
                                enable: true,
                            },
                        },
                        shape: {
                            type: "char",
                            options: {
                                char: {
                                    value: ["arrogate", "imperious", "umbrage", "cogent", "impudent", "inure", "rescind", "eschew", "pathos", "torpid", "effrontery", "myriad", "proclivity", "prosaic", "promulgate", "alacrity", "querulous", "conflagration", "dissemble", "vicarious", "pugnacious", "iniquity", "limpid", "ephemeral", "contrite", "ebullient", "probity", "expiate", "wizened", "mendacious", "obtuse", "mawkish", "invective", "venerate", "inchoate", "diffident", "brusque", "obdurate", "truculent", "proscribe", "maudlin", "precocious", "latent", "reprove", "ostensible", "pariah", "propensity", "transient"],
                                    font: "Roboto",      // pick your font
                                    style: "",            // italic, oblique, etc. if you like
                                    weight: "400",        // boldness
                                },
                            },
                        },
                        color: {
                            value: "#aaa", // light gray
                        },
                        opacity: {
                            value: .5,
                        },
                        line_linked: {
                            enable: false,
                        },
                        move: {
                            attract: { enable: false, rotate: { x: 600, y: 1200 } },
                            direction: "none",
                            enable: true,
                            outModes: "out",
                            random: false,
                            speed: 1,
                            straight: false
                          },
                          rotate: {
                            direction: "random",
                            animation: {
                              enable: true,
                              speed: 2,
                              sync: false,
                            }
                          },
                          size: {
                            value: 10,
                            animation: { enable: true, speed: 20, sync: false },
                          }
                    },
                    retina_detect: true,
                }}
            />
        );
    }
};

export default BackgroundParticles;