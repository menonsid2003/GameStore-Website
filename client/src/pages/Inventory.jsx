import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Inventory.scss"

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [consoles, setConsoles] = useState([]);

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

    useEffect(() => {
        const fetchAllConsoles = async () => {
            try {
                const res = await axios.get("/consoles")
                setConsoles(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllConsoles();
    }, []);

    return (
        <div>
            <h1>Gamestop but Awesome</h1>
            <nav className="product-filter">

                <h1>Games</h1>

                <div className="sort">

                    <div className="collection-sort">
                        <label>Filter by:</label>
                        <select>
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
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
            </div>
            <button><Link to="/add">Add new game</Link></button>
        </div>
    )
};

export default Inventory;