import Hero from "./Hero";
import DeliveryZone from "./DeliveryZone";
import HowItWorks from "./HowitWorks";
import Services from "./Services";
import ContactUs from "../ContactUs";

export const LandingPage = () => {
  return (
    <div>
      <Hero />
      <DeliveryZone />
      <Services />
      <ContactUs />
    </div>
  );
};
