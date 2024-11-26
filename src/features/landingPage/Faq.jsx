import Heading from "./Heading";
const Faq = () => {
  const faqs = [
    {
      question: "How fast is the delivery?",
      answer: "Our drones deliver within 30 minutes of placing an order.",
    },
    {
      question: "Is drone delivery safe?",
      answer:
        "Yes, our drones are equipped with advanced safety features to ensure secure delivery.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve the metropolitan area and are expanding to more regions soon.",
    },
    {
      question: "How fast is the delivery?",
      answer: "Our drones deliver within 30 minutes of placing an order.",
    },
    {
      question: "Is drone delivery safe?",
      answer:
        "Yes, our drones are equipped with advanced safety features to ensure secure delivery.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve the metropolitan area and are expanding to more regions soon.",
    },
  ];

  return (
    <>
      <div className="border ml-14 mr-14 mt-4 pb-4">
        <Heading className="heading m-8" title="Frequently Asked Questions" />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="ml-14 mr-14 rounded-lg border bg-transparent p-4 shadow-lg"
            >
              <h4 className="font-semibold text-gray-300">{faq.question}</h4>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
