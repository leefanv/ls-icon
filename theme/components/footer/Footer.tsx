import type { ThemeConfig } from "../../type";
import GithubIcon from "../../../assets/icons/github.svg";

import styles from "./Footer.module.scss";

type FooterProps = {
  themeConfig: ThemeConfig;
};

function Footer({ themeConfig }: FooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} Wis Design System
      </div>
      <div className={styles.social}>
        <a className={styles.link} href={themeConfig.github} target="__blank">
          <GithubIcon className={styles.github} />
        </a>
        {!!themeConfig.socials?.length && <div className={styles.divide} />}
        {themeConfig.socials?.map((social) => {
          return (
            <a className={styles.link} href={social.url} target="__blank">
              {social.icon}
            </a>
          )
        })}
      </div>
    </div>
  );
}

export default Footer;
