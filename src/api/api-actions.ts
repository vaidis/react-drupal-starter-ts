import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_API_URL_PARAMS,
  SET_API_PAGER_LINKS,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../common/constants'

import { IUrlParams } from '../articles/articles-types'
import { IPager } from './api-types'

/**
 * loading...
 */
export const setLoadedTrue = () => ({
  type: SET_LOADED_TRUE
});

export const setLoadedFalse = () => ({
  type: SET_LOADED_FALSE
});

export const setLoadingOn = () => ({
  type: SET_LOADING_ON
});

export const setLoadingOff = () => ({
  type: SET_LOADING_OFF
});

/**
 * url params used by pager and tag filter
 */
export const setApiUrlParams = (payload: IUrlParams) => ({
  type: SET_API_URL_PARAMS,
  payload
})

/**
 * 
 * @param payload object with numbers used by for pager buttons
 */
export const setApiPagerLinks = (payload: IPager) => ({
  type: SET_API_PAGER_LINKS,
  payload
});
