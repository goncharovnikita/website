import styled from 'styled-components';

import '../styles/index.scss';

const MainContent = styled.div`
  max-width: 1200px;
`;

export default function MyApp({Component, pageProps}) {
  return (
    <MainContent>
      <Component {...pageProps} />
    </MainContent>
  );
}
