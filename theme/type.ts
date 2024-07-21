import type { ReactElement, ReactNode } from "react";

type Link = {
  // link title
  title: string;

  // link url
  url: string;
};

type Algolia = {
  appId: string;
  apiKey: string;
  indexName: string;
}

type LanguageThemeConfig = {
  logo?: ReactNode;
  links?: Link[];
  github?: string;
}

interface LocaleThemeConfig {
  [language: string]: LanguageThemeConfig
}

interface Icon {
  [propName: string]: ReactElement;
}

export type ThemeConfig = {
  // site logo
  logo: ReactNode;

  // site links
  links: Link[];

  // site footer links
  footerLinks: Link[];

  // algolia search
  algolia: Algolia;

  // github
  github?: string;

  icons?: Icon;

  // international language support
  language?: LocaleThemeConfig;
};
