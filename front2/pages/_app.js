import { YMInitializer } from 'react-yandex-metrika';

import styles from "./app.module.scss";

import '../styles/index.scss';

const accounts = [57556537];

export default function MyApp({Component, pageProps}) {
  return (
      <>
          <YMInitializer accounts={accounts} />
          <div className={styles.content}>
              <Component {...pageProps} />
          </div>
      </>
  );
}
