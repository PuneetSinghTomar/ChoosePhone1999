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
                  <th className="border px-2 lg:px-4 py-2">Type</th>
                  <th className="border px-2 lg:px-4 py-2">Resolution</th>
                  <th className="border px-2 lg:px-4 py-2">Connectivity</th>
                  <th className="border px-2 lg:px-4 py-2">Sensor Type</th>
                  <th className="border px-2 lg:px-4 py-2">Video Resolution</th>
                  <th className="border px-2 lg:px-4 py-2">Image Stabilization</th>
                  <th className="border px-2 lg:px-4 py-2">ISO Range</th>
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
                      <span className="lg:hidden font-bold">Type:</span>
                      {camera.type}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Resolution:</span>
                      {camera.resolution}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Connectivity:</span>
                      {camera.connectivity}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Sensor Type:</span>
                      {camera.sensor_type}
                    </td>
                    
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Video Resolution:</span>
                      {camera.video_resolution}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Image Stabilization:</span>
                      {camera.image_stabilization}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">ISO Range:</span>
                      {camera.iso_range}
                    </td>
                    <td className="border px-2 lg:px-4 py-2">
                      <span className="lg:hidden font-bold">Price:</span>
                      ₹{camera.Price}
                    </td>
                    <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
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