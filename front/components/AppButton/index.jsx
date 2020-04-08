import styles from './index.module.scss';

export default function AppButton(props) {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <span>{props.text}</span>
    </button>
  );
}
