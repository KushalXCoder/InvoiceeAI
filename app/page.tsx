import Hero from "./components/Hero";
import ImageTab from "./components/ImageTab";
import Navbar from "./components/Navbar";
import { Meteors } from "./components/ui/Meteors";
// import Uses from "./components/Uses";

export default function Home() {
  return (
    <div className="app min-h-screen w-full relative font-poppins overflow-hidden">
      <Meteors number={10}/>
      <Navbar/>
      <Hero/>
      <ImageTab/>
      {/* <div id="features" className="uses-container h-[100vh] w-full relative py-20">
        <Uses/>
      </div> */}
    </div>
  );
}
