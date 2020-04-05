import styles from "./index.module.scss";

const typeImg = type => {
  switch (type) {
    default:
      return '/icons/safari.svg';
  }
};

const typeText = type => {
  switch (type) {
    default:
      return 'Web';
  }
};

export default function ProjectLink(props) {
  const {href, type} = props;

  const text = typeText(type);
  const img = typeImg(type);

  return (
    <a
      href={href}
      className={styles.link}
      rel="noopener noreferrer"
      target="blank">
      <img src={img} className={styles.icon} alt="" />
      <span className={styles.type}>{text}</span>
    </a>
  );
}
