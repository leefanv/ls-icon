import React, { useState, useRef, useEffect } from "react";
import Tabs from "@/theme/widgets/tabs/Tabs";
import Icon from "@/components/icon/Icon";
import Search from "@/components/search/Search";
import * as IconComponents from "@wisdesign/icons";
import icons from "@wisdesign/icons/components/meta";
import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect'
import { useTranslations } from "next-intl";
import Clipboard from "@/components/clipboard/Clipboard";

import Setting from "./Setting";

import styles from "./Icons.module.scss";

React.useLayoutEffect = React.useEffect

function Icons() {
  const clipboard = useRef(null);
  const setting = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [showIcons, setShowIcons] = useState(icons);
  const t = useTranslations();

  function getShowIcons() {
    if (!searchText) {
      return icons;
    }

    return icons.map((item) => {
      return {
        ...item,
        children: item.children
          .map((category) => {
            return {
              ...category,
              children: category.children.filter((icon) => {
                return icon.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase());
              }),
            };
          })
          .filter((category) => category.children.length > 0),
      };
    });
  }

  useUpdateEffect(() => {
    setting.current.set();
  }, [showIcons])

  useEffect(() => {
    setShowIcons(getShowIcons());
  }, [searchText])

  const handleSearch = useDebouncedCallback((value = "") => {
    setSearchText(value.trim());
  });

  function handleCopy(data) {
    clipboard.current.copy(data);
  }

  return (
    <div className={styles.icons}>
      <div className={styles.content}>
        <Clipboard ref={clipboard} />
        <Tabs>
          <Tabs.Actions>
            <Search onSearch={handleSearch} />
          </Tabs.Actions>
          {showIcons.map((item) => {
            return (
              <Tabs.Panel key={item.title} title={t(item.name)}>
                {item.children.map((category) => {
                  return (
                    <div key={category.title} className={styles.category}>
                      <div className={styles.header}>
                        <div className={styles.left}>
                          <span className={styles.title}>{category.title}</span>
                          <span className={styles.helper}>
                            {category.children.length} {t("icon")}
                          </span>
                        </div>
                        <div className={styles.right} />
                      </div>
                      <div className={styles.content}>
                        {category.children.map((icon) => {
                          const IconComponent = IconComponents[icon.name];
                          return (
                            <div key={icon.name} className={styles.icon}>
                              <Icon
                                name={icon.name}
                                title={icon.title}
                                onCopy={handleCopy}
                                data-role="icon"
                                data-category={category.name}
                                data-style={item.name}
                                data-name={icon.name}
                              >
                                <IconComponent />
                              </Icon>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
      <Setting ref={setting} />
    </div>
  );
}

export default Icons;
