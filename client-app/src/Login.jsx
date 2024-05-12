/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', credentials);
      const { token, message } = response.data; // Updated to handle both token and message
      if (message === 'Login successful') {
        sessionStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error); // Log the complete error object for debugging

      // Extract and display user-friendly error message from server response (if available)
      let errorMessage = 'An unexpected error occurred during login. Please try again later.';
      if (error.response && error.response.data) {
        const { message: serverMessage } = error.response.data;
        errorMessage = serverMessage || errorMessage; // Use server message if available, otherwise fallback
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-4">
          <div className="bg-white shadow px-5 pt-3 pb-5 rounded">
            <div className="text-center mb-4">
              <img
                src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                id="icon"
                width="100"
                height="100"
                alt="User Icon"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary btn-block mb-3">
                Log In
              </button>
              {error && <p className="text-danger">{error}</p>}
            </form>
            <div className="text-center">
              <p>
                Don`t have an account? <a href="/register" className="underlineHover">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
