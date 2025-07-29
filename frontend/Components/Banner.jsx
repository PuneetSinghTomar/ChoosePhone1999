"use client";

import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/banner_photo.png" // Place your image in the `public` folder and update the filename
        alt="Background showcasing products"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold uppercase mb-4 drop-shadow-lg">
          Compare Products with ChoosePhone
        </h1>
        <p className="text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed drop-shadow-md">
          Phone · Laptop · Tablet · Smartwatches<br />· Television  · Camera 
        </p>
      </div>
    </div>
  );
};

export default Banner;
