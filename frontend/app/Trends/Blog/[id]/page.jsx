export const dynamicParams = true;
import Link from "next/link";
import { Eye } from "lucide-react";

// Fetch blog by ID
async function getBlog(id) {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.error("API_BASE_URL is not defined!");
    return null;
  }

  try {
    // ✅ Trigger view count recording
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/visits/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId: id }),
    });

    // ✅ Fetch blog data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    return null;
  }
}


// Dynamic metadata
export async function generateMetadata(props) {
  const params = await props.params;
  const id = params.id;

  if (!id) {
    return {
      title: "Blog Not Found | ChoosePhone",
      description: "Invalid blog ID",
      openGraph: {
        images: ["/default-blog-image.jpg"],
      },
    };
  }

  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found | ChoosePhone",
      description: "This blog does not exist or was removed.",
      openGraph: {
        images: ["/default-blog-image.jpg"],
      },
    };
  }

  return {
    title: `${blog.title} | ChoosePhone`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.mainImage || blog.blogImage_one || "/default-blog-image.jpg"],
    },
  };
}

// Main Page Component
export default async function BlogDetailPage(props) {
  const params = await props.params;
  const id = params.id;

  if (!id) {
    return <div className="text-center mt-10 text-red-500">Invalid blog ID.</div>;
  }

  const blog = await getBlog(id);

  if (!blog) {
    return <div className="text-center mt-10 text-red-500">Blog not found.</div>;
  }

  const renderContentWithImages = (content) => {
    if (!content) return "";
    return content
      .replace(/\[image1\]/g, `<img src="${blog.blogImage_one}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image2\]/g, `<img src="${blog.blogImage_two}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image3\]/g, `<img src="${blog.blogImage_three}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image4\]/g, `<img src="${blog.blogImage_four}" class="my-4 rounded shadow-md" />`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">📖 Blog</h2>

        <div className="flex items-center gap-4">
          {/* 👁️ View Count Button */}
          <div className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded">
            <Eye size={18} />
            <span>{blog.views || 0} views</span>
          </div>

          {/* ⬅ Back Link */}
          <Link href="/Trends/Home">
            <button className="text-sm bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-800">
              ⬅ Back
            </button>
          </Link>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <span>By </span>
        <span className="ml-1 text-blue-600">{blog.author}</span>
        <span className="mx-2">•</span>
        <span>{blog.date}</span>
        {blog.category && (
          <>
            <span className="mx-2">•</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{blog.category}</span>
          </>
        )}
      </div>

      <p className="italic mb-6">{blog.excerpt}</p>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: renderContentWithImages(blog.content) }}
      />
    </div>
  );
}
