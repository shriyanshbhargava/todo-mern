import React from "react";
import { Shield, Upload, Search, Lock, Clock, Globe } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description:
        "Quickly upload your documents with our user-friendly interface.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description:
        "Your documents are encrypted and stored with the highest security standards.",
    },
    {
      icon: Search,
      title: "Quick Verification",
      description: "Verify the authenticity of your documents in seconds.",
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description:
        "Your information is protected with state-of-the-art encryption.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access your documents anytime, anywhere, from any device.",
    },
    {
      icon: Globe,
      title: "Global Acceptance",
      description: "Our verification is recognized by institutions worldwide.",
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <feature.icon className="h-10 w-10 text-gray-900" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
/******  0dca0ce0-96f6-4882-91b6-0bcbd6749a45  *******/
