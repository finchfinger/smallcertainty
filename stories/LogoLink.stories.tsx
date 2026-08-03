import type { Meta,StoryObj } from "@storybook/react";
import { Star } from "lucide-react";
import { LogoLink } from "@/components/LogoLink";
const meta={title:"Design System/LogoLink",component:LogoLink,decorators:[Story=><div className="p-8"><Story/></div>]} satisfies Meta<typeof LogoLink>;
export default meta; type Story=StoryObj<typeof meta>;
export const Default:Story={args:{}};
export const HoverFocus:Story={args:{className:"ring-2 ring-ink ring-offset-4 ring-offset-paper"}};
export const DarkBackground:Story={args:{children:<Star/>},decorators:[Story=><div className="dark min-h-32 bg-paper p-8 text-ink"><Story/></div>]};
