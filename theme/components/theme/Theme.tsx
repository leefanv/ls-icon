import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";

import LightIcon from "../../../assets/icons/light.svg";
import DarkIcon from "../../../assets/icons/dark.svg";

import styles from "./Theme.module.scss"

function Theme() {
  const [mode, setMode] = useState("light");

  function getSystemTheme() {
    const mediaQueryListDark = window.matchMedia('(prefers-color-scheme: dark)')
    
    if (mediaQueryListDark.matches) {
      return 'dark'
    }

    return 'light'
  }

  useEffect(() => {
    const mode = getSystemTheme()
    if (mode !== 'light') {
      handleChange()
    }
  }, [])

  function handleChange() {
    const nextMode = mode === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextMode);
    setMode(nextMode);
  }

  return (
    <Button className={styles.theme} onClick={handleChange}>
      {mode === "light" ? (
        <LightIcon className={styles.icon}></LightIcon>
      ) : (
        <DarkIcon className={styles.icon}></DarkIcon>
      )}
    </Button>
  );
}

export default Theme;
