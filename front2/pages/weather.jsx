import axios from "axios";

import Link from "next/link";
import getConfig from 'next/config';
import styles from './weather.module.scss';

import ContentTitle from "../components/ContentTitle";
import Sidebar from "../components/Sidebar";
import AppButton from "../components/AppButton";
import AppDate from "../components/AppDate";

const reloadPage = () => {
    document.location.reload();
};

function Weather(props) {
    return (
        <div className={styles.layout}>
            <Sidebar active="weather" />
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <ContentTitle>Погода</ContentTitle>
                </div>
                {!props.error ? (
                    <div className={styles.weatherContainer}>
                        <div className={styles.weatherBox}>
                            <span className={styles.temperature}>
                                {props.temperature}
                            </span>
                            <client-only>
                                <p className={styles.updatedTitle}>
                                    Обновлено: <AppDate date={props.date} />
                                </p>
                            </client-only>
                        </div>
                    </div>
                ) : (
                    <div className={styles.weatherContainer}>
                        <div className={styles.weatherBox}>
                            <p className={styles.errorMessage}>Some error occurred</p>
                            <AppButton
                                onClick={reloadPage}
                                text="Reload page"
                            ></AppButton>
                        </div>
                    </div>
                )}

                <div className={styles.footerContainer}>
                    <Link href="/">
                        <a className={styles.footerTitle}>На главную</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Weather.getInitialProps = async function(context) {
    try {
        const env = getConfig().publicRuntimeConfig;
        const reqUrl = env.apiBaseUrl + env.requestWeatherUrl;
        const {
            data: { tInt, upZero, dt }
        } = await axios.get(reqUrl);

        const temperature = (() => {
            if (upZero) {
                return `+${tInt}`;
            }

            return `-${tInt}`;
        })();

        return { temperature, date: dt, error: false };
    } catch (e) {
        console.error(e);
        return { error: true };
    }
};

export default Weather;
