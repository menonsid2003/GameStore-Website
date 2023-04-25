import React, { } from 'react'
import "./Cart.scss"
import { Link } from 'react-router-dom'

const Cart = () => {

    const data = [
        {
            sku: "1",
            title: "gaming",
            year: 2012,
            genre1: "oh yeah 1",
            genre2: "oh yeah 2",
            system: 0,
            rating: "E",
            price: 21,
            publisher: 0,
            cover: "https://i.imgur.com/XMrpwQV.png",
        },
        {
            sku: "2",
            title: "real game",
            year: 2022,
            genre1: "oh no 1",
            genre2: "oh no 2",
            system: 0,
            rating: "M",
            price: 41,
            publisher: 0,
            cover: "https://i.imgur.com/Rzr5ckl.png",
        },
    ]


    return (
        <div className='cart'>
            <h1>Products in your cart</h1>
            {data?.map(item => (
                <div className='item' key={item.sku}>
                    <img src={item.cover} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.genre1} {item.genre2}</p>
                        <div className="price">1 x {item.price}</div>
                    </div>
                    <Link className='delete'>delete</Link>
                </div>
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>$2000</span>
            </div>
            <button>PROCEED TO CHECKOUT</button>
            <span className='reset'>Reset Cart</span>
        </div>
    )
}

export default Cart