import { Reducer } from 'redux';

import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
  SET_API_URL_PARAMS,
  SET_API_PAGER_LINKS,
} from '../common/constants'

import { IApiActions, IApiState } from './api-types'

const initialStore = {
  loading: false,
  loaded: false,
  urlParams: {
    terms: '',
    search: '',
    offset: 0,
    page: 0,
    items: 0,
    limit: 0
  },
  pager: {
    first: 0,
    last: 0,
    next: 0,
    prev: 0,
    self: 0,
  },
}

const reducer: Reducer<IApiState, IApiActions> = (
  state: IApiState = initialStore,
  action: IApiActions
): IApiState => {

switch (action.type) {

    case SET_LOADING_ON:
      return { ...state, loading: true };

    case SET_LOADING_OFF:
      return { ...state, loading: false };

    case SET_LOADED_TRUE:
      return { ...state, loaded: true };

    case SET_LOADED_FALSE:
      return { ...state, loaded: false };

    case SET_API_URL_PARAMS:
      return {
        ...state,
        urlParams: action.payload
      };

    case SET_API_PAGER_LINKS:
      return {
        ...state,
        pager: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
