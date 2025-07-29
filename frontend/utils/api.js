import axios from "axios";

export const fetchPhones = async () => {
  try {
    const response = await axios.get("/api/products?category=phone"); // Replace with actual API
    return response.data;
  } catch (error) {
    console.error("Error fetching phones:", error);
    return [];
  }
};

// utils/api.js or similar
export async function getBlog(id) {
  const res = await fetch(`http://localhost:4001/api/blogs/${id}`);
  if (!res.ok) return null;
  return await res.json();
}
