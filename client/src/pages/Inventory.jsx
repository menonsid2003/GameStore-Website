import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Inventory.scss"
import { AuthContext } from '../context/authContext.js';

const Inventory = () => {
    const { currentUser } = useContext(AuthContext);
    const [inventory, setInventory] = useState([]);
    //const [consoles, setConsoles] = useState([]);

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

    /*    useEffect(() => {
           const fetchAllConsoles = async () => {
               try {
                   const res = await axios.get("/consoles")
                   setConsoles(res.data);
               } catch (err) {
                   console.log(err);
               }
           };
           fetchAllConsoles();
       }, []); */

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