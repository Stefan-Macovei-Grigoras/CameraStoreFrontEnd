/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', credentials); // Assuming the endpoint for registration is '/register'
      const { message } = response.data;
      if(message === 'User registered successfully'){
        //onRegister();
        navigate('/login');
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred during registration. Please try again later.';
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
          <div className=" bg-white shadow px-5 pt-3 pb-5 rounded d-flex flex-column justify-content-center align-items-center">
            <div className="text-center mb-4">
              <img src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg" id="icon" width="100" height="100" alt="User Icon" />
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
            <button type="submit" className="btn btn-primary btn-block ms-3">Register</button>
            <Link to="/login" className='btn btn-primary ms-3'>Back</Link>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
