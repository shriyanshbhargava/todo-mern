import React from 'react';

function HowItWorks() {
  const steps = [
    { title: 'Upload Your Document', description: 'Simply upload your document through our secure platform.' },
    { title: 'Verification Process', description: 'Our system verifies the authenticity of your document using advanced algorithms.' },
    { title: 'Receive Verification', description: 'Get instant results on the verification status of your document.' },
    { title: 'Share Securely', description: 'Easily share your verified documents with trusted parties.' },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-500 ">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;