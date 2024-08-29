import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";

import styles from "./Item.module.scss";

interface ItemProps {
  value: string;
  label: string;
  children: React.ReactNode;
}

function Item({ value, label, children }: ItemProps) {
  return (
    <ToggleGroup.Item className={styles.item} value={value} aria-label={label}>
      {children}
    </ToggleGroup.Item>
  );
}

export default Item;
