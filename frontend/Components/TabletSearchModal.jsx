"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function TabletSearchModal({
  isOpen,
  onClose,
  alltablets,
  selectedtablets,
  onAddtablet,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredtablets, setFilteredtablets] = useState([]);

  // Memoize the tablet ID generation
  const gettabletId = useCallback((tablet) => {
    if (!tablet) return null;
    
    if (tablet.id) return `id-${String(tablet.id)}`;
    if (tablet._id) return `_id-${String(tablet._id)}`;
    
    if (tablet.brand && tablet.model) {
      return `brand-model-${tablet.brand.toLowerCase()}-${tablet.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${tablet.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected tablet IDs to prevent recalculating
  const selectedtabletIds = useMemo(() => 
    new Set(selectedtablets.map(tablet => gettabletId(tablet))),
    [selectedtablets, gettabletId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredtablets([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = alltablets.filter(tablet => 
      tablet.name.toLowerCase().includes(query)
    );
    setFilteredtablets(filtered);
  }, [searchQuery, alltablets]);

  // Memoize the tablet list items
  const tabletListItems = useMemo(() => {
    const isLimitReached = selectedtablets.length >= 4;

    return filteredtablets.map((tablet) => {
      const tabletId = gettabletId(tablet);
      const isAlreadySelected = selectedtabletIds.has(tabletId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={tabletId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={tablet.main_image}
              alt={tablet.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-tablet.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{tablet.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddtablet(tablet)}
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
  }, [filteredtablets, selectedtablets, selectedtabletIds, gettabletId, onAddtablet]);

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
          placeholder="Search tablet..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredtablets.length > 0 ? (
            tabletListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search tablets"
                : "No tablets found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}