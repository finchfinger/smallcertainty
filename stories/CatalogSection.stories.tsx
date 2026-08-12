import type { Meta,StoryObj } from "@storybook/react";
import { CatalogSection } from "@/components/CatalogSection";
const items=[{label:"Best Bath Towels",productName:"Dusen Dusen Bug Stripe Towels",href:"#"},{label:"Best Pillows",productName:"Coop Original Adjustable Pillow",href:"#"}];
const meta={title:"Catalog/CatalogSection",component:CatalogSection,decorators:[Story=><div className="mx-auto max-w-4xl p-6"><Story/></div>],args:{title:"Home",icon:"home",items}} satisfies Meta<typeof CatalogSection>; export default meta; type Story=StoryObj<typeof meta>;
export const HomeSection:Story={}; export const ClothingSection:Story={args:{title:"Women’s Clothing",icon:"clothing"}}; export const LongSection:Story={args:{items:[...items,...items,...items,...items]}}; export const EmptySection:Story={args:{items:[]}};
