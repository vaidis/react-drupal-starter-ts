import { Reducer } from 'redux';

import {
  USER_SET_DATA,
  USER_LOGOUT_SUCCESS,
} from '../common/constants'

import { IUserState, IUserActions } from './user-types'

const initialState = {
  current_user: {
    uid: 0,
    name: 'anonymous'
  },
  csrf_token: '',
  logout_token: '',
}


const reducer: Reducer<IUserState, any> = (
  state = initialState,
  action: IUserActions
) => {
  switch (action.type) {

    case USER_SET_DATA:
      return {
        ...state,
        current_user: action.payload.current_user,
        csrf_token: action.payload.csrf_token,
        logout_token: action.payload.logout_token,
      };

    case USER_LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default reducer;