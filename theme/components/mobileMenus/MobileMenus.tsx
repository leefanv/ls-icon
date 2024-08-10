import { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import MenuIcon from "@/assets/icons/dark.svg";
import MenuCloseIcon from "@/assets/icons/light.svg";
import Theme from "../theme/Theme";
import Language from "../language/Language";

import styles from "./MobileMenus.module.scss";

function MobileMenus({ options }) {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <Popover className={styles.menus} data-open={open}>
      <PopoverButton className={styles.button} onClick={handleToggle}>
        {open ? <MenuCloseIcon /> : <MenuIcon />}
      </PopoverButton>
      <PopoverPanel className={styles.content}>
        {options?.map((option) => {
          return (
            <Link
              key={`${option.url}${option.title}`}
              href={option.url}
              className={styles.option}
              onClick={handleToggle}
            >
              {option.title}
            </Link>
          );
        })}
        <div className={styles.tools}>
          <Language />
          <Theme />
        </div>
      </PopoverPanel>
    </Popover>
  );
}

export default MobileMenus;
