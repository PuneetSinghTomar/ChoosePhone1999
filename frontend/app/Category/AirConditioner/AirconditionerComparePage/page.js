"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function airconditionersComparePage() {
  const [selectedairconditioners, setSelectedairconditioners] = useState([]);
  // Fetch selected airconditioners from sessionStorage
  useEffect(() => {
    const storedairconditioners = JSON.parse(sessionStorage.getItem("selectedairconditioners")) || [];
    setSelectedairconditioners(storedairconditioners);
  }, []);
  const handleBuyClick = (airconditioner) => {
    // Save the selected airconditioner to sessionStorage
    sessionStorage.setItem("selectedairconditioner", JSON.stringify(airconditioner));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/AirConditioner/AirconditionerDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Airconditioner</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/AirConditioner/AirconditionerPage">
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
                  <th className="border px-2 lg:px-4 py-2">Energy Rating</th>
                  <th className="border px-2 lg:px-4 py-2">Capacity</th>
                  <th className="border px-2 lg:px-4 py-2">Special Features</th>
                  <th className="border px-2 lg:px-4 py-2">Type</th>
                  <th className="border px-2 lg:px-4 py-2">Cooling Power</th>
                  <th className="border px-2 lg:px-4 py-2">Condenser Coil</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedairconditioners.map((airconditioner) => (
                  <tr key={airconditioner.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={airconditioner.main_image} alt={airconditioner.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {airconditioner.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Energy Rating:</span>
                      {airconditioner.energy_rating}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Capacity:</span>
                      {airconditioner.capacity}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Special Features:</span>
                      {airconditioner.special_features}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Type:</span>
                      {airconditioner.type}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Cooling Power:</span>
                      {airconditioner.cooling_power}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Condenser Coil:</span>
                      {airconditioner.condenser_coil}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{airconditioner.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(airconditioner)} >Buy</button>
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