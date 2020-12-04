import {
    GET_ARTICLES,
    SET_ARTICLES
} from '../common/constants'

export interface IGetArticles {
    type: typeof GET_ARTICLES;
    payload: any;
}

export interface ISetArticles {
    type: typeof SET_ARTICLES;
    payload: any;
}

/** used by the reducer */
export type IArticlesActions =
    IGetArticles
    | ISetArticles