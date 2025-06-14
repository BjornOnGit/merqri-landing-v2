import Hero from "./sections/Hero";
import Services from "./sections/Services";
import AboutUs from "./sections/AboutUs";
import Partner from "./sections/Partner";
import Subscribe from "./sections/Subscribe";
import PictureSlide from "./sections/PictureSlide";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <PictureSlide />
      <AboutUs />
      <Partner />
      {/* Uncomment the following section when Testimonies component is ready */}
      {/* <Testimonies /> */}
      <Subscribe />
      <Footer />
    </main>
  );
}
