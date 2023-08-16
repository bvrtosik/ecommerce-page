import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Wszystkie produkty</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
