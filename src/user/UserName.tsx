import React, { FC } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from '../index-reducers'
import UserLogout from './UserLogout'

const UserName: FC = (): JSX.Element => {
  const user = useSelector((state: AppState) => state.user.current_user);

  return (
    <div style={{ fontStyle: "italic" }}>
      Hello
      {
        user.uid !== 0
          ? <div>
            <Link to="/user/profile"> {user.name} </Link>
            <UserLogout />
          </div>
          : ' Anonymous'
      }
    </div>
  );
}

export default UserName;