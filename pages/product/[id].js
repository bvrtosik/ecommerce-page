import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
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
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 30px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const BuyRow = styled.div`
  gap: 20px;
  display: flex;
`;
const Price = styled.span`
  font-size: 1.2rem;
`;

export default function ProductPage({ product }) {
  const {addProduct} = useContext(CartContext)
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <BuyRow>
              <div>
                <Price>{product.price} PLN</Price>
              </div>
              <div>
                <Button
                  $primary={1}
                  $outline={1}
                  onClick={() => addProduct(_id)}
                >
                  Dodaj do koszyka
                </Button>
              </div>
            </BuyRow>
          </div>
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
