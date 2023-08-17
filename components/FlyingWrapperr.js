import FlyingButton from "react-flying-item";
import { styled } from "styled-components";
import { ButtonStyle } from "./Button";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
  }
`;

export default function FlyingWrapper(props) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      $primary={1}
      $outline={1}
      onClick={() => addProduct(props._id)}
    >
      <FlyingButton
        {...props}
        targetTop={"5%"}
        targetLeft={"85%"}
        flyingItemStaing={{
          maxHeight: "50px",
          maxHeight: "50px",
        }}
      />
    </FlyingButtonWrapper>
  );
}
