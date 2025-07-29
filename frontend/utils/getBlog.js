// app/utils/getBlog.js
export async function getBlog(id) {
  // Validate ID first
  if (!id || typeof id !== 'string') {
    console.error('Invalid blog ID');
    return null;
  }

  // Check environment variable
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error('NEXT_PUBLIC_API_URL is undefined');
    return null;
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    return null;
  }
}