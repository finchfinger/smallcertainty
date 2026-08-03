import type { Preview } from "@storybook/react";
import "../app/globals.css";
const preview:Preview={ parameters:{ layout:"fullscreen",controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},backgrounds:{default:"paper",values:[{name:"paper",value:"#f5f4f0"},{name:"dark",value:"#171715"}]} } };
export default preview;
