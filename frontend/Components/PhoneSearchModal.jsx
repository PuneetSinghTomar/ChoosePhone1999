"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function PhoneSearchModal({
  isOpen,
  onClose,
  allPhones,
  selectedPhones,
  onAddPhone,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPhones, setFilteredPhones] = useState([]);

  // Memoize the phone ID generation
  const getPhoneId = useCallback((phone) => {
    if (!phone) return null;
    
    if (phone.id) return `id-${String(phone.id)}`;
    if (phone._id) return `_id-${String(phone._id)}`;
    
    if (phone.brand && phone.model) {
      return `brand-model-${phone.brand.toLowerCase()}-${phone.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${phone.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected phone IDs to prevent recalculating
  const selectedPhoneIds = useMemo(() => 
    new Set(selectedPhones.map(phone => getPhoneId(phone))),
    [selectedPhones, getPhoneId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPhones([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allPhones.filter(phone => 
      phone.name.toLowerCase().includes(query)
    );
    setFilteredPhones(filtered);
  }, [searchQuery, allPhones]);

  // Memoize the phone list items
  const phoneListItems = useMemo(() => {
    const isLimitReached = selectedPhones.length >= 4;

    return filteredPhones.map((phone) => {
      const phoneId = getPhoneId(phone);
      const isAlreadySelected = selectedPhoneIds.has(phoneId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={phoneId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={phone.main_image}
              alt={phone.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-phone.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{phone.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddPhone(phone)}
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
  }, [filteredPhones, selectedPhones, selectedPhoneIds, getPhoneId, onAddPhone]);

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
          placeholder="Search phone..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredPhones.length > 0 ? (
            phoneListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search phones"
                : "No phones found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}