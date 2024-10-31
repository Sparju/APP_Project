import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import StudentServices from "../../services/StudentServices";
import { Badge, Button, Grid, Rating } from "@mui/material";
import { Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Height } from "@mui/icons-material";
import MainUi from "./MainUi";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Token from "../../common/Token";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    Height: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MainPage = ({ data }) => {
    const Email = data && data.length > 0 ? data[0].loginEmail : null;
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const userEmail = Token.getUserName();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (userEmail) {
            StudentServices.getStudents({ email: userEmail })
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        setUserData(res.data[0]);
                    }
                })
                .catch(err => console.error("Error fetching student data:", err));
        }
        fetchingData();
    }, [userEmail]);

    const fetchingData = async () => {
        try {
            let response = await fetch("https://dummyjson.com/products");
            let data = await response.json();
            setProducts(data.products);
        } catch (e) {
            console.log(e);
        }
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const handlePurchase = () => {
        console.log("Purchasing items:", cart);
        setCart([]); // Clear the cart
        alert("Thank you for your purchase!");
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Box className="Cartdata">
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <ShoppingCartIcon />
                </Fab>
            </Box>
            <Row>
                {location.pathname !== '/cart' && (
                    <>
                        <h2>Main Page</h2>
                        {userEmail}
                        {userData && (
                            <div>
                                <h3>User Information</h3>
                                <p>User Name: {userData.userName}</p>
                            </div>
                        )}
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="card" style={{ width: "18rem", margin: "10px" }} key={product.id}>
                                    <img src={product.thumbnail} className="card-img-top" alt="No image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-price"><strong>Price: </strong>${product.price}</p>
                                        <label>Feedback</label>
                                        <Rating name="customized-10" defaultValue={2} max={5} />
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Button variant="outlined" size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<p>No products found</p>)}
                    </>
                )}
            </Row>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Shopping Cart
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <div key={item.id}>
                                    <p>{item.title} - ${item.price} x {item.quantity}</p>
                                    {/* Increase/Decrease buttons */}
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePurchase}
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </Button>
                </Box>
            </Modal>

        </>
    );
};

export default MainPage;
