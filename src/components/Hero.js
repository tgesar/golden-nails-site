import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Welcome to Golden Nails
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-md">
          Premium nail care in Golden Valley — where beauty meets precision.
        </p>
      </div>
    </section>
  );
};

export default Hero;
