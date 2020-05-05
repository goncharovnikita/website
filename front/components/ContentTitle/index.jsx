import styles from "./index.module.scss";

import cls from 'classnames';

export default function ContentTitle(props) {
  return (
    <div className={styles.container}>
      <h2 className={cls(styles.title, 'font-title')}>{props.children}</h2>
      <hr className={styles.divider} />
    </div>
  );
}
