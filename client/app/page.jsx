import Header from "@/components/Header/Header";
import CategoriesShowcase from "@/components/Home/CategoriesShowcase";
import HeroBanner from "@/components/Home/HeroBanner";

export default function Home() {
  return (
    <div>
      <Header/>
    <HeroBanner/>
    <CategoriesShowcase/>
    </div>
  );
}
