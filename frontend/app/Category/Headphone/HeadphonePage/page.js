"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
export default function headphonesPage() {
  const [allheadphones, setAllheadphones] = useState([]);
  const [filteredheadphones, setFilteredheadphones] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedheadphones, setSelectedheadphones] = useState([]); // Track selected headphones
  const headphonesPerPage = 8;
  const brandOptions = ["boat", "jbl", "realme", "sennheiser", "sony"];
  // Fetch headphones data from the API
  useEffect(() => {
    const getheadphones = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/headphones`);
        setAllheadphones(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching headphones:", error.message);
        setAllheadphones([]); // Fallback to empty array if API fails
      }
    };
    getheadphones();
  }, []);
  // Filter and sort headphones based on price, brands, and sort order
  useEffect(() => {
    let filtered = allheadphones.filter(headphone => {
      if (!headphone.Price || !headphone.name) return false; // Ensure price and brand exist
      // Extract the first word of the brand name
      const brandFirstWord = headphone.name.split(" ")[0].toLowerCase();
      // Check price range and brand match
      return (
        headphone.Price >= price[0] &&
        headphone.Price <= price[1] &&
        (brands.length === 0 || brands.includes(brandFirstWord))
      );
    });
    // Sort by price
    filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    // Update state
    setFilteredheadphones(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [allheadphones, price, brands, sortOrder]);
  // Calculate the headphones to display on the current page
  const indexOfLastheadphone = currentPage * headphonesPerPage;
  const indexOfFirstheadphone = indexOfLastheadphone - headphonesPerPage;
  const currentheadphones = filteredheadphones.slice(indexOfFirstheadphone, indexOfLastheadphone);
  // Handle checkbox selection
  const handleCheckboxChange = (headphone) => {
    if (selectedheadphones.includes(headphone)) {
      // If already selected, remove it
      setSelectedheadphones(selectedheadphones.filter((p) => p.id !== headphone.id));
    } else {
      // If not selected, add it (but limit to 4 headphones)
      if (selectedheadphones.length < 4) {
        setSelectedheadphones([...selectedheadphones, headphone]);
      } else {
        alert("You can only compare up to 4 headphones.");
      }
    }
  };
  // Handle Compare button click
  const handleCompareClick = () => {
    if (selectedheadphones.length < 2) {
      alert("Please select at least 2 headphones to compare.");
      return;
    }
    // Save selected headphones to sessionStorage
    sessionStorage.setItem("selectedheadphones", JSON.stringify(selectedheadphones));
    // Navigate to the comparison page
    window.location.href = "/Category/Headphone/HeadphoneComparePage"; // Update with your comparison page route
  };
  // Handle Buy button click
  const handleBuyClick = (headphone) => {
    // Save the selected headphone to sessionStorage
    sessionStorage.setItem("selectedheadphone", JSON.stringify(headphone));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Headphone/HeadphoneDetailPage";
  };
  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredheadphones.length / headphonesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Headphone Display</h2>
        <div className="flex p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
          <button
            onClick={handleCompareClick}
            className="text-white bg-blue-700 px-4 py-2 rounded">Compare ({selectedheadphones.length})
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
                  <th className="border px-2 lg:px-4 py-2">Connectivity</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentheadphones.length > 0 ? (
                  currentheadphones.map((headphone) => (
                    <tr key={headphone.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <input
                          type="checkbox"
                          checked={selectedheadphones.includes(headphone)} // Check if this headphone is selected
                          onChange={() => handleCheckboxChange(headphone)} // Handle selection
                          id="productCheckBox" />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <img
                          src={headphone.main_image}
                          alt={headphone.name}
                          className="w-10 lg:w-14 h-14 lg:h-18"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50"; // Fallback image
                          }}
                        />
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
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{headphone.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded"
                          onClick={() => handleBuyClick(headphone)}>Buy</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No headphones found
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
            <span className="text-lg font-semibold">Page {currentPage} of {Math.ceil(filteredheadphones.length / headphonesPerPage)}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredheadphones.length / headphonesPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}