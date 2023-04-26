import React, { useContext } from 'react'
import "./PostCheckout.scss"
import axios from 'axios';
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { resetCart } from '../redux/cartReducer';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostCheckout = () => {
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products)
    const navigate = useNavigate();

    const totalPrice = () => {
        let total = 0
        products.forEach((item) => {
            (total += (item.price * item.qty))
        });
        return total.toFixed(2);
    }

    function run() {
        handleCheckout({ 'custID': currentUser.username });
        navigate("/");
        alert("Order Confirmed!");
        dispatch(resetCart());
    };

    const handleCheckout = async (customerID) => {
        try {
            await products.forEach((item) => {
                axios.post("/cart/addToCart", item);
            });
            await axios.post("/cart/checkout", customerID);
        } catch (err) {
        }
    };

    if (products && products.length === 0) {
        return (
            <>
                <Navbar />
                <body>
                    <div className='wrapper'>

                        <div className='emptyCart'>
                            <h1>Your cart is empty!</h1>
                            <h1><Link to="/">Back to Inventory</Link></h1>
                        </div >
                    </div>
                </body>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className='postcheckout'>
                    <div>
                        <h1 className='success'>Checkout</h1>
                    </div>
                    <div>
                        {products?.map(item => (
                            <div className='item' key={item.sku}>
                                <img src={item.cover} alt="" />
                                <div className="details">
                                    <h1>{item.title}</h1>
                                    <p>{item.genre1} {item.genre2}</p>
                                    <div className="price">{item.qty} x ${item.price}</div>
                                </div>
                            </div>
                        ))}
                        <div className="total">
                            <h2>Total:</h2>
                            <h3>${totalPrice()}</h3>
                            <div className='buttonWrapper1'>
                                <button className='Button' onClick={() => run()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default PostCheckout