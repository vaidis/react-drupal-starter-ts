import React from 'react';

import Logo from './Logo'
import Menu from './Menu'
import UserName from '../user/UserName'

/**
 * Renders the site header
 * 
 * Using: Logo, Menu, UserName
 * 
 * Used by App.tsx
 * 
 * @return {string} HTML element of menu
 */
const Header: React.FC = () => {
  return (
    <div id="header">
      <Logo />
      <Menu />
      <UserName />
    </div>
  );
}

export default Header;

