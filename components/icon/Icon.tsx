import { Button } from "@headlessui/react";
import { useState, useRef, ReactNode } from "react";
import { useTranslations } from "next-intl";

import styles from "./Icon.module.scss";

interface IconProps {
  name: string;
  title: string;
  onCopy?: (data: string) => void;
  children: ReactNode;
}

function Icon({ name, title, onCopy = () => {}, children, ...props }: IconProps) {
  const svgContainerEl = useRef(null);
  const [coped, setCoped] = useState(false);
  const t = useTranslations();

  function handleCopy() {
    const data = svgContainerEl.current.querySelector('svg').outerHTML;
    onCopy(data);
    setCoped(true);
  }

  function handleDownload() {
    const svgEl = svgContainerEl.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.icon} onMouseLeave={() => setCoped(false)} {...props}>
      <div ref={svgContainerEl} className={styles.content}>
        {children}
        <span className={styles.title}>{title}</span>
      </div>
      {coped ? (
        <div className={styles.coped}>{t("coped")}</div>
      ) : (
        <div className={styles.overlay}>
          <Button
            id={name}
            className={styles["copy-name"]}
            onClick={handleCopy}
          >
            {t("copy")}
          </Button>
          <Button
            id={`use_${name}`}
            className={styles["copy-use"]}
            onClick={handleDownload}
          >
            {t("download")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Icon;
