import React, { ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";

import styles from "./Dropdown.module.scss";

type DropdownOption = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  title: string | ReactNode;
  options?: DropdownOption[];
  onChange?: (value: string | number, option: DropdownOption) => void;
};

function Dropdown({ title, options, onChange = () => {} }: DropdownProps) {
  return (
    <div className={styles.dropdown}>
      <Menu>
        <MenuButton className={styles.button}>{title}</MenuButton>
        <MenuItems className={styles.content}>
          {options?.map((option) => {
            return (
              <MenuItem key={option.value}>
                <Button
                  className={styles.option}
                  onClick={() => onChange(option.value, option)}
                >
                  {option.label}
                </Button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}

export default Dropdown;
