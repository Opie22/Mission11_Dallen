import React from "react";
import { useCart } from "../context/CartContext";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartSummary: React.FC = () => {
  const { cartItems, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Header>Shopping Cart</Card.Header>
      <ListGroup variant="flush">
        {cartItems.map(item => (
          <ListGroup.Item key={item.book.bookID}>
            {item.book.title} x {item.quantity} = ${(item.book.price * item.quantity).toFixed(2)}
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <strong>Total: ${getTotal().toFixed(2)}</strong>
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <Button onClick={() => navigate(-1)}>Continue Shopping</Button>
      </Card.Footer>
    </Card>
  );
};

export default CartSummary;
