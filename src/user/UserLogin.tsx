import React from 'react';
import { userLoginRequest } from './user-actions'
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import UserProfile from './UserProfile'
import {ICredentials} from './user-types'

// import { ConnectedProps } from 'react-redux';
// type PropsFromRedux = ConnectedProps<typeof connector>
// type IProps = PropsFromRedux & {dispatchUserLoginRequest: any}

/**
 * Login Form
 * 
 * @param {Function} dispatchUserLoginRequest dispatch action to start saga worker login
 */
const UserLogin: React.FC<ReturnType<typeof mapDispatchToProps>> = ({ dispatchUserLoginRequest }) => {
  const [name, setName] = React.useState("manager");
  const [pass, setPass] = React.useState("1234");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const payload: ICredentials = { name: name, pass: pass }
    dispatchUserLoginRequest(payload)
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchUserLoginRequest: (credentials: any) => dispatch(userLoginRequest(credentials)),
})

const connector = connect(null, mapDispatchToProps)
export default connector(UserLogin)