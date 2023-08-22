import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Fetch profile data using the stored JWT token
    const token = localStorage.getItem('token');
    fetch('/api/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data', error));
  }, []);

  return (
    <div>
      <h1>Welcome, {profileData.username}!</h1>
      <p>Email: {profileData.email}</p>
      {/* Render other profile data */}
    </div>
  )
}

export default Home