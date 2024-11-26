import { ReactTyped } from "react-typed";

const WrappedHeading = ({ className, title }) => {
  const typed = (
    <>
      <ReactTyped
        className={`text-color-1 `}
        strings={["Fast", "Reliable", "Secure", "Eco-Friendly", "Innovative"]}
        typeSpeed={100}
        backSpeed={120}
        loop
      />
    </>
  );
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {title && (
        <h2 className="h2">
          {title} {typed}
        </h2>
      )}
    </div>
  );
};

export default WrappedHeading;
