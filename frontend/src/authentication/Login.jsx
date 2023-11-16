import React, { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', formData);

            if (response.status === 200) {
                setLoggedIn(true);
                console.log('jaxcjaiocias', response.data)
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('userID', response.data)
            }
        } catch (error) {
            console.error('Login failed', error);
        }
        
        navigate('/')
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
            <button className="link-btn"><NavLink to='/register'> Don't have an account? Register here. </NavLink></button>
        </div>

    )
}