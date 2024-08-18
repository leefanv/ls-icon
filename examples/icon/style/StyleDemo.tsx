import { ContractIcon } from "@wisdesign/icons";
import { useTranslations } from "next-intl";
import Column from "@/components/column/Column";

import styles from "./StyleDemo.module.scss";

function StyleDemo() {
  const t = useTranslations();

  return (
    <Column>
      <ContractIcon className={styles.one} />
      <ContractIcon className={styles.two} />
      <ContractIcon className={styles.three} />
    </Column>
  );
}

export default StyleDemo;
