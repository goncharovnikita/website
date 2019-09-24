import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet"


const Layout = styled.div`
  opacity: 1;
  height: 100vh;
  display: grid;
  grid-template-areas: "sidebar content";
  grid-template-rows: 100% 100%;
  z-index: 199;

  @media (min-width: 600px) {
    display: grid;
    grid-template-areas: "sidebar content";
    grid-template-columns: 33% 67%;
    z-index: 199;
    background-size: cover;
  }
`

const Sidebar = styled.div`
  height: 100%;
  grid-area: sidebar;
  background-color: var(--primary-color);
  display: grid;
  grid-template-rows: 25% 5% 1fr 7%;
  grid-template-areas: "avatar" "credentials" "info" "side-footer";
  grid-gap: 10px;
  overflow-y: hidden;
  opacity: 0.8;
`

const SidebarAvatar = styled.div`
  grid-area: avatar;
  min-width: 0;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: ". avatar-photo .";
  padding: 12px;
`

const Avatar = styled.img`
  grid-area: avatar-photo;
  width: initial;
  height: 100%;
  align-self: center;
  border-radius: 50%;
  justify-self: center;
`

const Credentials = styled.div`
  grid-area: credentials;
  font-family: var(--titles-font);
  align-self: center;
  justify-self: center;
`

const SidebarFooter = styled.div`
  grid-area: side-footer;
  width: 50%;
  justify-self: center;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconImg = styled.img`
  height: 5vh;
  width: auto;
`

const icons = [
  {
    href: "https://github.com/goncharovnikita",
    src: "icons/github.svg",
  },
  {
    href: "https://medium.com/@cashalot",
    src: "icons/medium.svg",
  },
  {
    href: "https://twitter.com/jamberspof",
    src: "icons/twitter.svg",
  },
]

function Icons() {
  return icons.map((icon, index) => (
    <a href={icon.src} key={index}>
      <IconImg src={icon.src} alt="" />
    </a>
  ))
}

function Root() {
  return (
    <>
      <Helmet>
        <title>Goncharov Nikita</title>
      </Helmet>
      <Layout>
        <Sidebar>
          <SidebarAvatar>
            <Avatar src="images/avatar.jpg" />
          </SidebarAvatar>
          <Credentials>
            <h3>Goncharov Nikita</h3>
          </Credentials>
          <SidebarFooter>
            <Flex>
              <Icons />
            </Flex>
          </SidebarFooter>
        </Sidebar>
      </Layout>
    </>
  )
}

export default Root
