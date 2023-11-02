import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

export const Register = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/register', formData).then((response) => {
                console.log('Registration successful!', response.data);
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
            
        navigate('/')
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input onChange={handleChange} value={formData.name} name="name" id="name" placeholder="Full Name" />

                <label htmlFor="email">Email</label>
                <input onChange={handleChange} value={formData.email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input onChange={handleChange} value={formData.pass} type="password" placeholder="*******" id="password" name="password" />

                <button type="submit">Register</button>
            </form>
            <button className="link-btn" ><NavLink to={'/'}> Already have an account? Login here. </NavLink></button>
        </div>
    )
}