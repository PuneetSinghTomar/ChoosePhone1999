"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

export default function PhonesPage() {
  const [allPhones, setAllPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const phonesPerPage = 8;
  const brandOptions = [
    "iphone",
    "samsung",
    "google",
    "motorola",
    "vivo",
    "oppo",
    "xiaomi",
    "realme",
    "oneplus",
    "infinix",
    "tecno",
    "nokia",
    "asus",
  ];

  useEffect(() => {
    const getPhones = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/phones`
        );
        setAllPhones(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching phones:", error.message);
        setAllPhones([]);
      }
    };
    getPhones();
  }, []);

  useEffect(() => {
    let filtered = allPhones.filter((phone) => {
      if (!phone.Price || !phone.name) return false;
      const brandFirstWord = phone.name.split(" ")[0].toLowerCase();
      return (
        phone.Price >= price[0] &&
        phone.Price <= price[1] &&
        (brands.length === 0 || brands.includes(brandFirstWord))
      );
    });

    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.Price - b.Price : b.Price - a.Price
    );

    setFilteredPhones(filtered);
    setCurrentPage(1);
  }, [allPhones, price, brands, sortOrder]);

  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone);

  const handleCheckboxChange = (phone) => {
    const exists = selectedPhones.some((p) => p.id === phone.id);
    if (exists) {
      setSelectedPhones(selectedPhones.filter((p) => p.id !== phone.id));
    } else {
      if (selectedPhones.length < 4) {
        setSelectedPhones([...selectedPhones, phone]);
      } else {
        alert("You can only compare up to 4 phones.");
      }
    }
  };

  const handleCompareClick = () => {
    if (selectedPhones.length < 2) {
      alert("Please select at least 2 phones to compare.");
      return;
    }
    sessionStorage.setItem("selectedPhones", JSON.stringify(selectedPhones));
    window.location.href = "/Category/Phone/PhoneComparePage";
  };

  const handleBuyClick = (phone) => {
    sessionStorage.setItem("selectedPhone", JSON.stringify(phone));
    window.location.href = "/Category/Phone/PhoneDetailPage";
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPhones.length / phonesPerPage))
      setCurrentPage(currentPage + 1);
  };

  const hasTracked = useRef(false);

  const trackVisitor = async () => {
    try {
      if (hasTracked.current) return;
      hasTracked.current = true;
      await axios.post("http://localhost:4001/api/visitor");
      console.log("Visitor tracked successfully");
    } catch (error) {
      console.error("Error tracking visitor:", error);
    }
  };

  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-center font-bold text-2xl">Phone Display</h2>
        <div className="flex p-2 justify-between">
          <Link href="/">
            <button className="text-white bg-blue-700 px-4 py-2 rounded">
              Back
            </button>
          </Link>
          <button
            onClick={handleCompareClick}
            className="text-white bg-blue-700 px-4 py-2 rounded"
          >
            Compare ({selectedPhones.length})
          </button>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden text-white bg-blue-700 px-4 py-2 rounded"
          >
            Sort
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`lg:w-1/4 p-4 bg-white shadow-md ${
            showSidebar ? "block" : "hidden"
          } lg:block`}
        >
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
            className="w-full p-2 border rounded-md"
            value={sortOrder}
          >
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
                    setBrands((prev) =>
                      prev.includes(brand)
                        ? prev.filter((b) => b !== brand)
                        : [...prev, brand]
                    )
                  }
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Main Table */}
        <div className="lg:w-3/4 w-full p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 lg:px-4 py-2">Mark</th>
                  <th className="border px-2 lg:px-4 py-2">Product</th>
                  <th className="border px-2 lg:px-4 py-2">Name</th>
                  <th className="border px-2 lg:px-4 py-2">Processor</th>
                  <th className="border px-2 lg:px-4 py-2">Camera</th>
                  <th className="border px-2 lg:px-4 py-2">Price</th>
                  <th className="border px-2 lg:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPhones.length > 0 ? (
                  currentPhones.map((phone) => (
                    <tr key={phone.id} className="hover:bg-gray-100">
                      <td className="border px-2 lg:px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedPhones.some((p) => p.id === phone.id)}
                          onChange={() => handleCheckboxChange(phone)}
                          id={`productCheckBox_${phone.id}`}
                        />
                      </td>
                      <td className="border px-2 lg:px-4 py-2 text-center">
                        <img
                          src={phone.main_image}
                          alt={phone.name}
                          className="w-10 lg:w-14 h-14 lg:h-18 object-contain mx-auto"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50";
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
                        <span className="lg:hidden font-bold">Camera:</span>
                        {phone.camera}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <span className="lg:hidden font-bold">Price:</span>
                        ₹{phone.Price}
                      </td>
                      <td className="border px-2 lg:px-4 py-2">
                        <button
                          className="text-white bg-green-700 px-3 lg:px-5 py-2 rounded"
                          onClick={() => handleBuyClick(phone)}
                        >
                          Buy
                        </button>
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

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="text-white bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {Math.ceil(filteredPhones.length / phonesPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredPhones.length / phonesPerPage)}
              className="text-white bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
