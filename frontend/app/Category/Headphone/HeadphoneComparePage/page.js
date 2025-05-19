"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function headphonesComparePage() {
  const [selectedheadphones, setSelectedheadphones] = useState([]);
  // Fetch selected headphones from sessionStorage
  useEffect(() => {
    const storedheadphones = JSON.parse(sessionStorage.getItem("selectedheadphones")) || [];
    setSelectedheadphones(storedheadphones);
  }, []);
  const handleBuyClick = (headphone) => {
    // Save the selected headphone to sessionStorage
    sessionStorage.setItem("selectedheadphone", JSON.stringify(headphone));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Headphone/HeadphoneDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Headphone</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Headphone/HeadphonePage">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className=" w-full p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 lg:px-4 py-2">Product</th>
                  <th className="border px-2 lg:px-4 py-2">Name</th>
                  <th className="border px-2 lg:px-4 py-2">Type</th>
                  <th className="border px-2 lg:px-4 py-2">Connectivity</th>
                  <th className="border px-2 lg:px-4 py-2">Noise Cancellation</th>
                  <th className="border px-2 lg:px-4 py-2">Microphone</th>
                  <th className="border px-2 lg:px-4 py-2">Battery Life</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedheadphones.map((headphone) => (
                  <tr key={headphone.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={headphone.main_image} alt={headphone.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {headphone.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Type:</span>
                      {headphone.type}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Connectivity:</span>
                      {headphone.connectivity}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Noise Cancellation:</span>
                      {headphone.noise_cancellation}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Microphone:</span>
                      {headphone.microphone}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Battery Life:</span>
                      {headphone.battery_life}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{headphone.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(headphone)} >Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}