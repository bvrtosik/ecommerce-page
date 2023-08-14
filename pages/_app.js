import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  body{
    font-family: 'Roboto', sans-serif;
    background-color: #E3E6E6;
    padding:0;
    margin:0;
  }
`;

export default function App({ Component, pageProps }) {
  return(
    <>
    <GlobalStyles />
    <CartContextProvider>
    <Component {...pageProps} />
    </CartContextProvider>
    
    </>
  );
}
