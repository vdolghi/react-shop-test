import { Routes, Route, Link, Navigate } from 'react-router-dom';

import Cart from './pages/Cart';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './App.css';

const NotFound = () => (
    <div>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  );

function App() {

    return (
        <>
            <Navbar bg="light" variant="light" className="py-3">
                <Container>
                    <Nav className="me-auto">
                        <Link
                            to="/"
                            className="text-decoration-none text-secondary"
                        >
                            Products
                        </Link>
                    </Nav>
                    <Nav>
                        <Link
                            to="/cart"
                            className="text-decoration-none text-secondary"
                        >
                            <i className="fa fa-shopping-cart"></i> Cart
                        </Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="py-3 py-lg-5">
                <Routes>
                    <Route path="/" element={<Products />} exact />
                    <Route path="/cart" element={<Cart />} exact />
                    <Route
                        path="/confirmation"
                        element={<Confirmation />}
                        exact
                    />
                    <Route path="/404" element={<NotFound/>} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
