"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
export default function camerasPage() {
  const [allcameras, setAllcameras] = useState([]);
  const [filteredcameras, setFilteredcameras] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedcameras, setSelectedcameras] = useState([]); // Track selected cameras
  const camerasPerPage = 8;
  const brandOptions = [ "canon", "nikon", "panasonic", "sony", "gopro"];
  // Fetch cameras data from the API
  useEffect(() => {
    const getcameras = async () => {
      try {
        const res = await axios.get("http://localhost:4001/cameras");
        setAllcameras(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching cameras:", error.message);
        setAllcameras([]); // Fallback to empty array if API fails
      }
    };
    getcameras();
  }, []);
  // Filter and sort cameras based on price, brands, and sort order
  useEffect(() => {
    let filtered = allcameras.filter(camera => {
      if (!camera.Price || !camera.name) return false; // Ensure price and brand exist
      // Extract the first word of the brand name
      const brandFirstWord = camera.name.split(" ")[0].toLowerCase();
      // Check price range and brand match
      return (
        camera.Price >= price[0] &&
        camera.Price <= price[1] &&
        (brands.length === 0 || brands.includes(brandFirstWord))
      );
    });
    // Sort by price
    filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    // Update state
    setFilteredcameras(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [allcameras, price, brands, sortOrder]);
  // Calculate the cameras to display on the current page
  const indexOfLastcamera = currentPage * camerasPerPage;
  const indexOfFirstcamera = indexOfLastcamera - camerasPerPage;
  const currentcameras = filteredcameras.slice(indexOfFirstcamera, indexOfLastcamera);
  // Handle checkbox selection
  const handleCheckboxChange = (camera) => {
    if (selectedcameras.includes(camera)) {
      // If already selected, remove it
      setSelectedcameras(selectedcameras.filter((p) => p.id !== camera.id));
    } else {
      // If not selected, add it (but limit to 4 cameras)
      if (selectedcameras.length < 4) {
        setSelectedcameras([...selectedcameras, camera]);
      } else {
        alert("You can only compare up to 4 cameras.");
      }
    }
  };
  // Handle Compare button click
  const handleCompareClick = () => {
    if (selectedcameras.length < 2) {
      alert("Please select at least 2 cameras to compare.");
      return;
    }
    // Save selected cameras to sessionStorage
    sessionStorage.setItem("selectedcameras", JSON.stringify(selectedcameras));
    // Navigate to the comparison page
    window.location.href = "/Category/Camera/CameraComparePage"; // Update with your comparison page route
  };
  // Handle Buy button click
  const handleBuyClick = (camera) => {
    // Save the selected camera to sessionStorage
    sessionStorage.setItem("selectedcamera", JSON.stringify(camera));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Camera/CameraDetailPage";
  };
  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredcameras.length / camerasPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Camera Display</h2>
        <div className="flex p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
          <button
            onClick={handleCompareClick}
            className="text-white bg-blue-700 px-4 py-2 rounded">Compare ({selectedcameras.length})
          </button>
          <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden text-white bg-blue-700 px-4 py-2 rounded">
            Sort
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar for filters */}
        <div className={`lg:w-1/4 p-4 bg-white shadow-md ${showSidebar ? "block" : "hidden"} lg:block`}>
          <h3 className="font-semibold mb-2">Price</h3>
          <input
            type="range"
            min="0"
            max="300000"
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>₹{price[0]}</span>
            <span>₹{price[1]}</span>
          </div>
          <h3 className="font-semibold mt-4 mb-2">Sort by Price</h3>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded-md">
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <h3 className="font-semibold mt-4 mb-2">Brand</h3>
          <div>
            {brandOptions.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={brands.includes(brand)}
                  onChange={() =>
                    setBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])} />
                {brand}
              </label>
            ))}
          </div>
        </div>
        {/* Main content with the table */}
        <div className="lg:w-3/4 w-full p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 lg:px-4 py-2">Mark</th>
                  <th className="border px-2 lg:px-4 py-2">Product</th>
                  <th className="border px-2 lg:px-4 py-2">Name</th>
                  <th className="border px-2 lg:px-4 py-2">Type</th>
                  <th className="border px-2 lg:px-4 py-2">Resolution</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentcameras.length > 0 ? (
                  currentcameras.map((camera) => (
                    <tr key={camera.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedcameras.includes(camera)} // Check if this camera is selected
                          onChange={() => handleCheckboxChange(camera)} // Handle selection
                          id="productCheckBox" />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <img
                          src={camera.main_image}
                          alt={camera.name}
                          className="w-10 lg:w-14 h-14 lg:h-18"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50"; // Fallback image
                          }}
                        />
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
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{camera.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded"
                          onClick={() => handleBuyClick(camera)}>Buy</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No cameras found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="text-white bg-blue-700 px-4 py-2 rounded">Previous</button>
            <span className="text-lg font-semibold">Page {currentPage} of {Math.ceil(filteredcameras.length / camerasPerPage)}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredcameras.length / camerasPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}