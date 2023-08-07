import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const loginEmailEvent = (e) => {
        setEmail(e.target.value)
    }
    const loginPasswordEvent = (e) => {
        setPass(e.target.value)
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input onChange={loginEmailEvent} value={email} type = "email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">Password</label>
                <input onChange={loginPasswordEvent} value={pass} type = "password" placeholder="*******" id="password" name="password"/>

                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>

    )
}