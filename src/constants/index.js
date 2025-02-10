import {
  howItWorks1,
  howItWorks2,
  howItWorks3,
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  instagram,
  telegram,
  twitter,
  discordBlack,
  facebook,
} from "../assets";


export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "hero", // Match the section ID in Hero.jsx
  },
  {
    id: "1",
    title: "Delivery Zones",
    url: "DeliveryMap", // Match the section ID in DeliveryZone.jsx
  },
  {
    id: "2",
    title: "Services",
    url: "services", // Ensure Services section has ID "services"
  },
  {
    id: "3",
    title: "Contact Us",
    url: "contact", // Ensure Contact Us section has ID "contact"
  },
  {
    id: "4",
    title: "New Account",
    url: "new-account",
    onlyMobile:true,
  },
  {
    id: "5",
    title: "Sign In",
    url: "signin",
    onlyMobile:true, 
  },
];

export const DeliveryZones = [
  {
    id: "0",
    place: "Addis Ababa",
    coordinates: [8.997934906056125, 38.78674699415615],
  },
  {
    id: "1",
    place: "Bahrdar",
    coordinates: [11.594851217884306, 37.38801857544749],
  },
  {
    id: "2",
    place: "Debretabor",
    coordinates: [11.856182521425978, 38.00843599845578],
  },
  {
    id: "3",
    place: "Gondar",
    coordinates: [12.611953256451066, 37.469898650532684],
  },
];

export const HowItWork = [
  {
    id: "1",
    title: "Order",
    text: "Place your order through our app or website. Choose from a variety of services and products.",

    backgroundUrl: "./src/assets/how it works/card-1.svg",
    iconUrl: howItWorks1,
    imageUrl: howItWorks1,
  },
  {
    id: "2",
    title: "Prepare",
    text: "Our team prepares your order and ensures everything is ready for delivery.",

    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: howItWorks2,
    imageUrl: howItWorks2,
    light: true,
  },
  {
    id: "3",
    title: "Deliver",
    text: "Our drones deliver your order quickly and safely to your doorstep.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: howItWorks3,
    imageUrl: howItWorks3,
  },
];

const serviceCards = [
  {
    id: "0",
    title: "Food Delivery",
    text: "Get your favorite meals delivered by drone in minutes. Enjoy hot and fresh food at your doorstep.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Package Delivery",
    text: "Fast and secure delivery of your packages. Safe and reliable service for all your shipping needs.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Medical Supplies Delivery",
    text: "Quick delivery of essential medical supplies. Ensure timely access to critical healthcare items.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Custom Deliveries",
    text: "Tailored delivery solutions for your unique needs. Contact us for specialized delivery requests.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Grocery Delivery",
    text: "Get your daily essentials delivered right to your door. Fresh produce and groceries in no time.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Document Delivery",
    text: "Secure and swift delivery of important documents. Perfect for business and personal needs.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export default serviceCards;


export const whyChooseUs = [
  {
    id: "0",
    title: "Safety and Security",
    text: "Our drones are equipped with the latest safety features and secure handling mechanisms to ensure your items are delivered safely.",

    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Affordable Prices",
    text: "We offer competitive pricing for all our delivery services, ensuring you get the best value for your money.",

    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Top-Rated Service",
    text: "Our customers love us! We pride ourselves on delivering top-notch service that keeps our clients coming back.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
];

export const testimonials = [
  {
    quote:
      "The drone delivery service is incredibly fast and reliable. I'm very impressed!",
    name: "John Doe",
    title: "Satisfied Customer",
    image: "src/assets/profile pic/user1.jpg",
  },
  {
    quote: "I received my package in perfect condition. Great service!",
    name: "Jane Smith",
    title: "Happy Client",
    image: "src/assets/profile pic/user2.jpg",
  },
  {
    quote:
      "The drone delivery service is incredibly fast and reliable. I'm very impressed!",
    name: "John Doe",
    title: "Satisfied Customer",
    image: "src/assets/profile pic/user3.jpg",
  },
  {
    quote: "I received my package in perfect condition. Great service!",
    name: "Robert Jaden",
    title: "Happy Client",
    image: "src/assets/profile pic/user4.jpg",
  },
];


export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
