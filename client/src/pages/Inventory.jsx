import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [consoles, setConsoles] = useState([]);

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const res = await axios.get("http://localhost:8800/inventory")
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
                const res = await axios.get("http://localhost:8800/consoles")
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
            <div className="Inventory">
                {
                    inventory.map(video_game => (
                        <div className='video_game' key={video_game.sku}>
                            {video_game.cover && <img src={video_game.cover} alt='' />}
                            <h2>{video_game.title} ({video_game.year_of_release})</h2>
                            <p>{video_game.systemID}</p>
                            <span>${video_game.price}</span>
                        </div>
                    ))}
            </div>
            <button><Link to="/add">Add new game</Link></button>
        </div>
    )
};

export default Inventory;