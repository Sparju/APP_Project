import React from "react";
import { Button } from "@mui/material";
import MainUi from "./MainUi";

const Cart = ({ cartItems = [], removeFromCart, handlePurchase }) => {
    // Ensure cartItems is an array
    const totalPrice = Array.isArray(cartItems) ? 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;

    return (
        <div>
            <MainUi />
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                                <div>
                                    <h5>{item.title} (x{item.quantity})</h5>
                                    <p>Price: ${item.price} each</p>
                                </div>
                                <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <Button variant="contained" color="primary" onClick={handlePurchase}>Checkout</Button>
                </>
            )}
            {console.log("Cart Items:", cartItems)}
        </div>
    );
};

export default Cart;
