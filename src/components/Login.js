import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (email && password) {
      login(email, password); 
    } else {
      setError('Please fill in both fields');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
};

export default Login;


