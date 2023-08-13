import React, { useState } from "react";
import './App.css';
import { Login } from './authentication/Login'
import { Register } from "./authentication/Register";
import RoutesNav from "./RoutesNav";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  }

  return (
    <RoutesNav/>
  );
}

export default App;
