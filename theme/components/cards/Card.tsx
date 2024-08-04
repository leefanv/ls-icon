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
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </a>
  );
}

export default Card;
