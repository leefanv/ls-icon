import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";

import LightIcon from "../../../assets/icons/light.svg";
import DarkIcon from "../../../assets/icons/dark.svg";

import styles from "./Theme.module.scss";

function Theme() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(getSystemTheme());
  }, []);

  useEffect(() => {
    setFramesTheme(mode);
  }, [mode]);

  function getSystemTheme() {
    if (typeof window === "undefined") {
      return "light";
    }

    const mediaQueryListDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    if (mediaQueryListDark.matches) {
      return "dark";
    }

    return "light";
  }

  function setFramesTheme(mode) {
    setFrameTheme(window, mode);

    Array.prototype.forEach.call(window.frames, (frame) => {
      setFrameTheme(frame, mode);
    });
  }

  function setFrameTheme(frame, mode) {
    frame.document.documentElement.setAttribute("data-theme", mode);
    frame.document.documentElement.style["color-scheme"] = mode;
  }

  function handleChange() {
    const nextMode = mode === "light" ? "dark" : "light";
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
