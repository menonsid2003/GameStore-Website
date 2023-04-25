import React, { } from 'react'
import "./Cart.scss"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cart = () => {

    const products = useSelector(state => state.cart.products)

    const totalPrice = () => {
        let total = 0
        products.forEach((item) => {
            (total += item.price)
        });
        return total.toFixed(2);
    }
    return (
        <div className='cart'>
            <h1>Products in your cart</h1>
            {products?.map(item => (
                <div className='item' key={item.sku}>
                    <img src={item.cover} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.genre1} {item.genre2}</p>
                        <div className="price">1 x ${item.price}</div>
                    </div>
                    <Link className='delete'>delete</Link>
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