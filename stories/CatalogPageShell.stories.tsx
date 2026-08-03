import type { Meta,StoryObj } from "@storybook/react";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { fallbackSections } from "@/sanity/seedData";
const sections=fallbackSections.map(section=>({...section,items:section.items.map(item=>({...item}))}));
const meta={title:"Pages/CatalogPageShell",component:CatalogPageShell,args:{sections}} satisfies Meta<typeof CatalogPageShell>; export default meta; type Story=StoryObj<typeof meta>;
export const FullCatalogPage:Story={}; export const SparseCatalogPage:Story={args:{sections:sections.slice(0,1)}}; export const MobileCatalogPage:Story={parameters:{viewport:{defaultViewport:"mobile1"}}};
