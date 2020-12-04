import React from 'react';
import { useSelector } from "react-redux";
import { AppState } from '../index-reducers'

/**
 * Renders a page that shows the user data
 */
const UserProfile: React.FC = () => {
  const user = useSelector((state: AppState) => state.user);
  return (
    <div>
      <h2>User Profile</h2>
      <pre>
        <code>
          <div>store.user: {JSON.stringify(user, null, 4)}<br /><br /></div>
        </code>
      </pre>
    </div>
  );
}

export default UserProfile;