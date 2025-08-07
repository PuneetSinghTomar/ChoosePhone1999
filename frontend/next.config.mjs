/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com", // Add this
      "example.com", // Add other domains if needed
      "via.placeholder.com",
      "www.hatchwise.com", // Allow images from this domain
      "example.com", // Add other domains as needed
      "another-domain.com",
      "w7.pngwing.com", // Example fallback domain
    "encrypted-tbn0.gstatic.com",
    "pbs.twimg.com",
    "pngimagesfree.com",
    "i.pinimg.com",
    "res.cloudinary.com",
    "logowik.com",
  ],
  },
  };
export default nextConfig;
