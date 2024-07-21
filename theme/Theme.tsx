import type { NextraThemeLayoutProps } from "nextra";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

import { ThemeConfig } from "./type";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Aside from "./components/aside/Aside";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import Meta from "./components/meta/Meta";
import Layout from "./components/layout/Layout";

import { resolvePages, groupPages, getPageBreadcrumbs } from "./resolve";

import styles from "./Theme.module.scss";

interface ThemeProps extends NextraThemeLayoutProps {
  themeConfig: ThemeConfig;
}

export default function Theme({
  children,
  pageOpts,
  themeConfig: { language = {}, ...themeConfig },
}: ThemeProps) {
  const router = useRouter();

  const localeConfig = language[router.locale];

  const localeThemeConfig = {
    ...themeConfig,
    ...localeConfig,
  };

  if (pageOpts.route === "/index") {
    return;
  }
  const isIndex = pageOpts.route === "/";

  const { pageMap } = pageOpts;
  const pages = resolvePages(pageMap, router.locale);
  const pageGroups = groupPages(pages.filter((page) => page.name !== "index"));
  const breadcrumbs = getPageBreadcrumbs(pages, pageOpts.route);

  const showMetaPage = breadcrumbs
    .slice()
    .reverse()
    .find((breadcrumb) => breadcrumb.meta.show);

  return (
    <Layout
      isIndex={isIndex}
      header={<Header themeConfig={localeThemeConfig} />}
      left={
        !isIndex && <Nav
          pageGroups={pageGroups}
          pageOpts={pageOpts}
          themeConfig={localeThemeConfig}
        />
      }
      right={!isIndex && <Aside pageOpts={pageOpts} themeConfig={localeThemeConfig} />}
    >
      {isIndex && children}
      {!isIndex && (
        <>
          <Breadcrumbs data={breadcrumbs} />
          {showMetaPage && <Meta {...showMetaPage.meta}></Meta>}
          {showMetaPage && !!showMetaPage.children?.length && (
            <div className={styles.links}>
              {showMetaPage.children.map((item) => {
                return (
                  <Link
                    key={item.name}
                    className={classNames(styles.link, {
                      [styles.active]: pageOpts.route.startsWith(item.path),
                    })}
                    href={item.route}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          )}
          {children}
        </>
      )}
    </Layout>
  );
}
