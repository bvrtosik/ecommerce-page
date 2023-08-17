import { styled } from "styled-components";
import Center from "@/components/Center";
import Button, { ButtonStyle } from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import React from "react";
import FlyingButton from "react-flying-item";

const Bground = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Descrip = styled.p`
  color: #aaa;
  font-size: 1rem;
`;

const WrapperColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  div:nth-child(1) {
    order: 2;
  }
  img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 20px;
`;

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
  }
`;

export default function Content({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bground>
      <Center>
        <WrapperColumns>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Descrip>{product.description}</Descrip>
              <WrapperButtons>
                <ButtonLink
                  href={"/product/" + product._id}
                  $white
                  $outline
                  $size="l"
                >
                  Czytaj więcej
                </ButtonLink>
                <FlyingButtonWrapper
                  $primary
                  $size="l"
                  key="addFeaturedToCart"
                  onClick={addFeaturedToCart}
                >
                  <FlyingButton
                    targetTop={"5%"}
                    targetLeft={"85%"}
                    src="http://res.cloudinary.com/dobfxe13v/image/upload/v1692051872/sfwpvf4y18gxribmzebh.png"
                    flyingItemStaing={{ maxHeight: "50px", maxHeight: "50px" }}
                  >
                    Dodaj do koszyka
                  </FlyingButton>
                </FlyingButtonWrapper>
              </WrapperButtons>
            </div>
          </Column>
          <Column>
            <img
              src="http://res.cloudinary.com/dobfxe13v/image/upload/v1692051872/sfwpvf4y18gxribmzebh.png"
              alt=""
            />
          </Column>
        </WrapperColumns>
      </Center>
    </Bground>
  );
}
