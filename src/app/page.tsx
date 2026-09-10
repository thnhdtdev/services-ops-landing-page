import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Features } from "@/components/sections/features";
import { Workflow } from "@/components/sections/workflow";
import { GettingStarted } from "@/components/sections/getting-started";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="noi-dung">
        <Hero />
        <Benefits />
        <Features />
        <Workflow />
        <Pricing />
        <GettingStarted />
      </main>
      <SiteFooter />
    </>
  );
}
