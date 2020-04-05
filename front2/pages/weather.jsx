import axios from "axios";

import Link from "next/link";
import getConfig from 'next/config';
import styled from "styled-components";

import ContentTitle from "../components/ContentTitle";
import Sidebar from "../components/Sidebar";
import AppButton from "../components/AppButton";
import AppDate from "../components/AppDate";

const reloadPage = () => {
    document.location.reload();
};

function Weather(props) {
    console.log(props);
    return (
        <Layout>
            <Sidebar active="weather" />
            <div className="content">
                <div className="title-container">
                    <ContentTitle>Погода</ContentTitle>
                </div>
                {!props.error ? (
                    <div className="weather-container">
                        <div className="weather-box">
                            <span className="temperature">
                                {props.temperature}
                            </span>
                            <client-only>
                                <p className="updated-title">
                                    Обновлено: <AppDate date={props.date} />
                                </p>
                            </client-only>
                        </div>
                    </div>
                ) : (
                    <div className="weather-container">
                        <div className="weather-box">
                            <p className="error-message">Some error occurred</p>
                            <AppButton
                                onClick={reloadPage}
                                text="Reload page"
                            ></AppButton>
                        </div>
                    </div>
                )}

                <div className="footer-container">
                    <Link href="/">
                        <a className="footer-title">На главную</a>
                    </Link>
                </div>
            </div>
        </Layout>
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
        return { error: true };
    }
};

const Layout = styled.div`
    opacity: 1;
    min-height: 100vh;
    display: grid;
    grid-template-areas: "sidebar content";
    grid-template-columns: 300px 700px;
    z-index: 199;

    @media (max-width: 600px) {
        display: grid;
        grid-template-areas: "content";
        grid-template-columns: 100%;
        z-index: 199;
        background-size: cover;
    }

    .sidebar {
        @media (max-width: 600px) {
            display: none !important;
        }
    }

    .error-message {
        color: var(--error-color);
        font-size: 2rem;
        line-height: 2rem;
        text-align: center;
    }

    .content {
        grid-area: content;
        display: grid;
        grid-template-areas: "title" "body";
        grid-template-rows: auto 1fr;

        @media (max-width: 600px) {
            grid-template-areas: "title" "body" "footer";
            grid-template-rows: auto 1fr auto;
        }
    }

    .title-container {
        grid-area: title;
    }

    .weather-container {
        grid-area: body;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .weather-box {
            display: grid;
            grid-row-gap: 24px;
            background-color: var(--sidebar-color);
            padding: 57px 24px;

            @media (max-width: 600px) {
                width: 100%;
            }

            .temperature {
                color: var(--primary-color);
                font-size: 8rem;
                line-height: 8rem;
                text-align: center;
            }

            .updated-title {
                text-align: center;
            }
        }
    }

    .footer-container {
        grid-area: footer;
        padding: 22px;
        text-align: center;
        display: none;

        @media (max-width: 600px) {
            display: block;
        }

        .footer-title {
            color: var(--accent-color);
            text-align: center;
            font-size: 20px;
        }
    }
`;

export default Weather;
