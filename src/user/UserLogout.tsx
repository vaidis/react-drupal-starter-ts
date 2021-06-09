import React, { FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userLogoutRequest } from './user-actions'
import { Link } from "react-router-dom";

import { AppState } from '../index-reducers'

/**
 * Logout user
 *
 * Using: csrf and logout tokens
 *
 * @param {Number} uid                        the id of the current user
 * @param {Funtion} dispatchUserLogoutRequest tell saga worker to logout
 */
const UserLogout: FC<any> = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: AppState) => state.user.current_user.uid);

  return (
    <div>
      { uid !== 0 && (
        <Link
          onClick={() => dispatch(userLogoutRequest())}
          to={'#'}
        >
          logout
        </Link>
      )}
    </div>
  );
}

export default UserLogout;