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
