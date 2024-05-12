/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const checkServerStatus = async () => {
      try {
        await fetch('http://localhost:3000/cameras',{ headers: {
          Authorization: `Bearer ${token}`
      }}
          
        );
        setIsServerDown(false);
      } catch (error) {
        setIsServerDown(true);
      }
    };

    checkServerStatus();

    const interval = setInterval(checkServerStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isOnline) {
    return <div className="alert alert-danger alert-dismissible fade show">No internet connection!</div>;
  }

  if (isServerDown) {
    return <div className="alert alert-warning alert-dismissible fade show">Server is down!</div>;
  }

  return null;
}

export default ConnectionStatus;
