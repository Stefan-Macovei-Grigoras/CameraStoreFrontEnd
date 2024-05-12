/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data using the token stored in sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('http://example.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        setError('Failed to fetch user data. Please try again later.');
      });
    }
  }, []); // Run once on component mount

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          {/* Display additional user information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Dashboard;
