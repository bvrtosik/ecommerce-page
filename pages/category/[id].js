import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Category } from "@/model/Category";
import { Product } from "@/model/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
  text-transform: uppercase;
`;

const Filter = styled.div`
  background-color: lightgray;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

export default function CategoryPage({
  category,
  subCategories,
  products: categoryProducts,
}) {
  const [filtersValues, setFiltersValues] = useState(
    category.properties.map((p) => ({ name: p.name, value: "all" }))
  );
  const [products, setProducts] = useState(categoryProducts);
  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }
  useEffect(() => {
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [filtersValues]);
  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <Title>{category.name}</Title>
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}: </span>
                <select
                  value={filtersValues.find((f) => f.name === prop.name).value}
                  onChange={(ev) =>
                    handleFilterChange(prop.name, ev.target.value)
                  }
                >
                  <option value="all">Wszystkie</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FiltersWrapper>
        </CategoryHeader>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parentCategory: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategory: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
