import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";


const Title = styled.h2`
  font-size: 2.5rem;
  margin:30px 0 5px;
  font-weight: 500;
`

export default function NewProducts({ products }) {
  return (
    <Center>
    <Title>Nowości</Title>
    <ProductsGrid products={products} />
    </Center>
  );
}
