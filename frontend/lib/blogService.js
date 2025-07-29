// lib/blogService.js
export async function getBlog(id) {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.error("API_BASE_URL is not defined!");
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    return null;
  }
}
