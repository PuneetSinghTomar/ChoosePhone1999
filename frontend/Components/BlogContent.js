// components/BlogContent.js
export default function BlogContent({ content, blog }) {
  const renderContentWithImages = (text) => {
    if (!text) return '';
    return text
      .replace(/\[image1\]/g, `<img src="${blog.blogImage_one}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image2\]/g, `<img src="${blog.blogImage_two}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image3\]/g, `<img src="${blog.blogImage_three}" class="my-4 rounded shadow-md" />`)
      .replace(/\[image4\]/g, `<img src="${blog.blogImage_four}" class="my-4 rounded shadow-md" />`);
  };

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: renderContentWithImages(content) }}
    />
  );
}
