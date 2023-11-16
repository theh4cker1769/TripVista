import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Home = (props) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('loggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(storedLoginStatus);
    }

    if (storedLoginStatus == null) {
      navigate('/login')
    }

  }, []);

  if (isLoggedIn == false)  {
    navigate('/login')
  }

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userID');

    if (userId) {
      axios.get(`/api/profile/${userId}`)
        .then((response) => {
          setProfileData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching profile data', error);
        });
    } else {
      console.log('dont know')
    }
  }, []);

  const openProject = () => {
    window.open("https://theh4cker1769.github.io/TripVistaLanding/", "_blank");
  };

  const logOut = () => {
    localStorage.removeItem("userID")
    localStorage.removeItem("loggedIn");
    navigate('/login')
  }

  return (
    <div>
      <h2>User Profile</h2>
      {profileData ? (
        <div>
          <p>Username: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <br />
          <button onClick={openProject}>Explore</button>
          <br />
          <br />
          <button onClick={logOut}>Logout</button>
          {/* Display other profile data fields */}

        </div>
      ) : (
        <>
          {/* <Navigate to="/login" replace={true} /> */}
          <h1>Test</h1>
        </>
      )}




    </div>
  )
}

export default Home