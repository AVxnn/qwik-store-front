import HeaderLanding from "@/components/Landing/Header";
import HeroLanding from "@/components/Landing/Hero";
import Examples from "@/components/Landing/Examples";
import Features from "@/components/Landing/Features";
import Pricing from "@/components/Landing/Pricing";

export default function LandingPage() {
  return (
    <div className="flex flex-col transition-colors duration-200 mx-auto">
      <HeaderLanding />
      <div className="pt-[100px]">
        <div className="w-[calc(100%-56px)] max-w-[1384px] mx-auto">
          <HeroLanding />
        </div>
        <div className="w-full max-w-[1180px] mx-auto">
          <Examples />
        </div>
        <div className="w-full max-w-[1180px] mx-auto">
          <Features />
        </div>
        <div className="w-full max-w-[1180px] mx-auto">
          <Pricing />
        </div>
      </div>
    </div>
  )
}
