"use client";


import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import useTypewriterPlaceholder from "@/Components/useTypewriterPlaceholder";
import TabletSearchModal from "@/Components/TabletSearchModal";

export default function tabletsPage({ alltablets }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [price, setPrice] = useState([0, 300000]);
  const [brands, setBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedtablets, setSelectedtablets] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const tabletsPerPage = 8;

  const placeholder = useTypewriterPlaceholder([
    "Search tablet & Compare them",
    "Search itablet 15 Pro Max",
    "Search Samsung Galaxy Z Fold5",
    "Search OPPO Find X6 Pro",
    "Search Vivo X90 Pro+",
  ]);

  const safetablets = Array.isArray(alltablets) ? alltablets : [];
  const filteredtablets = safetablets
    .filter((tablet) => {
      const priceNum = Number(tablet.Price);
      const name = tablet?.name?.toLowerCase() ?? "";
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
  const idxLast = currentPage * tabletsPerPage;
  const idxFirst = idxLast - tabletsPerPage;
  const currenttablets = filteredtablets.slice(idxFirst, idxLast);

  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const nextPage = () =>
    currentPage < Math.ceil(filteredtablets.length / tabletsPerPage) &&
    setCurrentPage((p) => p + 1);

  const brandOptions = [
    "apple", "huawei", "realme", "samsung", "xiaomi", "lenovo", 
  ];

  const gettabletId = (tablet) => {
    if (!tablet) return null;
    return (
      tablet._id ||
      tablet.id ||
      (tablet.brand && tablet.model && `${tablet.brand}-${tablet.model}`.toLowerCase().replace(/\s+/g, '')) ||
      (tablet.name && `name-${tablet.name.toLowerCase().replace(/\s+/g, '')}`) ||
      null
    );
  };

  const handleCompareSelect = (tablet) => {
    const tabletId = gettabletId(tablet);
    const isAlreadySelected = selectedtablets.some((p) => gettabletId(p) === tabletId);
    if (isAlreadySelected) {
      setSelectedtablets((prev) => prev.filter((p) => gettabletId(p) !== tabletId));
    } else {
      if (selectedtablets.length < 4) {
        setSelectedtablets((prev) => [...prev, tablet]);
      } else {
        alert("You can only compare up to 4 tablets.");
      }
    }
  };

  const handleBuyClick = (tablet) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedtablet", JSON.stringify(tablet));
      window.location.href = "/Category/Tablet/TabletDetailPage";
    }
  };

  const handleCompareClick = () => {
    if (selectedtablets.length < 2) {
      alert("Please select at least 2 tablets to compare.");
      return;
    }
    sessionStorage.setItem("selectedtablets", JSON.stringify(selectedtablets));
    window.location.href = "/Category/Tablet/TabletComparePage";
  };

  const handleAmazonClick = async (url) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      alert("It is no more listed on Amazon");
    }
  };

  const handleAddtablet = (tablet) => {
    const tabletId = gettabletId(tablet);
    const alreadyExists = selectedtablets.some((p) => gettabletId(p) === tabletId);
    if (!alreadyExists && selectedtablets.length < 4) {
      setSelectedtablets((prev) => [...prev, tablet]);
    } else {
      alert(`${tablet.name} is already added.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-6">
        <h2 className="text-center font-bold text-2xl">tablet Display</h2>
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
          {currenttablets.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {currenttablets.map((tablet) => (
                <div key={gettabletId(tablet)} className="border rounded-lg shadow p-4 flex flex-col">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCompareSelect(tablet)}
                      className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Compare +
                    </button>
                  </div>
                  <button onClick={() => handleBuyClick(tablet)}>
                    <img
                      src={tablet.main_image}
                      alt={tablet.name}
                      className="w-full h-40 object-contain mb-4"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                    />
                  </button>
                  <div className="flex flex-col gap-1 overflow-y-scroll h-28 pr-1">
                    <h4 className="text-sm text-gray-600 font-semibold">Name: {tablet.name}</h4>
                    <p className="text-sm text-gray-600">Processor: {tablet.processor}</p>
                    <p className="text-sm text-gray-600">Display: {tablet.display}</p>
                    <p className="text-sm text-gray-600">Ram: {tablet.ram}</p>
                    <p className="text-sm text-gray-600">Storage: {tablet.storage}</p>
                    <p className="text-sm text-gray-600">Battery: {tablet.battery}</p>
                    <p className="text-sm text-gray-600">Camera: {tablet.camera}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-bold text-blue-700">₹{tablet.Price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAmazonClick(tablet.amazon_link)}
                      className="text-sm"
                    >
                      <Image src="/amazon.png" alt="Amazon" width={50} height={50} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No tablets found.</p>
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
              Page {currentPage} of {Math.ceil(filteredtablets.length / tabletsPerPage) || 1}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredtablets.length / tabletsPerPage)}
              className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>

      {/* Compare Bar */}
      {selectedtablets.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-4 bg-green-600 text-white rounded-full shadow-lg px-4 py-2">
          <div className="flex items-center">
            {selectedtablets.map((tablet, i) => (
              <div
                key={gettabletId(tablet) || `tablet-${i}`}
                className="relative w-10 h-10 first:ml-0 -ml-2"
              >
                <img
                  src={tablet.main_image}
                  alt={tablet.name}
                  className="w-full h-full rounded-full border-2 border-white object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                />
                <button
                  onClick={() => handleCompareSelect(tablet)}
                  className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedtablets.length < 4 && (
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="ml-auto bg-white text-green-700 font-semibold px-4 py-1.5 rounded-full"
            >
              + Add {4 - selectedtablets.length} more
            </button>
          )}
          <button
            onClick={handleCompareClick}
            className="ml-auto bg-white text-green-700 font-semibold px-4 py-1.5 rounded-full"
          >
            Compare ({selectedtablets.length})
          </button>
        </div>
      )}

      <TabletSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        alltablets={alltablets}
        selectedtablets={selectedtablets}
        onAddtablet={handleAddtablet}
      />
    </div>
  );
}
