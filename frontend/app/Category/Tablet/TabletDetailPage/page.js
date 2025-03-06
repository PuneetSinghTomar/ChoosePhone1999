"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function ProductDetailPage() {
  const [selectedtablet, setSelectedtablet] = useState(null);
  const [mainImage, setMainImage] = useState("");
  // Fetch selected tablet from sessionStorage
  useEffect(() => {
    try {
      const storedtablet = JSON.parse(sessionStorage.getItem("selectedtablet")) || null;
      setSelectedtablet(storedtablet);
      if (storedtablet) {
        setMainImage(storedtablet.main_image);
      }
    } catch (error) {
      console.error("Error parsing selectedtablet from sessionStorage:", error);
      setSelectedtablet(null);
    }
  }, []);
  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  if (!selectedtablet) {
    return <div className="container mx-auto p-4">No product selected.</div>;
  }
  // Store data for pricing section
  const storeData = [
    {
      store: "amazon",
      image: selectedtablet.amazon_image || "/amazon.png",
      price: selectedtablet.amazon_price,
      link: selectedtablet.amazon_link,
    },
    {
      store: "flipkart",
      image: selectedtablet.flipkart_image || "/flipkart.png",
      price: selectedtablet.flipkart_price,
      link: selectedtablet.flipkart_link,
    },
    {
      store: "croma",
      image: selectedtablet.croma_image || "/croma.png",
      price: selectedtablet.croma_price,
      link: selectedtablet.croma_link,
    },
    {
      store: "vijaysales",
      image: selectedtablet.vijaysales_image || "/vijaysales.png",
      price: selectedtablet.vijaysales_price,
      link: selectedtablet.vijaysales_link,
    },
    {
      store: "tatacliq",
      image: "/tataCliq.png",
      price: selectedtablet.tatacliq_price,
      link: selectedtablet.tatacliq_link,
    },
    {
      store: "reliancedigital",
      image: selectedtablet.reliancedigital_image || "/reliancedigital.png",
      price: selectedtablet.reliancedigital_price,
      link: selectedtablet.reliancedigital_link,
    },
    {
      store: "poorvika",
      image: selectedtablet.poorvika_image || "/poorvika.png",
      price: selectedtablet.poorvika_price,
      link: selectedtablet.poorvika_link,
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Tablet Details</h2>
        <div className="p-2">
          <Link href="/Category/Tablet/TabletPage">
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
              selectedtablet.main_image,
              selectedtablet.image_one,
              selectedtablet.image_two,
              selectedtablet.image_three,
              selectedtablet.image_four,
              selectedtablet.image_five,
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
            <p><span className="font-semibold">Name:</span> {selectedtablet.name}</p>
            <p><span className="font-semibold">Display:</span> {selectedtablet.display}</p>
            <p><span className="font-semibold">Features:</span> {selectedtablet.features}</p>
            <p><span className="font-semibold">Battery:</span> {selectedtablet.battery}</p>
            <p><span className="font-semibold">Camera:</span> {selectedtablet.camera}</p>
            <p><span className="font-semibold">Processor:</span> {selectedtablet.processor}</p>
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
