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

/**
 * Interfaces for User components
 */
export interface IUserState {
    current_user: {
      uid: number;
      name: string;
    },
    csrf_token: string;
    logout_token: string;
};
 export interface ILoginRersponse {
  data: {
    current_user: {
      uid: number;
      name: string;
    },
    csrf_token: string;
    logout_token: string;
  }
};

export interface ICredentials {
  name: string;
  pass: string;
};

export interface ILogoutProps {
  uid: number;
  dispatchUserLogoutRequest: any;
};

/**
 * Interfaces for User actions
 */
export interface IUserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
  name: string;
  pass: string;
};

export interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: string[];
}

export interface IUserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
  payload: string[];
}

export interface IUserGetData {
  type: typeof USER_GET_DATA;
  payload: string[];
}

export interface IUserSetData {
  type: typeof USER_SET_DATA;
  payload: IUserState;
}

export interface IUserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccess {
  type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailure {
  type: typeof USER_LOGOUT_FAILURE;
  payload: string[];
}
/** used by the reducer */
export type IUserActions =
  IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailure
  | IUserGetData
  | IUserSetData
  | IUserLogoutRequest
  | IUserLogoutSuccess
  | IUserLogoutFailure