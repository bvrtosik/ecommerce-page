import { styled } from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import React from "react";

const Bground = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`;

const Descrip = styled.p`
  color: #aaa;
  font-size: 1rem;
`;

const WrapperColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-top:20px;
`;

export default function Content({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart(){
    addProduct(product._id);
  }
  return (
    <Bground>
      <Center>
        <WrapperColumns>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Descrip>
                {product.Descrip}
              </Descrip>
              <WrapperButtons>
              <ButtonLink href={'/product/'+product._id} $white $outline $size="l">Czytaj więcej</ButtonLink>
                <Button $primary $size="l" key="addFeaturedToCart" onClick={addFeaturedToCart}>
                  Dodaj do koszyka
                </Button>
              </WrapperButtons>
            </div>
          </Column>
          <Column>
            <img
              src="http://res.cloudinary.com/dobfxe13v/image/upload/v1691178144/hgqefras5xkost0qlgjy.png"
              alt=""
            />
          </Column>
        </WrapperColumns>
      </Center>
    </Bground>
  );
}
