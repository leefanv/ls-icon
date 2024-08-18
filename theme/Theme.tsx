import type { NextraThemeLayoutProps } from "nextra";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import classNames from "classnames";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import "focus-visible";

import { ThemeConfig } from "./type";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import Aside from "./components/aside/Aside";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import Meta from "./components/meta/Meta";
import Layout from "./components/layout/Layout";

import {
  resolvePages,
  groupPages,
  getPageBreadcrumbs,
  getActivePage,
} from "./resolve";

import styles from "./Theme.module.scss";

interface ThemeProps extends NextraThemeLayoutProps {
  themeConfig: ThemeConfig;
}

export default function Theme({
  children,
  pageOpts,
  themeConfig: { language = {}, ...themeConfig },
}: ThemeProps) {
  const onHashChange = useGlobalEvent("hashchange");
  const router = useRouter();

  const localeConfig = language[router.locale];

  const localeThemeConfig = {
    ...themeConfig,
    ...localeConfig,
  };

  const { pageMap } = pageOpts;
  const pages = resolvePages(pageMap, router.locale);
  const pageGroups = groupPages(pages.filter((page) => page.name !== "index"));
  const breadcrumbs = getPageBreadcrumbs(pages, pageOpts.route);
  const activePage = getActivePage(pages, pageOpts.route);

  const reverseBreadcrumbs = breadcrumbs.slice().reverse();
  const showMetaPage = reverseBreadcrumbs.find(
    (breadcrumb) => breadcrumb.meta.showMeta
  );
  const showSubMenuPage = reverseBreadcrumbs.find(
    (breadcrumb) => breadcrumb.meta.showSubMenu
  );
  const isFullScreen = !!activePage.meta.fullScreen;

  const title = breadcrumbs
    .slice(1, 3)
    .reverse()
    .map((breadcrumb) => breadcrumb.title)
    .join(" · ");

  onHashChange(() => {
    const scrollElement = document.documentElement || document.body;
    scrollElement.scrollTop = Math.max(scrollElement.scrollTop - 64, 0);
  });

  return (
    <Layout
      isFullScreen={isFullScreen}
      header={<Header themeConfig={localeThemeConfig} />}
      footer={<Footer themeConfig={localeThemeConfig} />}
      left={
        <Nav
          pageGroups={pageGroups}
          pageOpts={pageOpts}
          themeConfig={localeThemeConfig}
        />
      }
      right={<Aside pageOpts={pageOpts} themeConfig={localeThemeConfig} />}
    >
      <Head>
        <title>{`${title} with Wis Design System`}</title>
      </Head>
      {isFullScreen && children}
      {!isFullScreen && (
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
