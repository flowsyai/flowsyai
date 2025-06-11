import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 px-6 text-center bg-background/80 backdrop-blur-sm relative"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-foreground">
          About FlowsyAI
        </h2>
        <div className="space-y-6 text-left">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            FlowsyAI is a cutting-edge platform designed to democratize AI workflow automation. We
            believe that powerful AI tools should be accessible to everyone, regardless of technical
            expertise or company size.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Our mission is to empower businesses and individuals to build, deploy, and scale
            intelligent workflows without the complexity traditionally associated with AI
            implementation. We focus on user-friendly interfaces and robust functionality.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Built by a distributed team of AI researchers and engineers, FlowsyAI represents the
            next generation of workflow automation tools, combining advanced AI capabilities with
            intuitive design and enterprise-grade security.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
