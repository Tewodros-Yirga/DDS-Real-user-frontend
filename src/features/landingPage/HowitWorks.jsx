import { HowItWork } from "../../constants";
import Heading from "../../design/Heading";
import Section from "../../design/Section";

const HowItWorks = () => {
  return (
    <Section
      className="z-1 h-full py-[1.5rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="md:px-[3rem] sm:px-[1rem] px-[0.5rem]"
      id="DeliveryMap"
    >
      <div className="education">
        <Heading className="heading" title="How It Works" />
        <div className="timeline-items">
          {HowItWork.map((item) => (
            <div className="timeline-item" key={item.id}>
              {" "}
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h5 className="h3">{item.title}</h5>
                <p className="p">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
