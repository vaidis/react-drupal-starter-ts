import React, { FC } from 'react';
import { useDispatch } from "react-redux";

import { userLoginRequest } from './user-actions'
import UserProfile from './UserProfile'
import {ICredentials} from './user-types'

/**
 * Login Form
 *
 */
const UserLogin: FC<void> = () => {

  const dispatch = useDispatch();
  const [name, setName] = React.useState("manager");
  const [pass, setPass] = React.useState("1234");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const payload: ICredentials = { name: name, pass: pass };
    /** 
     * dispatch the action to start the saga worker login 
     * in order to post the credentials to drupal
    */
    dispatch(userLoginRequest(payload));
  }

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <input
          type="submit"
          placeholder="Login"
          value="Submit"
        />
      </form>
      <UserProfile />
    </div>
  );
}

export default UserLogin;