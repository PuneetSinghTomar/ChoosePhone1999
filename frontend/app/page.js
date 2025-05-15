import Banner from "@/Components/Banner";
import Link from "next/link";

export default function Home() {
  const categories = [
    { name: "Mobiles", icon: "📱", path: "/Category/Phone/PhonePage" },
    { name: "Laptops", icon: "💻", path: "/Category/Laptop/LaptopPage" },
    { name: "Tablets", icon: "📲", path: "/Category/Tablet/TabletPage" },
    { name: "Audio (Headphones, Earphones)", icon: "🎧", path: "/Category/Headphone/HeadphonePage" },
    { name: "Smartwatches & Fitness Bands", icon: "⌚", path: "/Category/Smartwatch/SmartwatchPage" },
    { name: "Televisions", icon: "📺", path: "/Category/Television/TelevisionPage" },
    { name: "Air Conditioners", icon: "❄️", path: "/Category/AirConditioner/AirconditionerPage" },
    { name: "Refrigerators", icon: "🧊", path: "/Category/Refrigerator/RefrigeratorPage" },
    { name: "Washing Machines", icon: "🧺", path: "/Category/Washingmachine/WashingmachinePage" },
    { name: "Cameras", icon: "📷", path: "/Category/Camera/CameraPage" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {categories.map((category) => (
          <Link
            href={category.path}
            key={category.path}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      <Banner />
    </div>
  );
}
