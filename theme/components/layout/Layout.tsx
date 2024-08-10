import { ReactNode } from "react";
import classNames from "classnames";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import RightIcon from "@/assets/icons/right.svg";

import styles from "./Layout.module.scss";

interface LayoutProps {
  isFullScreen: boolean;
  header: ReactNode;
  footer: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}

function Layout({
  isFullScreen,
  header,
  footer,
  left,
  right,
  children,
}: LayoutProps) {
  const t = useTranslations();

  const hasLeft = !!left;
  const hasRight = !!right;

  if (isFullScreen) {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.container}>{header}</div>
        </header>
        <main className={styles.full}>{children}</main>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>{header}</div>
      </header>
      <Popover className={styles.menus}>
        <PopoverButton>
          <span>{t("menus")}</span>
          <RightIcon className={styles.icon} />
        </PopoverButton>
        <PopoverPanel className={styles.panel}>{left}</PopoverPanel>
      </Popover>
      <div className={styles.aside}>
        {hasLeft && (
          <div className={classNames(styles.left, "scroll")}>{left}</div>
        )}
        {hasRight && (
          <div className={classNames(styles.right, "scroll")}>{right}</div>
        )}
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
            <footer>{footer}</footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
