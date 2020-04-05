import Link from "next/link";
import cls from "classnames";

import styles from "./index.module.scss";

const links = [
    {
        id: "projects",
        title: "Проекты",
        href: "/",
        desktopOnly: true
    },
    {
        id: "weather",
        title: "Погода",
        href: "/weather",
        desktopOnly: true
    }
];

function Sidebar(props) {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img
                    src={require("images/avatar.jpg?webp")}
                    load="lazy"
                    alt=""
                    className={styles.avatarImg}
                />
            </div>
            <div className={styles.credentials}>
                <h3>
                    <Link href="/">
                        <a>Goncharov Nikita</a>
                    </Link>
                </h3>
            </div>
            <div className={styles.menu}>
                <ul className={styles.menuList}>
                    {links.map(item => (
                        <li key={item.id}>
                            <Link href={item.href}>
                                <a
                                    className={cls({
                                        [styles.active]: props.active === item.id
                                    })}
                                >
                                    {item.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.footer}>
                <div className={styles.iconsContainer}>
                    <a href="https://github.com/goncharovnikita">
                        <img
                            className={styles.iconImg}
                            src="/icons/github.svg"
                            alt=""
                        />
                    </a>
                    <a href="https://medium.com/@cashalot">
                        <img
                            className={styles.iconImg}
                            src="/icons/medium.svg"
                            alt=""
                        />
                    </a>
                    <a href="https://twitter.com/jamberspof">
                        <img
                            className={styles.iconImg}
                            src="/icons/twitter.svg"
                            alt=""
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
