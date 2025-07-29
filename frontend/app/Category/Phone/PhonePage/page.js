// app/Category/Phone/PhonePage/page.js
import PhonesPage from "@/Components/Category/Phone/PhonePage/PhonesPage";

async function getPhones() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/phones`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch phones");
  }

  return res.json();
}

export default async function Page() {
  const allPhones = await getPhones();
  return <PhonesPage allPhones={allPhones} />; // ✅ prop name matches the component
}
