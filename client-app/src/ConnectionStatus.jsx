/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);

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
    const checkServerStatus = async () => {
      try {
        await fetch('http://localhost:3000');
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
