import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all authentication and user-specific data
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('preferredCurrency');
    localStorage.removeItem('visaExpenses');      // optional
    localStorage.removeItem('tuitionPayments');    // optional
    localStorage.removeItem('remittances');        // optional
    // Add any other keys you've stored

    // Redirect to the AuthPage (root path)
    const timer = setTimeout(() => {
      navigate('/'); // <-- change to '/login' if your AuthPage is there
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page logout" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1>👋 You have been logged out</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;