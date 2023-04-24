import React, { useState, useContext } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/authContext.js';
import { Link } from 'react-router-dom';
import "./Employees.scss"


const Employees = () => {

    const { currentUser } = useContext(AuthContext);

    const [msg, setMsg] = useState(null);

    const [inputs, setInputs] = useState({
        username: "",
        type: "",
    })


    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post("/user/employees", inputs);
            setMsg(res.data);
        } catch (err) {
            setMsg(err.response.data);
        }
    };

    if (currentUser === null || currentUser.type !== "own") {
        return (
            <body>
                <div className='wrapper'>
                    <Navbar />
                    <div className='notLoggedIn'>
                        <h1>You do not have the appropriate privileges to access this page!</h1>
                        <h1><Link to="/login">Login</Link></h1>
                    </div >
                </div>
                <footer className='foot'>
                    <Footer />
                </footer>
            </body>
        )
    }
    else {
        return (
            <div className='wrapper'>
                <Navbar />
                <div className='Employees'>
                    <h1>Add an employee</h1>
                    <form>
                        <input required type='text' placeholder='username of employee' name='username' onChange={handleChange} />
                        <div className='employeeType'>
                            <input required type='radio' name='type' value='emp' id='emp' onChange={handleChange} />
                            <label htmlFor='emp'>Employee</label>
                        </div>
                        <div className='employeeType'>
                            <input required type='radio' name='type' value='cust' id='cust' onChange={handleChange} />
                            <label htmlFor='cust'>Customer</label>
                        </div>
                        <button onClick={handleSubmit}>Change</button>
                        {msg && <p>{msg}</p>}
                        {/* <span>Don't have an account? <Link to="/register">Register</Link></span> */}
                    </form>
                </div >
                <footer className="footer">
                    <Footer />
                </footer>
            </div>
        )
    }
};

export default Employees;