import { ReactElement } from "react";
import { TabPanel } from "@headlessui/react";

interface PanelProps {
  title: string;
  children: ReactElement;
}

function Panel({ children }: PanelProps) {
  return <TabPanel unmount={false}>{children}</TabPanel>
}

Panel.$$type = 'Panel';

export default Panel;