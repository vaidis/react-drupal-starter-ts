import {
  select,
  fork,
  take,
  call,
  put,
} from 'redux-saga/effects';

import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  USER_LOGIN_REQUEST,
  // USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  // USER_GET_DATA,
  USER_SET_DATA,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'
import { ICredentials } from './user-types'
import { ILoginRersponse } from './user-types'

/**
 * Login the user and save the response to redux store
 *
 * Using:  api.login and credentials
 * 
 * @param {String} name    Username
 * @param {String} pass    Password
 */
function* UserLoginWorker({name, pass}: ICredentials) {
  const credentials = {
    "name": name,
    "pass": pass,
  }
  yield put({ type: SET_LOADING_ON })
  try {
    const response: ILoginRersponse = yield call(api.login, endpoint.LOGIN, credentials)
    yield put({ type: USER_SET_DATA, payload: response.data });
  } catch (error) {
    yield put({ type: USER_LOGIN_FAILURE });
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export function* userLoginWatcher() {
  while (true) {
    const payload = yield take(USER_LOGIN_REQUEST);
    yield fork(UserLoginWorker, payload)
  }
}

/**
 * Logout the user
 * 
 * Using: api.logout, csrf and logout tokens
 */
function* UserLogoutWorker() {
  yield put({ type: SET_LOADING_ON })
  try {
    const state = yield select()
    const tokens = {
      logout_token: state.user.logout_token,
      csrf_token: state.user.csrf_token,
    }
    yield call(api.logout, endpoint.LOGOUT, tokens);
    yield put({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: USER_LOGOUT_FAILURE });
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export function* userLogoutWatcher() {
  while (true) {
    yield take(USER_LOGOUT_REQUEST)
    yield call(UserLogoutWorker);
  }
}
