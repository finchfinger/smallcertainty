import type { Meta,StoryObj } from "@storybook/react";
import { Menu,Search,Sun } from "lucide-react";
import { IconButton } from "@/components/IconButton";
const meta={title:"Design System/IconButton",component:IconButton,decorators:[Story=><div className="p-8"><Story/></div>],args:{icon:<Menu/>,label:"Menu"}} satisfies Meta<typeof IconButton>;
export default meta; type Story=StoryObj<typeof meta>;
export const Ghost:Story={args:{variant:"ghost"}}; export const Circle:Story={args:{variant:"circle"}}; export const Plain:Story={args:{variant:"plain"}}; export const Disabled:Story={args:{disabled:true}}; export const SearchExample:Story={args:{icon:<Search/>,label:"Search",variant:"circle"}}; export const ThemeExample:Story={args:{icon:<Sun/>,label:"Change theme",variant:"ghost"}};
