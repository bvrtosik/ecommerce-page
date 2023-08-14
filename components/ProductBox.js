import { styled } from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Box = styled(Link)`
  background-color: white;
  padding: 15px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: inherit;
  text-decoration: none;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const ProductWrapper = styled.div``;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.8rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 2.5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const {addProduct} = useContext(CartContext);
  return (
    <ProductWrapper>
      <Box href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </Box>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price} PLN</Price>
          <Button $primary={1} $outline={1} onClick={() => addProduct(_id)}>
            KUP
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
