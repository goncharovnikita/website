import Head from 'next/head';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import ContentTitle from '../components/ContentTitle';
import ProjectCard from '../components/ProjectCard';

const projectCards = [
  {
    title: 'ReactVPN',
    description:
      'ReactVPN - это мобильное приложение, позволяющее создать быстрое VPN соединение с одним из многих серверов по всему миру',
    href: 'https://reactvpn.com',
    img: require('images/reactvpn-logo.png?webp'),
    links: [
      {
        type: 'web',
        href: 'https://reactvpn.com',
      },
    ],
  },
  {
    title: 'Parfumsearch',
    description:
      'Parsumsearch - быстрый и удобный поиск духов по брендам, нотам и названиям',
    href: 'https://parfumsearch.com',
    img: require('images/parfumsearch-logo.png?webp'),
    links: [
      {
        type: 'web',
        href: 'https://parfumsearch.com',
      },
    ],
  },
];

const Home = () => (
  <>
    <Head>
      <title>Goncharov Nikita</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>
      <Sidebar active="projects" />
      <ContentContainer>
        <Content>
          <ContentTitle>Проекты</ContentTitle>
          <ProjectsList>
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
          </ProjectsList>
        </Content>
      </ContentContainer>
    </Layout>
  </>
);

const Layout = styled.div`
  opacity: 1;
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 300px 1fr;
  grid-template-rows: 100% 100%;
  z-index: 199;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 100%;
    z-index: 199;
    background-size: cover;
  }
`;

const ContentContainer = styled.div`
  grid-area: content;
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  max-width: 700px;
`;

const ProjectsList = styled.div`
  padding: 0 41px;
  display: grid;
  grid-row-gap: 24px;
`;

export default Home;
