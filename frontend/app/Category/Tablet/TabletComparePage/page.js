"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function tabletsComparePage() {
  const [selectedtablets, setSelectedtablets] = useState([]);
  // Fetch selected tablets from sessionStorage
  useEffect(() => {
    const storedtablets = JSON.parse(sessionStorage.getItem("selectedtablets")) || [];
    setSelectedtablets(storedtablets);
  }, []);
  const handleBuyClick = (tablet) => {
    // Save the selected tablet to sessionStorage
    sessionStorage.setItem("selectedtablet", JSON.stringify(tablet));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Tablet/TabletDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Tablet</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Tablet/TabletPage">
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
                  <th className="border px-2 lg:px-4 py-2">RAM</th>
                  <th className="border px-2 lg:px-4 py-2">Display</th>
                  <th className="border px-2 lg:px-4 py-2">Storage</th>
                  <th className="border px-2 lg:px-4 py-2">Operating System</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedtablets.map((tablet) => (
                  <tr key={tablet.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={tablet.main_image} alt={tablet.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {tablet.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Processor:</span>
                      {tablet.processor}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Camera:</span>
                      {tablet.camera}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">RAM:</span>
                      {tablet.ram}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Display:</span>
                      {tablet.display}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Storage:</span>
                      {tablet.storage}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Operating System:</span>
                      {tablet.os}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{tablet.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(tablet)} >Buy</button>
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