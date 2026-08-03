import type { Meta,StoryObj } from "@storybook/react";
import { Header } from "@/components/Header";
const meta={title:"Editorial/Header",component:Header} satisfies Meta<typeof Header>; export default meta; type Story=StoryObj<typeof meta>;
export const Default:Story={args:{}}; export const ActiveNavItem:Story={args:{activeNav:"Profile"}}; export const NoNav:Story={args:{showNav:false}}; export const Mobile:Story={args:{},parameters:{viewport:{defaultViewport:"mobile1"}}}; export const DarkMode:Story={args:{},decorators:[Story=><div className="dark min-h-screen bg-paper text-ink"><Story/></div>]};
