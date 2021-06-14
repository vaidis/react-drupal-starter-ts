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

import {
  IUserLoginRequest,
  IUserLoginSuccess,
  IUserLoginFailure,
  IUserGetData,
  IUserSetData,
  IUserLogoutFailure,
} from './user-types'

/** LOGIN */
export const userLoginRequest = (payload: IUserLoginRequest) => ({
  type: USER_LOGIN_REQUEST,
  name: payload.name,
  pass: payload.pass,
});

export const userLoginSuccess = (payload: IUserLoginSuccess) => ({
  type: USER_LOGIN_SUCCESS,
  payload
});

export const userLoginFailure = (payload: IUserLoginFailure) => ({
  type: USER_LOGIN_FAILURE,
  payload
});

/** USER DATA */  
export const userGetData = (payload: IUserGetData) => ({
  type: USER_GET_DATA,
  payload
});

export const userSetData = (payload: IUserSetData) => ({
  type: USER_SET_DATA,
  payload
});

/** LOGOUT */
export const userLogoutRequest = () => ({
  type: USER_LOGOUT_REQUEST
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
});

export const userLogoutFailure = (payload: IUserLogoutFailure) => ({
  type: USER_LOGOUT_FAILURE,
  payload
});