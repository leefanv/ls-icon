import styles from "./Column.module.scss";

interface ColumnProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function Column({ title, description, children }: ColumnProps) {
  return (
    <div className={styles.column}>
      {(title || description) && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Column;
