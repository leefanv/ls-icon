import Link from "next/link";

import GithubIcon from "../../../assets/icons/github.svg";

import styles from "./Meta.module.scss";

interface MetaProps {
  show: boolean;
  github?: string;
  title: string;
  description?: string;
}

function Meta({ show, github, title, description }: MetaProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.meta}>
      {title && (
        <h1 className={styles.title}>
          {title}
          {github && (
            <Link className={styles.github} href={github}>
              github<GithubIcon></GithubIcon>
            </Link>
          )}
        </h1>
      )}
      {description && <p>{description}</p>}
    </div>
  );
}

export default Meta;
