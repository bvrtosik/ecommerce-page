import { FadeLoader } from "react-spinners";
import { styled } from "styled-components";

const FadeWrapper = styled.div`
${props => props.fullWidth ? `
display: flex;
justify-content: center;` : ` border `}

`;

export default function Spinner({ fullWidth }) {
  return (
    <FadeWrapper fullWidth={fullWidth}>
      <FadeLoader speedMultiplier={3} color={"#555"} />
    </FadeWrapper>
  );
}
