import classNames from "classnames";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return <div className={classNames(styles.logo, { [className]: className })} />;
}

export default Logo;
