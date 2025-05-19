"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function smartwatchesComparePage() {
  const [selectedsmartwatches, setSelectedsmartwatches] = useState([]);
  // Fetch selected smartwatches from sessionStorage
  useEffect(() => {
    const storedsmartwatches = JSON.parse(sessionStorage.getItem("selectedsmartwatches")) || [];
    setSelectedsmartwatches(storedsmartwatches);
  }, []);
  const handleBuyClick = (smartwatches) => {
    // Save the selected smartwatches to sessionStorage
    sessionStorage.setItem("selectedsmartwatches", JSON.stringify(smartwatches));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Smartwatch/SmartwatchDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare smartwatches</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Smartwatch/SmartwatchPage">
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
                  <th className="border px-2 lg:px-4 py-2">Connectivity</th>
                  <th className="border px-2 lg:px-4 py-2">Water Resistance</th>
                  <th className="border px-2 lg:px-4 py-2">Sensors</th>
                  <th className="border px-2 lg:px-4 py-2">Display</th>
                  <th className="border px-2 lg:px-4 py-2">Battery Life</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedsmartwatches.map((smartwatches) => (
                  <tr key={smartwatches.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={smartwatches.main_image} alt={smartwatches.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {smartwatches.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Connectivity:</span>
                      {smartwatches.connectivity}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Water Resistance:</span>
                      {smartwatches.water_resistance}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Sensors:</span>
                      {smartwatches.sensors}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Display:</span>
                      {smartwatches.display}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Battery Life:</span>
                      {smartwatches.battery_life}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{smartwatches.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(smartwatches)} >Buy</button>
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