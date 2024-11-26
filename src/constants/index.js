import { howItWorks1, howItWorks2, howItWorks3 } from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/",
  },
  {
    id: "1",
    title: "Delivery Zones",
    url: "/delivery zones",
  },
  {
    id: "2",
    title: "Services",
    url: "/services",
  },
  {
    id: "3",
    title: "How to",
    url: "/how to",
  },
  {
    id: "4",
    title: "Contact Us",
    url: "/contact",
  },
  {
    id: "5",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "6",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
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
