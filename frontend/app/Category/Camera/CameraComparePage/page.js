"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function camerasComparePage() {
  const [selectedcameras, setSelectedcameras] = useState([]);
  // Fetch selected cameras from sessionStorage
  useEffect(() => {
    const storedcameras = JSON.parse(sessionStorage.getItem("selectedcameras")) || [];
    setSelectedcameras(storedcameras);
  }, []);
  const handleBuyClick = (camera) => {
    // Save the selected camera to sessionStorage
    sessionStorage.setItem("selectedcamera", JSON.stringify(camera));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Camera/CameraDetailPage";
  };
  return (
    <div className="container  mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Compare Camera</h2>
        <div className="p-2 justify-between" >
          <Link href="/Category/Camera/CameraPage">
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
                {selectedcameras.map((camera) => (
                  <tr key={camera.id} className="hover:bg-gray-100">
                    <td className="border px-2 lg:px-4 py-2">
                      <img src={camera.main_image} alt={camera.name} className="w-10 lg:w-14 h-14 lg:h-18" />
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Name:</span>
                      {camera.name}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Processor:</span>
                      {camera.processor}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Camera:</span>
                      {camera.camera}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Features:</span>
                      {camera.features}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Display:</span>
                      {camera.display}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Battery:</span>
                      {camera.battery}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{camera.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <button className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded" onClick={() => handleBuyClick(camera)} >Buy</button>
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