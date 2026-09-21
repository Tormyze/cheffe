import Hero from "./layout/Hero";
import Featured from "./layout/Featured";
import Categories from "./layout/Categories";
import About from "./layout/About";
import HowItWorks from "./layout/HowItWorks";
import Reviews from "./layout/Reviews";
import CTA from "./layout/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <About />
      <HowItWorks />
      <Reviews />
      <CTA />
    </>
  );
}
