"use client";

import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Link from "next/link";
import useTypewriterPlaceholder from "@/Components/useTypewriterPlaceholder";
export default function PhonesPage() {
  const [allPhones, setAllPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhones, setSelectedPhones] = useState([]); // Track selected phones
  const phonesPerPage = 8;
  const brandOptions = [
    "iphone", "samsung", "google", "motorola", "vivo", "oppo",
    "xiaomi", "realme", "oneplus", "infinix", "tecno", "nokia", "asus","iqoo","redmi"
  ];

  const placeholder = useTypewriterPlaceholder([
    "Search Phone & Compare them",
    "Search iPhone 15 Pro Max",
    "Search Samsung Galaxy Z Fold5",
    "Search OPPO Find X6 Pro",
    "Search Vivo X90 Pro+",
  ]);

  // Fetch phones data from the API
  useEffect(() => {
    const getPhones = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/phones`);
        setAllPhones(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching phones:", error.message);
        setAllPhones([]); // Fallback to empty array if API fails
      }
    };
       getPhones();
  }, []);
  // Filter and sort phones based on price, brands, and sort order
  useEffect(() => {
  let filtered = allPhones.filter(phone => {
  if (!phone.Price || !phone.name) return false;
  const brandFirstWord = phone.name.split(" ")[0].toLowerCase();
  const matchesPrice = phone.Price >= price[0] && phone.Price <= price[1];
  const matchesBrand = brands.length === 0 || brands.includes(brandFirstWord);
  const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesPrice && matchesBrand && matchesSearch;
});


  filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
  setFilteredPhones(filtered);
  setCurrentPage(1);
}, [allPhones, price, brands, sortOrder, searchTerm]);

  // Calculate the phones to display on the current page
  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone);
  // Handle checkbox selection
  const handleCheckboxChange = (phone) => {
    if (selectedPhones.includes(phone)) {
      // If already selected, remove it
      setSelectedPhones(selectedPhones.filter((p) => p.id !== phone.id));
    } else {
      // If not selected, add it (but limit to 4 phones)
      if (selectedPhones.length < 4) {
        setSelectedPhones([...selectedPhones, phone]);
      } else {
        alert("You can only compare up to 4 phones.");
      }
    }
  };
  // Handle Compare button click
  const handleCompareClick = () => {
    if (selectedPhones.length < 2) {
      alert("Please select at least 2 phones to compare.");
      return;
    }
    // Save selected phones to sessionStorage
    sessionStorage.setItem("selectedPhones", JSON.stringify(selectedPhones));
    // Navigate to the comparison page
    window.location.href = "/Category/Phone/PhoneComparePage"; // Update with your comparison page route
  };
  // Handle Buy button click
  const handleBuyClick = (phone) => {
    // Save the selected phone to sessionStorage
    sessionStorage.setItem("selectedPhone", JSON.stringify(phone));
    // Navigate to the ProductDetailPage
    window.location.href = "/Category/Phone/PhoneDetailPage";
  };
  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPhones.length / phonesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const hasTracked = useRef(false);

  const trackVisitor = async () => {
    try {
      if (hasTracked.current) return; // Prevent double execution
      hasTracked.current = true;
      await axios.post('http://localhost:4001/api/visitor');
      console.log('Visitor tracked successfully');
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  useEffect(() => {
    trackVisitor();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Phone Display</h2>
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
            className="text-white bg-blue-700 px-4 py-2 rounded">Compare ({selectedPhones.length})
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
                  <th className="border px-2 lg:px-4 py-2">Processor</th>
                  <th className="border px-2 lg:px-4 py-2">Display</th>
                  <th className="border px-2 lg:px-4 py-2">RAM</th>
                  <th className="border px-2 lg:px-4 py-2">Storage</th>
                  <th className="border px-2 lg:px-4 py-2">Battery</th>
                  <th className="border px-2 lg:px-4 py-2">Camera</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPhones.length > 0 ? (
                  currentPhones.map((phone) => (
                    <tr key={phone.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2 flex justify-end lg:justify-center">
                        <input
                          type="checkbox"
                          checked={selectedPhones.includes(phone)} // Check if this phone is selected
                          onChange={() => handleCheckboxChange(phone)} // Handle selection
                          id="productCheckBox" />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <img
                          src={phone.main_image}
                          alt={phone.name}
                          className="w-10 lg:w-14 h-14 lg:h-18"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50"; // Fallback image
                          }}
                        />
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Name:</span>
                        {phone.name}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Processor:</span>
                        {phone.processor}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Display:</span>
                        {phone.display}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">RAM:</span>
                        {phone.ram}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Storage:</span>
                        {phone.storage}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Battery:</span>
                        {phone.battery}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Camera:</span>
                        {phone.camera}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{phone.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2  flex justify-end lg:justify-center">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded"
                          onClick={() => handleBuyClick(phone)}>Buy</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No phones found
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
            <span className="text-lg font-semibold">Page {currentPage} of {Math.ceil(filteredPhones.length / phonesPerPage)}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredPhones.length / phonesPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}