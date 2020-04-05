import styled from 'styled-components';

export default function AppButton(props) {
  return (
    <Button onClick={props.onClick}>
      <span>{props.text}</span>
    </Button>
  );
}

const Button = styled.button`
  border: none;
  color: white;
  margin: 0;
  padding: 12px;
  background-color: var(--accent-color);
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: filter 100ms ease-in;

  &:hover {
    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5));
  }
`;
