import { whyChooseUs } from "../../constants";
import Heading from "./Heading";
import { GradientLight } from "../../design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

const Benefits2 = () => {
  return (
    <>
      <div className="container relative z-2">
        <Heading className="md:max-w-md lg:max-w-2xl" title="Why Choose Us" />
        <div className="mb-10 flex flex-wrap gap-9">
          {whyChooseUs.map((item) => (
            <div
              className="relative block bg-[length:100%_100%] bg-no-repeat p-0.5 duration-300 hover:scale-105 md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="pointer-events-none relative z-2 flex min-h-[22rem] flex-col p-[2.4rem]">
                <h5 className="h5 mb-5 text-center">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Benefits2;
