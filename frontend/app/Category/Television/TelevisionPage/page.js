// app/Category/television/televisionPage/page.js
import TelevisionsPage from "@/Components/Category/Television/TelevisionPage/TelevisionPage";

async function gettelevisions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/televisions`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch televisions");
  }

  return res.json();
}

export default async function Page() {
  const alltelevisions = await gettelevisions();
  return <TelevisionsPage alltelevisions={alltelevisions} />; // ✅ prop name matches the component
}
