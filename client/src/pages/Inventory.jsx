import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Inventory.scss"
import { AuthContext } from '../context/authContext.js';
import cart from '../images/cart.png'

const Inventory = () => {
    const { currentUser } = useContext(AuthContext);
    const [inventory, setInventory] = useState([]);

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
                {
                    inventory.map(video_game => (
                        <div className='video_game' key={video_game.sku}>
                            <div className="card">
                                <div className="image">
                                    {video_game.cover && <img src={video_game.cover} alt='' />}
                                    <div className="info">
                                        <h2>{video_game.title} - {video_game.systemName}</h2>
                                        <p>{video_game.year_of_release}</p>
                                        <h3>${video_game.price}</h3>
                                        <Link className='cart' to="/">
                                            <img src={cart} alt="" />
                                        </Link>
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