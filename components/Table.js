import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align:left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 700;
    font-size: .7rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,0.1);
    min-width:100px;
    min-height:100px;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
