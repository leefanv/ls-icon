import { ReactElement } from "react";
import { TabPanel } from "@headlessui/react";

interface PanelProps {
  title: string;
  children: ReactElement;
}

function Panel({ children }: PanelProps) {
  return <TabPanel>{children}</TabPanel>
}

Panel.$$type = 'Panel';

export default Panel;