import Hero from "./components/Hero";
import ImageTab from "./components/ImageTab";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="app h-screen w-screen font-poppins">
      <Navbar/>
      <Hero/>
      <ImageTab/>
    </div>
  );
}
