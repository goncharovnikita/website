import styles from "./index.module.scss";

export default function ContentTitle(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.children}</h2>
      <hr className={styles.divider} />
    </div>
  );
}
