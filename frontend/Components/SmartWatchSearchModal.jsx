"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function SmartWatchSearchModal({
  isOpen,
  onClose,
  allsmartwatchs,
  selectedsmartwatchs,
  onAddsmartwatch,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredsmartwatchs, setFilteredsmartwatchs] = useState([]);

  // Memoize the smartwatch ID generation
  const getsmartwatchId = useCallback((smartwatch) => {
    if (!smartwatch) return null;
    
    if (smartwatch.id) return `id-${String(smartwatch.id)}`;
    if (smartwatch._id) return `_id-${String(smartwatch._id)}`;
    
    if (smartwatch.brand && smartwatch.model) {
      return `brand-model-${smartwatch.brand.toLowerCase()}-${smartwatch.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${smartwatch.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected smartwatch IDs to prevent recalculating
  const selectedsmartwatchIds = useMemo(() => 
    new Set(selectedsmartwatchs.map(smartwatch => getsmartwatchId(smartwatch))),
    [selectedsmartwatchs, getsmartwatchId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredsmartwatchs([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allsmartwatchs.filter(smartwatch => 
      smartwatch.name.toLowerCase().includes(query)
    );
    setFilteredsmartwatchs(filtered);
  }, [searchQuery, allsmartwatchs]);

  // Memoize the smartwatch list items
  const smartwatchListItems = useMemo(() => {
    const isLimitReached = selectedsmartwatchs.length >= 4;

    return filteredsmartwatchs.map((smartwatch) => {
      const smartwatchId = getsmartwatchId(smartwatch);
      const isAlreadySelected = selectedsmartwatchIds.has(smartwatchId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={smartwatchId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={smartwatch.main_image}
              alt={smartwatch.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-smartwatch.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{smartwatch.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddsmartwatch(smartwatch)}
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
  }, [filteredsmartwatchs, selectedsmartwatchs, selectedsmartwatchIds, getsmartwatchId, onAddsmartwatch]);

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
          placeholder="Search smartwatch..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredsmartwatchs.length > 0 ? (
            smartwatchListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search smartwatchs"
                : "No smartwatchs found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}