import styles from "./Steps.module.scss";

function Steps({ children }) {
  return <div className={styles.steps}>{children}</div>;
}

export default Steps;
