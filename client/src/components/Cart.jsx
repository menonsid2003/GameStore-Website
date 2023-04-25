import React, { } from 'react'
import "./Cart.scss"
//import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/cartReducer';
import axios from 'axios';
//import { cartNum } from '../redux/cartReducer';

const Cart = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products)

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
    
    return (
        <div className='cart'>
            <h1>Products in your cart</h1>
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
            <button>PROCEED TO CHECKOUT</button>
            <span className='reset'>Reset Cart</span>
        </div>
    )
}

export default Cart