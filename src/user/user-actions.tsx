import {
  USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_GET_DATA,
    USER_SET_DATA,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
} from '../common/constants'

// interface IUserObject {
//   user: {
//     current_user: {
//         uid: number;
//         name: string;
//     },
//     csrf_token: string;
//     logout_token: string;
//   }
// }


// -------------------------------------------- LOGIN
export const userLoginRequest = (payload: any) => ({
    type: USER_LOGIN_REQUEST,
    payload
  });

export const userLoginSuccess = (payload: any) => ({
    type: USER_LOGIN_SUCCESS,
    payload
  });

export const userLoginFailure = (payload: any) => ({
    type: USER_LOGIN_FAILURE,
    payload
  });

// -------------------------------------------- DATA
export const userGetData = (payload: any) => ({
    type: USER_GET_DATA,
    payload
  });

export const userSetData = (payload: any) => ({
    type: USER_SET_DATA,
    payload
  });

// -------------------------------------------- LOGOUT
export const userLogoutRequest = () => ({
    type: USER_LOGOUT_REQUEST
  });

export const userLogoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS,
  });

export const userLogoutFailure = (payload: any) => ({
    type: USER_LOGOUT_FAILURE,
    payload
  });