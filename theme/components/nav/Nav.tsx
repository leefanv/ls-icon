import type { PageOpts } from "nextra";
import Link from "next/link";
import classNames from "classnames";

import Menus from "../menus/Menus";
import { ThemeConfig } from "../../type";
import {
  Group,
  isDefaultGroup,
  getMenusByPageGroup,
} from "../../resolve";

import styles from "./Nav.module.scss";

interface NavProps {
  pageGroups: Group[];
  pageOpts: PageOpts;
  themeConfig: ThemeConfig;
}

function getLevelTopActivePage(pageGroups, route) {
  let activePage;
  pageGroups.some(group => {
    activePage = group.children.find(page => route.startsWith(page.path));
    if (activePage) {
      return true;
    }

    return false
  })

  return activePage
}

function Nav({ pageGroups, pageOpts, themeConfig }: NavProps) {
  const levelTopActivePage = getLevelTopActivePage(pageGroups, pageOpts.route);
  const defaultNextPageGroup = levelTopActivePage.children.find(isDefaultGroup);
  const nextPageGroups = levelTopActivePage.children.filter(
    (group) => !isDefaultGroup(group)
  );

  const menus = getMenusByPageGroup(defaultNextPageGroup);
  return (
    <nav className={styles.nav}>
      <div className={styles.top}>
        {pageGroups.map((group) => {
          return (
            <div key={group.title} className={styles.block}>
              {group.children.map((page) => {
                const icon = themeConfig.icons?.[page.meta.icon];

                return (
                  <Link
                    key={page.name}
                    href={page.route}
                    className={classNames(styles.link, {
                      [styles.active]: pageOpts.route.startsWith(page.path),
                    })}
                  >
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <span>{page.title}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={styles.second}>
        {!!menus.length && (
          <div className={styles.menus}>
            <Menus route={pageOpts.route} data={menus} />
          </div>
        )}
        <div className={styles.groups}>
          {nextPageGroups.map((group) => {
            return (
              <div key={group.title} className={styles.group}>
                <div className={styles.title}>{group.title}</div>
                {group.children.map((page) => {
                  return (
                    <Link
                      key={page.name}
                      href={page.route}
                      className={classNames(styles.link2, {
                        [styles.active]: pageOpts.route.startsWith(page.path),
                      })}
                    >
                      {page.title}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
