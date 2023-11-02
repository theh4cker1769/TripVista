import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = (props) => {

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

  return (
    <div>
      <h2>User Profile</h2>
      {profileData ? (
        <div>
          <p>Username: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <br/>
          
          {/* Display other profile data fields */}

        </div>
      ) : (
        <>
          <p>Loading or unauthorized</p>
          <button onClick={openProject}>Explore</button>
        </>
      )}




    </div>
  )
}

export default Home