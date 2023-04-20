import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input type='text' placeholder='username' />
                <input type='password' placeholder='password' />
                <button>Login</button>
                <p>Error!</p>
                <span>Already have an account? <Link to="/login">Register</Link></span>
            </form>
        </div>
    )
}

export default Register;