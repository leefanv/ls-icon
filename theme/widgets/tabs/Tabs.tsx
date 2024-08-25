import { ReactElement } from "react";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { matchNode, matchNodes } from "@/theme/utils/element";

import Panel from "./Panel";
import Actions from "./Actions";

import styles from "./Tabs.module.scss";

function Tabs({ children }) {
  const { Panel: panels } = matchNodes(children, ["Panel"]);
  const { Actions: actions } = matchNode(children, ["Actions"]);

  return (
    <div className={styles.tabs}>
      <TabGroup>
        <TabList className={styles['tab-list']}>
          {panels.map((panel: ReactElement) => {
            return (
              <Tab key={panel.props.title} className={styles.tab}>
                {panel.props.title}
              </Tab>
            );
          })}
          {actions}
        </TabList>
        <TabPanels className={styles['tab-panels']}>{panels}</TabPanels>
      </TabGroup>
    </div>
  );
}

Tabs.Panel = Panel;
Tabs.Actions = Actions;

export default Tabs;
