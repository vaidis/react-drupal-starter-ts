import React from 'react';
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { AppState } from './../index-reducers'

interface IProps {
  to: any;
  label: any;  
}

/**
 * Render or not the menu item according 
 * the user if it is logged in or not
 * 
 * Used by menu.tsx
 * 
 * @param {string} user   - user object from redux state
 * @param {string} to     - destination url
 * @param {string} label  - what the user see
 * @return {string}         html of the menu item
 */
const PrivateRoute: React.FC<IProps> = ({
  to,
  label,
}) => {

  const user = useSelector((state: AppState) => state.user);
  const isAuthenticated = user.current_user.uid === 0 ? false : true

  if (isAuthenticated) {
    return <Link to={to}>{label}</Link>
  } else {
    return null
  }
};

export default PrivateRoute;