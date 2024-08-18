import { Button } from "@headlessui/react";
import { useState, useEffect } from "react";
import Clipboard from "clipboard";
import { useTranslations } from "next-intl";

import styles from "./Icon.module.scss";

function Icon({ name, title, children }) {
  const [coped, setCoped] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    new Clipboard(`#${name}`);
    new Clipboard(`#use_${name}`);
  }, []);

  return (
    <div className={styles.icon} onMouseLeave={() => setCoped(false)}>
      <div className={styles.content}>
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
            data-clipboard-text={name}
            onClick={() => setCoped(true)}
          >
            {t("copyName")}
          </Button>
          <Button
            id={`use_${name}`}
            className={styles["copy-use"]}
            data-clipboard-text={`<${name} />`}
            onClick={() => setCoped(true)}
          >
            {t("copyUse")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Icon;
