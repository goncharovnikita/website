import Link from 'next/link';
import styled from 'styled-components';
import cls from 'classnames';

const links = [
  {
    id: 'projects',
    title: 'Проекты',
    href: '/',
    desktopOnly: true,
  },
  {
    id: 'weather',
    title: 'Погода',
    href: '/weather',
    desktopOnly: true,
  },
];

function Sidebar(props) {
  return (
    <Container>
      <Avatar>
        <img src="/images/avatar.jpg" alt="" className="avatar" />
      </Avatar>
      <Credentials>
        <h3>
          <Link href="/"><a>Goncharov Nikita</a></Link>
        </h3>
      </Credentials>
      <Menu>
        <MenuList>
          {links.map(item => (
            <li key={item.id}>
              <Link href={item.href}>
                <a className={cls({active: props.active === item.id})}>
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </MenuList>
      </Menu>
      <Footer>
        <IconsContainer>
          <a href="https://github.com/goncharovnikita">
            <img className="icon-img" src="/icons/github.svg" alt="" />
          </a>
          <a href="https://medium.com/@cashalot">
            <img className="icon-img" src="/icons/medium.svg" alt="" />
          </a>
          <a href="https://twitter.com/jamberspof">
            <img className="icon-img" src="/icons/twitter.svg" alt="" />
          </a>
        </IconsContainer>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  grid-area: sidebar;
  background-color: var(--sidebar-color);
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas: 'avatar' 'credentials' 'info' 'side-footer';
  overflow-y: hidden;
  opacity: 0.8;
`;

const Avatar = styled.div`
  height: 100%;
  grid-area: avatar;
  min-width: 0;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: '. avatar-photo .';
  padding: 41px 12px;

  .avatar {
    height: 140px;
    grid-area: avatar-photo;
    width: initial;
    align-self: center;
    border-radius: 25px;
    justify-self: center;
  }
`;

const Credentials = styled.div`
  grid-area: credentials;
  align-self: center;
  justify-self: center;
  background-color: var(--primary-color);
  width: 100%;
  padding: 19px 0;

  h3 {
    font-weight: bold;
    color: var(--accent-color);
    margin: 0;
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    a {
      text-decoration: none;
      color: var(--accent-color);
    }
  }
`;

const Menu = styled.div`
  grid-area: info;
  padding: 36px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  font-size: 20px;
  li {
    margin-bottom: 12px;
    a {
      text-decoration: none;
      color: #000000;
      &.active {
        font-weight: bold;
        border-bottom: 2px solid #000000;
      }
    }
  }
`;

const Footer = styled.div`
  padding-bottom: 41px;
  grid-area: side-footer;
  width: 100%;
  justify-self: center;

  @media (max-width: 600px) {
    padding-bottom: 21px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;

  .icon-img {
    height: 36px;
    width: auto;
    margin: 0 29px;
  }
`;

export default Sidebar;
