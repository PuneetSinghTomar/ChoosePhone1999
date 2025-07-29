"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function CameraSearchModal({
  isOpen,
  onClose,
  allcameras,
  selectedcameras,
  onAddcamera,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredcameras, setFilteredcameras] = useState([]);

  // Memoize the camera ID generation
  const getcameraId = useCallback((camera) => {
    if (!camera) return null;
    
    if (camera.id) return `id-${String(camera.id)}`;
    if (camera._id) return `_id-${String(camera._id)}`;
    
    if (camera.brand && camera.model) {
      return `brand-model-${camera.brand.toLowerCase()}-${camera.model.toLowerCase()}`.replace(/\s+/g, '');
    }
    
    return `name-${camera.name.toLowerCase()}`.replace(/\s+/g, '');
  }, []);

  // Memoize selected camera IDs to prevent recalculating
  const selectedcameraIds = useMemo(() => 
    new Set(selectedcameras.map(camera => getcameraId(camera))),
    [selectedcameras, getcameraId]
  );

  // Debounce and optimize filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredcameras([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allcameras.filter(camera => 
      camera.name.toLowerCase().includes(query)
    );
    setFilteredcameras(filtered);
  }, [searchQuery, allcameras]);

  // Memoize the camera list items
  const cameraListItems = useMemo(() => {
    const isLimitReached = selectedcameras.length >= 4;

    return filteredcameras.map((camera) => {
      const cameraId = getcameraId(camera);
      const isAlreadySelected = selectedcameraIds.has(cameraId);
      const isDisabled = isAlreadySelected || isLimitReached;

      return (
        <li
          key={cameraId}
          className="flex items-center justify-between gap-2 p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={camera.main_image}
              alt={camera.name}
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.src = '/placeholder-camera.png')}
              loading="lazy"
            />
            <span className="text-sm font-medium">{camera.name}</span>
          </div>

          <button
            disabled={isDisabled}
            onClick={() => onAddcamera(camera)}
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
  }, [filteredcameras, selectedcameras, selectedcameraIds, getcameraId, onAddcamera]);

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
          placeholder="Search camera..."
          className="w-80 border border-gray-300 rounded-md px-3 py-1 mb-4"
          autoFocus
        />

        <ul className="space-y-2">
          {filteredcameras.length > 0 ? (
            cameraListItems
          ) : (
            <li className="p-4 text-center text-gray-500">
              {searchQuery.trim() === ""
                ? "Start typing to search cameras"
                : "No cameras found. Try a different search."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}