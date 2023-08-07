import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/register', formData)
            .then((response) => {
                // Handle successful registration
                console.log('Registration successful!', response.data);
            })
            .catch((error) => {
                // Handle registration error
                console.error('Registration failed:', error);
            });

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
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}