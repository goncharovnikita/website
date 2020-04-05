import styled from 'styled-components';

import ProjectLink from './ProjectLink';

export default function ProjectCard(props) {
  const {href, img, title, description, links} = props;

  return (
    <Container>
      <Title>
        <p className="title">
          <a href={href} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        </p>
      </Title>
      <ImgContainer>
        <img src={img} alt={title} load="lazy" className="img" />
      </ImgContainer>
      <DescriptionContainer>
        <p className="description-text">{description}</p>
        <Divider />
        <div className="links">
          {links.map(link => (
            <ProjectLink key={link.href} type={link.type} href={link.href} />
          ))}
        </div>
      </DescriptionContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template: 'title title' 'image description';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  background-color: var(--sidebar-color);
  padding: 24px 32px;
`;

const Title = styled.div`
  grid-area: title;
  .title {
    font-size: 24px;
    font-weight: 900;
  }
`;

const ImgContainer = styled.div`
  grid-area: image;
  .img {
    height: 120px;
    width: 120px;
  }
`;

const DescriptionContainer = styled.div`
  grid-area: description;
`;

const Divider = styled.hr`
  margin-top: 24px;
  margin-bottom: 8px;
`;
