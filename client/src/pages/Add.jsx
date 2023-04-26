import React, { useState, useContext } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Add.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext.js';


const Add = () => {

  const { currentUser } = useContext(AuthContext);

  const [game, setGame] = useState({
    sku: "",
    title: "",
    year: 0,
    genre1: "",
    genre2: "",
    system: 0,
    rating: "",
    price: 0,
    publisher: 0,
    cover: "",
  })

  const [msg, setMsg] = useState(null);
  const [msg1, setMsg1] = useState(null);

  //const navigate = useNavigate();

  const handleChange = e => {
    setGame(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("/inventory/add", game);
      setMsg(res.data);
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  const handleDelete = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("/inventory/delete", game);
      setMsg1(res.data);
    } catch (err) {
      setMsg1(err.response.data);
    }
  };

  if (currentUser === null || (currentUser.type !== "emp" && currentUser.type !== "own")) {
    return (
      <>
        <Navbar />
        <body>
          <div className='wrapper'>
            <div className='notLoggedIn'>
              <h1>You do not have the appropriate privileges to access this page!</h1>
              <h1><Link to="/login">Login</Link></h1>
            </div >
          </div>
        </body>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className='Forms'>
          <div className='Add'>
            <h1>Add a game</h1>
            <form>
              <input required type='text' placeholder='SKU' name="sku" onChange={handleChange} />
              <input required type='text' placeholder='title' name="title" onChange={handleChange} />
              <input required type='number' placeholder='year of release' name="year" onChange={handleChange} />
              <input required type='text' placeholder='genre 1' name="genre1" onChange={handleChange} />
              <input required type='text' placeholder='genre 2' name="genre2" onChange={handleChange} />
              <input required type='number' placeholder='system ID' name="system" onChange={handleChange} />
              <input required type='text' placeholder='rating' name="rating" onChange={handleChange} />
              <input required type='number' placeholder='price' name="price" onChange={handleChange} />
              <input required type='number' placeholder='publisher ID' name="publisher" onChange={handleChange} />
              <input required type='text' placeholder='cover image link' name="cover" onChange={handleChange} />
              <button onClick={handleSubmit}>Add</button>
              {msg && <p>{msg}</p>}
            </form>
          </div>
          <div className='Delete'>
            <h1>Delete a game</h1>
            <form>
              <input required type='text' placeholder='SKU' name="sku" onChange={handleChange} />
              <button onClick={handleDelete}>Add</button>
              {msg1 && <p>{msg1}</p>}
            </form>
          </div>
        </div >
        <Footer />
      </>
    )
  }
};

export default Add;