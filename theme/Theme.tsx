import "focus-visible";
import classNames from "classnames";
import { useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { useTranslations } from "next-intl";
import ThemeTool from "@/theme/components/theme/Theme";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";

import styles from "./Theme.module.scss";

export default function Theme({ children }) {
  const [collapse, setCollapse] = useState(false);
  const onScroll = useGlobalEvent("scroll");
  const t = useTranslations();
  const mainEl = useRef(null);

  onScroll(() => {
    const { top } = mainEl.current.getBoundingClientRect();
    if (top <= 0 && !collapse) {
      setCollapse(true);
    } else if (top > 0 && collapse) {
      setCollapse(false);
    }
  });

  return (
    <div className={styles.layout}>
      <header className={classNames(styles.header, { [styles.collapse]: collapse })}>
        <div className={styles.container}>
          <Logo />
          <div className={styles.tools}>
            <Link
              className={styles.tool}
              href="https://wis.design/components/icon"
            >
              {t("document")}
            </Link>
            <Link
              className={classNames(styles.cta, styles.figma)}
              href="https://www.figma.com/design/YHxoWAu8TE5ZOOebA2MHtN/wis-icon?node-id=666-3&t=73vKfDXG2Zy9Te2J-0"
            >
              {t("getFigma")}
            </Link>
            <ThemeTool />
          </div>
        </div>
      </header>
      <div className={styles.section}>
        <div className={styles.layer} />
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.tags}>
              <div className={styles.tag}>{t("openSource")}</div>
              <div className={styles.divide} />
              <div className={styles.tag}>{t("easyInter")}</div>
              <div className={styles.divide} />
              <div className={styles.tag}>{t("custom")}</div>
            </div>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.description}>{t("description")}</p>
            <div className={styles.marker}>{t("marker")}</div>
          </div>
          <svg className={styles.chart} viewBox="-4 -4 328 328">
            <rect
              className={styles.helper}
              width={280}
              height={280}
              x={20}
              y={20}
              rx={10}
              ry={10}
            ></rect>
            <rect
              className={styles.helper}
              width={320}
              height={240}
              x={0}
              y={40}
              rx={10}
              ry={10}
            ></rect>
            <rect
              className={styles.helper}
              width={240}
              height={320}
              x={40}
              y={0}
              rx={10}
              ry={10}
            ></rect>
            <circle
              className={styles.helper}
              cx={160}
              cy={160}
              r={160}
            ></circle>
            <path className={styles.path}></path>
          </svg>
        </div>
      </div>
      <main ref={mainEl} className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <Logo className={styles.logo} />
          <p>
            <strong className={styles.strong}>{t("brandName")}</strong> inspired
            by the command line "ls" command, is designed to provide developers
            and
            <br />
            designers with an efficient and flexible open-source icon resource
            website.
          </p>
          <p>
            © {new Date().getFullYear()} by the makers of{" "}
            <strong className={styles.strong}><a target="_blank" href="https://wis.design">wis.design</a></strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
