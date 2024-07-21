import React from "react";
import { useRouter } from "next/router";

import LanguageIcon from "../../../assets/icons/language.svg";
import Dropdown from "../dropdown/Dropdown";

import styles from "./Language.module.scss";

function Language() {
  const router = useRouter();

  function handleLanguageChange(value) {
    router.replace(router.asPath, undefined, { locale: value });
  }

  return (
    <Dropdown
      title={
        <div className={styles.language}>
          <LanguageIcon className={styles.icon}></LanguageIcon>
        </div>
      }
      options={[
        { label: "English", value: "en-US" },
        { label: "中文", value: "zh-CN" },
      ]}
      onChange={handleLanguageChange}
    />
  );
}

export default Language;
