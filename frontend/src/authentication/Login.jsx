import React, { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            if (response.status === 200) {
                navigate("/home");
            } else {
                alert('Wrong')

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loginEmailEvent = (e) => {
        setEmail(e.target.value)
    }
    const loginPasswordEvent = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input onChange={loginEmailEvent} value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input onChange={loginPasswordEvent} value={password} type="password" placeholder="*******" id="password" name="password" />

                <button type="submit">Log In</button>
            </form>
            <button className="link-btn"><NavLink to='/register'> Don't have an account? Register here. </NavLink></button>
        </div>

    )
}