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

import { resolvePages, groupPages, getPageBreadcrumbs, getActivePage } from "./resolve";

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
  const activePage = getActivePage(pages, pageOpts.route);

  const reverseBreadcrumbs = breadcrumbs.slice().reverse();
  const showMetaPage = reverseBreadcrumbs.find((breadcrumb) => breadcrumb.meta.showMeta);
  const showSubMenuPage = reverseBreadcrumbs.find((breadcrumb) => breadcrumb.meta.showSubMenu);

  return (
    <Layout
      isFullScreen={activePage.meta.fullScreen}
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
          {showMetaPage && <Meta {...showMetaPage.meta} />}
          {showSubMenuPage && !!showSubMenuPage.children?.length && (
            <div className={styles.links}>
              {showSubMenuPage.children.map((item) => {
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
