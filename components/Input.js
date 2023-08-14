import { styled } from "styled-components"

const StyledInput = styled.input`
padding: 10px;
margin-bottom: 5px;
border: 1px solid black;
border-radius:5px;
box-sizing:border-box;
width:100%;
`;

export default function Input(props){
    return <StyledInput {...props} />
}