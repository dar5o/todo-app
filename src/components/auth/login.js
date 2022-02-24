import { useContext, useState } from 'react';
import  { Button, InputGroup } from '@blueprintjs/core';

import { AuthContext } from '../../context/Auth';

const Login = () => {

  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const handleChange = e => {
    let { name, value } = e.target;

    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user, pass);
  }

  return (
    <>
      {isLoggedIn
        ? <Button onClick={logout}>Logout</Button>

        : <form onSubmit={handleSubmit}>
            <InputGroup onChange={handleChange} name="username" placeholder="username" />
            <InputGroup onChange={handleChange} name="password" placeholder="password" />
            <Button intent ="success" type="submit">Login</Button>
        </form>
      }
    </>
  )
}

export default Login;