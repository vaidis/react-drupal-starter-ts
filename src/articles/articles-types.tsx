import {
    GET_ARTICLES,
    SET_ARTICLES
} from '../common/constants'

/**
 * Used by: actions
 */
export interface IGetArticles {
    type: typeof GET_ARTICLES;
    payload: any;
}

export interface ISetArticles {
    type: typeof SET_ARTICLES;
    payload: any;
}

/**
 * Used by: reducer
 */
export type IArticlesActions =
    IGetArticles
    | ISetArticles