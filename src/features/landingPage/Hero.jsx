import Section from "../../design/Section";
import { ReactTyped } from "react-typed";
import Button from "../../design/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../../design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
const Hero = () => {
  const parallaxRef = useRef(null);
  return (
    <Section
      className="-mt-[5.25rem] pt-[12rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 mx-auto mb-[3.875rem] max-w-[62rem] text-center md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            <span className="bg-gradient-to-r from-color-5 to-color-1 bg-clip-text text-transparent">
              {" "}
              <ReactTyped
                strings={["fast", "reliable", "secure"]}
                typeSpeed={100}
                backSpeed={120}
                loop
              />
            </span>
            <br />
            Get your deliveries by our&nbsp;drones&nbsp;
            {/* This is trial - Tewodrosy*/}
            Get Best delivery experiance in your backyard.
            <span className="relative inline-block">
              DDS{" "}
              {/* <img
                src={curve}
                alt="Curve"
                className="absolute left-0 top-full w-full xl:-mt-2"
                width={624}
                height={28}
              /> */}
            </span>
          </h1>
          {/* <p className="body-1 mx-auto mb-6 max-w-3xl text-n-2 lg:mb-8">
            something that i am writing to make sure this part has something to
            read. just for practice
          </p> */}
          <Button href="/order-placement" white>
            Order Now
          </Button>
        </div>
        <div className="relative mx-auto max-w-[23rem] md:max-w-5xl xl:mb-24">
          <div className="relative z-1 rounded-2xl bg-conic-gradient p-0.5">
            <div className="relative rounded-[1rem] bg-n-8">
              <div className="h-[1.4rem] rounded-t-[0.9rem] bg-n-10" />
              <div className="aspect-[33/40] overflow-hidden rounded-b-[0.9rem] md:aspect-[688/490] lg:aspect-[1024/490]">
                {/* <img
                  src={robot}
                  className="w-full translate-y-[8%] scale-[1.7] md:-translate-y-[10%] md:scale-[1] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                /> */}

                {/* <Generating className="absolute bottom-5 left-4 right-4 md:bottom-8 md:left-1/2 md:right-auto md:w-[31rem] md:-translate-x-1/2" /> */}
                <ScrollParallax isAbsolutelyPositioned>
                  {/* <ul className="bg-n-9/40 border-n-1/10 absolute -left-[5.5rem] bottom-[7.5rem] hidden rounded-2xl border px-1 py-1 backdrop-blur xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul> */}
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  {/* <Notification
                    className="absolute -right-[5.5rem] bottom-[11rem] hidden w-[18rem] xl:flex"
                    title="Code generation"
                  /> */}
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            {/* <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            /> */}
          </div>
          <BackgroundCircles />
        </div>
        {/* <CompanyLogos className="relative z-10 mt-20 hidden lg:block" /> */}
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
