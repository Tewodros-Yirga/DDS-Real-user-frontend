import { testimonials } from "../../constants";
import Heading from "./Heading";
const Testimonials = () => {
  return (
    <>
      <div className="">
        <Heading className="heading m-8" title="Testimonials" />
        <div className="ml-14 mr-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              className="flex items-center rounded-lg bg-transparent border p-4 shadow-lg"
              key={index}
            >
              <img
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                className="mr-4 h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="mb-4 text-white">"{testimonial.quote}"</p>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-white">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
