import { styled, css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    filter: brightness(0.85);
  }
  &:active {
    filter: brightness(1);
  }

  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #e2e8e6;
      color: black;
      border: 2px solid white;
    `}
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: white;
      border: 2px solid white;
    `}

  ${(props) => props.$block && css`
    display: block;
    width:100%;
  `}

  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: #475e93;
      color: white;
      border: 2px solid #475e93;
    `}
    
    ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #475e93;
      border: 2px solid #475e93;
    `}

  ${(props) =>
    props.$size === "l" &&
    css`
      font-size: 1rem;
      padding: 10px 15px;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (<StyledButton {...rest}>{children}</StyledButton>);
}
