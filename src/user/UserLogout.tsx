import React from 'react';
// import { Dispatch } from 'redux'
import { userLogoutRequest } from './user-actions'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { AppState } from '../index-reducers'

interface IProps {
  uid: number;
  dispatchUserLogoutRequest: any;
}

// interface ILogout {
//     type: any,
//     payload: any;
// }

/**
 * 
 * @param {Number} uid                        the id of the current user
 * @param {Funtion} dispatchUserLogoutRequest tell saga worker to logout
 */
const UserLogout: React.FC<IProps> = ({ uid, dispatchUserLogoutRequest }) => {
  return (
    <div>
      { uid !== 0 && (
        <Link
          onClick={() => dispatchUserLogoutRequest()}
          to={'#'}
        >
          logout
        </Link>
      )}
    </div>
  );
}

// const mapDispatchToProps = (dispatch: Dispatch<ILogout>) => ({
const mapDispatchToProps = (dispatch: any) => ({
  dispatchUserLogoutRequest: () => dispatch(userLogoutRequest()),
})
const mapStateToProps = (state: AppState) => ({
  uid: state.user.current_user.uid,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLogout);