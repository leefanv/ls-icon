import { ReactNode } from "react";

import styles from "./Layout.module.scss";

interface LayoutProps {
  isIndex: boolean;
  header: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}

function Layout({ isIndex, header, left, right, children }: LayoutProps) {
  const hasLeft = !!left;
  const hasRight = !!right;

  if (isIndex) {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.container}>{header}</div>
        </header>
        <main className={styles.full}>{children}</main>
      </>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>{header}</div>
      </header>
      <div className={styles.aside}>
        {hasLeft && <div className={styles.left}>{left}</div>}
        {hasRight && <div className={styles.right}>{right}</div>}
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
      </main>
    </>
  );
}

export default Layout;
