import React, { useContext } from 'react'
import "./Cart.scss"
import { useSelector } from 'react-redux'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from 'react-redux';
import { removeItem, resetCart } from '../redux/cartReducer';
import axios from 'axios';
import { AuthContext } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
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

    const handleSubmit = async (itemobject) => {
        try {
            dispatch(removeItem(itemobject.item.sku))
            await axios.post("/cart/removeFromCart", itemobject);

        } catch (err) {
        }
    };

    function run() {
        //handleCheckout({ 'custID': currentUser.username });
        navigate("/postcheckout");
        dispatch(resetCart)
    };

    /* const handleCheckout = async (customerID) => {
        try {
            await axios.post("/cart/checkout", customerID);
        } catch (err) {
        }
    }; */

    if (currentUser == null) {
        return (
            <div className='cart'>
                <h1>You must be logged in!</h1>
            </div>
        )
    }
    else {
        return (
            <div className='cart'>
                <h1>Your Cart</h1>
                {products?.map(item => (
                    <div className='item' key={item.sku}>
                        <img src={item.cover} alt="" />
                        <div className="details">
                            <h1>{item.title}</h1>
                            <p>{item.genre1} {item.genre2}</p>
                            <div className="price">{item.qty} x ${item.price}</div>
                        </div>
                        <DeleteOutlinedIcon className='delete' onClick={() => handleSubmit({ item })} />
                    </div>
                ))}
                <div className="total">
                    <span>SUBTOTAL</span>
                    <span>${totalPrice()}</span>
                </div>
                <div className='buttonWrapper'>
                    <button className='Button' onClick={() => run()}>PROCEED TO CHECKOUT</button>
                </div>
                {/* <span className='reset'>Reset Cart</span> */}
            </div>
        )
    }
}

export default Cart