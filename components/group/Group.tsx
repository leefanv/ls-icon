import { ReactNode } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import Item from "./Item";

import styles from "./Group.module.scss";

interface GroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode
}

function Group({ value, defaultValue, onChange = () => {}, children }: GroupProps) {
  function handleChange(value) {
    if (!value) {
      return
    }

    onChange(value)
  }

  return (
    <ToggleGroup.Root
      className={styles.group}
      value={value}
      defaultValue={defaultValue}
      type="single"
      onValueChange={handleChange}
    >
      {children}
    </ToggleGroup.Root>
  );
}

Group.Item = Item;

export default Group;
