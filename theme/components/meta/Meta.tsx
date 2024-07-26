import Link from "next/link";

import GithubIcon from "../../../assets/icons/github.svg";

import styles from "./Meta.module.scss";

interface MetaProps {
  github?: string;
  title: string;
  description?: string;
}

function Meta({ github, title, description }: MetaProps) {
  return (
    <div className={styles.meta}>
      {title && (
        <h1 className={styles.title}>
          {title}
          {github && (
            <Link className={styles.github} href={github}>
              Github<GithubIcon></GithubIcon>
            </Link>
          )}
        </h1>
      )}
      {description && <p>{description}</p>}
    </div>
  );
}

export default Meta;
