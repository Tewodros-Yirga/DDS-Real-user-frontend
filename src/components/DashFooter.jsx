import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import Section from "../design/Section";

const DashFooter = () => {
  // Array of social media platforms with their respective icons and labels
  const socialMedia = [
    { icon: <FaFacebook />, label: "Facebook", color: "blue-500" },
    { icon: <FaTwitter />, label: "Twitter", color: "sky-500" },
    { icon: <FaInstagram />, label: "Instagram", color: "pink-500" },
    { icon: <FaLinkedin />, label: "LinkedIn", color: "blue-600" },
    { icon: <FaYoutube />, label: "YouTube", color: "red-600" },
    { icon: <FaGithub />, label: "GitHub", color: "gray-700" },
  ];

  return (
    <>
      <Section crosses className="!px-0 !py-10">
        <div className="container flex items-center justify-center gap-10 max-sm:flex-col sm:justify-between">
          <p className="caption text-n-1 lg:block">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-12">
            {socialMedia.map((platform, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gray-700"
              >
                <a
                  href="#"
                  className="group relative flex h-[55px] w-[55px] items-center justify-center"
                >
                  <div className="absolute inset-0 transition-transform group-hover:rotate-[-35deg] group-hover:skew-y-[20deg]">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className={`absolute left-0 top-0 h-full w-full rounded-sm border border-white opacity-100 transition-all duration-300 ${i === 0 ? "group-hover:opacity-20" : i === 1 ? "translate-x-[5px] translate-y-[-5px] group-hover:opacity-40" : i === 2 ? "translate-x-[10px] translate-y-[-10px] group-hover:opacity-60" : "translate-x-[15px] translate-y-[-15px] group-hover:opacity-80"}`}
                      ></span>
                    ))}
                  </div>
                  <div
                    className={`text-center text-[30px] leading-[55px] text-white group-hover:text-${platform.color}`}
                  >
                    {platform.icon}
                  </div>
                  <div className="absolute top-[70px] text-white">
                    {platform.label}
                  </div>
                </a>
              </div>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
};

export default DashFooter;
