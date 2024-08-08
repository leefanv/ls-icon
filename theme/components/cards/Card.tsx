import { ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps {
  href: string;
  icon: ReactNode;
  title: string;
  children: string;
}

function Card({ href, title, icon, children }: CardProps) {
  return (
    <a className={styles.card} href={href}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </a>
  );
}

export default Card;
