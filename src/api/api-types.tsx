import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_API_URL_PARAMS,
    SET_API_PAGER_LINKS,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
} from '../common/constants'

export interface IApiState {
    loading: boolean;
    loaded: boolean;
    search: string;
    terms: string[];
    urlParams: string | object;
    pager: string | object;
}

/**
 * Used by API endpoints
 */
export interface IParams {
    items: number;
    limit: number;
    offset: number;
    page: string;
    search: string;
    terms: string[];
}

/**
 * Used by API Actions
 */
export interface ISetLoadingOn {
    type: typeof SET_LOADING_ON;
}

export interface ISetLoadingOff {
    type: typeof SET_LOADING_OFF;
}

export interface ISetApiUrlParams {
    type: typeof SET_API_URL_PARAMS;
    payload: any;
}

export interface ISetApiPagerLinks {
    type: typeof SET_API_PAGER_LINKS;
    payload: string | object;
}

export interface ISetLoadedTrue {
    type: typeof SET_LOADED_TRUE;
}

export interface ISetLoadedFalse {
    type: typeof SET_LOADED_FALSE;
}

/** used by the reducer */
export type IApiActions =
    ISetLoadingOn
    | ISetLoadingOff
    | ISetApiUrlParams
    | ISetApiPagerLinks
    | ISetLoadedTrue
    | ISetLoadedFalse