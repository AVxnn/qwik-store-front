"use client"

import AnimatedIcon from "@/UI/AnimatedIcon";
import ChartIcon from "../../../../public/icons/ChartIcon";
import ClientsIcon from "../../../../public/icons/ClientsIcon";
import CartIcon from "../../../../public/icons/CartIcon";
import ClockIcon from "../../../../public/icons/ClockIcon";
import LineDashedIcon from "../../../../public/icons/LineDashedIcon";
import LineIcon from "../../../../public/icons/LineIcon";
import Button from "@/UI/Button";
import { useRouter } from "next/navigation";
import ArrowIcon from "../../../../public/icons/ArrowIcon";
import ThemeToggle from "@/UI/ThemeToggle";
import LanguageSelector from "@/UI/LanguageSelector";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return ( <>
  <header className='absolute left-1/2 -translate-x-1/2 w-full max-w-[1132px] flex h-[100px] justify-between items-center'>
    <Button
            type="submit"
            variant="landing"
            size="lg"
            onClick={() => router.push("/")}
            className="!p-4 w-[44px] h-[44px]"
          >
            <ArrowIcon />
          </Button>
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector className="rounded-[16px] hover:shadow-[0_0px_8px_0px_#8077FF]" />
        </div>
      </header>
  <div className="absolute inset-0 rounded-[16px] lg:rounded-[24px] pointer-events-none">
        <LineDashedIcon className='text-surface absolute top-0 left-0 lg:w-auto lg:h-auto' />
        <LineIcon className='text-surface absolute bottom-[0] lg:bottom-[0] left-0 lg:w-auto lg:h-auto' />
        <LineDashedIcon className='text-surface absolute rotate-180 bottom-[0] lg:bottom-[0] right-0 lg:w-auto lg:h-auto' />
        <LineIcon className='text-surface absolute rotate-180 top-0 right-0 lg:w-auto lg:h-auto' />
      </div>
  <div className=" pointer-events-none w-full mx-auto h-full lg:block">
        {/* Top Left - Clock */}
        <div className="absolute top-8 left-8 lg:top-24 lg:left-[264px]">
          <AnimatedIcon speed={0.8} amplitude={12} delay={0}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClockIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Left - Shopping Cart */}
        <div className="absolute bottom-8 left-8 lg:bottom-[200px] lg:left-[184px]">
          <AnimatedIcon speed={1.2} amplitude={18} delay={500}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <CartIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Top Right - Analytics */}
        <div className="absolute top-8 right-8 lg:top-24 lg:right-[334px]">
          <AnimatedIcon speed={1.0} amplitude={15} delay={200}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ChartIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>

        {/* Mid Right - People */}
        <div className="absolute bottom-8 right-8 lg:bottom-[230px] lg:right-[184px]">
          <AnimatedIcon speed={0.9} amplitude={14} delay={800}>
            <div className="bg-surface backdrop-blur-sm border border-purple-400/30 rounded-[18px] p-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <ClientsIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
          </AnimatedIcon>
        </div>
      </div>
    {children}
    </> );
}
