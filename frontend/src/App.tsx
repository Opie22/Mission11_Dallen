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
import CartSummary from "./components/CartSummary";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminBooks from "./components/AdminBooks";

const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <CartProvider>
      <Container fluid className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Row className="gx-4">
                <Col md={8}>
                  <BookList />
                </Col>
                <Col md={4}>
                  <div className="position-sticky" style={{ top: '1rem' }}>
                    <CartSummary />
                  </div>
                </Col>
              </Row>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBooks />} />
        </Routes>
      </Container>
    </CartProvider>
  );
};

export default App;



