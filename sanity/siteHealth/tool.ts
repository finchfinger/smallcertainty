import {DashboardIcon} from "@sanity/icons";
import type {Tool} from "sanity";
import {SiteHealthTool} from "./SiteHealthTool";

export const siteHealthTool=():Tool=>({
  name:"site-health",
  title:"Site Health",
  icon:DashboardIcon,
  component:SiteHealthTool,
});
