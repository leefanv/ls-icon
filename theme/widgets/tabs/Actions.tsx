import styles from "./Actions.module.scss";

function Actions({ children }) {
  return <div className={styles.actions}>{children}</div>;
}

Actions.$$type = "Actions";

export default Actions;
