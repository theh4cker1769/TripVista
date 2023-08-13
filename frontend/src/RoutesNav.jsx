import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Login } from './authentication/Login';
import Home from './Home';
import { Register } from './authentication/Register';
import './App.css';

const RoutesNav = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="home" element={<Home />} />
            <Route path="register" element={<Register />} />
        </Routes>
    )
}

export default RoutesNav