"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useTypewriterPlaceholder from "@/Components/useTypewriterPlaceholder";
export default function washingmachinesPage() {
  const [allwashingmachines, setAllwashingmachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredwashingmachines, setFilteredwashingmachines] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedwashingmachines, setSelectedwashingmachines] = useState([]); // Track selected washingmachines
  const washingmachinesPerPage = 8;
  const brandOptions = ["godrej", "samsung", "ifb", "lg", "whirlpool"];

  const placeholder = useTypewriterPlaceholder([
      "Search Washingmachine & Compare them",
      "Search LG 8 Kg 5 Star Inverter Fully Automatic Front Load",
      "Search Samsung 9 Kg 5 Star Inverter Fully Automatic Front Load",
      "Search IFB 9 Kg 5 Star Fully Automatic Front Load",
      "Search Godrej 7 Kg 5 Star Fully Automatic Top Load",
    ]);
  // Fetch washingmachines data from the API
  useEffect(() => {
    const getwashingmachines = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/washingmachines`);
        setAllwashingmachines(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching washingmachines:", error.message);
        setAllwashingmachines([]); // Fallback to empty array if API fails
      }
    };
    getwashingmachines();
  }, []);
  // Filter and sort washingmachines based on price, brands, and sort order
  useEffect(() => {
    let filtered = allwashingmachines.filter(washingmachine => {
    if (!washingmachine.Price || !washingmachine.name) return false;
    const brandFirstWord = washingmachine.name.split(" ")[0].toLowerCase();
    const matchesPrice = washingmachine.Price >= price[0] && washingmachine.Price <= price[1];
    const matchesBrand = brands.length === 0 || brands.includes(brandFirstWord);
    const matchesSearch = washingmachine.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesBrand && matchesSearch;
  });
  
  
    filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    setFilteredwashingmachines(filtered);
    setCurrentPage(1);
  }, [allwashingmachines, price, brands, sortOrder, searchTerm]);
  // Calculate the washingmachines to display on the current page
  const indexOfLastwashingmachine = currentPage * washingmachinesPerPage;
  const indexOfFirstwashingmachine = indexOfLastwashingmachine - washingmachinesPerPage;
  const currentwashingmachines = filteredwashingmachines.slice(indexOfFirstwashingmachine, indexOfLastwashingmachine);
  // Handle checkbox selection
  const handleCheckboxChange = (washingmachine) => {
    if (selectedwashingmachines.includes(washingmachine)) {
      // If already selected, remove it
      setSelectedwashingmachines(selectedwashingmachines.filter((p) => p.id !== washingmachine.id));
    } else {
      // If not selected, add it (but limit to 4 washingmachines)
      if (selectedwashingmachines.length < 4) {
        setSelectedwashingmachines([...selectedwashingmachines, washingmachine]);
      } else {
        alert("You can only compare up to 4 washingmachines.");
      }
    }
  };
  // Handle Compare button click
  const handleCompareClick = () => {
    if (selectedwashingmachines.length < 2) {
      alert("Please select at least 2 washingmachines to compare.");
      return;
    }
    // Save selected washingmachines to sessionStorage
    sessionStorage.setItem("selectedwashingmachines", JSON.stringify(selectedwashingmachines));
    // Navigate to the comparison page
    window.location.href = "/Category/Washingmachine/WashingmachineComparePage"; // Update with your comparison page route
  };
  // Handle Buy button click
  const handleBuyClick = (washingmachine) => {
    // Save the selected washingmachine to sessionStorage
    sessionStorage.setItem("selectedwashingmachine", JSON.stringify(washingmachine));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Washingmachine/WashingmachineDetailPage";
  };
  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredwashingmachines.length / washingmachinesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Washingmachine Display</h2>
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
            className="text-white bg-blue-700 px-4 py-2 rounded">Compare ({selectedwashingmachines.length})
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
                  <th className="border px-2 lg:px-4 py-2">Energy Rating</th>
                  <th className="border px-2 lg:px-4 py-2">Capacity</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentwashingmachines.length > 0 ? (
                  currentwashingmachines.map((washingmachine) => (
                    <tr key={washingmachine.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <input
                          type="checkbox"
                          checked={selectedwashingmachines.includes(washingmachine)} // Check if this washingmachine is selected
                          onChange={() => handleCheckboxChange(washingmachine)} // Handle selection
                          id="productCheckBox" />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <img
                          src={washingmachine.main_image}
                          alt={washingmachine.name}
                          className="w-10 lg:w-14 h-14 lg:h-18"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50"; // Fallback image
                          }}
                        />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Name:</span>
                        {washingmachine.name}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Energy Rating:</span>
                        {washingmachine.energy_rating}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Capacity:</span>
                        {washingmachine.capacity}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{washingmachine.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded "
                          onClick={() => handleBuyClick(washingmachine)}>Buy</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No washingmachines found
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
            <span className="text-lg font-semibold">Page {currentPage} of {Math.ceil(filteredwashingmachines.length / washingmachinesPerPage)}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredwashingmachines.length / washingmachinesPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}