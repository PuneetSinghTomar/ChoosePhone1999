// app/Category/Laptop/LaptopPage/page.js
import LaptopPage from "@/Components/Category/Laptop/LaptopPage/LaptopPage";

async function getLaptops() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/laptops`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch laptops");
  }

  return res.json();
}

export default async function Page() {
  const alllaptops = await getLaptops();
  return <LaptopPage alllaptops={alllaptops} />;
}