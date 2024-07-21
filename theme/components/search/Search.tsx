import { useEffect } from "react";
import docsearch from "@docsearch/js";

import type { ThemeConfig } from "../../type";

type SearchProps = {
  themeConfig: ThemeConfig;
};

function Search({ themeConfig }: SearchProps) {
  useEffect(() => {
    if (process.browser) {
      docsearch({
        container: "#search",
        ...themeConfig.algolia,
      });
    }
  }, []);

  return <div id="search"></div>;
}

export default Search;
