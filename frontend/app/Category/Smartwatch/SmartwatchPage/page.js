// app/Category/smartwatch/smartwatchPage/page.js
import SmartWatchsPage from "@/Components/Category/SmartWatch/SmartWatchPage/SmartWatchPage";

async function getsmartwatchs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/smartwatches`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch smartwatchs");
  }

  return res.json();
}

export default async function Page() {
  const allsmartwatchs = await getsmartwatchs();
  return <SmartWatchsPage allsmartwatchs={allsmartwatchs} />; // ✅ prop name matches the component
}
