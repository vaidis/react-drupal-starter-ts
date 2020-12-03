import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../index-reducers'

// interface IProps {
//   user: {
//     name: string;
//     uid: number;
//   }
// }

type PropsFromRedux = ConnectedProps<typeof connector>
type IProps = PropsFromRedux & {name?: string; uid?: number}

/**
 * Renders a page that shows the user data
 * 
 * @param {String} user   The current user from redux store
 */
const UserProfile: React.FC<IProps> = ({ user }) => {
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

const mapStateToProps = (state: AppState) => ({
  user: state.user,
})

const connector = connect(mapStateToProps, null)
export default connector(UserProfile)