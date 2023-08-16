import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
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
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties.map((p) => ({ name: p.name, value: "all" }))
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  const [products, setProducts] = useState(categoryProducts);
  const [sort, setSort] = useState(defaultSorting);
  const [loading, setLoading] = useState(false);
  const [filtersChanged,setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }
  useEffect(() => {
    if(!filtersChanged){
      return;
    }
    setLoading(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, [filtersValues, sort]);

  
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
            <Filter>
              <span>Sortuj</span>
              <select value={sort} onChange={(ev) => {setSort(ev.target.value); setFiltersChanged(true);}}>
                <option value="price-asc">Cena(od najniższej)</option>
                <option value="price-desc">Cena(od najwyższej)</option>
                <option value="_id-desc">Data dodania(od najnowszych)</option>
                <option value="_id-asc">Data dodania(od najstarszych)</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {loading && (
          <Spinner fullWidth />
        )}
        {!loading && (
          <div>
          {products.length > 0 && (
            <ProductsGrid products={products} />)}
          {products.length === 0 && (
            <div>
            Brak produktów o podanych kryteriach
          </div>
          )}
          </div>
          )}
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
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
