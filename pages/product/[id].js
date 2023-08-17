import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import FlyingWrapper from "@/components/FlyingWrapperr";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
`;

const ColWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const BuyRow = styled.div`
  margin-top: 10px;
  gap: 20px;
  display: block;
  justify-content: center;
  text-align: center;
`;
const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <div>
              <ProductImages images={product.images} />
            </div>
            <BuyRow>
              <Price>{product.price} PLN </Price>
              <FlyingWrapper _id={product._id} src={product.images?.[0]}>
                Dodaj do koszyka
              </FlyingWrapper>
            </BuyRow>
            <div>
              <BuyRow>
                <Title>{product.title}</Title>
                {product.description}
              </BuyRow>
            </div>
          </Box>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
