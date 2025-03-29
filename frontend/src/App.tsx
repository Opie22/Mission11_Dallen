// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import BookList from "./components/BookList";
// import CartSummary from "./components/CartSummary";
// import { CartProvider } from "./context/CartContext";
// import { Container, Row, Col } from "react-bootstrap";

// const App: React.FC = () => {
//   return (
//     <CartProvider>
//       <Container className="mt-4">
//         <Row>
//           <Col md={8}>
//             <BookList />
//           </Col>
//           <Col md={4}>
//             <CartSummary />
//           </Col>
//         </Row>
//       </Container>
//     </CartProvider>
//   );
// };

// export default App;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/BookList";
import CartPage from "./components/CartPage"; // ⬅️ you'll create this
import { CartProvider } from "./context/CartContext";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
    </CartProvider>
  );
};

export default App;
