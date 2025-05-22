"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function ProductDetailPage() {
  const [selectedsmartwatch, setSelectedsmartwatch] = useState(null);
  const [mainImage, setMainImage] = useState("");
  // Fetch selected smartwatch from sessionStorage
  useEffect(() => {
    try {
      const storedsmartwatch = JSON.parse(sessionStorage.getItem("selectedsmartwatch")) || null;
      setSelectedsmartwatch(storedsmartwatch);
      if (storedsmartwatch) {
        setMainImage(storedsmartwatch.main_image);
      }
    } catch (error) {
      console.error("Error parsing selectedsmartwatch from sessionStorage:", error);
      setSelectedsmartwatch(null);
    }
  }, []);
  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  if (!selectedsmartwatch) {
    return <div className="container mx-auto p-4">No product selected.</div>;
  }
  // Store data for pricing section
  const storeData = [
    {
      store: "amazon",
      image: selectedsmartwatch.amazon_image || "/amazon.png",
      price: selectedsmartwatch.amazon_Price,
      link: selectedsmartwatch.amazon_link,
    },
    {
      store: "flipkart",
      image: selectedsmartwatch.flipkart_image || "/flipkart.png",
      price: selectedsmartwatch.flipkart_Price,
      link: selectedsmartwatch.flipkart_link,
    },
    {
      store: "croma",
      image: selectedsmartwatch.croma_image || "/croma.png",
      price: selectedsmartwatch.croma_Price,
      link: selectedsmartwatch.croma_link,
    },
    {
      store: "vijaysales",
      image: selectedsmartwatch.vijaysales_image || "/vijaysales.png",
      price: selectedsmartwatch.vijaysales_Price,
      link: selectedsmartwatch.vijaysales_link,
    },
    {
      store: "tatacliq",
      image: selectedsmartwatch.tatacliq_image || "/tataCliq.png",
      price: selectedsmartwatch.tatacliq_Price,
      link: selectedsmartwatch.tatacliq_link,
    },
    {
      store: "reliancedigital",
      image: selectedsmartwatch.reliancedigital_image || "/reliancedigital.png",
      price: selectedsmartwatch.reliancedigital_Price,
      link: selectedsmartwatch.reliancedigital_link,
    },
    {
      store: "poorvika",
      image: selectedsmartwatch.poorvika_image || "/poorvika.png",
      price: selectedsmartwatch.poorvika_Price,
      link: selectedsmartwatch.poorvika_link,
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Smartwatch Details</h2>
        <div className="p-2">
          <Link href="/Category/Smartwatch/SmartwatchPage">
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
              selectedsmartwatch.main_image,
              selectedsmartwatch.image_one,
              selectedsmartwatch.image_two,
              selectedsmartwatch.image_three,
              selectedsmartwatch.image_four,
              selectedsmartwatch.image_five,
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
            <p><span className="font-semibold">Name:</span> {selectedsmartwatch.name}</p>
            <p><span className="font-semibold">Display:</span> {selectedsmartwatch.display}</p>
            <p><span className="font-semibold">Connectivity:</span> {selectedsmartwatch.connectivity}</p>
            <p><span className="font-semibold">Battery Life:</span> {selectedsmartwatch.battery_life}</p>
            <p><span className="font-semibold">Water Resistance:</span> {selectedsmartwatch.water_resistance}</p>
            <p><span className="font-semibold">Sensor:</span> {selectedsmartwatch.sensors}</p>
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
