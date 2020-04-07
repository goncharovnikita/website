import styles from "./index.module.scss";

import ProjectLink from '../ProjectLink';

export default function ProjectCard(props) {
  const {href, img, title, description, links} = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>
          <a href={href} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        </p>
      </div>
      <div className={styles.imgContainer}>
        <img src={img} alt={title} load="lazy" className={styles.img} />
      </div>
      <div className={styles.descriptionContainer}>
        <p className="description-text">{description}</p>
        <hr className={styles.divider} />
        <div className="links">
          {links.map(link => (
            <ProjectLink key={link.href} type={link.type} href={link.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
