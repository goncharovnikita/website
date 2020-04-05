import styles from "./app.module.scss";

import '../styles/index.scss';

export default function MyApp({Component, pageProps}) {
  return (
    <div className={styles.content}>
      <Component {...pageProps} />
    </div>
  );
}
