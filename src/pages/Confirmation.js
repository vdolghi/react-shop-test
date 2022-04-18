import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../store/cart';
import {Navigate} from 'react-router-dom';

export default function Confirmation() {
    const cartTotalQuantity= localStorage.getItem("cartTotalQuantity");
    const cartTotalAmount= localStorage.getItem("cartTotalAmount");
    const dispatch = useDispatch();
    const handleReset= () => {  dispatch(resetCart()); };
    const navigate = useNavigate();
    const { state } = useLocation();
    if (state !== '/cart') { return(<Navigate to="/cart" />); }
    else {
    return (
        <>
            <h1>Confirmation</h1>
            <hr/>
            <h2>Thank you for your order!</h2>
            <p>Products count: {cartTotalQuantity}</p>
            <p>Total price: {cartTotalAmount} &euro;</p>
            <Button size="sm" variant="secondary" onClick={()=> {
                handleReset();
                navigate("/");
                }}>
                Confirm
            </Button>
        </>
    );
    } 
}
