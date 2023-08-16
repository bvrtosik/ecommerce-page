import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Bars from "./icons/Bars";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 1rem 0;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  img {
    max-width: 50px;
    max-height: 50px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
display: flex;
flex-direction: column;
align-items: flex-start;
position: fixed;
top: 0;
left: 0;
right: 0;
background-color: #333;
padding: 2rem;
z-index: 2;
`
      : `
display: none;
`}

  @media screen and (min-width: 768px) {
    display: flex;
    background-color: transparent;
    position: static;
    padding: 0;
    flex-direction: row;
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
  font-weight: bold;
  margin: 0.5rem 0;
  &:hover {
    color: black;
    background-color: lightgray;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 50px;
  height: 50px;
  border: 0;
  color: white;
  cursor: pointer;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  @media screen and (max-width: 767px) {
    display: block;
  }
  &:hover {
    color: black;
    background-color: lightgray;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavButton onClick={() => setMobileNavActive(false)}>
              <Bars />
            </NavButton>
            <Logo href={"/"}>
              <img
                src="https://cdn.pixabay.com/photo/2016/09/24/20/11/dab-1692452_1280.png"
                alt="Logo"
              />
            </Logo>
            <NavLink href={"/"}>Strona Główna</NavLink>
            <NavLink href={"/products"}>Produkty</NavLink>
            <NavLink href={"/categories"}>Kategorie</NavLink>
            <NavLink href={"/account"}>Konto</NavLink>
            <NavLink href={"/cart"}>Koszyk ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <Bars />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
