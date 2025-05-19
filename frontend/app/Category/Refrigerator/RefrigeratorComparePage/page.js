"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function refrigeratorsComparePage() {
  const [selectedrefrigerators, setSelectedrefrigerators] = useState([]);
  // Fetch selected refrigerators from sessionStorage
  useEffect(() => {
    const storedrefrigerators = JSON.parse(sessionStorage.getItem("selectedrefrigerators")) || [];
    setSelectedrefrigerators(storedrefrigerators);
  }, []);
  const handleBuyClick = (refrigerator) => {
    // Save the selected refrigerator to sessionStorage
    sessionStorage.setItem("selectedrefrigerator", JSON.stringify(refrigerator));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Refrigerator/RefrigeratorDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Refrigerator</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Refrigerator/RefrigeratorPage">
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
                  <th className="border px-2 lg:px-4 py-2">Capacity</th>
                  <th className="border px-2 lg:px-4 py-2">Energy Rating</th>
                  <th className="border px-2 lg:px-4 py-2">Features</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedrefrigerators.map((refrigerator) => (
                  <tr key={refrigerator.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={refrigerator.main_image} alt={refrigerator.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {refrigerator.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Capacity:</span>
                      {refrigerator.capacity}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Energy Rating:</span>
                      {refrigerator.energy_rating}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Features:</span>
                      {refrigerator.features}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{refrigerator.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(refrigerator)} >Buy</button>
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