import React, { useContext , useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Add.scss";


const Add = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = e => {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async e => {
  e.preventDefault()
  try {
      await login(inputs)
      navigate("/");
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
            <input type='text' placeholder='username' name="username" onChange={handleChange} />
            <input type='password' placeholder='password' name="password" onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
      </div >
      <Footer />
    </>
  )
};

export default Add;