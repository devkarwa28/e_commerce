import Header from "@/components/Header/Header";
import BestSeller from "@/components/Home/BestSeller";
import CategoriesShowcase from "@/components/Home/CategoriesShowcase";
import DryFruitSlider from "@/components/Home/DryFruitSlider";
import HeroBanner from "@/components/Home/HeroBanner";
import NewsLetter from "@/components/Home/NewsLetter";
import ParallaxCollection from "@/components/Home/ParallaxCollection";
import ShopByPurpose from "@/components/Home/ShopByPurpose";
import Testimonials from "@/components/Home/Testimonials";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <div>
    <HeroBanner/>
    <DryFruitSlider/>
    <CategoriesShowcase/>
    <ShopByPurpose/>
    <BestSeller/>
    <ParallaxCollection/>
    <WhyChooseUs/>
    <Testimonials/>
    <NewsLetter/>
    </div>
  );
}
