"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useTypewriterPlaceholder from "@/Components/useTypewriterPlaceholder";
export default function smartwatchesPage() {
  const [allsmartwatches, setAllsmartwatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredsmartwatches, setFilteredsmartwatches] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedsmartwatches, setSelectedsmartwatches] = useState([]); // Track selected smartwatches
  const smartwatchesPerPage = 8;
  const brandOptions = ["amazfit", "apple", "oneplus", "samsung", "realme"];

  const placeholder = useTypewriterPlaceholder([
      "Search Smartwatch & Compare them",
      "Search Apple Watch Series 8",
      "Search Apple Watch SE (2nd Gen)",
      "Search Samsung Galaxy Watch 5 Pro",
      "Search OnePlus Watch Cobalt Edition",
    ]);
  // Fetch smartwatches data from the API
  useEffect(() => {
    const getsmartwatches = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/smartwatches`);
        setAllsmartwatches(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching smartwatches:", error.message);
        setAllsmartwatches([]); // Fallback to empty array if API fails
      }
    };
    getsmartwatches();
  }, []);
  // Filter and sort smartwatches based on price, brands, and sort order
  useEffect(() => {
    let filtered = allsmartwatches.filter(smartwatch => {
    if (!smartwatch.Price || !smartwatch.name) return false;
    const brandFirstWord = smartwatch.name.split(" ")[0].toLowerCase();
    const matchesPrice = smartwatch.Price >= price[0] && smartwatch.Price <= price[1];
    const matchesBrand = brands.length === 0 || brands.includes(brandFirstWord);
    const matchesSearch = smartwatch.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesBrand && matchesSearch;
  });
  
  
    filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    setFilteredsmartwatches(filtered);
    setCurrentPage(1);
  }, [allsmartwatches, price, brands, sortOrder, searchTerm]);
  // Calculate the smartwatches to display on the current page
  const indexOfLastsmartwatch = currentPage * smartwatchesPerPage;
  const indexOfFirstsmartwatch = indexOfLastsmartwatch - smartwatchesPerPage;
  const currentsmartwatches = filteredsmartwatches.slice(indexOfFirstsmartwatch, indexOfLastsmartwatch);
  // Handle checkbox selection
  const handleCheckboxChange = (smartwatch) => {
    if (selectedsmartwatches.includes(smartwatch)) {
      // If already selected, remove it
      setSelectedsmartwatches(selectedsmartwatches.filter((p) => p.id !== smartwatch.id));
    } else {
      // If not selected, add it (but limit to 4 smartwatches)
      if (selectedsmartwatches.length < 4) {
        setSelectedsmartwatches([...selectedsmartwatches, smartwatch]);
      } else {
        alert("You can only compare up to 4 smartwatches.");
      }
    }
  };
  // Handle Compare button click
  const handleCompareClick = () => {
    if (selectedsmartwatches.length < 2) {
      alert("Please select at least 2 smartwatches to compare.");
      return;
    }
    // Save selected smartwatches to sessionStorage
    sessionStorage.setItem("selectedsmartwatches", JSON.stringify(selectedsmartwatches));
    // Navigate to the comparison page
    window.location.href = "/Category/Smartwatch/SmartwatchComparePage"; // Update with your comparison page route
  };
  // Handle Buy button click
  const handleBuyClick = (smartwatch) => {
    // Save the selected smartwatch to sessionStorage
    sessionStorage.setItem("selectedsmartwatch", JSON.stringify(smartwatch));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Smartwatch/SmartwatchDetailPage";
  };
  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredsmartwatches.length / smartwatchesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Smartwatch Display</h2>
        <div className="flex justify-center my-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
        <div className="flex p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">Back</button>
          </Link>
          <button
            onClick={handleCompareClick}
            className="text-white bg-blue-700 px-4 py-2 rounded">Compare ({selectedsmartwatches.length})
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
                  <th className="border px-2 lg:px-4 py-2">Connectivity</th>
                  <th className="border px-2 lg:px-4 py-2">Water Resistance</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentsmartwatches.length > 0 ? (
                  currentsmartwatches.map((smartwatch) => (
                    <tr key={smartwatch.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <input
                          type="checkbox"
                          checked={selectedsmartwatches.includes(smartwatch)} // Check if this smartwatch is selected
                          onChange={() => handleCheckboxChange(smartwatch)} // Handle selection
                          id="productCheckBox" />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <img
                          src={smartwatch.main_image}
                          alt={smartwatch.name}
                          className="w-10 lg:w-14 h-14 lg:h-18"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50"; // Fallback image
                          }}
                        />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Name:</span>
                        {smartwatch.name}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Connectivity:</span>
                        {smartwatch.connectivity}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Water Resistance:</span>
                        {smartwatch.water_resistance}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{smartwatch.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded "
                          onClick={() => handleBuyClick(smartwatch)}>Buy</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No smartwatches found
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
            <span className="text-lg font-semibold">Page {currentPage} of {Math.ceil(filteredsmartwatches.length / smartwatchesPerPage)}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredsmartwatches.length / smartwatchesPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}