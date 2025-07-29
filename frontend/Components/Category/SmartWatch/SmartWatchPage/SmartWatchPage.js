"use client";


import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import useTypewriterPlaceholder from "@/Components/useTypewriterPlaceholder";
import SmartWatchSearchModal from "@/Components/SmartWatchSearchModal";

export default function smartwatchsPage({ allsmartwatchs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedsmartwatchs, setSelectedsmartwatchs] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const smartwatchsPerPage = 8;

  const placeholder = useTypewriterPlaceholder([
    "Search smartwatch & Compare them",
    "Search ismartwatch 15 Pro Max",
    "Search Samsung Galaxy Z Fold5",
    "Search OPPO Find X6 Pro",
    "Search Vivo X90 Pro+",
  ]);

  const safesmartwatchs = Array.isArray(allsmartwatchs) ? allsmartwatchs : [];
  const filteredsmartwatchs = safesmartwatchs
    .filter((smartwatch) => {
      const priceNum = Number(smartwatch.Price);
      const name = smartwatch?.name?.toLowerCase() ?? "";
      const brandFirst = name.split(" ")[0];

      if (!priceNum || !name) return false;

      const inPrice = priceNum >= price[0] && priceNum <= price[1];
      const inBrand = brands.length === 0 || brands.includes(brandFirst);
      const inSearch = name.includes(searchTerm.toLowerCase());
      return inPrice && inBrand && inSearch;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.Price - b.Price : b.Price - a.Price
    );
  const idxLast = currentPage * smartwatchsPerPage;
  const idxFirst = idxLast - smartwatchsPerPage;
  const currentsmartwatchs = filteredsmartwatchs.slice(idxFirst, idxLast);

  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const nextPage = () =>
    currentPage < Math.ceil(filteredsmartwatchs.length / smartwatchsPerPage) &&
    setCurrentPage((p) => p + 1);

  const brandOptions = [
    "amazfit", "apple", "oneplus", "realme", "samsung",
  ];

  const getsmartwatchId = (smartwatch) => {
    if (!smartwatch) return null;
    return (
      smartwatch._id ||
      smartwatch.id ||
      (smartwatch.brand && smartwatch.model && `${smartwatch.brand}-${smartwatch.model}`.toLowerCase().replace(/\s+/g, '')) ||
      (smartwatch.name && `name-${smartwatch.name.toLowerCase().replace(/\s+/g, '')}`) ||
      null
    );
  };

  const handleCompareSelect = (smartwatch) => {
    const smartwatchId = getsmartwatchId(smartwatch);
    const isAlreadySelected = selectedsmartwatchs.some((p) => getsmartwatchId(p) === smartwatchId);
    if (isAlreadySelected) {
      setSelectedsmartwatchs((prev) => prev.filter((p) => getsmartwatchId(p) !== smartwatchId));
    } else {
      if (selectedsmartwatchs.length < 4) {
        setSelectedsmartwatchs((prev) => [...prev, smartwatch]);
      } else {
        alert("You can only compare up to 4 smartwatchs.");
      }
    }
  };

  const handleBuyClick = (smartwatch) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedsmartwatch", JSON.stringify(smartwatch));
      window.location.href = "/Category/Smartwatch/SmartwatchDetailPage";
    }
  };

  const handleCompareClick = () => {
    if (selectedsmartwatchs.length < 2) {
      alert("Please select at least 2 smartwatchs to compare.");
      return;
    }
    sessionStorage.setItem("selectedsmartwatchs", JSON.stringify(selectedsmartwatchs));
    window.location.href = "/Category/Smartwatch/SmartwatchComparePage";
  };

  const handleAmazonClick = async (url) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      alert("It is no more listed on Amazon");
    }
  };

  const handleAddsmartwatch = (smartwatch) => {
    const smartwatchId = getsmartwatchId(smartwatch);
    const alreadyExists = selectedsmartwatchs.some((p) => getsmartwatchId(p) === smartwatchId);
    if (!alreadyExists && selectedsmartwatchs.length < 4) {
      setSelectedsmartwatchs((prev) => [...prev, smartwatch]);
    } else {
      alert(`${smartwatch.name} is already added.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-6">
        <h2 className="text-center font-bold text-2xl">smartwatch Display</h2>
        <div className="flex justify-center my-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div className="flex gap-2 justify-between">
          <Link href="/">
            <button className="bg-blue-700 text-white px-4 py-2 rounded">Back</button>
          </Link>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden bg-blue-700 text-white px-4 py-2 rounded"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className={`lg:w-1/4 w-full lg:block ${showSidebar ? "block" : "hidden"} bg-white shadow-md p-4 rounded`}>
          <h3 className="font-semibold mb-2">Price (₹{price[0]}-₹{price[1]})</h3>
          <input
            type="range"
            min="0"
            max="300000"
            value={price[1]}
            onChange={(e) => setPrice([0, Number(e.target.value)])}
            className="w-full"
          />

          <h3 className="font-semibold mt-6 mb-2">Sort by Price</h3>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>

          <h3 className="font-semibold mt-6 mb-2">Brand</h3>
          <div className="max-h-60 overflow-y-auto pr-1">
            {brandOptions.map((brand) => (
              <label key={brand} className="flex items-center gap-2 mb-1">
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
                <span className="capitalize">{brand}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <section className="lg:w-3/4 w-full">
          {currentsmartwatchs.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {currentsmartwatchs.map((smartwatch) => (
                <div key={getsmartwatchId(smartwatch)} className="border rounded-lg shadow p-4 flex flex-col">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCompareSelect(smartwatch)}
                      className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Compare +
                    </button>
                  </div>
                  <button onClick={() => handleBuyClick(smartwatch)}>
                    <img
                      src={smartwatch.main_image}
                      alt={smartwatch.name}
                      className="w-full h-40 object-contain mb-4"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                    />
                  </button>
                  <div className="flex flex-col gap-1 overflow-y-scroll h-28 pr-1">
                    <h4 className="text-sm text-gray-600 font-semibold">Name: {smartwatch.name}</h4>
                    <p className="text-sm text-gray-600">Processor: {smartwatch.processor}</p>
                    <p className="text-sm text-gray-600">Display: {smartwatch.display}</p>
                    <p className="text-sm text-gray-600">Ram: {smartwatch.ram}</p>
                    <p className="text-sm text-gray-600">Storage: {smartwatch.storage}</p>
                    <p className="text-sm text-gray-600">Battery: {smartwatch.battery}</p>
                    <p className="text-sm text-gray-600">Camera: {smartwatch.camera}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-bold text-blue-700">₹{smartwatch.Price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAmazonClick(smartwatch.amazon_link)}
                      className="text-sm"
                    >
                      <Image src="/amazon.png" alt="Amazon" width={50} height={50} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No smartwatchs found.</p>
          )}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-semibold">
              Page {currentPage} of {Math.ceil(filteredsmartwatchs.length / smartwatchsPerPage) || 1}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredsmartwatchs.length / smartwatchsPerPage)}
              className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>

      {/* Compare Bar */}
      {selectedsmartwatchs.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-4 bg-green-600 text-white rounded-full shadow-lg px-4 py-2">
          <div className="flex items-center">
            {selectedsmartwatchs.map((smartwatch, i) => (
              <div
                key={getsmartwatchId(smartwatch) || `smartwatch-${i}`}
                className="relative w-10 h-10 first:ml-0 -ml-2"
              >
                <img
                  src={smartwatch.main_image}
                  alt={smartwatch.name}
                  className="w-full h-full rounded-full border-2 border-white object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                />
                <button
                  onClick={() => handleCompareSelect(smartwatch)}
                  className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedsmartwatchs.length < 4 && (
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="ml-auto bg-white text-green-700 font-semibold px-4 py-1.5 rounded-full"
            >
              + Add {4 - selectedsmartwatchs.length} more
            </button>
          )}
          <button
            onClick={handleCompareClick}
            className="ml-auto bg-white text-green-700 font-semibold px-4 py-1.5 rounded-full"
          >
            Compare ({selectedsmartwatchs.length})
          </button>
        </div>
      )}

      <SmartWatchSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        allsmartwatchs={allsmartwatchs}
        selectedsmartwatchs={selectedsmartwatchs}
        onAddsmartwatch={handleAddsmartwatch}
      />
    </div>
  );
}
