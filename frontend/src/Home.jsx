import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {

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

  return (
    <div>
      <h2>User Profile</h2>
      {profileData ? (
        <div>
          <p>Username: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Display other profile data fields */}
        </div>
      ) : (
        <p>Loading or unauthorized</p>
      )}


      

    </div>
  )
}

export default Home