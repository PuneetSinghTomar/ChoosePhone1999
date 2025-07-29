// app/Category/Phone/PhonePage/page.js
import TabletsPage from "@/Components/Category/Tablet/TabletPage/TabletPage";

async function getTablets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tablets`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch phones");
  }

  return res.json();
}

export default async function Page() {
  const alltablets = await getTablets();
  return <TabletsPage alltablets={alltablets} />; // ✅ prop name matches the component
}
