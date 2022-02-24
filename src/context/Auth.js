import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookie';

export const AuthContext = React.createContext();

const testUsers = {
  administrator: {username: 'administrator', password: 'test', capabilitites:['create', 'read', 'update', 'delete']},
  user: {username: 'user', password: 'test', capabilities:['read']}
}

const SECRET = process.env.REACT_APP_SECRET|| 'secretstring';

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    username: '',
    token: '',
    capabilities: [],
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthorized = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const login =  async (username, password) => {

    const user = testUsers[username];

    if(user){
      const token = jwt.sign({ user }, SECRET);
      setUser({
        username: user.username,
        token: token,
        capabilities: user.capabilities
      });
      setIsLoggedIn(true);
    }
  }

  const logout = () => {

    if(isLoggedIn){
      setUser({username: '', token: '', capabilities: [] });
      setIsLoggedIn(false)
    }
  }

  return (

    <AuthContext.Provider value={{user, isLoggedIn, login, logout, isAuthorized}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;