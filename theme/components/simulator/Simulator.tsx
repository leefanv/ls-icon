import { ReactNode, useState } from "react";
import { Button } from "@headlessui/react";
import classNames from "classnames";

import PC from "./PC";
import Mobile from "./Mobile";
import Code from "./Code";
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
  const [type, setType] = useState("PC");
  const [codeVisible, setCodeVisible] = useState(false);
  const { Code: codeNode, default: defaultNodes } = matchNode(children, [
    "Code",
  ]);

  return (
    <div className={styles.simulator}>
      <div className={styles.header}>
        <div className={styles.toolbar}>
          <Button
            className={classNames(styles.button, {
              [styles.active]: type === "PC",
            })}
            onClick={() => setType("PC")}
          >
            <PCIcon />
            <span className={styles.text}>PC</span>
          </Button>
          <Button
            className={classNames(styles.button, {
              [styles.active]: type === "Mobile",
            })}
            onClick={() => setType("Mobile")}
          >
            <MobileIcon />
            <span className={styles.text}>Mobile</span>
          </Button>
        </div>
        <Button
          className={classNames(styles.button, {
            [styles.active]: codeVisible,
          })}
          onClick={() => setCodeVisible(!codeVisible)}
        >
          <CodeIcon />
        </Button>
      </div>
      <div className={styles.content}>
        {type === "PC" && <PC height={height}>{defaultNodes}</PC>}
        {type === "Mobile" && <Mobile>{defaultNodes}</Mobile>}
      </div>
      {codeVisible && <div className={styles.code}>{codeNode}</div>}
    </div>
  );
}

Simulator.Code = Code;

export default Simulator;
