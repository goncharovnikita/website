import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 41px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 14px;
`;

const Divider = styled.hr`
  height: 3px;
  background-color: #000000;
  border: none;
`;

export default function ContentTitle(props) {
  return (
    <Container>
      <Title>{props.children}</Title>
      <Divider />
    </Container>
  );
}
