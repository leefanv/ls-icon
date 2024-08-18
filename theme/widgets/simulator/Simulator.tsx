import { ReactNode, useState } from "react";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanels,
  TabPanel,
} from "@headlessui/react";
import classNames from "classnames";

import PC from "./PC";
import Mobile from "./Mobile";
import Javascript from "./Javascript";
import Style from "./Style";
import PCIcon from "../../../assets/icons/pc.svg";
import MobileIcon from "../../../assets/icons/mobile.svg";
import CodeIcon from "../../../assets/icons/code.svg";
import { matchNode } from "../../utils/element";

import styles from "./Simulator.module.scss";

interface SimulatorProps {
  height: number;
  children: ReactNode;
}

function Simulator({ height, children }: SimulatorProps) {
  const [codeVisible, setCodeVisible] = useState(false);
  const {
    Javascript: javascriptNode,
    Style: styleNode,
    default: defaultNodes,
  } = matchNode(children, ["Javascript", "Style"]);

  return (
    <div className={styles.simulator}>
      <TabGroup>
        <TabList className={styles.header}>
          <Tab className={styles.button}>
            <PCIcon />
            <span className={styles.text}>PC</span>
          </Tab>
          <Tab className={styles.button}>
            <MobileIcon />
            <span className={styles.text}>Mobile</span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel className={styles.content}>
            <PC height={height}>{defaultNodes}</PC>
          </TabPanel>
          <TabPanel className={styles.content}>
            <Mobile>{defaultNodes}</Mobile>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Button
        className={classNames(styles.actions, styles.button, {
          [styles.active]: codeVisible,
        })}
        onClick={() => setCodeVisible(!codeVisible)}
      >
        <CodeIcon />
      </Button>
      {codeVisible && <TabGroup>
        <TabList className={styles['tab-list']}>
          <Tab className={styles.tab}>Javascript</Tab>
          {styleNode && <Tab className={styles.tab}>CSS</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel className={styles.code}>{javascriptNode}</TabPanel>
          {styleNode && <TabPanel className={styles.code}>{styleNode}</TabPanel>}
        </TabPanels>
      </TabGroup>}
    </div>
  );
}

Simulator.Javascript = Javascript;
Simulator.Style = Style;

export default Simulator;
