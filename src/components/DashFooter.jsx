import Section from "../design/section";
import { socials } from "../constants";
const DashFooter = () => {
return <>
    <Section crosses className="!px-0 !py-10">
    <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
      <p className="caption text-n-1 lg:block">
        © {new Date().getFullYear()}. All rights reserved.
      </p>

      <ul className="flex gap-5 flex-wrap">
        {socials.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            className="flex items-center justify-center  w-10 h-10 bg-n-1 rounded-full transition-colors hover:bg-color-1 "
          >
            <img src={item.iconUrl} width={16} height={16} alt={item.title} />
          </a>
        ))}
      </ul>
    </div>
  </Section>
</>
};
export default DashFooter;
