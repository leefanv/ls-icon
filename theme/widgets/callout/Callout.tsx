import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./Callout.module.scss";

interface CalloutProps {
  type: "default" | "info" | "warning" | "error";
  emoji: string;
  children: ReactNode;
}

function Callout({ emoji, type = "default", children }: CalloutProps) {
  return (
    <div className={classNames(styles.callout, { [type]: type })}>
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Callout;
