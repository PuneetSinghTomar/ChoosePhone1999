// utils/api.js or similar
import axios from "axios";

// Create axios instance with public backend IP
const instance = axios.create({
  baseURL: "http://31.97.71.55:4001",
});

// Fetch all phones
export const fetchPhones = async () => {
  try {
    const response = await instance.get("/api/products?category=phone");
    return response.data;
  } catch (error) {
    console.error("Error fetching phones:", error);
    return [];
  }
};

// Fetch single blog by ID
export async function getBlog(id) {
  try {
    const response = await instance.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
