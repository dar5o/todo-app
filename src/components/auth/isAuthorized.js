import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth.js';


const IsAuthorized = ({ children, capability }) => {

  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;
  const isAuthorized = authContext.isAuthorized(capability);
  const isOkToRender = isLoggedIn && isAuthorized;

  return (
    <>
      {isOkToRender ? children : null}
    </>
  )
}

export default IsAuthorized;