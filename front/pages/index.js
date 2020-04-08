import styles from "./index.module.scss";

import Sidebar from "../components/Sidebar";
import ContentTitle from "../components/ContentTitle";
import ProjectCard from "../components/ProjectCard";

const projectCards = [
    {
        title: "ReactVPN",
        description:
            "ReactVPN - это мобильное приложение, позволяющее создать быстрое VPN соединение с одним из многих серверов по всему миру",
        href: "https://reactvpn.com",
        img: require("images/reactvpn-logo.png?resize&size=240"),
        links: [
            {
                type: "web",
                href: "https://reactvpn.com"
            }
        ]
    },
    {
        title: "Parfumsearch",
        description:
            "Parsumsearch - быстрый и удобный поиск духов по брендам, нотам и названиям",
        href: "https://parfumsearch.com",
        img: require("images/parfumsearch-logo.png?resize&size=240"),
        links: [
            {
                type: "web",
                href: "https://parfumsearch.com"
            }
        ]
    }
];

const Home = () => (
    <>
        <div className={styles.layout}>
            <Sidebar active="projects" />
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <ContentTitle>Проекты</ContentTitle>
                    <div className={styles.projectsList}>
                        {projectCards.map(card => (
                            <ProjectCard
                                key={card.title}
                                title={card.title}
                                description={card.description}
                                href={card.href}
                                img={card.img}
                                links={card.links}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Home;
