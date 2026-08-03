import { ResponsiveSectionLabel } from "./ResponsiveSectionLabel";

export function AboutSection({ children }:{ children:string }) {
  return <section aria-labelledby="about-title" className="border-t border-ink min-[700px]:grid min-[700px]:grid-cols-12 min-[700px]:gap-x-6">
    <h2 id="about-title" className="pt-4 font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] min-[700px]:col-span-2">
      <ResponsiveSectionLabel title="About" mobileUppercase/>
    </h2>
    <p className="pb-4 pt-4 font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] min-[700px]:col-span-10">
      {children}
    </p>
  </section>;
}
