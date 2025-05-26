"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function ProductDetailPage() {
  const [selectedheadphone, setSelectedheadphone] = useState(null);
  const [mainImage, setMainImage] = useState("");
  // Fetch selected headphone from sessionStorage
  useEffect(() => {
    try {
      const storedheadphone = JSON.parse(sessionStorage.getItem("selectedheadphone")) || null;
      setSelectedheadphone(storedheadphone);
      if (storedheadphone) {
        setMainImage(storedheadphone.main_image);
      }
    } catch (error) {
      console.error("Error parsing selectedheadphone from sessionStorage:", error);
      setSelectedheadphone(null);
    }
  }, []);
  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  if (!selectedheadphone) {
    return <div className="container mx-auto p-4">No product selected.</div>;
  }
  // Store data for pricing section
  const storeData = [
    {
      store: "amazon",
      image: selectedheadphone.amazon_image || "/amazon.png",
      price: selectedheadphone.amazon_Price,
      link: selectedheadphone.amazon_link,
    },
    // {
    //   store: "flipkart",
    //   image: selectedheadphone.flipkart_image || "/flipkart.png",
    //   price: selectedheadphone.flipkart_Price,
    //   link: selectedheadphone.flipkart_link,
    // },
    // {
    //   store: "croma",
    //   image: selectedheadphone.croma_image || "/croma.png",
    //   price: selectedheadphone.croma_Price,
    //   link: selectedheadphone.croma_link,
    // },
    // {
    //   store: "vijaysales",
    //   image: selectedheadphone.vijaysales_image || "/vijaysales.png",
    //   price: selectedheadphone.vijaysales_Price,
    //   link: selectedheadphone.vijaysales_link,
    // },
    // {
    //   store: "tatacliq",
    //   image: selectedheadphone.tatacliq_image ||"/tataCliq.png",
    //   price: selectedheadphone.tatacliq_Price,
    //   link: selectedheadphone.tatacliq_link,
    // },
    // {
    //   store: "reliancedigital",
    //   image: selectedheadphone.reliancedigital_image || "/reliancedigital.png",
    //   price: selectedheadphone.reliancedigital_Price,
    //   link: selectedheadphone.reliancedigital_link,
    // },
    // {
    //   store: "poorvika",
    //   image: selectedheadphone.poorvika_image || "/poorvika.png",
    //   price: selectedheadphone.poorvika_Price,
    //   link: selectedheadphone.poorvika_link,
    // },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Headphone Details</h2>
        <div className="p-2">
          <Link href="/Category/Headphone/HeadphonePage">
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
              className="object-contain max-w-full max-h-full" />
          </div>
          {/* Thumbnails */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[
              selectedheadphone.main_image,
              selectedheadphone.image_one,
              selectedheadphone.image_two,
              selectedheadphone.image_three,
              selectedheadphone.image_four,
              selectedheadphone.image_five,
            ].map((image, index) => (
              image && (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(image)}
                  className="cursor-pointer border p-1 hover:border-blue-500">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
              )
            ))}
          </div>
          {/* Product Specifications */}
          <div className="mt-4">
            <p><span className="font-semibold">Name:</span> {selectedheadphone.name}</p>
            <p><span className="font-semibold">Type:</span> {selectedheadphone.type}</p>
            <p><span className="font-semibold">Connectivity:</span> {selectedheadphone.connectivity}</p>
            <p><span className="font-semibold">Battery Life:</span> {selectedheadphone.battery_life}</p>
            <p><span className="font-semibold">Noise Cancellation:</span> {selectedheadphone.noise_cancellation}</p>
            <p><span className="font-semibold">Mirophone:</span> {selectedheadphone.microphone}</p>
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
                      <Image src={store.image} alt={`${store.store} logo`} width={80} height={80} className="border p-1" />
                    </td>
                    <td className="border p-2 font-bold">₹{store.price}</td>
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
              <div key={index} className="border p-3 mb-3 rounded-lg shadow-sm flex items-center justify-between">
                <Image src={store.image} alt={`${store.store} logo`} width={50} height={50} className="border p-1" />
                <span className="font-semibold">{store.store}</span>
                <span className="font-bold">₹{store.price}</span>
                <Link href={store.link} target="_blank">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Buy</button>
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
