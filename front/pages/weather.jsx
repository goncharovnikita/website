import React from "react";
import axios from "axios";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

import Link from "next/link";
import getConfig from "next/config";
import styles from "./weather.module.scss";

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
                    <>
                        <div className={styles.weatherContainer}>
                            <div className={styles.weatherBox}>
                                <span className={styles.temperature}>
                                    {props.temperature}
                                </span>
                                {process.browser ? (
                                    <p className={styles.updatedTitle}>
                                        Обновлено: <AppDate date={props.date} />
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer
                                width={"100%"}
                                height={320}
                            >
                                <BarChart
                                    data={props.history}
                                    margin={{ right: 20 }}
                                >
                                    <XAxis dataKey="dt" />
                                    <YAxis />
                                    <Bar
                                        dataKey="tAvg"
                                        fill="var(--accent-color)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                ) : (
                    <div className={styles.weatherContainer}>
                        <div className={styles.weatherBox}>
                            <p className={styles.errorMessage}>
                                Some error occurred
                            </p>
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
        const historyReqUrl = env.apiBaseUrl + env.requestWeatherHistoryUrl;

        const {
            data: { tInt, upZero, dt }
        } = await axios.get(reqUrl);

        const { data: history } = await axios.get(historyReqUrl);

        const temperature = (() => {
            if (upZero) {
                return `+${tInt}`;
            }

            return `-${tInt}`;
        })();

        return {
            temperature,
            history: history.map(h => ({
                ...h,
                dt: new Date(h.dt).toLocaleDateString()
            })),
            date: dt,
            error: false
        };
    } catch (e) {
        console.error(e);
        return { error: true };
    }
};

export default Weather;
