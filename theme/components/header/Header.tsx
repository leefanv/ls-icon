import Link from "next/link";
import { useRouter } from "next/router";

import Search from "../search/Search";
import Language from "../language/Language";
import Theme from "../theme/Theme";
import GithubIcon from "../../../assets/icons/github.svg";
import PlaceholderIcon from "../../../assets/icons/placeholder.svg";
import type { ThemeConfig } from "../../type";

import styles from "./Header.module.scss";

type HeaderProps = {
  themeConfig: ThemeConfig;
};

export default function Header({ themeConfig }: HeaderProps) {
  const router = useRouter();

  function handleGoHome() {
    router.push("/");
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={handleGoHome}>
        {themeConfig?.logo}
      </div>
      <nav className={styles.nav}>
        {themeConfig?.links?.map((link) => {
          return (
            <div className={styles.link} key={link.title + link.url}>
              <Link href={link.url}>{link.title}</Link>
              <PlaceholderIcon className={styles.icon} />
            </div>
          );
        })}
      </nav>
      <div className={styles.toolbar}>
        <Search themeConfig={themeConfig} />
        <div className={styles.divide}></div>
        <div className={styles.tools}>
          <Theme />
          <Language />
        </div>
        {themeConfig.github && (
          <>
            <div className={styles.divide}></div>
            <a
              className={styles.link}
              href={themeConfig.github}
              target="__blank"
            >
              <GithubIcon className={styles.github} />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
