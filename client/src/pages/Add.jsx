import React, { useContext , useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { AuthContext } from '../context/authContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Add.scss";


const Add = () => {
  const [inputs, setInputs] = useState({
    SKU: "",
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

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
        await axios.post("/inventory/add", inputs);
        navigate("/add");
    } catch (err) {
        setError(err.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className='Add'>
        <h1>Add a game</h1>
        <form>
            <input required type='text' placeholder='SKU' name="SKU" onChange={handleChange} />
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
            {err && <p>{err}</p>}
            {/* <span>Don't have an account? <Link to="/register">Register</Link></span> */}
        </form>
      </div >
      <Footer />
    </>
  )
};

export default Add;