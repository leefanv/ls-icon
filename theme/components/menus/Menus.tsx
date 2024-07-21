import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import classNames from "classnames";

import LeftIcon from "../../../assets/icons/left.svg";

import styles from "./Menus.module.scss";

interface Menu {
  name: string;
  title: string;
  route: string;
  children?: Menu[];
}

type MenusProps = {
  route: string;
  data: Menu[];
};

function Menus({ data, route }: MenusProps) {
  return (
    <Disclosure defaultOpen>
      {data.map((menu) => {
        if (!menu.children?.length) {
          return (
            <Link
              key={menu.name}
              className={classNames(styles.menu, {
                [styles.active]: route.startsWith(menu.route),
              })}
              href={menu.route}
            >
              {menu.title}
            </Link>
          );
        }

        return (
          <div key={menu.name}>
            <DisclosureButton className={styles.button}>
              <span className={styles.title}>{menu.name}</span>
              <LeftIcon className={styles.icon} />
            </DisclosureButton>
            <DisclosurePanel className={styles.content}>
              <Menus route={route} data={menu.children} />
            </DisclosurePanel>
          </div>
        );
      })}
    </Disclosure>
  );
}

export default Menus;
