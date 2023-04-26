import React, { useContext } from 'react'
import "./Cart.scss"
import { useSelector } from 'react-redux'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from 'react-redux';
import { removeItem, remove1 } from '../redux/cartReducer';
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

        } catch (err) {
        }
    };

    const handleMinus = async (itemobject) => {
        try {
            if (itemobject.item.qty === 1) {
                dispatch(removeItem(itemobject.item.sku));
            } else {
                dispatch(remove1(itemobject.item.sku));
            }


        } catch (err) {
            console.log(err);
        }
    };

    const handleCheckout = async () => {
        navigate("/postcheckout");
    };

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
                        <div className='deleteWrapper'>
                            <DeleteOutlinedIcon className='delete' onClick={() => handleSubmit({ item })} />
                            <div className='delete1'>
                                <DeleteOutlinedIcon onClick={() => handleMinus({ item })} />
                                <span>-1</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="total">
                    <span>SUBTOTAL:</span>
                    <span>${totalPrice()}</span>
                </div>
                <div className='buttonWrapper'>
                    <button className='Button' onClick={() => handleCheckout()}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        )
    }
}

export default Cart