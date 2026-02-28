import Header from "@/components/Header/Header";
import BestSeller from "@/components/Home/BestSeller";
import CategoriesShowcase from "@/components/Home/CategoriesShowcase";
import HeroBanner from "@/components/Home/HeroBanner";
import Testimonials from "@/components/Home/Testimonials";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Header/>
    <HeroBanner/>
    <CategoriesShowcase/>
    <BestSeller/>
    <WhyChooseUs/>
    <Testimonials/>
    </div>
  );
}
