import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, authObserver } from '../../redux/authSlice';
import config from '../../config';

const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const { user, loading, error } = useSelector((state) => state.auth); // Access auth slice state

     useEffect(() => {
          authObserver(dispatch); // Set up the authentication observer
     }, [dispatch]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const resultAction = await dispatch(login({ email, password })); // Dispatch the login action
               if (login.fulfilled.match(resultAction)) {
                    navigate('/'); // Navigate to the homepage on successful login
               } else {
                    alert('Invalid email or password. Please try again.');
               }
          } catch (err) {
               console.error('Failed to login:', err);
               alert('An error occurred during login. Please try again later.');
          }
     };

     if (loading) return <p>Loading...</p>; // Show loading state

     return (
          <div style={styles.container}>
               {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
               {user ? (
                    <p>Welcome, {user.email}</p> // Welcome message if user is logged in
               ) : (
                    <form onSubmit={handleSubmit} style={styles.form}>
                         <img src={`${config.paradoxoUrl}`} alt="Login" style={styles.image} />
                         <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email"
                              required
                              style={styles.input}
                         />
                         <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                              required
                              style={styles.input}
                         />
                         <button type="submit" style={styles.button}>Login</button>
                    </form>
               )}
          </div>
     );
};

const styles = {
     container: {
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          overflow: 'hidden',
     },
     form: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          padding: '20px',
          width: '300px',
     },
     image: {
          marginBottom: '10px',
          width: '100%',
          borderRadius: '8px',
     },
     input: {
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
     },
     button: {
          padding: '10px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer',
     },
};

export default Login;
