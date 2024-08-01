import { useEffect } from "react";
import docsearch from "@docsearch/js";
import { useTranslations } from "next-intl";

import type { ThemeConfig } from "../../type";

type SearchProps = {
  themeConfig: ThemeConfig;
};

function Search({ themeConfig }: SearchProps) {
  const t = useTranslations();

  useEffect(() => {
    docsearch({
      container: "#search",
      translations: t.raw('docSearch'),
      placeholder: t('docSearch.placeholder'),
      ...themeConfig.algolia,
    });
  }, []);

  return <div id="search"></div>;
}

export default Search;
