import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";

import LightIcon from "../../../assets/icons/light.svg";
import DarkIcon from "../../../assets/icons/dark.svg";

import styles from "./Theme.module.scss";

function Theme() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const initialTheme = getSystemTheme();
    setMode(initialTheme);

    // Add event listener for system theme changes
    const mediaQueryListDark = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      setMode(e.matches ? "dark" : "light");
    };

    mediaQueryListDark.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQueryListDark.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    setFramesTheme(mode);
  }, [mode]);

  function setThemeMode(value) {
    setMode(value);
    const themeEvent = new CustomEvent("theme", { detail: value });
    window.dispatchEvent(themeEvent);
  }

  function getSystemTheme() {
    if (typeof window === "undefined") {
      return "light";
    }

    const mediaQueryListDark = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQueryListDark.matches ? "dark" : "light";
  }

  function setFramesTheme(mode) {
    setFrameTheme(window, mode);
  }

  function setFrameTheme(frame, mode) {
    frame.document.documentElement.setAttribute("data-theme", mode);
    frame.document.documentElement.style["color-scheme"] = mode;
  }

  function handleChange() {
    const nextMode = mode === "light" ? "dark" : "light";
    setThemeMode(nextMode);
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
