import { Input } from "@headlessui/react";
import { SearchIcon } from "@wisdesign/icons";
import { useTranslations } from "next-intl";

import styles from "./Search.module.scss";

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

function Search({ placeholder, onSearch = () => {} }: SearchProps) {
  const t = useTranslations();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.icon} />
      <Input
        className={styles.input}
        placeholder={placeholder || t("searchPlaceholder")}
        onInput={handleSearch}
      ></Input>
    </div>
  );
}

export default Search;
