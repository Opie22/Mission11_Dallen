import React from "react";
import CartSummary from "./CartSummary";

const CartPage: React.FC = () => {
  return (
    <div className="position-relative">
      <h2>Shopping Cart</h2>
      <CartSummary showContinueShopping={true} />

    </div>
    
  );
};

export default CartPage;
