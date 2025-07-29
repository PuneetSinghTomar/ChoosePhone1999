// app/Category/Phone/PhonePage/page.js
import CamerasPage from "@/Components/Category/Camera/CameraPage/CameraPage";

async function getCameras() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cameras`, {
    cache: "no-store", // Like getServerSideProps (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch phones");
  }

  return res.json();
}

export default async function Page() {
  const allcameras = await getCameras();
  return <CamerasPage allcameras={allcameras} />; // ✅ prop name matches the component
}
