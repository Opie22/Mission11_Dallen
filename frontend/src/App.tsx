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

const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <CartProvider>
      <Container fluid className="mt-4">
        {isHomePage ? (
          <Row className="gx-4"> {/* added gutter spacing */}
            <Col md={8}>
              <BookList />
            </Col>
            <Col md={4}>
              <div className="position-sticky" style={{ top: '1rem' }}>
                <CartSummary /> {/* default is no footer */}
              </div>
            </Col>
          </Row>
        ) : (
          <Routes>
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        )}
      </Container>
    </CartProvider>
  );
};

export default App;


