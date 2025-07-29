// components/BlogMeta.js
export default function BlogMeta({ blog }) {
  return (
    <>
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
    </>
  );
}
