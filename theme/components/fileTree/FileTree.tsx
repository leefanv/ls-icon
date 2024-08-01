import Folder from './Folder';
import File from './File';

import styles from './FileTree.module.scss';

function FileTree({ children }) {
  return <div className={styles.tree}>{children}</div>
}

FileTree.Folder = Folder;
FileTree.File = File;

export default FileTree;
