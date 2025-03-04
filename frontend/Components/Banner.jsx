"use client";

import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline // Add playsInline for mobile support
        aria-label="Background video showcasing products"
      >
        <source
          src="/2825517-hd_1920_1080_24fps.mp4" // Move the video to the public folder
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl lg:text-6xl font-extrabold uppercase mb-4 drop-shadow-lg">
          Go for Products
        </h1>
        <p className="text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed drop-shadow-md">
          Phone · Laptop · Tablet · Headphones · Smartwatches<br/> · Television · Air
          Conditioner · Refrigerator · Camera <br/> · Washing Machine
        </p>
      </div>
    </div>
  );
};

export default Banner;