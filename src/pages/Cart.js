import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {removeProductFromCart, incrementProductInCart, decrementProductInCart, updateQuantity, applyVoucher, productsPurchased} from '../store/cart';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import countries from '../data/countries';

export default function Cart() {
    const [show, setShow] = useState(false);
    const [voucher, setVoucher] = useState("");
    const [productId, setProductId] = useState("");

    // Cart management below
    
    const handleClose = () => {
        setShow(false); 
        setVoucher("");
    }

    const handleShow = () => {
        setShow(true); 
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const handleRemoveProduct = (product) => { dispatch(removeProductFromCart(product)); };
    const handleIncrementProduct = (product) => { dispatch(incrementProductInCart(product)); };
    const handleDecrementProduct = (product) => { dispatch(decrementProductInCart(product)); };
    const handleSubmit = () => { dispatch(productsPurchased()); };
    const handleChangeVoucher = (e) => setVoucher(e.target.value); 
    const handleUpdateQuantity = (product, quantity) => { dispatch(updateQuantity({...product, quantity: quantity})); };
    const handleApplyVoucher = (productId, voucher) => {
        dispatch(applyVoucher({id: productId, voucherCode: voucher})); 
        setShow(false); 
        setVoucher("");
    };


    // Billing Form management below

    const validate = values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (values.name.length > 30) {
          errors.name = 'Must be 30 characters or less';
        }
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.phone) {
            errors.phone = 'Required';
          } else if (!/^[+]\d{1}\s\d{2}\s\d{3}\s\d{2}$/i.test(values.phone)) {
            errors.phone = 'Invalid phone number format';
          }

        if (!values.address) {
            errors.address = 'Required';
        }

        if (!values.city) {
            errors.city = 'Required';
        }

        if (!values.zip) {
            errors.zip = 'Required';
        } else if (!/\d{6}/.test(values.zip)) {
            errors.zip = 'ZIPs must contain 6 digits';
        }
        
        return errors;
    };

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          city: '',
          address: '',
          zip: '',
        },
        validate,
        onSubmit: values => {
            handleSubmit();
            navigate('/confirmation', {state: '/cart'});
        },
    });
      
    return (
        <>
            <Card
                className="w-75 rounded-full border-0"
                style={{ margin: 'auto', background: '#f3f3f3' }}
            >
                <Card.Body className="p-3 p-lg-5">
                    <Card.Title>Shopping cart</Card.Title>

                    <ListGroup as="ol" style={{ marginTop: '1rem' }}>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start border-0 p-0"
                        >
                            <Container fluid="md" className="p-2">
                                {
                                cart.cartItems.length === 0 ? (
                                    <div>
                                        <p>Your cart is currently empty!</p>
                                    </div>
                                ) : (
                                cart.cartItems && cart.cartItems.map(item => (
                                <>
                                    <Row key={item.id} className="py-2 m-0">
                                        <Col md={1} xs={6}>
                                            <Image
                                                style={{ maxHeight: '6rem' }}
                                                className="d-block mx-auto"
                                                src={item.image}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col
                                            className="d-flex flex-column justify-content-center"
                                            md={3}
                                            xs={6}
                                        >
                                            <h6 className="mb-0">
                                                {item.name}
                                            </h6>
                                            <small
                                                style={{ fontSize: '0.7rem' }}
                                            >
                                                <span className="text-black-50 my-2">
                                                    Product Code:
                                                </span>{' '}
                                                <span
                                                    style={{
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    -
                                                </span>
                                            </small>
                                        </Col>
                                        <Col
                                            className="d-flex justify-content-center align-items-center"
                                            md={2}
                                            xs={6}
                                        >
                                            <h6 className="mb-0 me-2 text-danger">
                                                {item.newPrice ? item.newPrice : item.price} &euro;    
                                            </h6>
                                            <h6 className="mb-0 text-black-50">
                                                <strike>{item.newPrice ? `${item.price} €`: ""}</strike>
                                            </h6>
                                        </Col>
                                        <Col
                                            className="d-flex justify-content-center align-items-center py-2"
                                            md={2}
                                            xs={6}
                                        >
                                            <InputGroup
                                                size="sm"
                                                style={{ width: '5rem' }}
                                            >
                                                <Button
                                                    variant="outline-secondary"
                                                    style={{
                                                        fontSize: '0.6rem',
                                                    }}
                                                    onClick={() => {
                                                        handleIncrementProduct(item); 
                                                    }}
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </Button>
                                                <Form.Control
                                                    size="sm"
                                                    className="border-secondary text-center px-0"
                                                    style={{
                                                        fontSize: '0.7rem',
                                                    }}
                                                    value={item.cartQuantity}
                                                    onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
                                                    // onBlur={(e) => e.target.value = item.cartQuantity}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    style={{
                                                        fontSize: '0.6rem',
                                                    }}
                                                    onClick={() => handleDecrementProduct(item)}
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                        <Col
                                            className="d-flex justify-content-center align-items-center"
                                            md={2}
                                            xs={6}
                                        >
                                            <Button
                                                size="sm"
                                                className={item.vouchers.length > 0 ? 'btn-danger' : 'invisible'}
                                                variant="secondary"
                                                id={item.id}
                                                disabled={item.newPrice ? true : false}
                                                onClick={() => {handleShow(); setProductId(item.id)}}
                                            >
                                                Apply Coupon
                                            </Button>
                                        </Col>
                                        <Col
                                            className="d-flex justify-content-center align-items-center"
                                            md={2}
                                            xs={6}
                                        >
                                            <Button variant="danger" size="sm" onClick={() => {handleRemoveProduct(item)} }>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                    <hr className="text-black-50 my-2"></hr>
                                    </>
                                )))}
                            </Container>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>

                <Card.Body className="p-lg-5 p-3">
                    <Card.Title>Billing Information</Card.Title>

                    <Form className="bg-white p-3" onSubmit={formik.handleSubmit}>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.phone && formik.errors.phone ? <div className="text-danger">{formik.errors.phone}</div> : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Select>
                                {countries.map(country => ( <option key={country.code} value={country.name}>{country.name}</option> ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.city && formik.errors.city ? <div className="text-danger">{formik.errors.city}</div> : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.address && formik.errors.address ? <div className="text-danger">{formik.errors.address}</div> : null}
                        <Form.Group className="mb-3">
                            <Form.Label>ZIP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ZIP"
                                name="zip"
                                value={formik.values.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Group>
                        {formik.touched.zip && formik.errors.zip ? <div className="text-danger">{formik.errors.zip}</div> : null}
                        <Button
                    className="mx-5 mb-5"
                    variant="primary"
                    type="submit"
                >
                    Next
                </Button>
                    </Form>
                </Card.Body>

                
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Enter coupon code"
                            onChange={handleChangeVoucher}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose() }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleApplyVoucher(productId, voucher)}>
                        Apply Coupon
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}