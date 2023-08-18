import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1rem;
  padding-bottom: 10px;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const AdresData = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [street, setStreet] = useState("");
  const [numberHome, setNumberHome] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_HOME_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  function saveAddress() {
    const data = { name, email, city, postCode, street, numberHome };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    axios
      .get("/api/address")
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setPostCode(response.data.postCode);
        setStreet(response.data.street);
        setNumberHome(response.data.numberHome);
        setAddressLoaded(true);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
        setAddressLoaded(true);
      });
  }, [session]);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <Title>Informacje na temat konta</Title>
              {!addressLoaded && <Spinner fullWidth />}
              {addressLoaded && (
                <>
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
                  <Button $block={1} $primary={1} onClick={saveAddress}>
                    Zapisz
                  </Button>
                </>
              )}
            </Box>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <Box>
              <Title>Zamówienia</Title>
            </Box>
          </RevealWrapper>
        </ColWrapper>
        <Title></Title>
        {session && (
          <Button $primary onClick={logout}>
            Wyloguj
          </Button>
        )}
        {!session && (
          <Button $primary onClick={login}>
            Zaloguj się
          </Button>
        )}
      </Center>
    </>
  );
}
