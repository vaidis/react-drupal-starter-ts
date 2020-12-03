import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from "react-router-dom";

import UserLogout from './UserLogout'
import { AppState } from '../index-reducers'

/** 
 * Issue: 
 * For IProps if typescript interface used it throws an error from Header.tsx
 * "Property 'user' is missing in type '{}' but required in type 'Pick<IProps, "user">'.  TS2741"
 * 
 * Solution: 
 * use ConnectedProps according to redux manual
 * https://redux.js.org/recipes/usage-with-typescript 
 */
type PropsFromRedux = ConnectedProps<typeof connector>
type IProps = PropsFromRedux & {name?: string; uid?: number}

const UserName: React.FC<IProps> = ({ name, uid }) => {
  console.log("user", name)
  return (
    <div style={{ fontStyle: "italic" }}>
      Hello
      {
        uid !== 0
          ? <div>
            <Link to="/user/profile"> {name} </Link>
            <UserLogout />
          </div>
          : ' Anonymous'
      }
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.current_user,
})

const connector = connect(mapStateToProps, null)
export default connector(UserName)