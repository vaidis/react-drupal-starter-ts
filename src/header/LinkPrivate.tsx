import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { AppState } from './../index-reducers'

interface IProps {
  user?: any;
  to: any;
  label: any;  
}

/**
 * Render or not the menu item according 
 * the user if it is logged in or not
 * 
 * Used by menu.tsx
 * 
 * @param {String} user    user object from redux state
 * @param {String} to      destination url
 * @param {String} label   what the user see
 * @return {String}        html of the menu item
 */
const PrivateRoute: React.FC<IProps> = ({
  user,
  to,
  label,
}) => {
  const isAuthenticated = user.current_user.uid === 0 ? false : true

  if (isAuthenticated) {
    return <Link to={to}>{label}</Link>
  } else {
    return null
  }
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(PrivateRoute);
