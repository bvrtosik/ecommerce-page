import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const CartBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  img {
    max-width: 85px;
    max-height: 85px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 13px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 3px;
  }
`;

const AdresData = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [street, setStreet] = useState("");
  const [numberHome, setNumberHome] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function addMoreProduct(id) {
    addProduct(id);
  }
  function minusProduct(id) {
    removeProduct(id);
  }
  async function paymentProcess() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postCode,
      street,
      numberHome,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColWrapper>
            <CartBox>
              <h1>Super! Udało Ci się złożyć zamówienie!</h1>
              <p>
                Otrzymasz od nas stosowną wiadomość mailową, gdy tylko wyślemy
                zamówienie.😊
              </p>
            </CartBox>
          </ColWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <CartBox>
            <h2>Koszyk</h2>
            {!cartProducts?.length && <div>Koszyk jest pusty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Ilość</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => minusProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => addMoreProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}{" "}
                        PLN
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{total} PLN</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </CartBox>
          {!!cartProducts?.length && (
            <CartBox>
              <h2>Informacje</h2>
              <Input
                type="text"
                placeholder="Imię i Nazwisko"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="E-mail"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <AdresData>
                <Input
                  type="text"
                  placeholder="Kod pocztowy"
                  value={postCode}
                  name="postCode"
                  onChange={(ev) => setPostCode(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Miasto"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </AdresData>
              <AdresData>
                <Input
                  type="text"
                  placeholder="Ulica"
                  value={street}
                  name="street"
                  onChange={(ev) => setStreet(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Numer domu/mieszkania"
                  value={numberHome}
                  name="numberHome"
                  onChange={(ev) => setNumberHome(ev.target.value)}
                />
              </AdresData>
              <Button $block={1} $primary={1} onClick={paymentProcess}>
                Przejdź dalej
              </Button>
            </CartBox>
          )}
        </ColWrapper>
      </Center>
    </>
  );
}
