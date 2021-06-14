import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_API_URL_PARAMS,
    SET_API_PAGER_LINKS,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
} from '../common/constants'

import { IUrlParams } from '../articles/articles-types'

/**
 * Used by api actions
 */
export interface ISetLoadingOn {
    type: typeof SET_LOADING_ON;
}

export interface ISetLoadingOff {
    type: typeof SET_LOADING_OFF;
}

export interface ISetLoadedTrue {
    type: typeof SET_LOADED_TRUE;
}

export interface ISetLoadedFalse {
    type: typeof SET_LOADED_FALSE;
}

export interface ISetApiUrlParams {
    type: typeof SET_API_URL_PARAMS;
    payload: IUrlParams;
}

export interface ISetApiPagerLinks {
    type: typeof SET_API_PAGER_LINKS;
    payload: IPager;
}

/**
 * Used by api reducer
 */
export interface IPager {
    first: number;
    last: number;
    next: number;
    prev: number;
    self: number;
}

export interface IApiState {
    loading: boolean;
    loaded: boolean;
    urlParams: IUrlParams;
    pager: IPager;
}

export type IApiActions =
    ISetLoadingOn
    | ISetLoadingOff
    | ISetApiUrlParams
    | ISetApiPagerLinks
    | ISetLoadedTrue
    | ISetLoadedFalse
