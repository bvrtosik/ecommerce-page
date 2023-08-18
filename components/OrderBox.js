import { styled } from "styled-components";

const StyledOrderBox = styled.div`
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  time {
    font-size: 0.8rem;
  }
`;

const OrderBoxRow = styled.div`
  padding-top: 5px;
`;

export default function OrderBox({ line_items, createdAt }) {
  return (
    <StyledOrderBox>
      <time>{new Date(createdAt).toLocaleString()}</time>
      {line_items.map((item) => (
        <OrderBoxRow>
          {item.quantity} x {item.price_data.product_data.name}
        </OrderBoxRow>
      ))}
    </StyledOrderBox>
  );
}
