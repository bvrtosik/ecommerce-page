import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  margin: 30px 0 10px;
  font-size: 1rem;
  border-radius: 15px;
  position: sticky;
  top: 20px;
`;

const Info = styled.h2`
  font-weight: bold;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deletedSearch = useCallback(
    debounce((searchValue) => searchProducts(searchValue), 500),
    []
  );
  useEffect(() => {
    if (searchValue.length > 0) {
      setIsLoading(true);
      deletedSearch(searchValue);
    } else {
      setProducts([]);
    }
  }, [searchValue]);
  function searchProducts(searchValue) {
    axios
      .get("/api/products?searchValue=" + encodeURIComponent(searchValue))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
          placeholder="Wyszukaj produktów"
        />
        {!isLoading && searchValue !== "" && products.length === 0 && (
          <Info>Brak produktów dla wyszukań "{searchValue}"</Info>
        )}
        {isLoading && <Spinner fullWidth />}
        {!isLoading && products.length > 0 && <ProductsGrid />}
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
