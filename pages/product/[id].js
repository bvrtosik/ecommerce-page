import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
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

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>zdjęcie</Box>
          <div>
            <Title>{product.title}</Title>
            <p>Opis produktu</p>
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
