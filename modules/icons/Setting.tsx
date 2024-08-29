import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@headlessui/react";
import {
  LinecapButtIcon,
  LinecapSquareIcon,
  LinecapRoundIcon,
  LinejoinMiterIcon,
  LinejoinBevelIcon,
  LinejoinRoundIcon,
} from "@wisdesign/icons";
import Slider from "@/components/slider/Slider";
import ColorPicker from "@/components/colorPicker/ColorPicker";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import Group from "@/components/group/Group";

import styles from "./Setting.module.scss";

function Setting(props, ref) {
  const defaultSize = 24;
  const defaultStrokeWeight = 1;
  const defaultLinecap = 'butt';
  const defaultLinejoin = 'miter';

  const t = useTranslations();
  const [size, setSize] = useState(defaultSize);
  const [strokeWeight, setStrokeWeight] = useState(defaultStrokeWeight);
  const [linecap, setLinecap] = useState(defaultLinecap);
  const [linejoin, setLinejoin] = useState(defaultLinejoin);
  const [color, setColor] = useState("#000000");

  useImperativeHandle(ref, () => {
    return {
      set: () => {
        setIconSize(size);
        setIconStrokeWeight(strokeWeight);
        setIconColor(color);
        setIconLinecap(linecap);
        setIconLinejoin(linejoin);
      },
    }
  })

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

  function setIconLinecap(value) {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-role="icon"][data-style="outline"] svg'),
      (svg) => {
        svg.setAttribute("stroke-linecap", value);
      }
    );
  }

  function setIconLinejoin(value) {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-role="icon"][data-style="outline"] svg'),
      (svg) => {
        svg.setAttribute("stroke-linejoin", value);
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
    setIconLinecap(defaultLinecap);
    setIconLinejoin(defaultLinejoin);
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

  function handleLinecapChange(value) {
    setIconLinecap(value);
    setLinecap(value);
  }

  function handleLinejoinChange(value) {
    setIconLinejoin(value);
    setLinejoin(value);
  }

  function handleReset() {
    setIconSize(defaultSize);
    setIconStrokeWeight(defaultStrokeWeight);
    setIconColor(getThemeColor());
    setIconLinecap(defaultLinecap);
    setIconLinejoin(defaultLinejoin);

    setSize(defaultSize);
    setStrokeWeight(defaultStrokeWeight);
    setColor(getThemeColor());
    setLinecap(defaultLinecap);
    setLinejoin(defaultLinejoin);
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
          <div className={styles.value}>
            <Slider value={size} min={16} max={48} onInput={handleSizeChange} />
          </div>
        </div>
        <div className={styles.item}>
          <label>{t("strokeWeight")}</label>
          <div className={styles.value}>
            <Slider
              value={strokeWeight}
              step={0.1}
              min={0.5}
              max={2}
              onInput={handleStrokeWeightChange}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label>{t("linecap")}</label>
          <div className={styles.value}>
            <Group value={linecap} onChange={handleLinecapChange}>
              <Group.Item value="butt" label={t("butt")}>
                <LinecapButtIcon />
              </Group.Item>
              <Group.Item value="square" label={t("square")}>
                <LinecapSquareIcon />
              </Group.Item>
              <Group.Item value="round" label={t("round")}>
                <LinecapRoundIcon />
              </Group.Item>
            </Group>
          </div>
        </div>
        <div className={styles.item}>
          <label>{t("linejoin")}</label>
          <div className={styles.value}>
            <Group value={linejoin} onChange={handleLinejoinChange}>
              <Group.Item value="miter" label={t("butt")}>
                <LinejoinMiterIcon />
              </Group.Item>
              <Group.Item value="bevel" label={t("square")}>
                <LinejoinBevelIcon />
              </Group.Item>
              <Group.Item value="round" label={t("round")}>
                <LinejoinRoundIcon />
              </Group.Item>
            </Group>
          </div>
        </div>
        <div className={styles.item}>
          <label>{t("color")}</label>
          <div className={styles.value}>
            <ColorPicker value={color} onChange={handleColorChange} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default forwardRef(Setting);
