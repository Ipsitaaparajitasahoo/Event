import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();
const users = [
  { email: 'ipsita@gmail.com', password: '12345' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser); 
    } else {
      alert('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};