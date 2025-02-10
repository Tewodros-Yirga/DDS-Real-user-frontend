import React, { useState } from "react";
import Section from "../design/Section";
import Heading from "../design/Heading";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Section id="contact">
      <Heading className="heading" title="Contact us" />
      <div className="container mx-auto w-[50%] rounded-xl bg-black p-4 text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 px-1 py-2 text-white shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 px-1 py-2 text-white shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 px-1 text-white shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </Section>
  );
};

export default ContactUs;

{
  /*<Section
      className="py-[10.5rem] h-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="md:px-[3rem] sm:px-[1rem] px-[0.5rem]"
      id="ContactUs"
    >
      <div className="flex flex-col">
        <div className="flex justify-evenly">
          <input type="text" className="border border-n-4" />
          <input type="text" className="border border-n-4" />
        </div>
        <div className="bg-conic-gradient px-[0.2rem] py-[0.2rem] h-96 rounded-lg mt-10 w-[45%] mx-auto">
          <input type="text" className="w-full h-full bg-n-6 rounded-lg" />
        </div>
      </div>
    </Section>*/
}
