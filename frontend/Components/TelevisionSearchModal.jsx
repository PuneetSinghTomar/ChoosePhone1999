"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function TelevisionSearchModal({
  isOpen,
  onClose,
  alltelevisions,
  selectedtelevisions,
  onAddtelevision,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredtelevisions, setFilteredtelevisions] = useState([]);

  // Memoize the television ID generation
  const gettelevisionId = useCallback((television) => {
    if (!television) return null;
    
    if (television.id) return `id-${String(television.id)}`;
    if (television._id) return `_id-${String(television._id)}`;
    
    if (television.brand && television.model) {
      return `brand-model-${television.brand.toLowerCase()}-${television.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${television.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected television IDs to prevent recalculating
  const selectedtelevisionIds = useMemo(() => 
    new Set(selectedtelevisions.map(television => gettelevisionId(television))),
    [selectedtelevisions, gettelevisionId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredtelevisions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = alltelevisions.filter(television => 
      television.name.toLowerCase().includes(query)
    );
    setFilteredtelevisions(filtered);
  }, [searchQuery, alltelevisions]);

  // Memoize the television list items
  const televisionListItems = useMemo(() => {
    const isLimitReached = selectedtelevisions.length >= 4;

    return filteredtelevisions.map((television) => {
      const televisionId = gettelevisionId(television);
      const isAlreadySelected = selectedtelevisionIds.has(televisionId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={televisionId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={television.main_image}
              alt={television.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-television.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{television.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddtelevision(television)}
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
  }, [filteredtelevisions, selectedtelevisions, selectedtelevisionIds, gettelevisionId, onAddtelevision]);

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
          placeholder="Search television..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredtelevisions.length > 0 ? (
            televisionListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search televisions"
                : "No televisions found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}