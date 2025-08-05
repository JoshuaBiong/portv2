
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/HeroSection";



export default function Home() {
  return (
   <main className=""> 
    <div className="w-full flex justify-center items-center flex-col">
      <Hero/>
      <AboutSection/>
      <FeaturedProjects/>
    </div>
   </main>
  );
}
