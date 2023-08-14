import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: black;
`;
const Logo = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
    display:flex;
    gap:20px;
`;

const NavLink = styled(Link)`
    color:#aaa;
    text-decoration:none;
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Szopik</Logo>
          <StyledNav>
            <NavLink href={'/'}>Strona Główna</NavLink>
            <NavLink href={'/products'}>Produkty</NavLink>
            <NavLink href={'/categories'}>Kategorie</NavLink>
            <NavLink href={'/account'}>Konto</NavLink>
            <NavLink href={'/cart'}>Koszyk ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
