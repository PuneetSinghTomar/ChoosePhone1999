"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function LaptopSearchModal({
  isOpen,
  onClose,
  alllaptops,
  selectedlaptops,
  onAddlaptop,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredlaptops, setFilteredlaptops] = useState([]);

  // Memoize the laptop ID generation
  const getlaptopId = useCallback((laptop) => {
    if (!laptop) return null;
    
    if (laptop.id) return `id-${String(laptop.id)}`;
    if (laptop._id) return `_id-${String(laptop._id)}`;
    
    if (laptop.brand && laptop.model) {
      return `brand-model-${laptop.brand.toLowerCase()}-${laptop.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${laptop.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected laptop IDs to prevent recalculating
  const selectedlaptopIds = useMemo(() => 
    new Set(selectedlaptops.map(laptop => getlaptopId(laptop))),
    [selectedlaptops, getlaptopId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredlaptops([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = alllaptops.filter(laptop => 
      laptop.name.toLowerCase().includes(query)
    );
    setFilteredlaptops(filtered);
  }, [searchQuery, alllaptops]);

  // Memoize the laptop list items
  const laptopListItems = useMemo(() => {
    const isLimitReached = selectedlaptops.length >= 4;

    return filteredlaptops.map((laptop) => {
      const laptopId = getlaptopId(laptop);
      const isAlreadySelected = selectedlaptopIds.has(laptopId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={laptopId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={laptop.main_image}
              alt={laptop.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-laptop.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{laptop.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddlaptop(laptop)}
            className={`px-3 py-1 rounded-full text-sm text-white transition duration-200 ${
              isAlreadySelected
                ? "bg-green-600 cursor-not-allowed"
                : isLimitReached
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAlreadySelected
              ? "Added"
              : isLimitReached
              ? "Limit"
              : "+ Add"}
          </button>
        </li>
      );
    });
  }, [filteredlaptops, selectedlaptops, selectedlaptopIds, getlaptopId, onAddlaptop]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-lg w-96 max-h-[80vh] overflow-y-auto p-4">
        <button
          onClick={onClose}
          aria-label="Close search modal"
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search laptop..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredlaptops.length > 0 ? (
            laptopListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search laptops"
                : "No laptops found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}