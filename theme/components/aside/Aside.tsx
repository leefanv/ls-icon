import type { PageOpts } from "nextra";
import { useState } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import { Button } from '@headlessui/react';
import useWindowScroll from "beautiful-react-hooks/useWindowScroll";
import PlaceholderIcon from "../../../assets/icons/placeholder.svg";
import TopIcon from "../../../assets/icons/top.svg";

import { ThemeConfig } from "../../type";

import styles from "./Aside.module.scss";

interface AsideProps {
  pageOpts: PageOpts;
  themeConfig: ThemeConfig;
}

function Aside({ pageOpts, themeConfig }: AsideProps) {
  const [activeId, setActiveId] = useState("");
  const t = useTranslations();
  const onWindowScroll = useWindowScroll();

  onWindowScroll((event) => {
    const head = pageOpts.headings.find((head) => {
      const element = document.getElementById(head.id);
      const { top } = element.getBoundingClientRect();
      return top > 64;
    });

    if (!head) {
      return;
    }
    setActiveId(head.id);
  });

  function handleToTop() {
    const scrollElement = document.documentElement || document.body;
    
    let scrollTop = scrollElement.scrollTop;
    const step = Math.max(scrollTop / 100, 100);
    let timer = setInterval(() => {
      scrollTop = Math.max(scrollTop - step, 0);
      scrollElement.scrollTop = scrollTop
      if (scrollTop <= 0) {
        clearInterval(timer)
        timer = null
      }
    }, 10)
  }

  return (
    <div className={styles.aside}>
      <div className={styles.title}>{t("sideTitle")}</div>
      {pageOpts.headings.map((head) => {
        return (
          <a
            key={head.id}
            className={classNames(styles.link, {
              [styles.active]: activeId === head.id,
            })}
            style={{ textIndent: `${(head.depth - 2) * 16}px` }}
            href={`#${head.id}`}
            onClick={() => setActiveId(head.id)}
          >
            {head.value}
          </a>
        );
      })}
      <div className={styles.bottom}>
        {themeConfig.footerLinks?.map((link) => {
          return (
            <a key={link.title + link.url} className={styles.link} href={link.url}>
              {link.title}
              <PlaceholderIcon className={styles.icon} />
            </a>
          );
        })}
        <Button className={styles.link} onClick={handleToTop}>
          {t("scrollTop")}
          <TopIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  );
}

export default Aside;
