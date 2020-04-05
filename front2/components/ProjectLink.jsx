import styled from 'styled-components';

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
    <Link
      href={href}
      className="project-link-container"
      rel="noopener noreferrer"
      target="blank">
      <img src={img} className="icon" alt="" />
      <span className="type">{text}</span>
    </Link>
  );
}

const Link = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;
  text-decoration: none;
  color: #000000;

  .icon {
    height: 20px;
    width: 20px;
  }
`;
