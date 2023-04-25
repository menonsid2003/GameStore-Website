import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Inventory.scss"
import { AuthContext } from '../context/authContext.js';
import cart from '../images/cart.png'

const Inventory = () => {
    const { currentUser } = useContext(AuthContext);
    const [inventory, setInventory] = useState([]);
    //const [game, setGame] = useState([]);

    const [msg, setMsg] = useState(null);

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const res = await axios.get("/inventory")
                setInventory(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllGames();
    }, []);

    const handleSubmit = async (skuAndID) => {
        try {
            const res = await axios.post("/cart/addToCart", skuAndID);
            setMsg(res.data);
        } catch (err) {
            setMsg(err.response.data);
        }
    };

    //console.log(msg);

    return (
        <div>
            <nav className="product-filter">

                <h1>Games</h1>

                <div className="sort">

                    <div className="collection-sort">
                        <label>Filter by:</label>
                        <select>
                            <option value="/">All Games</option>
                            <option value="/">All Games</option>
                            <option value="/">All Games</option>
                            <option value="/">All Games</option>
                        </select>
                    </div>

                    <div className="collection-sort">
                        <label>Sort by:</label>
                        <select>
                            <option value="/">Featured</option>
                        </select>
                    </div>

                </div>

            </nav>
            <div className='buttonWrapper'>
                {(currentUser !== null && (currentUser.type === "emp" || currentUser.type === "own")) && <Link to="/add"><button className='Button'>Add new game</button></Link>}
                {(currentUser !== null && (currentUser.type === "own")) && <Link to="/employees"><button className='Button'>Manage Employees</button></Link>}
            </div>
            <div className="Inventory">
                {inventory.map(video_game => (
                    <div className='video_game' key={video_game.sku}>
                        <div className="card">
                            <div className='titleYear'>
                                <div className="image">
                                    {video_game.cover && <img src={video_game.cover} alt='' />}
                                    <div className="info">
                                        <h2>{video_game.title} - {video_game.systemName}</h2>
                                        <p>{video_game.year_of_release}</p>
                                    </div>
                                    <div className='priceCart'>
                                        <h3>${video_game.price}</h3>
                                        <button className='cart' onClick={() => handleSubmit({ 'sku': video_game.sku, 'custID': currentUser.username })}>
                                            <img src={cart} alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
};

export default Inventory;