import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal } = useCart();

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.book.bookID}>
                <td>{item.book.title}</td>
                <td>{item.quantity}</td>
                <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.book.bookID)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Total: ${getTotal().toFixed(2)}</h4>

      
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartPage;
