import FileIcon from "@/assets/icons/magic.svg";

import styles from "./File.module.scss";

interface FileProps {
  name: string;
  content: string;
}

function File({ name, content }: FileProps) {
  return (
    <div className={styles.file}>
      <FileIcon className={styles.icon} />
      <span className={styles.title}>{name}</span>
      {content && <span className={styles.description}>{content}</span>}
    </div>
  );
}

export default File;
