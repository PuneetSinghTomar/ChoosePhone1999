"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function camerasComparePage() {
  const [selectedcameras, setSelectedcameras] = useState([]);
  const [highlightedFeatures, setHighlightedFeatures] = useState({});

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("selectedcameras")) || [];
    setSelectedcameras(stored.slice(0, 4)); // cap to 4
  }, []);

  useEffect(() => {
    if (selectedcameras.length > 0) {
      const highlights = {};
      
      attributes.forEach(attr => {
        // Skip if it's a currency field (like Price) as we might want to handle it differently
        if (attr.currency) return;
        
        // Extract all values for this attribute
        const values = selectedcameras.map(camera => {
          const value = camera[attr.key];
          // Extract numerical value from strings like "8GB RAM" -> 8
          if (typeof value === 'string') {
            const numMatch = value.match(/\d+/);
            return numMatch ? parseFloat(numMatch[0]) : 0;
          }
          return parseFloat(value) || 0;
        });
        
        // Find the index of the maximum value
        const maxValue = Math.max(...values);
        const maxIndex = values.indexOf(maxValue);
        
        // Only highlight if there's a clear winner (not all equal)
        if (maxValue > Math.min(...values)) {
          highlights[attr.key] = maxIndex;
        }
      });
      
      setHighlightedFeatures(highlights);
    }
  }, [selectedcameras]);

  const attributes = [
    { label: "Display Size", key: "display_size", unit: "inches" },
    { label: "Display Resolution", key: "display" },
    { label: "Screen‑to‑Body Ratio", key: "screen_to_body_ratio", unit: "%" },
    { label: "RAM", key: "ram" },
    { label: "Storage", key: "storage" },
    { label: "Front Camera", key: "camera" },
    { label: "Thickness", key: "thickness", unit: "mm" },
    { label: "Battery", key: "battery", unit: "mAh" },
    { label: "Processor", key: "processor" },
    { label: "Price", key: "Price", currency: true },
  ];

  const handleBuy = (camera) => {
    sessionStorage.setItem("selectedcamera", JSON.stringify(camera));
    window.location.href = "/Category/Camera/CameraDetailPage";
  };

  const handleAmazonClick = async (url) => {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
      });
      window.open(url, "_blank");
    } catch (error) {
      alert("It is no more listed on Amazon");
    }
  };

  // Helper function to determine if a cell should be highlighted
  const shouldHighlight = (attrKey, cameraIndex) => {
    return highlightedFeatures[attrKey] === cameraIndex;
  };

  return (
    <div className="w-full px-2 md:px-6 py-4">
      {/* Header */}
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-6">
        <h2 className="text-center font-bold text-xl md:text-2xl">
          Compare cameras
        </h2>
        <div className="text-center mt-3">
          <Link href="/Category/Camera/CameraPage">
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              ⬅ Back
            </button>
          </Link>
        </div>
      </div>

      {selectedcameras.length < 2 && (
        <p className="text-center text-gray-600">
          Please select at least two cameras to compare.
        </p>
      )}

      {/* ░░ Desktop Table layout (md and above) ░░ */}
      {selectedcameras.length >= 2 && (
        <div className="hidden md:block">
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: `220px repeat(${selectedcameras.length}, 1fr)`,
            }}
          >
            {/* Header Row */}
            <div className="border bg-gray-50 px-3 py-4 font-medium sticky left-0 z-10" />
            {selectedcameras.map((ph, i) => (
              <div
                key={i}
                className={`border p-3 flex flex-col items-center gap-1 bg-white ${
                  i === 0 ? "border-blue-500 border-2" : ""
                }`}
              >
                <span className="text-xs bg-black text-white px-2 rounded-full">
                  #{i + 1}
                </span>
                <img
                  src={ph.main_image}
                  alt={ph.name}
                  className="w-16 h-16 object-contain"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/64")
                  }
                />
                <div className="text-sm font-semibold text-center px-1 line-clamp-2">
                  {ph.name}
                </div>
                <div className="text-green-700 font-bold text-sm">
                  ₹{ph.Price?.toLocaleString?.() ?? ph.Price}
                </div>
                <button
                  onClick={() => handleAmazonClick(ph.amazon_link)}
                  className="bg-white text-white text-sm px-3 py-1 rounded"
                >
                  <Image src="/amazon.png" alt="Amazon" width={50} height={50} priority />
                </button>
              </div>
            ))}

            {/* Attribute Rows */}
            {attributes.map((attr) => (
              <React.Fragment key={attr.key}>
                <div className="border bg-gray-100 px-3 py-2 font-medium text-sm sticky left-0 z-10">
                  {attr.label}
                </div>
                {selectedcameras.map((ph, idx) => (
                  <div
                    key={idx}
                    className={`border px-3 py-2 text-center text-sm ${
                      idx === 0 ? "border-blue-500 border-2" : ""
                    } ${
                      shouldHighlight(attr.key, idx) 
                        ? "bg-green-100 border-green-500 border-2" 
                        : ""
                    }`}
                  >
                    {attr.currency
                      ? `₹${(ph[attr.key]?.toLocaleString?.() ?? ph[attr.key]) || "-"}`
                      : ph[attr.key] || "-"}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ░░ Mobile layout (always 4 columns) ░░ */}
      {selectedcameras.length >= 2 && (
        <div className="block md:hidden grid grid-cols-4 gap-2 text-center">
          {selectedcameras.map((ph, i) => (
            <div
              key={i}
              className={`border rounded-md bg-white text-[13px] flex flex-col items-center ${
                i === 0 ? "border-blue-500 border-2" : ""
              }`}
            >
              <div className={`flex flex-col items-center mb-2 h-60 justify-between p-2 rounded bg-white ${
                i === 0 ? "border-blue-500 border-2" : "border"
              }`}>
                <span className="text-[8px] bg-black text-white px-2 py-0.5 rounded-full">
                  #{i + 1}
                </span>

                <img
                  src={ph.main_image}
                  alt={ph.name}
                  className="w-14 h-12 object-contain"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/64")
                  }
                />

                <div className="font-semibold text-sm text-center line-clamp-2 mt-1">
                  {ph.name}
                </div>

                <div className="text-green-700 font-bold text-sm">
                  ₹{ph.Price?.toLocaleString?.() ?? ph.Price}
                </div>

                <button
                  onClick={() => handleAmazonClick(ph.amazon_link)}
                  className="bg-white text-white text-sm px-3 py-1 rounded"
                >
                  <Image src="/amazon.png" alt="Amazon" width={50} height={50} priority />
                </button>
              </div>

              <table className={`w-full text-xs border-t ${
                i === 0 ? "border-blue-500 border-2" : ""
              }`}>
                <tbody>
                  {attributes.map((attr) => (
                    <tr 
                      key={attr.key} 
                      className={`border-b ${
                        shouldHighlight(attr.key, i) ? "bg-green-100" : ""
                      }`}
                    >
                      <td className={`py-1 px-1 text-gray-600 font-small text-center ${
                        shouldHighlight(attr.key, i) ? "border-l-2 border-l-green-500" : ""
                      }`}>
                        {attr.label}
                      </td>
                      <td className={`py-1 px-1 text-black text-center ${
                        shouldHighlight(attr.key, i) ? "border-r-2 border-r-green-500" : ""
                      }`}>
                        {attr.currency
                          ? `₹${(ph[attr.key]?.toLocaleString?.() ?? ph[attr.key]) || "-"}`
                          : ph[attr.key] || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}