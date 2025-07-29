{/* Compare Bar - Fixed at Bottom */}
{selectedPhones.length > 0 && (
  <div className="fixed bottom-4 left-4 right-4 z-50 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-between px-4 py-2 transition-all">
    {/* Images of selected phones */}
    <div className="flex -space-x-2 overflow-hidden">
      {selectedPhones.slice(0, 3).map((phone) => (
        <img
          key={getPhoneId(phone)}
          src={phone.main_image}
          alt={phone.name}
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
          onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
        />
      ))}
    </div>

    {/* + Add More Info */}
    {selectedPhones.length < 4 && (
      <span className="ml-3 text-sm">
        + Add {4 - selectedPhones.length} more
      </span>
    )}

    {/* Compare Button */}
    <button
      onClick={handleCompareClick}
      className="ml-auto bg-white text-green-700 font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
    >
      Compare ({selectedPhones.length})
    </button>
  </div>
)}
