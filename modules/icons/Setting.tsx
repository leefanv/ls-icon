import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@headlessui/react";
import Slider from "@/components/slider/Slider";
import ColorPicker from "@/components/colorPicker/ColorPicker";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";

import styles from "./Setting.module.scss";

function Setting() {
  const defaultSize = 24;
  const defaultStrokeWeight = 1;

  const t = useTranslations();
  const [size, setSize] = useState(defaultSize);
  const [strokeWeight, setStrokeWeight] = useState(defaultStrokeWeight);
  const [color, setColor] = useState("#000000");

  // @ts-ignore
  const onThemeChange = useGlobalEvent("theme");
  onThemeChange((event) => {
    // @ts-ignore
    const color = event.detail === "light" ? "#000000" : "#ffffff";
    setColor(color);
    setIconColor(color);
  });

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

  function getThemeColor() {
    return getSystemTheme() === "dark" ? "#ffffff" : "#000000";
  }

  function setIconSize(value) {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-role="icon"] svg'),
      (svg) => {
        svg.setAttribute("width", `${value}px`);
        svg.setAttribute("height", `${value}px`);
      }
    );
  }

  function setIconStrokeWeight(value) {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-role="icon"][data-style="outline"] svg'),
      (svg) => {
        svg.setAttribute("stroke-width", value);
      }
    );
  }

  function setIconColor(value) {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-role="icon"] svg'),
      (svg) => {
        svg.style.color = value;
      }
    );
  }

  useEffect(() => {
    setIconSize(defaultSize);
    setIconStrokeWeight(defaultStrokeWeight);
    setIconColor(getThemeColor());
    setColor(getThemeColor());
  }, []);

  function handleSizeChange(value) {
    setIconSize(value);
    setSize(value);
  }

  function handleStrokeWeightChange(value) {
    setIconStrokeWeight(value);
    setStrokeWeight(value);
  }

  function handleColorChange(value) {
    setIconColor(value);
    setColor(value);
  }

  function handleReset() {
    setIconSize(defaultSize);
    setIconStrokeWeight(defaultStrokeWeight);
    setIconColor(getThemeColor());
    setSize(defaultSize);
    setStrokeWeight(defaultStrokeWeight);
    setColor(getThemeColor());
  }

  return (
    <form className={styles.setting}>
      <div className={styles.header}>
        <div className={styles.title}>{t("customize")}</div>
        <Button className={styles.reset} onClick={handleReset}>
          {t("reset")}
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <label>{t("size")}</label>
          <Slider 
            value={size} 
            min={16} 
            max={48} 
            onInput={handleSizeChange} />
        </div>
        <div className={styles.item}>
          <label>{t("strokeWeight")}</label>
          <Slider
            value={strokeWeight}
            step={0.1}
            min={0.5}
            max={2}
            onInput={handleStrokeWeightChange}
          />
        </div>
        <div className={styles.item2}>
          <label>{t("color")}</label>
          <ColorPicker value={color} onChange={handleColorChange} />
        </div>
      </div>
    </form>
  );
}

export default Setting;
