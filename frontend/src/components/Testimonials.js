import React from "react";

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "HR Manager",
      content:
        "Easeupload has streamlined our hiring process. Verifying candidate documents has never been easier!",
    },
    {
      name: "Jane Smith",
      role: "University Registrar",
      content:
        "We use Easeupload for all our student transcripts. It's secure, fast, and incredibly reliable.",
    },
    {
      name: "Mike Johnson",
      role: "Immigration Lawyer",
      content:
        "Easeupload is a game-changer for verifying international documents. It saves us time and reduces fraud risks.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center bg-gray-100 p-6 rounded-lg"
            >
              <p className="text-gray-500 italic">"{testimonial.content}"</p>
              <div>
                <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
