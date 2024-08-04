import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import FolderIcon from "@/assets/icons/github.svg";
import OpenFolderIcon from "@/assets/icons/git.svg";

import styles from "./Folder.module.scss";

interface FolderProps {
  name: string;
  content: string;
  defaultOpen: boolean;
  children: ReactNode;
}

function Folder({ name, content, defaultOpen, children }: FolderProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        return (
          <>
            <DisclosureButton className={styles.folder}>
              {open ? (
                <OpenFolderIcon className={styles.icon} />
              ) : (
                <FolderIcon className={styles.icon} />
              )}
              <span className={styles.title}>{name}</span>
              {content && <span className={styles.description} title={content}>{content}</span>}
            </DisclosureButton>
            <DisclosurePanel className={styles.content}>
              {children}
            </DisclosurePanel>
          </>
        );
      }}
    </Disclosure>
  );
}

export default Folder;
