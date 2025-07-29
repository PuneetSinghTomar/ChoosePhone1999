"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export default function ProductDetailPage() {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Fetch selected phone from sessionStorage
  useEffect(() => {
    try {
      const storedPhone = JSON.parse(sessionStorage.getItem("selectedPhone")) || null;
      setSelectedPhone(storedPhone);
      if (storedPhone) {
        setMainImage(storedPhone.main_image);
      }
    } catch (error) {
      console.error("Error parsing selectedPhone from sessionStorage:", error);
      setSelectedPhone(null);
    }
  }, []);

  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!selectedPhone) {
    return <div className="container mx-auto p-4">No product selected.</div>;
  }

  // Store data for pricing section
  const storeData = [
    {
      store: "amazon",
      image: selectedPhone.amazon_image || "/amazon.png",
      price: selectedPhone.amazon_Price,
      link: selectedPhone.amazon_link,
    },
    
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Phone Details</h2>
        <div className="p-2">
          <Link href="/Category/Phone/PhonePage">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Product Image and Details */}
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Main Image */}
          <div className="w-full h-96 flex items-center justify-center">
            <Image
              src={mainImage}
              alt="Product Image"
              width={300}
              height={300}
              className="object-contain max-w-full max-h-full"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[
              selectedPhone.main_image,
              selectedPhone.image_one,
              selectedPhone.image_two,
              selectedPhone.image_three,
              selectedPhone.image_four,
              selectedPhone.image_five,
            ].map(
              (image, index) =>
                image && (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(image)}
                    className="cursor-pointer border p-1 hover:border-blue-500"
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                )
            )}
          </div>

          {/* Product Specifications */}
          <div className="mt-4">
            <p>
              <span className="font-semibold">Name:</span> {selectedPhone.name}
            </p>
            <p>
              <span className="font-semibold">Display:</span> {selectedPhone.display}
            </p>
            <p>
              <span className="font-semibold">Features:</span> {selectedPhone.features}
            </p>
            <p>
              <span className="font-semibold">RAM:</span> {selectedPhone.ram}
            </p>
            <p>
              <span className="font-semibold">Storage:</span> {selectedPhone.storage}
            </p>
            <p>
              <span className="font-semibold">Battery:</span> {selectedPhone.battery}
            </p>
            <p>
              <span className="font-semibold">Camera:</span> {selectedPhone.camera}
            </p>
            <p>
              <span className="font-semibold">Processor:</span> {selectedPhone.processor}
            </p>
          </div>
        </div>

        {/* Right Section - Pricing Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-3 flex justify-center">Merchant Prices</h2>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Merchant</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Buy</th>
                </tr>
              </thead>
              <tbody>
                {storeData.map((store, index) => (
                  <tr key={index} className="text-center border">
                    <td className="border p-2">
                      <Image
                        src={store.image}
                        alt={`${store.store} logo`}
                        width={80}
                        height={80}
                        className="border p-1"
                      />
                    </td>
                    <td className="border p-2 font-bold">
                      ₹{store.price}
                    </td>
                    <td className="border p-2">
                      
                        <Link href={store.link} target="_blank">
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Buy
                          </button>
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {storeData.map((store, index) => (
              <div
                key={index}
                className="border p-3 mb-3 rounded-lg shadow-sm flex items-center justify-between"
              >
                <Image
                  src={store.image}
                  alt={`${store.store} logo`}
                  width={50}
                  height={50}
                  className="border p-1"
                />
                <span className="font-semibold">{store.store}</span>
                <span className="font-bold">₹{store.price}</span>
                
                  <Link href={store.link} target="_blank">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Buy
                    </button>
                  </Link>
                
                  
                
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            * Product prices and availability are accurate as of the time indicated.
          </p>
        </div>
      </div>
    </div>
  );
}
