"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function washingmachinesComparePage() {
  const [selectedwashingmachines, setSelectedwashingmachines] = useState([]);
  // Fetch selected washingmachines from sessionStorage
  useEffect(() => {
    const storedwashingmachines = JSON.parse(sessionStorage.getItem("selectedwashingmachines")) || [];
    setSelectedwashingmachines(storedwashingmachines);
  }, []);
  const handleBuyClick = (washingmachine) => {
    // Save the selected washingmachine to sessionStorage
    sessionStorage.setItem("selectedwashingmachine", JSON.stringify(washingmachine));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Washingmachine/WashingmachineDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Washingmachine</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Washingmachine/WashingmachinePage">
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
                  <th className="border px-2 lg:px-4 py-2">Processor</th>
                  <th className="border px-2 lg:px-4 py-2">Camera</th>
                  <th className="border px-2 lg:px-4 py-2">Features</th>
                  <th className="border px-2 lg:px-4 py-2">Display</th>
                  <th className="border px-2 lg:px-4 py-2">Battery</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedwashingmachines.map((washingmachine) => (
                  <tr key={washingmachine.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={washingmachine.main_image} alt={washingmachine.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {washingmachine.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Processor:</span>
                      {washingmachine.processor}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Camera:</span>
                      {washingmachine.camera}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Features:</span>
                      {washingmachine.features}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Display:</span>
                      {washingmachine.display}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Battery:</span>
                      {washingmachine.battery}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{washingmachine.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(washingmachine)} >Buy</button>
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