import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- import
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();  // <-- hook for navigation
  const [isLogin, setIsLogin] = useState(true); // true = show sign in, false = show sign up
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Handle input changes for signup
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Validate login form
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Invalid email';
    if (!loginData.password) newErrors.password = 'Password required';
    else if (loginData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    return newErrors;
  };

  // Validate signup form
  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.name = 'Name required';
    if (!signupData.email) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Invalid email';
    if (!signupData.password) newErrors.password = 'Password required';
    else if (signupData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    return newErrors;
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login with', loginData);

      // --- SUCCESS: redirect to dashboard ---
      // Optionally store a token or user info in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');  // <-- redirect

    } catch {
      setMessage({ type: 'error', text: 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Signup with', signupData);
      setMessage({ type: 'success', text: 'Account created! You can now log in.' });
      // Clear form and optionally switch to login view after a delay
      setSignupData({ name: '', email: '', password: '' });
      setTimeout(() => {
        setIsLogin(true);
        navigate('/');  // redirect to login page (which is the same AuthPage with isLogin=true)
      }, 2000);
    } catch {
      setMessage({ type: 'error', text: 'Signup failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* Left panel – conditionally shows sign in OR sign up form */}
      <div className="panel left-panel">
        <h1>{isLogin ? 'Sign in' : 'Create Account'}</h1>
        <div className="social-icons">
          <a href="#" className="social-icon">f</a>
          <a href="#" className="social-icon">G+</a>
          <a href="#" className="social-icon">in</a>
        </div>
        <p className="separator">{isLogin ? 'or use your account' : 'or use your email'}</p>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {isLogin ? (
          // Sign In Form
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}

            <a href="#" className="forgot-password">Forgot your password?</a>
            <button type="submit" className="sign-in-btn" disabled={isSubmitting}>
              {isSubmitting ? '...' : 'SIGN IN'}
            </button>
          </form>
        ) : (
          // Sign Up Form
          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signupData.name}
              onChange={handleSignupChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}

            <button type="submit" className="sign-in-btn" disabled={isSubmitting}>
              {isSubmitting ? '...' : 'SIGN UP'}
            </button>
          </form>
        )}
      </div>

      {/* Right panel – always visible, button toggles the form */}
      <div className="panel right-panel">
        <h1>{isLogin ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
        <p>
          {isLogin
            ? 'Enter your personal details and start journey with us'
            : 'To keep connected with us please login with your personal info'}
        </p>
        <button className="sign-up-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;