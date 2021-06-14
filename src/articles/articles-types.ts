import {
    GET_ARTICLES,
    SET_ARTICLES
} from '../common/constants'

/**
 * drupal response format
 */
export interface IArticles {
    data: Array<any>;
    jsonapi: {[key: string]: any};
    links: {[key: string]: any};
    meta: {[key: string]: any};
}

/**
 * params that can be in the url
 */
export interface IUrlParams {
    [key: string]: string | '' | number;
    items: number;
    limit: number;
    offset: number;
    page: number;
    search: string | '';
    terms: string | '';
}


export interface IPager {
    [key: string]: string  | number;
    first: string | number;
    prev: string | number;
    next: string | number;
    self: string | number;
}
/**
 * Used by: actions
 */
export interface IGetArticles {
    type: typeof GET_ARTICLES;
    payload: IUrlParams;
}

export interface ISetArticles {
    type: typeof SET_ARTICLES;
    payload: IArticles;
}

/**
 * Used by: reducer
 */
export type IArticlesActions =
    IGetArticles
    | ISetArticles
