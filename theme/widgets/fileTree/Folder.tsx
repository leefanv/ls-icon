import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import FolderCloseIcon from "@/assets/icons/folder-close.svg";
import FolderOpenIcon from "@/assets/icons/folder-open.svg";

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
                <FolderOpenIcon className={styles.icon} />
              ) : (
                <FolderCloseIcon className={styles.icon} />
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
